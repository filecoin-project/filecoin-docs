---
title: "Becoming a Storage Provider"
description: ""
lead: "The Filecoin network provides decentralized data storage and ensures data is verified, always available, and immutable. Storage Providers in the Filecoin network are in charge of storing and providing data, and issuing new blocks. Storage providers need a range of technical, financial and business skills. This page explains key concepts necessary to design a suitable architecture, make the right hardware investments, and run a profitable storage provider business."
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-basics"
    identifier: "overview-01107340c9c1e03db862dd1475ccd953"
weight: 10
toc: true
aliases:
    - "/storage-provider/overview/"
    - "/mine/"
    - "/mine/spacerace/"
    - "/mine/connectivity"
    - "/storage-provider/"
---

Follow these steps to begin your storage provider journey:

1. Complete the prerequisites.
1. Understand Filecoin economics.
1. Plan your business.
1. Make sure you have the right skills.
1. Build the right infrastructure.

## Prerequisites

Before embarking on the journey to become a storage provider, you should understand:

- The [basics of Filecoin]({{ < "basics/what-is-filecoin/overview" > }})
- The [Filecoin Virtual Machine]({{< relref "/smart-contracts/fundamentals/the-filecoin-virtual-machine" >}})
- [Filecoin node software]({{ < "nodes/implementations/overview" > }})
- [Tooling]({{ < "reference/general/tools" > }}).

## Understand Filecoin economics

To run a profitable business as a Filecoin Storage Provider, it is important to understand the economics of Filecoin. Once you understand all the core concepts, you can build out a strategy that will help you achieve your desired return-on-investment (ROI). Storage Providers can provide additional value for clients when they offer certain certifications, such as HIPAA, SOC2, PCI, GDPR and others. These can enable a Storage Provider to charge customers additional fees for storing data in compliance with those standards.

**[Filecoin economics →]({{<relref "storage-proving" >}})**

## Plan your business

The requirements necessary for Filecoin Storage Provider business are significantly higher than regular blockchain mining operations. The mechanisms are designed this way because, in contrast to some other blockchains where you can simply configure one or more nodes to “mine” tokens, the Filecoin network’s primary goal is to provide decentralized storage for humanity’s most valuable data. Before providing storage, you need to understand the various earning mechanisms in the Filecoin network.

**[Filecoin deals →]({{<relref "storage-deals" >}})**

## Make sure you have the right skills

As will become clear, running a storage operation is a serious business, with client data and pledged funds at stake. You will be required to run a highly-available service, and there are automatic financial penalties if you cannot demonstrate data availability to the network. There are many things that can go wrong in a datacenter, on your network, on your OS, or at an application level. You will need skilled people to operate your Storage Provider business. Depending on the size and complexity of your setup this can be a single person with skills across many different domains, or multiple dedicated people or teams.

**[People and skills →]({{<relref "linux-skills" >}})**

## Build the right infrastructure

At the lowest level, you will need datacenter infrastructure, in addition to people capable of architecting, racking, wiring and operating infrastructure components. Alternatively, you can use collocate in another datacenter facility, or even entirely as a service from a datacenter provider. Take availability and suitable redundancy into consideration when choosing your datacenter or collocation provider. Any unavailability of your servers, network or storage can result in automatic financial penalties on the Filecoin network.

**[Software architecture →]({{<relref "lotus-components" >}})**

**[Infrastructure →]({{<relref "storage" >}})**
