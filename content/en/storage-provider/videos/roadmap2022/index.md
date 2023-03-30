---
title: "2022 Roadmap"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-videos"
    identifier: "roadmap2022-e03836c23399aa757601167fad5c9b0f"
weight: 100
toc: true
---

Molly Mackinlay, Head of Engineering, Product, & Research Development at Protocol Labs provides a summary overview of the 2022 Filecoin roadmap at the Filecoin meetup in Paris.

{{< youtube "PXkUVp16xZ4" >}}

The first and foremost component is the capacity and data onboarding category. This is all about making sure that storage providers can get help as they come up to speed and making sure that clients can get data onto the network. There has been a ton of work completed on this over the past year.

The next major component is the data retrievability category. This is all about making sure that the retrievability of data is fast, efficient, and that connections to IPFS nodes, IPFS gateways and Dapps are in place. 

![3 Main Components](1.png)

The last but not least component is the programmability and computation category. This is will allow solidity smart contracts to interact with built-in storage actors on the Filecoin network. FVM (Filecoin Virtual Machine) will bring all of this and more as storage and compute will both be directly on the network. 

### Core Improvements Roadmap

![Roadmap 2022](2.png)

As you can see, there is a lot of things on the roadmap. The bottom portion (blue) is all data onboarding and capacity. The is a lot of work at the core protocol layer with things like SnapDeals, which will allow you to “snap up” existing sealed sectors and pack deals into them. Another major enhancement is Boost, which will replace the markets node soon. ESPA (Enterprise Storage Provider Accelerator) which provides training to new storage providers and teaches people how to be a good enterprise grade storage provider. 

Data Retrievability is highlighted in green. We are going to see a new network indexer that will help IPFS and data retrievals become faster and more reliable. 

The top group in purple is all about computational and programmability work. We are very excited about the next phase of FVM, which brings smart contracts and a lot of new possibilities. This is about not only state level interactions, but also data level computations. Data types like neutrino data from NASA can now have computations run against it directly. 

### 3 Short Term Milestones

![Milestone](3.png)

Highlighted above in yellow boxes, you will see the three milestones we can dive into today. The first one is the FVM M1 milestone, which was launched on July 6th 2022. The Filecoin mainnet is now running on the Filecoin Virtual Machine but user programmed smart contracts have not been turned on yet. [fvm.filecoin.io](http://fvm.filecoin.io) lays out a full roadmap for FVM. 

![FVM](4.png)

The next milestone is Filecoin Saturn. This is version 0 for the Filecoin retrieval market. Saturn now has about 34 nodes and services 10 million retrievals a day. Saturn is a great way to contribute to the retrieval market if you do not want to be a full blown storage provider. 

![Saturn](5.png)

There is another awesome milestone in the Moon Landing project. This is really focused to storage providers who want to get better at client data onboarding at scale. When you are talking about uploading petabytes of client data in a responsible and reliable way, you need as much help as possible. The Moon Landing accelerator will help you perform better onboarding processes. 

![Moon Landing](6.png)

### 3 Upcoming Breakthroughs

![Roadmap](7.png)

Highlighted above in yellow boxes, you will see the three milestones coming in the near future.

We are really building FVM with compute over data in mind. Recently, a working group got together and discussed their approaches to the compute over data problem. Two groups that were involved with the working group can be seen below. 

![Compute over Data](8.png)

The threshold encryption network is another really exciting project, going by the codenamed Medusa. This is taking the knowledge from DRAM and applying it to problems like distributed access control or anything where private content needs to be unlocked overtime. 

![Scalable](9.png)

There is a ton of amazing work going on with the Filecoin blockchain. With all these new enhancements joining the network, blockchain capacity and block times can become strained. The hierarchical consensus protocol is coming forward to combat this. This is almost like our version of ZK rollups. You will be able to have sub chains within Filecoin so you can have things like computations happening within a datacenter that only occasionally checks state with their parent. This project is ahead of schedule so we may some something like a testnet in Q4.
