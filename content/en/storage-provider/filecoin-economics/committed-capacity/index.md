---
title: "Committed capacity"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-filecoin-economics"
    identifier: "committed-capacity-e0bd9f467013f7d8ccdb772c871b083a"
weight: 30
toc: true
---

One way of partcipating in the Filecoin network is by providing [_Committed Capacity_ (CC) sectors](https://docs.filecoin.io/reference/general/glossary/#capacity-commitment) to the network. Those sectors do not contain customer data but are filled with random data when they are created. The goal for the Filecoin network is to have a distributed network of verifiers and collaborators to the network in order to run and maintain a healthy blockchain. Any public blockchain network requires enough participants in the consensus mechanism of the blockchain, in order to guarantee that transactions being logged onto the blockchain are legitimate. Because Filecoin’s consensus mechanism is based on Proof-of-Storage, we need sufficient Storage Providers that pledge capacity to the network, and thus take part in the consensus process. The first method to do so is through Committed Capacity sectors. This can be done in sectors of 32GiB or 64GiB. For more detail, see the [architectural overview]({{<relref "lotus-components" >}}).

## Availability requirements
Because the Filecoin network needs consistency, meaning all data stored is still available and unaltered, a Storage Provider is required to keep their capacity online, and be able to demonstrate to the network that the capacity is online.  WindowPoSt verification is the process that checks that the provided capacity remains online. If not, a Storage Provider will get penalized (or "slashed") over the collateral FIL they provided for that capacity and their storage power gets reduced. <!--TODO STEF how, and by how much?--> This means an immediate reduction in capital (lost FIL), but also a reduction in future earnings because block rewards are correlated to storage power, as explained above. See [Storage Proving]({{<relref "storage-proving" >}}) and [FIL Collateral]({{<relref "fil-collateral" >}}) for more information.

## What's next?
Providing Committed Capacity is the easiest way to get started as a Storage Provider but the economics are very dependent on the price of FIL. When the price of FIL is low <!-- TODO STEF what is low? maybe give a dated example?--> it is not profitable to only provide Committed Capacity. This is where [Filecoin Plus]({{<relref "verified-deals" >}}) comes in along with [extra services you can charge for]({{<relref "auxiliary-services" >}}).
