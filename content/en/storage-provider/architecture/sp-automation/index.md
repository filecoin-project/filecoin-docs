---
title: "SP automation"
description: "1-click deployment automation for the SP stack allows new storage providers to quickly learn and deploy Lotus and Boost."
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-architecture"
    identifier: "lotus-automation-eaf8e84a4d869e8377258acc4e25f684"
weight: 411
toc: true
---

{{< alert >}}
[Find the automation code here!](https://github.com/ng-solutions-architecture/lotus-automation)
{{< /alert >}}

## Why this automation?

It can be rather overwhelming for new storage providers to learn everything about Filecoin and the Lotus software components. In order to help with the learning process, we provide a fully automated installation of the Lotus stack. This automation should allow anyone to go on mainnet or the Calibration testnet in no time.

## What are we automating?

This automation is still evolving and will receive more features and capabilities over time. In its current state, it lets you:

- Install and configure Lotus Daemon to interact with the blockchain.
- Initialize and configure Lotus Miner to join the network as a storage provider.
- Install and configure Boost to accept storage deals from clients.
- Install and configure Booster-HTTP to provide HTTP-based retrievals to clients.

## Sealing configuration

The initial use case of this automation is to use sealing-as-a-service instead of doing your own sealing. As such, there is no Lotus Worker configured for the setup. It is possible to extend the setup with a remote worker. However, this Lotus Worker will require dedicated and custom hardware.

## Composable deployment

One of the next features coming to this automation is a composable deployment method. Today Lotus Daemon, Lotus Miner, and Boost are all installed on a single machine. Many production setups, however, will split out those services into their own dedicated hardware. A composable deployment will allow you to deploy singular components on separate servers.

## Prerequisites

Read the README carefully on the [Github repo](https://github.com/ng-solutions-architecture/lotus-automation) to make sure you have all the required prerequisites in place.

{{< sp-calls-to-action >}}
