---
title: Step 4 - Connecting frontend with hub auth server
description: This article describes how to connect meme marketplace frontend with hub auth server.
---

# Step 4: Starting and Connecting the Authentication Server

This section covers how the React app authenticates with the Hub auth server. This tutorial uses a custom private-key identity in the React app to manage users. The Textile Hub supports public-key infrastructure (PKI) allowing your app to support different user identity providers based on PKI (e.g. 3Box, uPort, Blockstack), or derive your own.

Users get access to the Hub APIs easily using this configuration. The Hub uses encryption to verify that the users are who they claim to be.

The general flow of authentication is as follows:

1. A user attempts to sign-in by providing their _public key_.
2. Your app creates a one-time challenge for the users.
3. The user signs the challenge with their _private key_ to generate _credentials_.
4. Your app verifies the credentials.

The steps below simplify the flow with the Hub’s token generation endpoint, which includes credential validation.

## Generating an identity

Generate an identity by using the following code from [marketplace/src/redux/actions/hub.js](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/redux/actions/hub.js#L17) in React app, using the `@textile/threads-core` library.

You can install `@textile/threads-core` using the Node Package Manager (NPM):

```bash
npm i @textile/threads-core
```

You can use the `Libp2pCryptoIdentity` utility exported from `@textile/threads-core` to generate random new identities (private and public keys) and later, to sign challenges to prove private key ownership.

```js
import { Libp2pCryptoIdentity } from '@textile/threads-core'

const getIdentity = async () => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  try {
    if (urlParams.get('force')) {
      window.history.replaceState({}, document.title, '/')
      throw new Error('Forced new identity')
    }
    var storedIdent = localStorage.getItem('identity')
    if (storedIdent === null) {
      throw new Error('No identity')
    }
    const restored = Libp2pCryptoIdentity.fromString(storedIdent)
    return restored
  } catch (e) {
    /**
     * If any error, create a new identity.
     */
    try {
      /** Random new identity */
      const identity = await Libp2pCryptoIdentity.fromRandom()

      /** Convert to string. */
      const identityString = identity.toString()

      /** Storing identity for later use */
      localStorage.setItem('identity', identityString)
      return identity
    } catch (err) {
      return err.message
    }
  }
}
```

The example above creates a new identity using `Libp2pCryptoIdentity.fromRandom()` and then converts it into string format to store it in the browser `localStorage` for later use, when the user returns to the app.

::: tip
`localStorage` isn't guaranteed and may be cleared by the browser, the system, or the users. Even more important, localStorage isn't a secure place to store secrets. You should provide alternative storage mechanisms if maintaining persistent identity (and therefore data ownership and access) over time is important. (from [Textile's documentation](https://docs.textile.io/tutorials/hub/libp2p-identities/#caching-user-identity))
:::

## Signing Challenges

Challenges are designed to validate that a user is actually who they claim to be, by signing the challenge with a private key.

To sign data, use the `identity.sign` method exposed by the `Libp2pCryptoIdentity` object. This will be [used by the React app](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/redux/actions/hub.js#L95) to sign random challenges from the server to verify the ownership of the user's identity (user's private key).

```js
import { Libp2pCryptoIdentity } from '@textile/threads-core'

async function sign(identity) {
  const challenge = Buffer.from('Sign this string')
  const credentials = identity.sign(challenge)
  return credentials
}
```

This way the app can support PKI and can prove the user's identity to a server. The app only needs to expose its public key which will be used by the server as a way to uniquely identify a user. But as the public key is "public" in nature, anybody can mock any user if we don't have any way to prove to the server that we are actually who we claim to be. To prove our identity the server will ask us to sign a challenge with our private key, and on successful verification, provide us with a token that can be used for a limited period of time to access the Hub APIs.

## Creating and connecting the Authentication server

To identify users, the server needs to handle two-way communication with the client during identity verification. The flow is as follows:

1. The **client** initiates a login request.
2. The **server** receives the request and contacts the **Hub** APIs to get a challenge for the requesting **client**.
3. The **server** passes the challenge to the **client**.
4. The **client** uses the private key to **sign** the challenge to prove their identity and sends the signed challenge back to the **server**.
5. The **server** passes the signed challenge to the **Hub**.
6. If successful, the **server generates API credentials and passes credentials, token, and API key back to the client**.
7. The **client** can use the Hub APIs directly.

Look at:

- [marketplace/src/pages/Login/index.js](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/pages/Login/index.js#L41): To understand how Login UI works. Involved in Step 1.
- [marketplace/src/redux/actions/hub.js](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/redux/actions/hub.js#L322) To understand how the react app connects and communicates with the hub auth server using Websockets to complete the login process. Involved in Step 1,4,7.
- [hub-browser-auth-app/src/server/index.ts](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/hub-browser-auth-app/src/server/index.ts): To understand different modules used in the hub auth server.
- [hub-browser-auth-app/src/server/wss.ts](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/hub-browser-auth-app/src/server/wss.ts): Creates WebSocket endpoint for the client-side token challenge. Involved in Step 2,3,5,6.

### Step 1: The client initiates a login request

In [marketplace/src/pages/Login/index.js](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/pages/Login/index.js#L41), `loginAndCreateBucket` is called if the Metamask plugin is available.

```js
export const loginAndCreateBucket = () => async dispatch => {
  document.getElementById('login').innerHTML = 'Creating Hub Identity...'

  // Logging In
  await hubClient.setupIdentity()
  const auth = await hubClient.login()

  dispatch({
    type: types.LOGIN,
    payload: auth
  })

  document.getElementById('login').innerHTML = 'Creating a Bucket...'

  // Creating & Opening a Bucket
  const bucket = await hubClient.createBucket()

  dispatch({
    type: types.CREATE_BUCKET,
    payload: bucket
  })
}
```

In [marketplace/src/redux/actions/hub.js](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/redux/actions/hub.js#L198), `loginAndCreateBucket`:

- Initiates login request with the hub auth server by:

  - Calling `hubClient.setupIdentity()` which calls `getIdentity()` (discussed above) to create PKI identity for the app user. `this.id` is a `Libp2pCryptoIdentity` object containing the user identity including user's private key. `this.id` is converted into string format to create `identity`. The `setupIdentity` function returns `publicKey` which is the public key in string format.

  ```js
  setupIdentity = async () => {
    /** Create or get identity */
    this.id = await getIdentity()
    /** Contains the full identity (including private key) */
    const identity = this.id.toString()

    /** Get the public key */
    const publicKey = this.id.public.toString()

    /** Return the publicKey short ID */
    return publicKey
  }
  ```

  - Calling `hubClient.login()` which first checks if `this.id` is defined or not. `this.id` is passed into the `loginWithChallenge` function.

  ```js
  /**
   * Provides a full login where
   * - pubkey is shared with the server
   * - identity challenge is fulfilled here, on client
   * - hub api token is sent from the server
   *
   * see index.html for example running this method
   */
  login = async () => {
    if (!this.id) {
      throw Error('No user ID found')
    }

    /** Use the identity to request a new API token */
    this.auth = await loginWithChallenge(this.id)

    console.log('Verified on Textile API')

    /* Return auth details */
    return this.auth
  }
  ```

The `loginWithChallenge` function in [marketplace/src/redux/actions/hub.js](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/redux/actions/hub.js#L56) uses Websockets to communicate with the hub authentication server.

The react app connects to the `socketUrl = ws://localhost:3001/ws/userauth`. After the socket connection is open, the public key is stringified using `id.public.toString()`, and a token request is sent to the hub auth server.

```js
/**
 * More secure method for getting token & API auth.
 *
 * Keeps private key locally in the app.
 */
const loginWithChallenge = async id => {
  return new Promise((resolve, reject) => {
    /**
     * Configured for our development server
     *
     * Note: this should be upgraded to wss for production environments.
     */
    const socketUrl = `ws://localhost:3001/ws/userauth`

    /** Initialize our WebSocket connection */
    const socket = new WebSocket(socketUrl)

    /** Wait for our socket to open successfully */
    socket.onopen = () => {
      /** Get public key string */
      const publicKey = id.public.toString()

      /** Send a new token request */
      socket.send(
        JSON.stringify({
          pubkey: publicKey,
          type: 'token'
        })
      )

      /** Listen for messages from the server */
      socket.onmessage = async event => {
        const data = JSON.parse(event.data)
        switch (data.type) {
          /** Error never happen :) */
          case 'error': {
            reject(data.value)
            break
          }
          /** The server issued a new challenge */
          case 'challenge': {
            /** Convert the challenge json to a Buffer */
            const buf = Buffer.from(data.value)
            /** User our identity to sign the challenge */
            const signed = await id.sign(buf)
            /** Send the signed challenge back to the server */
            socket.send(
              JSON.stringify({
                type: 'challenge',
                sig: Buffer.from(signed).toJSON()
              })
            )
            break
          }
          /** New token generated */
          case 'token': {
            resolve(data.value)
            break
          }
        }
      }
    }
  })
}
```

### Step 2: Hub auth server contacts the Hub APIs

In [hub-browser-auth-app/src/server/index.ts](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/hub-browser-auth-app/src/server/index.ts), to facilitate this two-way communication between the server and the client, we use Websockets as follows:

```js
/** Provides nodejs access to a global WebSocket value, required by Hub API */
(global as any).WebSocket = require("isomorphic-ws");

import koa from "koa";
import websockify from "koa-WebSocket";

import dotenv from "dotenv";

import wss from "./wss";

dotenv.config();

if (!process.env.USER_API_KEY || !process.env.USER_API_SECRET) {
  process.exit(1);
}

const PORT = parseInt(process.env.PORT, 10) || 3001;

const app = websockify(new koa());

/**
 * Create WebSocket endpoint for client-side token challenge
 *
 * See ./wss.ts
 */
app.ws.use(wss);

/** Start the server! */
app.listen(PORT, () => console.log("Server started."));
```

Here we import multiple modules:

- [`isomorphic-ws`](https://www.npmjs.com/package/isomorphic-ws): Isomorphic implementation of WebSocket. It uses:
  - `ws` on Node
  - `global.WebSocket` in browsers
- [`koa`](https://www.npmjs.com/package/koa): Expressive HTTP middleware framework for node.js to make web applications and APIs.
- [`koa-WebSocket`](https://www.npmjs.com/package/koa-websocket): Light wrapper around Koa providing a WebSocket middleware handler that is koa-route compatible.
- [`dotenv`](https://www.npmjs.com/package/dotenv): Dotenv is a zero-dependency module that loads environment variables from a _.env_ file into `process.env`.

You can install these modules using the Node Package Manager (NPM):

```bash
npm i isomorphic-ws koa koa-WebSocket dotenv
```

We also import the following WebSocket file, [wss.ts](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/hub-browser-auth-app/src/server/wss.ts) which creates WebSocket endpoint for the client-side token challenge.

`dotenv.config()` loads the environment variables from a _.env_ file into `process.env`. If `process.env.USER_API_KEY` or `process.env.USER_API_SECRET` is not defined, then the application exits automatically.

The `PORT` variable is set to `process.env.PORT` if present, otherwise defaults to `3001`.

`websockify(new koa())` wraps koa object providing WebSocket middleware handler that is `koa-route` compatible.

The server is started using `app.listen` method which listens on the port: `PORT`.

::: tip
This example uses `koa` web framework, but you can use `express` too.
:::

In the code above, the second to last section reads `Create WebSocket endpoint for client-side token challenge`. That section points to the [hub-browser-auth-app/src/server/wss.ts](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/hub-browser-auth-app/src/server/wss.ts) file which contains functionality to:

- Handle the public key supplied by the client and request a challenge for the public key from the Hub. (Step 2)
- Send the challenge back to the client via WebSocket. (Step 3)
- Handle the response from the client with the signed challenge, which is passed to the Hub for verification. (Step 5)
- Create credentials and store client details for future logins to the app, after successful validation. (Step 6)

```js
import route from "koa-route";
import Emittery from "emittery";
import { UserAuth } from "@textile/hub"

import {newClientDB, getAPISig} from "./hub-helpers"

interface UserModel {
  pubkey: string
  lastSeen: Date
}

/**
 * In a real system you might have a real user-singup flow
 * Here, we just stub in a basic user "database".
 * Users are added by their Public Key.
 * Users will only be added if they prove they hold the private key.
 * Proof is done using the Hub's built in token challenge API.
 */
const UserDB: {[key: string]: UserModel} = {}

/**
 * This login includes a more thorough identity verification step.
 *
 * It leverages the Hub's public key verification via challenge.
 * The challenge is issued server-side by fulfilled here, client-side.
 * This has several benefits.
 * - User private key never needs to leave the user/client.
 * - The server will leverage the Hub verification in the process of user registration.
 * - The server can maintain a record of: user public key and user token in list of users.
 */
const wss = route.all('/ws/userauth', (ctx) => {
  /** Emittery allows us to wait for the challenge response event */
  const emitter = new Emittery();
  ctx.WebSocket.on('message', async (msg) => {
    try {
      /** All messages from client contain {type: string} */
      const data = JSON.parse(msg);
      switch (data.type) {
        /** The first type is a new token request */
        case 'token': {
          /** A new token request will contain the user's public key */
          if (!data.pubkey) { throw new Error('missing pubkey') }

          /**
           * Init new Hub API Client
           *
           * see ./hub.ts
           */
          const db = await newClientDB()

          /** Request a token from the Hub based on the user public key */
          const token = await db.getTokenChallenge(
            data.pubkey,
            /** The callback passes the challenge back to the client */
            (challenge: Uint8Array) => {
            return new Promise((resolve, reject) => {
              /** Pass the challenge to the client */
              ctx.WebSocket.send(JSON.stringify({
                type: 'challenge',
                value: Buffer.from(challenge).toJSON(),
              }))
              /** Wait for the challenge event from our event emitter */
              emitter.on('challenge', (sig) => {
                /** Resolve the promise with the challenge response */
                resolve(Buffer.from(sig))
              });
              /** Give client a reasonable timeout to respond to the challenge */
              setTimeout(() => {
                reject()
              }, 1500);

            })
          })

          /**
           * The challenge was successfully completed by the client
           */

          /**
           * The user has verified they own the pubkey.
           * Add or update the user in the user database
           */
          const user: UserModel = {
            pubkey: data.pub,
            lastSeen: new Date(),
          }
          UserDB[data.pub] = user;

          /** Get API authorization for the user */
          const auth = await getAPISig()

          /** Include the token in the auth payload */
          const payload: UserAuth = {
            ...auth,
            token: token,
            key: process.env.USER_API_KEY,
          };

          /** Return the result to the client */
          ctx.WebSocket.send(JSON.stringify({
            type: 'token',
            value: payload,
          }))
          break;
        }
        /** The second type is a challenge response */
        case 'challenge': {
          /** A new challenge response will contain a signature */
          if (!data.sig) { throw new Error('missing signature (sig)') }

          /**
           * If the timeout hasn't passed there is a waiting promise.
           * Emit the challenge signature for the waiting listener above.
           * */
          await emitter.emit('challenge', data.sig);
          break;
        }
      }
    } catch (error) {
      /** Notify our client of any errors */
      ctx.WebSocket.send(JSON.stringify({
        type: 'error',
        value: error.message,
      }))
    }
  });
});

export default wss;
```

Here we import multiple modules:

- `koa-route`: A simple route middleware for koa.
- `emittery`: A simple and modern async event emitter.
- `@textile/hub`: Provides access to Textile APIs in apps based on Account Keys or User Group Keys.

You can install these modules using the Node Package Manager (NPM):

```bash
npm i koa-route emittery @textile/hub
```

We also import [`hub-helpers.ts`](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/hub-browser-auth-app/src/server/hub-helpers.ts) which exports helper functions like:

- `newClientDB`: Creates a Client (remote DB) connection to the Textile Hub.
- `getAPISig`: uses a helper function `createAPISig` exported from `@textile/hub` to create a new API signature which expires in 300 seconds by default.

```js
// hub-helpers.ts file

import { createAPISig, Client } from '@textile/hub'

/**
 * getAPISig uses helper function to create a new sig
 *
 * seconds (300) time until the sig expires
 */
export const getAPISig = async (seconds: number = 300) => {
  const expiration = new Date(Date.now() + 1000 * seconds)
  return await createAPISig(process.env.USER_API_SECRET, expiration)
}

/**
 * newClientDB creates a Client (remote DB) connection to the Hub
 *
 * A Hub connection is required to use the getToken API
 */
export const newClientDB = async () => {
  const API = process.env.API || undefined
  const db = await Client.withKeyInfo(
    {
      key: process.env.USER_API_KEY,
      secret: process.env.USER_API_SECRET,
      type: 0
    },
    API
  )
  return db
}
```

After importing the modules and helper functions, [hub-browser-auth-app/src/server/wss.ts](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/hub-browser-auth-app/src/server/wss.ts) creates an `UserModel` interface which stores public key (`pubkey`) and last visit time (`lastSeen`) of an app user.

::: tip
In an actual app you may like to use a database to store the app user details.
:::

We then register a WebSocket route `/ws/userauth`. Whenever the server receives a `'message'` with `data.type` as `token` (as sent by the react app above), the server first checks if `data.pubkey` is present. If yes, a new `db` is initialized using the `newClientDB()` function. The server then requests a `challenge` for a public key (`data.pubkey`) using `db.getTokenChallenge` which takes a callback function that accepts a `Uint8Array` type `challenge` and returns a Promise (that resolves to the value of `token`).

### Step 3: The server passes the challenge to the client

This `challenge` is then converted to JSON data type using `Buffer.from(challenge).toJSON()` and sent to the react app using `ctx.WebSocket.send`.

The server waits for `1500` milliseconds for the react app to respond to the challenge.

### Step 4. The client uses the private key to sign the challenge

This challenge is handled by the react app in the `loginWithChallenge` in the [marketplace/src/redux/actions/hub.js](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/redux/actions/hub.js#L91) file.

The challenge (`data.value`) is converted to `Buffer` type using `const buf = Buffer.from(data.value)` and then signed using `const signed = await id.sign(buf)`.

This signed challenge is sent back to the server, which is handled by the `"challenge"` case in the switch case in [hub-browser-auth-app/src/server/wss.ts](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/hub-browser-auth-app/src/server/wss.ts#L113). The server checks for the challenge response (`data.sig`) and if present it emits a challenge event by `emitter.emit("challenge", data.sig)`.

### Step 5. The server passes the signed challenge to the Hub

This event is [captured](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/hub-browser-auth-app/src/server/wss.ts#L67) and the Promise is resolved to `Buffer.from(sig)`, thus setting the value of the `token` variable to `Buffer.from(sig)`.

::: tip
The token provided in the response should be considered a secret that only should be shared with a single user. It does not expire.
:::

### Step 6: The server generates API credentials

The server generates API credentials and passes credentials, token, and API key back to the client. Now, as the app user has verified they own the `pubkey`, the server saves the `pubkey` and `lastSeen` time in the `UserDB`.

The server then generates an API authorization signature (`auth`) for the user using `getAPISig()`, and sends it back to the react app along with the `token` and `process.env.USER_API_KEY`.

### Step 7: The client can use the Hub APIs directly

This payload is [captured by the react app](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/redux/actions/hub.js#L107) which resolves the Promise returned by the `loginWithChallenge` function and set as a value of `this.auth` which can be used in the react app to use the Textile Hub APIs directly without the hub auth server.

Now, your users have identities and they've verified themselves. In the login page section, we will explore how we can connect to the hub APIs to create buckets.
