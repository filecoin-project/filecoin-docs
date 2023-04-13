---
title: "Becoming a storage provider"
description: "This page will help you understand how to design a suitable storage provider architecture, make the right hardware investments, and run a profitable business."
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-basics"
    identifier: "overview-01107340c9c1e03db862dd1475ccd953"
weight: 110
toc: true
aliases:
    - "/storage-provider/overview/"
    - "/mine/"
    - "/mine/spacerace/"
    - "/mine/connectivity"
    - "/storage-provider/"
---
The Filecoin network provides decentralized data storage and makes sure data is verified, always available, and immutable. Storage providers in the Filecoin network are in charge of storing, providing content and issuing new blocks.

To become a storage provider in the Filecoin network you need a range of technical, financial and business skills. We will explain all the key concepts you need to understand in order to design a suitable architecture, make the right hardware investments, and run a profitable storage provider business.

Follow these steps to begin your storage provider journey:

1. Understand Filecoin economics
2. Plan your business
3. Make sure you have the right skills
4. Build the right infrastructure

The documentation you will be reading assumes you are familiar with the documentation in the [Get started]({{< relref "/smart-contracts/fundamentals/the-filecoin-virtual-machine" >}}) section, have a general grasp of how Filecoin works and are familiar with Filecoin node software and tooling.

## Understand Filecoin economics

To understand how you can run a profitable business as a Filecoin storage provider, it is important to make sure you understand the economics of Filecoin. Once you understand all the the core concepts, you can build out a strategy for your desired ROI.

Storage providers can also add additional value to clients when they offer certain certifications. These can enable a storage provider to charge customers additional fees for storing data in compliance with those standards, for example, HIPAA, SOC2, PCI, GDPR and others.

{{<button url="https://docs.filecoin.io/storage-provider/filecoin-economics/storage-proving/">}}Filecoin economics → {{</button>}}


## Plan your business

The hardware and other requirements for running a Filecoin storage provider business are significantly higher than regular blockchain mining operations. The mechanisms are designed this way because, in contrast to some other blockchain solutions, where you can simply configure one or more nodes to “mine” tokens, the Filecoin network’s primary goal is to provide decentralized storage for humanity’s most valuable data.

You need to understand the various earning mechanisms in the Filecoin network.

{{<button url="https://docs.filecoin.io/storage-provider/filecoin-deals/storage-deals/">}}Filecoin deals → {{</button>}}

## Make sure you have the right skills

As will become clear, running a storage operation is a serious business, with client data and pledged funds at stake. You will be required to run a highly-available service, and there are automatic financial penalties if you cannot demonstrate data availability to the network. There are many things that can go wrong in a datacenter, on your network, on your OS, or at an application level.

You will need skilled people to operate your storage provider business. Depending on the size and complexity of your setup this can be 1 person with skills across many different domains, or multiple dedicated people or teams.

{{<button url="https://docs.filecoin.io/storage-provider/skills/linux/">}}People and skills → {{</button>}}

## Build the right infrastructure

At the lowest level, you will need datacenter infrastructure. You need people capable of architecting, racking, wiring and operating infrastructure components. Alternatively, you can get it collocated, or even entirely as a service from a datacenter provider.

Take availability and suitable redundancy into consideration when choosing your datacenter or collocation provider. Any unavailability of your servers, network or storage can result in automatic financial penalties on the Filecoin network.

{{<button url="https://docs.filecoin.io/storage-provider/architecture/lotus-components/">}}Software architecture → {{</button>}} {{<button url="https://docs.filecoin.io/storage-provider/skills/storage/">}}Infrastructure →{{</button>}}



{{< sp-calls-to-action >}}
