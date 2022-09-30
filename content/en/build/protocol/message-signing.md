---
title: "Message signing"
description: "Tools for signing messages before submitting them to the Filecoin blockchain."
menu:
    build:
        parent: "protocol-layer"
weight: 30
---

Signing a message is a way to verify that you control a certain wallet address. For a transaction or a message to get on-chain, it must be signed with a private key (usually from a wallet) and submitted along with its signature. 

Here are several tools for signing messages on Filecoin:

#### Filecoin signing tools

The [Filecoin signing tools project](https://zondax.ch/blog/filecoin-signing-library-milestone-3-delivered) provides Rust Native and WASM signing libraries, as well as a JSON RPC server implementation to expose their functionality remotely. Examples are available in a few environments including Browser, Node.js, Swift and React Native.

#### Filecoin.js

[Filecoin.js](https://filecoin-shipyard.github.io/filecoin.js/) aims to be a complete library for interacting with local or remote Filecoin nodes. It can be used to [sign](https://filecoin-shipyard.github.io/filecoin.js/docs/sign-message) and verify messages and supports multiple wallet providers.

#### Filecoin-js-signer

[Filecoin-js-signer](https://github.com/blitslabs/filecoin-js-signer) is a signing library and RPC client in pure Typescript / Javascript with the necessary methods to create, sign and broadcast messages to send FIL, and interact with Filecoin’s built-in actors (like Payment Channel and Multisig). See the [API reference](https://blitslabs.gitbook.io/filecoin-loans/tools/filecoin-js-signer/api-reference) and [examples](https://github.com/blitslabs/filecoin-js-signer#filecoin-signer) to get started.
