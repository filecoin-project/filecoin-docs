---
title: 'Signing libraries'
description: 'Signing libraries can be used to sign transactions without requiring a dedicated node.'
breadcrumb: 'Signing libraries'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}. They facilitate that applications that are running offline, on a mobile device, or anywhere to create transactions which can then be later submitted to any Filecoin API endpoint (perhaps by a 3rd party).

::: callout
**This documentation page is a stub!** If you have more information or knowledge about signing libraries, please contribute it!
:::

[[TOC]]

## Filecoin signing tools

The [Filecoin signing tools project](https://zondax.ch/projects/filecoin-signing-tools/#features) provides Rust Native and WASM signing-libraries, as well as a JSON RPC server implementation to expose their functionality remotely and some examples on how to use all of it from many languages.

The [source code repository can be found here](https://github.com/Zondax/filecoin-signing-tools).

## Filecoin JS Signer

[Filecoin JS Signer](https://github.com/blitslabs/filecoin-js-signer) is a signing library and RPC client written in pure Typescript / Javascript with the necessary methods to create, sign and broadcast messages to send FIL, and interact with Filecoin's built-in actors (like Payment Channel and Multisig), among other utility functions.

## Filecoin.js

[Filecoin.js](https://filecoin-shipyard.github.io/filecoin.js/) aims to be a complete library for interacting with local or remote Filecoin nodes. It can be used to [sign](https://filecoin-shipyard.github.io/filecoin.js/docs/sign-message) and verify messages and supports multiple wallet providers.

## Blake2b-256 Solidity
Solidity implementation of the BLAKE2b-256 hash function used by Filecoin that can be used to create interoperability with EVM-compatible blockchains and facilitate the creation of Hash Time Locked Contracts.

The [source code repository can be found here](https://github.com/blitslabs/filecoin-blake2b-solidity).
