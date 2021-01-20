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

Make sure you have both [Node.js]() and [NPM]() installed.

## Infura API

To interact with the Infura API you need to register on the Infura website:

1.

## The script in fulll

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
