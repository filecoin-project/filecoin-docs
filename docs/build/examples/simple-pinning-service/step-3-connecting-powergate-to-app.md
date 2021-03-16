---
title: Step 3 - Connecting Powergate instance with React app
description: This article describes how to connect the Powergate instance with the React app.
---

# Step 3 - Connecting to the Powergate & PouchDB Instance

The React app contains several pages which all interact with the Powergate instance. Before using the Powergate Pinning service, you need to connect to the running Powergate instance.

In this and later sections, you will walk through the various parts of the sample application to see how to connect and interact with the powergate instance using the React frontend. You will start by connecting your application to the powergate and PouchDB.

Use any text editor to open the `powergate-pinning-client` project. Multiple pages in the React app interact with the powergate instance.

![VSCode editor with powergate-pinning-client project open.](./images/pinning-service-app-code.png)

## Step 3a - Connecting to the Powergate Instance

To connect the React app to the Powergate instance:

1. To connect the React app to the running powergate instance, install the following JavaScript module using the [node package manager](http://npmjs.com/):

```bash
npm i @textile/powergate-client
```

The module `@textile/powergate-client` lets you connect to Powergate instance in javascript environments such as Node, React Native, and web browsers.

2. In [src/utils/powergate.js](https://github.com/filecoin-shipyard/powergate-pinning-service/blob/master/src/utils/powergate.js), create a `getPowergateInstance()` function that returns the Powergate instance (using the `createPow` method) which can be used anywhere in the app.

```js
import { createPow, ffsOptions, ffsTypes } from '@textile/powergate-client'
var pow

const POW_HOST = 'http://localhost:6002' // or whatever powergate instance you want

export const getPowergateInstance = () => {
  if (pow) {
    // Return already existing powergate instance
    return pow
  } else {
    // Create a new powergate instance
    pow = createPow({ POW_HOST })
    return pow
  }
}

export const ffsOptions = ffsOptions
export const ffsTypes = ffsTypes
```

`ffsOptions` and `ffsTypes` are utility objects which are exported to be used in a function which we will explore in the next section of the tutorial.

::: tip
Notice the POW_HOST is set to "http://0.0.0.0:6002" (exposed by Powergate instance). This value is correct if you're running the Docker compose setup, but change it as needed if you're running Powergate elsewhere.
:::

The Powergate instance is connected and you can use it in the app.

## Step 3b - Connecting to the PouchDB Instance

1. To connect the React app to the PouchDB instance, install the following JavaScript module using the [node package manager](http://npmjs.com/):

```bash
npm i pouchdb
```

The module `pouchdb` lets you connect to PouchDB in javascript environments such as Node, React Native, and web browsers.

2. In [src/utils/database.js](https://github.com/filecoin-shipyard/powergate-pinning-service/blob/master/src/utils/powergate.js), create a PouchDB object and initilize a database named `my_database`:

```js
import PouchDB from 'pouchdb'
var db = new PouchDB('my_database')
```

3. In [src/utils/database.js](https://github.com/filecoin-shipyard/powergate-pinning-service/blob/master/src/utils/database.js) create the following functions:

- `addUser`: Saves new user details.

```js
export const addUser = user => {
  return new Promise((resolve, reject) => {
    db.put(user, function (err, response) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log('Document created Successfully')
        console.log(response)
        resolve(response)
      }
    })
  })
}
```

- `getUser`: Fetches details of an existing user.

```js
export const getUser = address => {
  return new Promise((resolve, reject) => {
    db.get(address, function (err, doc) {
      if (err) {
        console.log(err)
        resolve(err)
      } else {
        console.log(doc)
        resolve(doc)
      }
    })
  })
}
```

- `updateUser`: Updates details of an existing user.

```js
export const updateUser = (address, user) => {
  return new Promise((resolve, reject) => {
    db.get(address, function (err, doc) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        db.put({ ...doc, user }, function (err, response) {
          if (err) {
            console.log(err)
            reject(err)
          } else {
            console.log('Document updated Successfully')
            console.log(response)
            resolve(response)
          }
        })
      }
    })
  })
}
```

::: tip
For development purposes we save the users locally (browser memory). You can also use the browser's `localStorage` or you can manage user data on an external database.
:::

The PouchDB is connected and you can use it in the app.
