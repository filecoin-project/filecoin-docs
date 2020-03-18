---
title: Wallets, Signing Tools, and API Clients
description: Additional building blocks for Filecoin applications
---

# Wallets, Signing Tools, and API Clients

## Wallet Integrations

To simplify or automate how users make payments, you can integrate one or more of these wallets directly into your application or service:

[TODO: Add wallet options and descriptions when ready]


## Signing Libaries

Signing libraries can be used to sign transactions without requiring a dedicated node. This allows you to create signed transactions in an application that is running offline, on a mobile device, or anywhere. The signed transaction can then be submitted to any Filecoin API endpoint.

See [TODO add link when ready] for a list of available signing libraries.


## API Clients

API clients take care of the low-level details of making requests and handling responses and let you focus on writing code specific to your project. They can also translate between different programming languages. Filecoin API clients are currently available:

- [js-filecoin-api-client](https://github.com/filecoin-shipyard/js-filecoin-api-client) (Javascript, compatible with go-filecoin)
- [js-lotus-client](https://github.com/filecoin-shipyard/js-lotus-client) (Javascript, compatible with lotus)
