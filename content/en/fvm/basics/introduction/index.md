---
title: "Introduction"
description: "What is the FVM? What problems does it solve? How is it related to the EVM? This page will answer all these questions, and give you a solid introduction to the Filecoin virtual machine."
lead: "The Filecoin Virtual Machine (FVM) is a platform that lets developers deploy custom code to the Filecoin network and have the nodes on the network run that code. The FVM allows developers to link decentralized applications to verified storage -- a feature that needs to be added to the web3 ecosystem."
weight: 10
menu:
    fvm:
        parent: "fvm-basics"
aliases:
    - "/fvm"
---

{{< alert >}}
**THIS SECTION IS UNDER DEVELOPMENT**

The FVM project is still in beta, as is this documentation. We're working on improving everything. In the meantime, you can dive into the docs, but keep in mind that things will likely change pretty often.
{{< /alert >}}

## What is it for

Until now, web3 developers have struggled to make decentralized applications that rely on large-scale storage. Storing data directly on a blockchain is expensive because every node in the blockchain would need to keep a copy of that data. Developers have mostly stayed away from storing a large amount of data or have relied on centralized storage services.

The FVM enables developers to programmatically store data on the Filecoin network and be able to verify that the data is correctly stored and available! This feature mitigates the need for devs to rely on centralized storage services since they can now point that data toward the Filecoin network and have it replicated over several distributed nodes.

In summary, the FVM gives decentralized applications access to large storage availability _without_ sacrificing the benefits of decentralization. This enables a [number of use-cases](#use-cases) that weren't possible before.

## Why is it being built now

The reason the FVM is releasing now, and not when the Filecoin network first launched, is simple: the network needed to be secure and stable before developers could start building on top of it. The initial goal of the Filecoin network is to store data in a distributed way. That secondary goal is to allow development on top of the network. While it was possible to create applications on top of the Filecoin network _before_ the FVM, it was complex and not particularly robust. The FVM simplifies the creation and deployment of these applications.

## Who is this for

The features of the FVM will benefit everyone. However, this documentation is specifically for FVM developers.

## How does it work

Lorem ipsum.

## What are the use-cases

Developers will be able to analyze, process, and manage data stored on the Filecoin network without having to download that data first! Everything can be dealt with on the blockchain! This feature opens up a huge array of opportunities for the network:

- Users can perpetually store data by crowdsourcing the funds for storage contracts.
- Developers can create Data DAOs to incentivize the storage and retrieval of specific data sets.
- Researchers can manage extra-large data sets without the hardware costs web2 processes require.
- Storage contracts can be replicated and renewed automatically.
- Other blockchains can directly access data stored on the Filecoin network.
