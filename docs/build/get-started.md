---
title: Get started
description: Want to jump into Filecoin and start building something? This section gets you up and running quickly by creating a simple application using Infura and the Filecoin network.
breadcrumb: 'Get started'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }} The Infura API makes it easier to interact with the Filecoin Network by abstracting away some of the complex workflows and requirements. There's no need to spin up a node or directly call a Lotus daemon with this tutorial.

In this tutorial you will:

1. Sign up to the Infura API.
1. Create a Node.js script that:
   a. Checks if a given string is a valid Filecoin address.
   b. Returns the balance of that address, if it is valid.
1. Discover more ways to interact with the Filecoin network using the Infura API.

## Before we begin

Make sure you have both [Node.js](https://nodejs.org/) and [NPM](https://www.npmjs.com/) installed.

## Infura API

To interact with the Infura API you need to register on the Infura website:

1. Go to [infura.io/register](https://infura.io/register) and sign up to Infura.
1. Select **Filecoin** from the sidebar and click **CREATE NEW PROJECT**.
1. Enter _Filcoin - Get started_ as the project name and click **CREATE**.
1. You should now be able to see your `Project ID` and `Project Secret`. Take a note of these two fields; we'll use them later.

   ![Project ID and Project secret within Infura.](./images/get-started/infura-keys.png)

That's everything set up on the Infura side. Next, let's create our project.

## Create your project

1. To kick things off, create a new project directory and move into it:

   ```bash
   mkdir ~/Code/filecoin-wallet-checker -p
   cd ~/Code/filecoin-wallet-checker
   ```

1. Create a file called `index.js` and add this starting code:

   ```javascript
   let request = require('request')

   // 1. Calls the Infura API and checks that the address is valid.

   // 2. Get and check that project_id and project_secret are defined.

   // 3. Get and check Filecoin address from user.

   // Default callback function for request()
   function callback(error, response, body) {
     if (!error && response.statusCode == 200) {
       console.log(body[0])
     } else {
       console.error('There was an error: ', body)
       process.exit()
     }
   }
   ```

   We're going to adding our code under the comments numbered `1`, `2`, and `3`.

1. Add the `request` package to this project:

   ```bash
   npm install request
   ```

Now that we've got a project set up, and our Infura information, we can start to build things!

## Call the Infura API

1. To call the Infura API, we'll use the `request` package that we added to our project:

   ```javascript
   // 1. Calls the Infura API and checks that the address is valid.
   request(options, callback)
   ```

   The `request` function takes two arguments, `options` and `callback`. We've already defined `callback` in our project, so we can move onto creating the `options` object.

1. Create a new variable called options:

   ```javascript
   // 1. Calls the Infura API and checks that the address is valid.
   let options = {}
   ```

1. We need to supply five values to this `options` object. The first three are pretty standard for API POST requests:

   | Key     | Description                                           | Value                             |
   | ------- | ----------------------------------------------------- | --------------------------------- |
   | URL     | The endpoint that we want to target with our request. | `https://filecoin.infura.io`      |
   | method  | The type of request that we're going to send.         | `POST`                            |
   | headers | Any headers attached to this request.                 | `'Content-Type: application/json` |

   ```javascript
   // 1. Calls the Infura API and checks that the address is valid.
   let options = {
     url: 'https://filecoin.infura.io',
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     }
   }
   ```

   The two object values we're more interested in are `body` and `auth`:

1. The `body` object defines an ID used by the API endpoint, the version of JSON to use, and the method you want to call. Set `id` as `0` and `jsonrpc` as `2.0`:

   ```javascript
   // 1. Calls the Infura API and checks that the address is valid.
   let options = {
       url: 'https://filecoin.infura.io',
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body {
           "id": 0,
           "jsonrpc": "2.0",
       }
   }
   ```

1. The `body` object also defines the method we want to call:

   ```javascript
   // 1. Calls the Infura API and checks that the address is valid.
   let options = {
       url: 'https://filecoin.infura.io',
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body {
           "id": 0,
           "jsonrpc": "2.0",
           "method": "Filecoin.WalletValidateAddress"
       }
   }
   ```

   Infura have listed all the [available methods in their documentation](https://infura.io/docs/filecoin). The method we're using is `WalletValidateAddress` which, as the name suggests, checks if a given address is valid.

1. The [`WalletValidateAddress` method](https://infura.io/docs/filecoin#operation/WalletValidateAddress)] requires at least one address to validate. Let's add an address to check into the `params` value within the `body` object:

   ```javascript
   // 1. Calls the Infura API and checks that the address is valid.
   let options = {
       url: 'https://filecoin.infura.io',
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body {
           "id": 0,
           "jsonrpc": "2.0",
           "method": "Filecoin.WalletValidateAddress",
           "params": "bafy2bzaceci2dbesg7byetl4ro7fz727gf47h4kixtkrygnvuwa3yqhpc7jxk"
       }
   }
   ```

1. Infura has some authentication steps we need to follow in order to access the API. Luckily, it's pretty simple. All we have to do is create an `auth` object containing our project ID and secret in the `user` and `pass` fields respectivly:

   ```javascript
   // 1. Calls the Infura API and checks that the address is valid.
   let options = {
       url: 'https://filecoin.infura.io',
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body {
           "id": 0,
           "jsonrpc": "2.0",
           "method": "Filecoin.WalletValidateAddress",
           "params": "bafy2bzaceci2dbesg7byetl4ro7fz727gf47h4kixtkrygnvuwa3yqhpc7jxk"
       },
       auth: {
           'user': "1nLHYlp8sCepTChk15cgwQDyyLD",
           'pass': "8a750751e51111387522969ac8442a44"
   }
   ```

1. The last step is to call the `request` function we imported with NPM:

   ```javascript
   // 1. Calls the Infura API and checks that the address is valid.
   let options = {
       url: 'https://filecoin.infura.io',
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body {
           "id": 0,
           "jsonrpc": "2.0",
           "method": "Filecoin.WalletValidateAddress",
           "params": "bafy2bzaceci2dbesg7byetl4ro7fz727gf47h4kixtkrygnvuwa3yqhpc7jxk"
       },
       auth: {
           'user': "1nLHYlp8sCepTChk15cgwQDyyLD",
           'pass': "8a750751e51111387522969ac8442a44"
   }
   request(options, callback);
   ```

   This is all a bit messy, and we'll clean it up in a moment. All that matters right now is that we can run this script and send the request to the Infura API

## Test run

We've got some basic functionality in our script. We should run everything to make sure it's all working!

1. In your project directory call the script using `node`:

   ```bash
   node index.js

   >
   ```

## Check balance

Right now, our script checks that a given string is a valid Filecoin address, but doesn't do much else. Let's have the script tell us what the balance of a given Filecoin address is.

<!-- Add steps for checking the balance of a Filecoin address. -->

## Full script

Here's our script, in full:

```javascript
let request = require('request')

// Get and check that project_id and project_secret are defined.
const project_id = '1lhQxl9eD7XZMkjy7aB6pkSzWsj'
const project_secret = '2e57c70d6fef946d42493e7317a8208a'
if (
  typeof project_id == 'undefined' ||
  typeof project_secret == 'undefined' ||
  project_id == null ||
  project_secret == null
) {
  console.error(
    'You must add your project_id and project_secret to this script.'
  )
  process.exit()
}

// Get and check Filecoin address from user.
if (typeof process.argv[2] == 'undefined' || process.argv[2] == null) {
  console.error(
    'You must supply a wallet address to check as an argument when calling node index.js.'
  )
  process.exit()
} else {
  var input_address = process.argv[2]
}

// Calls the Infura API and checks that the address is valid.
let data_string = `{ "id": 0, "jsonrpc": "2.0", "method": "Filecoin.WalletValidateAddress", "params": ["${input_address}"] }`
let options = {
  url: 'https://filecoin.infura.io',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: data_string,
  auth: {
    user: project_id,
    pass: project_secret
  }
}
request(options, callback)

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body[0])
  } else {
    console.error('There was an error: ', body)
    process.exit()
  }
}
```
