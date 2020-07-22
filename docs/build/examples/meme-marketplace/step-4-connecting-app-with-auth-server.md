---
title: Step 4 - Connecting frontend with hub auth server
description: This article describes how to connect meme marketplace frontend with hub auth server.
---

# Step 4: Starting and Connecting the Authentication Server

This section covers how the React app authenticates with the Hub auth server. This tutorial uses a custom private-key identity in React app to manage users. The Textile Hub supports public-key infrastructure (PKI) allowing your app to support different user identity providers based on PKI (e.g. 3Box, uPort, Blockstack), or derive your own.

Users get access to the Hub APIs easily using this configuration. The Hub uses encryption to verify that the users are who they claim to be.

The general flow of authentication is as follows:

1. A user attempts to sign-in by providing their _public key_.
2. Your app creates a one-time challenge for the users.
3. The user signs the challenge with their _private key_ to generate _credentials_.
4. Your app verifies the credentials.

The steps below simplify the flow with the Hub’s token generation endpoint, which includes credential validation.

### Generating an identity

Generate an identity by using the following code from [marketplace/src/redux/actions/hub.js](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/redux/actions/hub.js#L37) in React app, using the `@textile/threads-core` library.

You can use the `Libp2pCryptoIdentity` utility to generate random new identities (private and public keys) and later, to sign challenges to prove private key ownership.

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

### Signing Challenges

Challenges are designed to validate that a user is actually who they claim to be, by signing the challenge with a private key.

To sign data, use the `identity.sign` method exposed by the `Libp2pCryptoIdentity` object. This will be [used by the React app](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/redux/actions/hub.js#L107) to sign random challenges from the server to verify the ownership of the user's identity (user's private key).

```js
import { Libp2pCryptoIdentity } from '@textile/threads-core'

async function sign(identity) {
  const challenge = Buffer.from('Sign this string')
  const credentials = identity.sign(challenge)
  return credentials
}
```

This way the app can support PKI and can prove the user's identity to a server. The app only needs to expose its public key which will be used by the server as a way to uniquely identify a user. But as the public key is "public" in nature, anybody can mock any user if we don't have any way to prove to the server that we are actually who we claim to be. To prove our identity the server will ask us to sign a challenge with our private key, and on successful verification, provide us with a token that can be used for a limited period of time to access the Hub APIs.

### Creating the Authentication server

To identify users, the server needs to handle two-way communication with the client during identity verification. The flow is as follows:

1. The **client** initiates a login request.
2. The **server** receives the request and contacts the **Hub** APIs to get a challenge for the requesting **client**.
3. The **server** passes the challenge to the **client**.
4. The **client** uses the private key to **sign** the challenge to prove their identity and sends the signed challenge back to the **server**.
5. The **server** passes the signed challenge to the **Hub**.
6. If successful, the **server generates API credentials and passes credentials, token, and API key back to the client**.
7. The **client** can use the Hub APIs directly.

In [hub-browser-auth-app/src/server/index.ts](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/hub-browser-auth-app/src/server/index.ts), to facilitate this two-way communication between the server and the client, we use Websockets as follows:

```js
/** Provides nodejs access to a global Websocket value, required by Hub API */
(global as any).WebSocket = require("isomorphic-ws");

import koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import websockify from "koa-websocket";
import cors from "@koa/cors";

import dotenv from "dotenv";

import wss from "./wss";
import api from "./api";

dotenv.config();

if (!process.env.USER_API_KEY || !process.env.USER_API_SECRET) {
  process.exit(1);
}

const PORT = parseInt(process.env.PORT, 10) || 3001;

const app = websockify(new koa());

/** Middlewares */
app.use(json());
app.use(logger());
app.use(bodyParser());

/* Not safe in production */
app.use(cors());

/**
 * Start HTTP Routes
 */
const router = new Router();
app.use(router.routes()).use(router.allowedMethods());

/**
 * Create Rest endpoint for server-side token issue
 *
 * See ./api.ts
 */
app.use(api.routes());
app.use(api.allowedMethods());

/**
 * Create Websocket endpoint for client-side token challenge
 *
 * See ./wss.ts
 */
app.ws.use(wss);

/** Start the server! */
app.listen(PORT, () => console.log("Server started."));
```

Here we import multiple modules:

- [`koa`](https://www.npmjs.com/package/koa): Expressive HTTP middleware framework for node.js to make web applications and APIs.
- [`koa-router`](https://www.npmjs.com/package/koa-router): Router middleware for Koa framework.
- [`koa-logger`](https://www.npmjs.com/package/koa-logger): Development style logger middleware for koa.
- [`koa-json`](https://www.npmjs.com/package/koa-json): JSON pretty-printed response middleware. Also converts node object streams to binary.
- [`koa-bodyparser`](https://www.npmjs.com/package/koa-bodyparser): A body parser for koa. Supports `json`, `form` and `text` type body.
- [`koa-websocket`](https://www.npmjs.com/package/koa-websocket): Light wrapper around Koa providing a websocket middleware handler that is koa-route compatible.
- [`@koa/cors`](https://www.npmjs.com/package/@koa/cors): Cross-Origin Resource Sharing(CORS) for koa.
- [`dotenv`](https://www.npmjs.com/package/dotenv): Dotenv is a zero-dependency module that loads environment variables from a _.env_ file into `process.env`.

We also import the following files:

- [./wss](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/hub-browser-auth-app/src/server/wss.ts): This file creates Websocket endpoint for client-side token challenge.
- [./api](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/hub-browser-auth-app/src/server/api.ts): This file creates REST endpoint for server-side token issue.

`dotenv.config()` loads the environment variables from a _.env_ file into `process.env`. If `process.env.USER_API_KEY` or `process.env.USER_API_SECRET` is not defined, then the application exits automatically.

The `PORT` variable is set to `process.env.PORT` if present, otherwise defaults to `3001`.

`websockify(new koa())` wraps koa object providing websocket middleware handler that is `koa-route` compatible.

Middlewares and (REST and Websocket) routes are registered using `app.use` method.

The server is started using `app.listen` method which listens on the port: `PORT`.

::: tip
This example uses `koa` web framework, but you can use `express` too.
:::

### Add a WebSocket login handler

In the code above, the second to last section reads `Create Websocket endpoint for client-side token challenge`. That section points to the [hub-browser-auth-app/src/server/wss.ts](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/hub-browser-auth-app/src/server/wss.ts) file which contains functionality to:

- Handle the public key supplied by the client and request a challenge for the public key from the Hub.
- Send the challenge back to the client via Websocket.
- Handle the response from the client with the signed challenge, which is passed to the Hub for verification.
- Create credentials and store client details for future logins to the app, after successful validation.

TODO: Explain the code with the variables invloved.

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
  ctx.websocket.on('message', async (msg) => {
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
              ctx.websocket.send(JSON.stringify({
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
          ctx.websocket.send(JSON.stringify({
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
      ctx.websocket.send(JSON.stringify({
        type: 'error',
        value: error.message,
      }))
    }
  });
});

export default wss;
```

::: tip
The token provided in the response should be considered a secret that only should be shared with a single user. It does not expire.
:::

### Create a client

In the React app, you can now make requests to your login endpoint using a WebSocket. A basic client needs to handle a challenge request from the server, where the challenge will be signed and returned over WebSocket.

[View the full code here](https://github.com/filecoin-shipyard/meme-marketplace/blob/master/marketplace/src/redux/actions/hub.js#L63).

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

    /** Initialize our websocket connection */
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

By passing the user identity (`id`) to the function above, your app can authenticate and verify the user in one step, granting them access to the Hub resources.

### Generate API credentials

Once the credentials endpoint is set up, you need to generate new credentials for each user's identity.

Use the `createCredentials` function provided in the setup above in the _client_ React app.

```js
/**
 * Method for using the server to create credentials without identity
 */
const createCredentials = async () => {
  const response = await fetch(`/api/userauth`, {
    method: 'GET'
  })
  const userAuth = await response.json()
  return userAuth
}
```

The `userAuth` object returned from `createCredentials` allows your app to start creating and editing Buckets and Threads owned by your user.

Now, your users have identities and they've verified themselves. In the login page section, we will explore how we can connect to the hub APIs to create buckets.
