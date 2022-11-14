---
title: "FAQs"
description: "Got an FVM question that isn't answered by the rest of the docs? Check out this currated list of commonly asked questions from the community."
lead: "Got an FVM question that isn't answered by the rest of the docs? Check out this currated list of commonly asked questions from the community. Still have a question after reading through this list? Create a post on fvm-forum.filecoin.io"
weight: 50
menu:
    fvm:
        parent: "fvm-basics"
---

{{< beta-warning >}}

## What is FVM

The FVM (Filecoin virtual machine) enables developers to write and deploy custom code to run on top of the Filecoin blockchain. This means developers can create apps, markets, and organizations built around data stored on Filecoin.

## What broader implications does FVM have

FVM allows us to think about data stored on Filecoin differently. Apps can now build a new layer on the Filecoin network to enable trading, lending, data derivatives, and decentralized organizations built around datasets.

## What problems does FVM solve

FVM can create incentives to solve problems that Filecoin participants face today around data replication, data aggregation, and liquidity for miners. Beyond these, there is a long tail of data storage and retrieval problems that will also be resolved by user programmability on top of Filecoin.

## How does Aptos compare to FVM

[Aptos](https://aptoslabs.com/) is a Move-based L1 chain, whereas FVM is a WASM runtime on the Filecoin chain. The latter comes with an EVM right of the box; the former does not. The FVM also supports programmable storage with deals on Filecoin.

## How does the FVM directly interact with data on Filecoin

The FVM operates on blockchain state data — it does _not_ operate on data stored in the Filecoin network. This is because access to that data depends on network requests, an unsealed copy's availability, and the SPs' availability to supply that data.

Access and manipulation of data stored in the network will happen via L2 solutions, for example, retrieval networks or compute-over-data networks, e.g., Saturn or CoD.

## How do other EVMs compare to FEVM

Unlike other EVM chains, FEVM specifically allows you to write contracts that orchestrate programmable storage. This means contracts that can coordinate storage providers, data health, perpetual storage mechanisms, and more. Other EVM chains do not have direct access to Filecoin blockchain state data. 
