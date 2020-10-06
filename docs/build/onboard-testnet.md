---
title: 'Onboard to testnet'
description: "This guide shows you how start storing your application's data on the Filecoin testnet."
breadcrumb: 'Onboard to testnet'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

For small-scale testing of your application, you can use smaller-scale Filecoin networks, such as a [local network](local-devnet.md) or the [Filecoin Nerpa network](https://networks.filecoin.io/#nerpa). We currently recommend _all developers_ use the Filecoin testnet in order to receive direct support from the Protocol Labs team and to be eligible for upcoming data storage rewards.

The Filecoin testnet is a network with parameters and activity levels as close as possible to the expected early state of the Filecoin main network (mainnet). The testnet is currently being used for the Filecoin testnet incentives, or [Space Race](../mine/spacerace.md), competition. As a developer on the Filecoin testnet, there are some important things you should know about development on the testnet.

::: tip
**We recommend that most developers use a hosted service** like [hosted Powergates or Textile Buckets](filecoin-pinning-services.md) to store application data to the Filecoin testnet. These services are by far the fastest and friendliest way to get your application working with Filecoin. If you are using either a hosted [Powergate](powergate.md) or Textile Buckets, you don’t need to worry about any of the information in this guide. Textile’s services are soon to be deployed against the Filecoin testnet. If you are using hosted Textile products, your application will also be deployed on the Filecoin testnet.

If you would like accelerated access to a hosted Powergate instance, please fill out [this form](https://blog.textile.io/hosted-powergate//f5Vd5kTNYTKrmj1D8). We will work with the Textile team to get you access to a hosted Powergate asap.
:::

**If you are managing your own Filecoin nodes, whether your own lotus node or Powergate node, please read on for these important details.**

## Join the testnet

The high-level steps required to join the testnet are:

### (1) Install lotus or Powergate

For Lotus follow [these instructions](../get-started/lotus/installation.md) closely.

For Powergate check the [Textile documentation](https://docs.textile.io/powergate/).

While the current installation instructions say to use a machine with 8GB memory and 4 cores, we find that installation on a machine with 32GB memory and 8 cores leads to much faster and more successful chain sync (step 4). Therefore, we recommend the following starter configuration:

- Type: Standard
- CPU Type: Shared CPU
- vCPUs: **8 vCPUs** (very important)
- Memory: **32 GB** (very important)
- SSD: 160 GB

Our teammates have also had success running `m5ad.2xlarge` instances on AWS. In order to significantly boost the initial chain sync speed, make sure to keep `~/.lotus` on a fast drive (ideally a SSD -- nvme is best!) and consider temporarily applying the patch listed in [this issue comment](https://github.com/filecoin-project/lotus/issues/3263#issue-684587473).

:::tip
Make sure you start your Lotus daemon using the latest Filecoin chain state export as explain in the [chain sync section](../get-started/lotus/installation.md#chain-sync)
:::

### (2) Use the chain snapshot and wait for the chain to be fully synced

Make sure you start your Lotus daemon using the latest Filecoin chain state export as explain in the [chain sync section](../get-started/lotus/installation.md#chain-sync).

Wait until the syncing process completes.

### (3) Create your first wallet address

Generate a new wallet address as [explained here](../get-started/lotus/send-and-receive-fil.md). Remember it for future steps.

### (4) Request funds from the testnet faucet

You need some FIL tokens in your testnet wallet in order to make storage deals on the network. You can request some test tokens in your testnet wallet by going to the testnet faucet, connecting your GitHub account, and then making the funds request.

Request funds here: [Faucet](https://spacerace.faucet.glif.io/)

### (5) Check your wallet balance

```sh
lotus wallet balance
```

You will not see any funds in your testnet wallet until your node is fully synced, which may take several days depending on how you started chain sync. If you are syncing from a snapshot, it should take less than 1 day for the balance to show up. Once you have more than 0 FIL in your testnet wallet, you can proceed to the next step.

### (6) Make deals with Filecoin miners

You can now start [making deals to store your data](../store/lotus/store-data.md). To do this you will need to find a miner willing to store your data. One Filecoin community member maintains a list of miners on the testnet who are currently accepting storage deals:

- [List of miners](https://github.com/jimpick/workshop-client-testnet/blob/spacerace/src/annotations-spacerace.js)
- In this list, `active` means a deal got to the `active` state, i.e. it was successfully sealed into a sector that appeared on chain.
- In this list, `sealing` means a deal got to the `sealing` state, i.e. the deal got through the initial funds and data transfer stages and was accepted by a miner to be sealed into a sector. If all goes well, `sealing` stage deals get to `active` state. However, currently, it is not the case that all deals that have successfully made it to the `sealing` stage also make it to the `active` stage. We estimate that currently only about 20-30% of `sealing` deals eventually become `active`.
- This list is frequently updated, so keep an eye out for new miners who appear on the list.

## Support and troubleshooting

If you run into any issues with any of these steps, please join the [Filecoin Slack](http://filecoin.io/slack) and leave a message in the [#fil-storage-dev channel](https://app.slack.com/client/TEHTVS1L6/CRK2LKYHW). Our team will respond asap in the channel.

In general, the best way to get support from the Filecoin team is:

- Join [Filecoin Slack](http://filecoin.io/slack) and post a message in the [#fil-storage-dev channel](https://app.slack.com/client/TEHTVS1L6/CRK2LKYHW).
- _If you haven’t received a message within 24 hours_, please tag `@pooja` directly in your message thread.
- If the issue persists or cannot be solved by the support team, please [create an issue in the lotus repo](https://github.com/filecoin-project/lotus/issues/new). Include reproducible steps and any log outputs in the issue itself so we can help debug.

Happy building!
