---
title: 'Onboarding a testing network
description: "This guide shows you how start storing your application's data on one of the Filecoin test networks."
breadcrumb: 'Onboard to testnet'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

For small-scale testing of your application, you can use smaller-scale Filecoin networks, such as a [local network](local-devnet.md) or the [Filecoin Nerpa network](https://networks.filecoin.io/#nerpa). We currently recommend developers to use the Filecoin _calibration_ network for testing, as it is the most stable of the testing networks.

The Filecoin _calibration network_ has parameters and activity levels _as close as possible_ to the _mainnet_.

::: tip
**We recommend that most developers use a hosted service** like [hosted Powergates or Textile Buckets](README.md#filecoin-backed-storage-providers) to store application data on Filecoin. These services are by far the fastest and friendliest way to get your application working. If you are using either a hosted [Powergate](powergate.md) or Textile Buckets, you can skip some of the sections of this guide.

If you would like accelerated access to a hosted Powergate instance, please fill out [this form](https://blog.textile.io/hosted-powergate). We will work with the Textile team to get you access to a hosted Powergate asap.
:::

**If you are managing your own Filecoin nodes, whether your own lotus node or Powergate node, please read on for these important details.**

## Join a testnet

The high-level steps required to join the testnet are:

### (1) Install lotus or Powergate

For Lotus follow [these instructions](../get-started/lotus/installation.md) closely.

For Powergate check the [Textile documentation](https://docs.textile.io/powergate/).

::: tip
For faster setup, we strongly recommend syncing from a snapshot as explained in the [installation instructions](../get-started/lotus/installation.md#chain-sync).
:::

Our teammates have also had success running `m5ad.2xlarge` instances on AWS. In order to significantly boost the initial chain sync speed, make sure to keep `~/.lotus` on a fast drive (ideally a SSD -- nvme is best!) and consider temporarily applying the patch listed in [this issue comment](https://github.com/filecoin-project/lotus/issues/3263#issue-684587473).

### (2) Create your first wallet address

Generate a new wallet address as [explained here](../get-started/lotus/send-and-receive-fil.md). Remember it for future steps.

### (3) Request funds from the one of the testnet faucets

You need some FIL tokens in your testnet wallet in order to make storage deals on the network. For testing networks, you can request tokens from one of the available faucets.

The links to faucets for each network are available in the [network information page](https//network.filecoin.io).

### (4) Check your wallet balance

```sh
lotus wallet balance
```

You will not see any funds in your testnet wallet until your node is fully synced. If you are syncing from a snapshot, it should only take a few hours for the balance to show up. Once you have more than 0 FIL in your testnet wallet, you can proceed to the next step.

### (5) Make deals with Filecoin miners

You can now start [making deals to store your data](../store/lotus/store-data.md). To do this you will need to find a miner willing to store your data. See the [store data guide](https://docs.filecoin.io/store/lotus/store-data/#making-storage-deals) for information on how to import data, list miners and perform deals.

## Support and troubleshooting

If you run into any issues with any of these steps, please join the [Filecoin Slack](http://filecoin.io/slack) and leave a message in the [#fil-storage-dev channel](https://app.slack.com/client/TEHTVS1L6/CRK2LKYHW). Our team will respond asap in the channel.

In general, the best way to get support from the Filecoin team is:

- Join [Filecoin Slack](http://filecoin.io/slack) and post a message in the [#fil-storage-dev channel](https://app.slack.com/client/TEHTVS1L6/CRK2LKYHW).
- _If you haven’t received a message within 24 hours_, please tag `@pooja` directly in your message thread.
- If the issue persists or cannot be solved by the support team, please [create an issue in the lotus repo](https://github.com/filecoin-project/lotus/issues/new). Include reproducible steps and any log outputs in the issue itself so we can help debug.

Happy building!
