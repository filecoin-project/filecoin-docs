---
description: >-
  1-click deployment automation for the storage provider stack allows new
  storage providers to quickly learn and deploy Lotus and Boost.
---

# Storage provider automation

{% hint style="info" %}
[Find the automation code here!](https://github.com/filecoin-project/sp-automation)
{% endhint %}

## Why this automation?

It can be rather overwhelming for new storage providers to learn everything about Filecoin and the various software components. In order to help with the learning process, we provide a fully automated installation of the Lotus and Boost stack. This automation should allow anyone to go on mainnet or the Calibration testnet in no time.

## What are we automating?

This automation is still evolving and will receive more features and capabilities over time. In its current state, it lets you:

* Install and configure Lotus Daemon to interact with the blockchain.
* Initialize and configure Lotus Miner to join the network as a storage provider.
* Install and configure Boost to accept storage deals from clients.
* Install and configure Booster-HTTP to provide HTTP-based retrievals to clients.

## Sealing configuration

The initial use case of this automation is to use sealing-as-a-service instead of doing your own sealing. As such, there is no Lotus Worker configured for the setup. It is possible to extend the setup with a remote worker. However, this Lotus Worker will require dedicated and custom hardware.

## Composable deployment

One of the next features coming to this automation is a composable deployment method. Today Lotus Daemon, Lotus Miner, and Boost are all installed on a single machine. Many production setups, however, will split out those services into their own dedicated hardware. A composable deployment will allow you to deploy singular components on separate servers.

## Prerequisites

Read the `README` carefully on the [GitHub repo](https://github.com/filecoin-project/sp-automation) to make sure you have all the required prerequisites in place.



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/storage-providers/architecture/lotus-automation)
