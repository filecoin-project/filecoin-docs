---
title: "Signing libraries"
description: "Signing libraries can be used to sign transactions without requiring a dedicated node."
menu:
    build:
        parent: "build-tools"
---

They facilitate that applications that are running offline, on a mobile device, or anywhere to create transactions which can then be later submitted to any Filecoin API endpoint (perhaps by a 3rd party).

{{< alert icon="callout" >}}
**This documentation page is a stub!** If you have more information or knowledge about signing libraries, please contribute it!
{{< /alert >}}

## Filecoin signing tools

The [Filecoin signing tools project](https://www.zondax.ch/news/filecoin-signing-library-milestone-3-delivered) provides Rust Native and WASM signing-libraries, as well as a JSON RPC server implementation to expose their functionality remotely and some examples on how to use all of it from many languages.

The [source code repository can be found here](https://github.com/Zondax/filecoin-signing-tools).

## Filecoin.js

[Filecoin.js](https://filecoin-shipyard.github.io/filecoin.js/) aims to be a complete library for interacting with local or remote Filecoin nodes. It can be used to [sign](https://filecoin-shipyard.github.io/filecoin.js/docs/sign-message) and verify messages and supports multiple wallet providers.

## Filecoin-js-signer

[Filecoin-js-singer](https://github.com/blitslabs/filecoin-js-signer) is signing library and RPC client in pure Typescript / Javascript with the necessary methods to create, sign and broadcast messages to send FIL, and interact with Filecoin's built-in actors (like Payment Channel and Multisig).

For more information about how to use it, please learn from the following resource.

+ [API reference](https://blitslabs.gitbook.io/filecoin-loans/tools/filecoin-js-signer/api-reference)
+ [Examples for its features](https://github.com/blitslabs/filecoin-js-signer#filecoin-signer)
