---
title: Wallets, signing tools and API clients
description: Additional building blocks for Filecoin applications
---

# Wallets, signing tools and API clients

## Wallet integrations

To simplify or automate how users make payments, you can integrate one or more of these wallets directly into your application or service:

- [Ledger integration library](https://github.com/Zondax/ledger-filecoin/) - for developers of wallets or applications wishing to integrate with the Ledger hardware device
- [Glif web wallet](https://github.com/openworklabs/filecoin-web-wallet) (in progress) - web wallet built with Next.js that supports sending & receiving FIL from a Ledger device
- Mobile and other wallet integrations (to come)


## Signing libraries

Signing libraries can be used to sign transactions without requiring a dedicated node. This allows you to create signed transactions in an application that is running offline, on a mobile device, or anywhere. The signed transaction can then be submitted to any Filecoin API endpoint.

- [Filecoin Signing Tools](https://github.com/zondax/filecoin-rs) - a Rust/WASM/JSONRPC service for sending signed messages to the network

## API clients

API clients take care of the low-level details of making requests and handling responses and let you focus on writing code specific to your project. They can also translate between different programming languages. These Filecoin API clients are currently available:

- [js-filecoin-api-client](https://github.com/filecoin-shipyard/js-filecoin-api-client) (Javascript, compatible with go-filecoin)
- [js-lotus-client](https://github.com/filecoin-shipyard/js-lotus-client) (Javascript, RPC, compatible with lotus)
- [starling-api](https://github.com/smalldata-industries/starling-api) (Javascript, REST, compatible with go-filecoin)
