---
title: "Introduction"
description: "Storage providers in the Filecoin network are in charge of storing data, providing capacity and issuing new blocks."
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "overview-01107340c9c1e03db862dd1475ccd953"
weight: 10
toc: true
aliases:
  - "/storage-provider/overview/"
  - "/mine/"
  - "/mine/spacerace/"
  - "/mine/connectivity"
---

## Becoming a Storage Provider

To become a Storage Provider in the Filecoin network you need a range of technical, financial and business skills. The Filecoin network provides decentralized data storage and makes sure data is verified, always available, and immutable. These mechanisms are the primary reason why the hardware and other requirements for running a Storage Provider business are significantly higher than regular blockchain mining operations. The mechanisms are designed this way because, in contrast to some other blockchain solutions, where you can simply configure one or more nodes to “mine” tokens, the Filecoin network’s primary goal is to provide decentralized storage for humanity’s most valuable data.

To understand how you can run a profitable business as a Filecoin Storage Provider, it is important to make sure you understand the economics of Filecoin. Once you understand all the the core concepts, you can build out a strategy for your desired ROI. We will explain all the key concepts you need to understand in order to design a suitable architecture, make the right hardware investments, and run a profitable Storage Provider business.

Storage Providers can also add additional value to clients when they offer certain certifications. These can enable a Storage Provider to charge customers additional fees for storing data in compliance with those standards, for example, HIPAA, SOC2, PCI, GDPR <!--TODO hyperlink these to definitions -->and others.

## People & Talent

As will become clear, running a storage operation is a serious business, with client data and pledged funds at stake. You will be required to run a highly-available service, and there are automatic financial penalties if you cannot demonstate data availability to the network. There are many things that can go wrong in a datacenter, on your network, on your OS, or at an application level.

You will need skilled people to operate your Storage Provider business. Depending on the size and complexity of your setup this can be 1 person with skills across many different domains, or multiple dedicated people or teams.

## Infrastructure & Architecture

At the lowest level, you will need datacenter infrastructure. You need people capable of architecting, racking, wiring and operating infrastructure components. Alternatively, you can get it colocated, or even entirely as a service from a datacenter provider.

Take availability and suitable redudancy into consideration when choosing your datacenter or colocation provider. Any unavailability of your servers, network or storage can result in automatic financial penalties on the Filecoin network. <!-- TODO STEF do we have guidance on what HA % people should aim for - feels like more detail would be helpful here -->
