---
title: Get started
description: Want to jump into Filecoin and start building something? This section gets you up and running quickly by creating a simple Node.js script using Infura and the Filecoin network.
breadcrumb: 'Get started'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }} The Infura API makes it easier to interact with the Filecoin Network by abstracting away some of the complex workflows and requirements. There's no need to spin up a node or directly call a Lotus daemon with this tutorial.

In this tutorial you will:

1. Sign up to the Infura API.
1. Create a Node.js script that:
   a. Checks if a given string is a valid Filecoin address.
   a. Returns the balance of that address, if it is valid.
1. Discover more ways to interact with the Filecoin network using the Infura API.

## Before we begin

Make sure you have both [Node.js](https://nodejs.org/) and [NPM](https://www.npmjs.com/) installed.

## Infura API

To interact with the Infura API you need to register on the Infura website:

1. Go to [infura.io/register](https://infura.io/register) and sign up.
1. Select **Filecoin** from the sidebar and click **Create new project**.
1. Enter _Filcoin - Get started_ as the project name and click **Create**.
1. You should now be able to see your `Project ID` and `Project Secret`. Take a note of these two fields; we'll use them later.

![Project ID and Project secret within Infura.](./images/get-started/infura-keys.png)

That's everything set up on the Infura side. Next, let's create our project.

## Create your project

1. To kick things off, create a new project directory and move into it:

   ```bash
   mkdir ~/Code/filecoin-wallet-checker -p
   cd ~/Code/filecoin-wallet-checker
   ```

1. Create a file called `index.js` and add this boilerplate code:

   ```javascript
   let request = require('request')

   // Call the Infura API and check that the address is valid.

   request(options, (error, response, body) => {
     if (error) {
       console.error('Error: ', error)
     } else {
       console.log('Response: ', body)
     }
   })
   ```

1. Add the `request` package to this project:

```bash
npm install request
```

Now that we've got a project set up, and our Infura information, we can start to build things!

## Design the basic script

We've got our project directory set up, and have our `index.js` file ready to go. Let's start fleshing out our script by creating a basic API call.

1. First up, let's create the `options` object that we're going to put in our request:

   ```javascript
   // Call the Infura API and check that the address is valid.
   let options = {}
   ```

1. Next, enter the `url`, `method`, and `headers` values into the object:

   ```javascript
   // Call the Infura API and check that the address is valid.
   let options = {
     url: 'https://filecoin.infura.io',
     method: 'post',
     headers: {
       'content-type': 'application/json'
     }
   }
   ```

   These are pretty self explanitory, so we won't delve into what they mean here. The two object values we're more interested in are `body` and `auth`:

1. Create a new value called `auth`, and within it create a new object:

   ```javascript
   // Call the Infura API and check that the address is valid.
   let options = {
     url: 'https://filecoin.infura.io',
     method: 'post',
     headers: {
       'content-type': 'application/json'
     },
     auth: {}
   }
   ```

   This object is what the Infura API uses to authenticate your request.

1. Add your Infura project ID and project secret into to `user` and `pass` fields:

   ```javascript
   // Call the Infura API and check that the address is valid.
   let options = {
     url: 'https://filecoin.infura.io',
     method: 'post',
     headers: {
       'content-type': 'application/json'
     },
     auth: {
       user: '1nO7B...',
       pass: 'bda4a...'
     }
   }
   ```

   You can find your Infura details by going to `infura.io/dashboard/filecoin`, selecting your project, and clicking on the **Settings** tab.

1. The final value we need to add to our `options` object is the `body` of our request:

   ```javascript
   // Call the Infura API and check that the address is valid.
   let options = {
     url: 'https://filecoin.infura.io',
     method: 'post',
     headers: {
       'content-type': 'application/json'
     },
     auth: {
       user: '1nO7B...',
       pass: 'bda4a...'
     },
     body: ''
   }
   ```

1. The `body` object defines an ID used by the API endpoint, the version of JSON to use, and the method you want to call. Set `id` as `0` and `jsonrpc` as `2.0`:

   ```javascript
   // Call the Infura API and check that the address is valid.
   let options = {
     url: 'https://filecoin.infura.io',
     method: 'post',
     headers: {
       'content-type': 'application/json'
     },
     auth: {
       user: '1nO7B...',
       pass: 'bda4a...'
     },
     body: `{"jsonrpc": "2.0", "id": 0}`
   }
   ```

1. Set the `method` to `Filecoin.ChainHead`:

   ```javascript
   // Call the Infura API and check that the address is valid.
   let options = {
     url: 'https://filecoin.infura.io',
     method: 'post',
     headers: {
       'content-type': 'application/json'
     },
     auth: {
       user: '1nO7B...',
       pass: 'bda4a...'
     },
     body: `{"jsonrpc": "2.0", "id": 0, "method": "Filecoin.ChainHead"}`
   }
   ```

   The method `Filecoin.ChainHead` simply returns the current head of the chain. While it's not the final method that we're going to use, it's a good way to test that our script is working.

This code is a bit messy, and we'll clean it up in a moment. All that matters right now is that we can run this script and send the request to the Infura API.

## Test run

We've got some basic functionality in our script, so we should run everything to make sure it's all working!

1. In your project directory call the script using `node`:

```bash
node index.js

> Post successful: response:  {"jsonrpc":"2.0","result":{"Cids":[{"/":"bafy2bzaceamdit67mnlyozufeaptmhmti6dv ...
```

Excellent! Our request was received by the Infura API, and it sent us back the latest chain head information. But we're not interested in the chain head, we want to get information about addresses!

## Validate an address

Instead of asking for the chain head information, lets ask the API if a given string is a valid Filecoin address.

1. Within the `body` section of the `options` object, change the `method` from `Filecoin.ChainHead` to `Filecoin.WalletValidateAddress`:

   ```javascript
   // Call the Infura API and check that the address is valid.
   let options = {
     url: 'https://filecoin.infura.io',
     method: 'post',
     headers: {
       'content-type': 'application/json'
     },
     auth: {
       user: '1nO7B...',
       pass: 'bda4a...'
     },
     body: `{"jsonrpc": "2.0", "id": 0, "method": "Filecoin.WalletValidateAddress"}`
   }
   ```

   If we ran the script now, we'd get an error back from the Infura API. This is because the `WalletValidateAddress` method requires at least one string as a parameter. You can find out more about what methods are available and what their requirements are over on the [Infura Filecoin API documentation](https://infura.io/docs/filecoin)

1. Add an array called `params` into the `body` object:

   ```javascript
   // Call the Infura API and check that the address is valid.
   let options = {
     url: 'https://filecoin.infura.io',
     method: 'post',
     headers: {
       'content-type': 'application/json'
     },
     auth: {
       user: '1nO7B...',
       pass: 'bda4a...'
     },
     body: `{"jsonrpc": "2.0", "id": 0, "method": "Filecoin.WalletValidateAddress", "params": []}`
   }
   ```

1. Inside the `params` array, add an address that you want to check:

   ```javascript
   // Call the Infura API and check that the address is valid.
   let options = {
     url: 'https://filecoin.infura.io',
     method: 'post',
     headers: {
       'content-type': 'application/json'
     },
     auth: {
       user: '1nO7B...',
       pass: 'bda4a...'
     },
     body: `{"jsonrpc": "2.0", "id": 0, "method": "Filecoin.WalletValidateAddress", "params": ["f1ydrwynitbbfs5ckb7c3qna5cu25la2agmapkchi"]}`
   }
   ```

1. Let's run the script again to see what respose we get:

   ```bash
   node index.js

   > Response:  {"jsonrpc":"2.0","result":"f1ydrwynitbbfs5ckb7c3qna5cu25la2agmapkchi","id":0}
   ```

   Great! The fact that we got our address back in the `result` field means that our address is valid. If we had sent over an invalid address, we'd get something like this:

   ```bash
   Response:  {"jsonrpc":"2.0","id":0,"error":{"code":1,"message":"invalid address payload"}}
   ```

## Check balance

Our script checks that a given string is a valid Filecoin address, but doesn't do much else. Let's have the script tell us what the balance of a given Filecoin address is.

1. The only change we have to make is to request the `WalletBalance` method from the Infura API:

   ```javascript
   // Call the Infura API and check that the address is valid.
   let options = {
     url: 'https://filecoin.infura.io',
     method: 'post',
     headers: {
       'content-type': 'application/json'
     },
     auth: {
       user: '1nO7B...',
       pass: 'bda4a...'
     },
     body: `{"jsonrpc": "2.0", "id": 0, "method": "Filecoin.WalletBalance", "params": [""f3uw3an7ofqrfpawustkdkot6zupx6ic7nljwvbmttkpg5i4ahdimjmgerbxy6ommamtapd5hcb2ld4gmwjs7q]}`
   }
   ```

1. The Infura API will let us know the balance:

   ```bash
   node index.js

   > ADDRESS:  {"jsonrpc":"2.0","result":"7182015146934547358774","id":0}
   ```

   The Infura API returns the value of the address in `attoFIL`. If the address you are requesting doesn't have a balance, the response from Infura will be blank:

## Cleaning things up

This script is a bit messy, and isn't exactly production ready. Let's clean things up by adding some error checking, putting API calls into their own functions, and .

## Full script

<!-- TODO: add full script here after we've built everything. -->
