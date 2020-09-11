---
title: Build
description: Documentation to start building applications on Filecoin.
---

# Build

Filecoin is for the builders. If you are excited about the potential of leveraging the Filecoin protocol and decentralized storage network to build game-changing applications, you've come to the right place.

This section groups documentation to help developers integrate with applications that interact with the Filecoin network and with Filecoin implementations. Among other things, in it you will learn:

- How to setup Lotus [Lotus](lotus/README.md) APIs, generate tokens and perform requests.
- Learn about [Powergate](powergate.md) and other projects providing APIs that simplify interacting with Filecoin.
- How to run a [Filecoin local devnet](local-devnet.md) on your own computer using Docker.
- Learn from [example applications](examples/README.md) that teach how you step by step how to build a Filecoin powered application.

::: tip
For most developers, the easiest path is to rely on a [Filecoin-backed pinning services (FPS)](../store/filecoin-pinning-services.md), as they do not require running any infrastructure.

Additionally, Protocol Labs offers [hosted Lotus nodes](lotus/hosted-nodes.md).
:::

## Quickstart to testnet

1. Install [Lotus](../store/lotus/installation.md) or [Powergate](powergate.md).
2. Wait for the [chain to finish syncing](../store/lotus/installation.md#chain-sync) (use a snapshot for faster sync).
3. [Create an wallet](../store/lotus/send-and-receive-fil.md).
4. Request funds from the [faucet](https://spacerace.faucet.glif.io/).
5. Check your wallet balance until the funds show.
6. [Make deals with miners](../store/lotus/store-data) (see the note about Protocol Labs miners and how to sign up).

::: tip
If you need help:

- Join [Filecoin Slack](http://filecoin.io/slack) and post a message in the [#fil-storage-dev channel](https://app.slack.com/client/TEHTVS1L6/CRK2LKYHW).
- If you haven’t received a message within 24 hours\_, please tag `@pooja` directly in your message thread.
- If the issue persists or cannot be solved by the support team, please [create an issue in the lotus repo](https://github.com/filecoin-project/lotus/issues/new). Include reproducible steps and any log outputs in the issue itself so we can help debug.
  :::
