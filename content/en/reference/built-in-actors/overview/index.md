---
title: "Overview"
description: "Built-in actors are how the Filecoin network manages and updates global state. This page contains information on how to smart contracts can access built-in actors using the Protocol Labs API or the `filecoin.solidity` library."
lead: "Built-in actors are how the Filecoin network manages and updates global state. This page contains information on how to smart contracts can access built-in actors using the Protocol Labs API or the `filecoin.solidity` library."
draft: false
images: []
type: docs
menu:
  reference:
    parent: "reference-built-in-actors"
    identifier: "overview-d50c5100ced0178d673c1314d43b29c9"
weight: 310
toc: true
---

## Using the Protocol Labs API

Smart contracts can directly access built-in actors and methods using the Protocol Labs API. Links to the reference guides for each of the available actor methods is listed below:

- [Account actor]({{< ref "protocol-api.md#account-actor" >}})
- [Datacap]({{< ref "protocol-api.md#datacap" >}})
- [Miner]({{< ref "protocol-api.md#miner" >}})
- [Multisig]({{< ref "protocol-api.md#multisig" >}})
- [Storage market actor]({{< ref "protocol-api.md#storage-market-actor" >}})
- [Storage power actor]({{< ref "protocol-api.md#storage-power-actor" >}})
- [Verified registry actor]({{< ref "protocol-api.md#verified-registry-actor" >}})

## Using filecoin.solidity

Smart contracts can access built-in actor methods with the `filecoin.solidity` library, a set of Solidity libraries that allow Solidity smart contracts to seamlessly call methods of Filecoin built-in actors. For more information, see the [reference page]({{< ref "filecoin-sol" >}})
