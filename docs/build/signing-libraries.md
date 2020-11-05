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

## Filecoin.js

[Filecoin.js](https://filecoin-shipyard.github.io/filecoin.js/) aims to be a complete library for interacting with local or remote Filecoin nodes. It can be used to [sign](https://filecoin-shipyard.github.io/filecoin.js/docs/sign-message) and verify messages and supports multiple wallet providers.
