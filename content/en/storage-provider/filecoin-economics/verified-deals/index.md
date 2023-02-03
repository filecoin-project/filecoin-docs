---
title: "Verified deals"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "verified-deals-4566094f3f1b681b923abad2bdce9aef"
weight: 50
toc: true
---

The goal of Filecoin is to be the decentralized storage network for humanity’s most important information. With that in mind it is vital to onboard real and valuable data onto the network. Filecoin Plus (Fil+) is a program that incentivizes Storage Providers and clients to store that data in what is called “verified deals”. Deals are verified because the data owner (i.e. the client) undergoes a Know-Your-Customer (KYC) process and the data is acknowledged by the program as real data via a network of “notaries”. The notaries are responsible for verifying the request and for checking if the data to be stored is real data.

Notaries are responsible for allocating so-called “DataCap” to clients with valuable storage use cases. DataCap is a non-exchangeable asset that is allocated by notaries to data clients. DataCap gets assigned to a wallet but cannot be sold or exchanged. The client can only spend the DataCap to pay the Storage Provider to store the data as a “verified deal”.

Storage Providers are incentivized by the Filecoin network to store verified deals. A 10x multiplier is used on “verified deals”. A 100TiB dataset will account for 1PiB of “Quality-Adjusted-Power” (or “QAP” in short). This means the Storage Provider earns more storage power on the Filecoin network and will get more chances to get elected for WinningPoSt (see [Storage Proving]({{<relref "storage-proving" >}}). As such the Storage Provider will earn more block rewards over verified deals.

With providing real customer data a whole new set of responsibilities arises. A Storage Provider must have the capacity to make deals, to get a copy of the data, to prepare the data for the network, proof the data on-chain via sealing and last but not least have a means to retrieve the data to the customer upon request.

You are a vital part of the ecosystem. Being a storage provider is more than providing some disk space to the network. Making deals, doing your own business development, is vital to growing a business on Filecoin. You can get data copies from other Storage Providers but even then it requires you to network and build relationships with other Storage Providers. Bringing your own customers onto the Filecoin network requires people and processes to do proper business development and might mean you have to hire additional salesforce on your team.

Getting a copy of the data requires systems and infrastructure to allow for big volumes of data to be ingested into your system. It starts with big internet bandwidth, starting at 10Gb but many large Storage Providers go up to 100Gb internet connections.

Data preparation takes time, and skill. You can offload this task to a Data Preparer at a service cost, or you can choose to take on this role yourself.

Once the data is sealed and you’re proving your copies on-chain (i.e. on the blockchain) you will need to offer retrievals to your customer as well. This requires network bandwidth once more, so you need to be able to charge for retrievals accordingly.

Tools and programs exist for this to work but a Storage Provider needs to know how to operate this entire workflow. See [Filecoin Plus Programs]({{<relref "fil-plus-programs" >}}) for more information on available programs. See [Architecture]({{<relref "lotus-components" >}}) for more information on the tooling and software components.

With great power comes great responsibility, which also counts for storage power: rewards on Fil+ deals are 10x, but so are the penalties. Because a sector of 32GiB counts for 320GiB of storage power (10x), the rewards and the slashes are calculated on the QAP of 320GiB. The Fil+ allows a Storage Provider to earn more block rewards over a verified deal compared to a regular data deal. The 10x multiplier on storage power that comes with a verified deal however also requires 10x collateral from the Storage Provider. If the Storage Provider is then not capable of keeping the data and systems online and fails to submit the daily required proofs (WindowPoSt) for that data, the slashing (penalties) are also 10x higher than over regular data deals or CC sectors (committed capacity). All things are intertwined and depend on the storage power on-chain. Larger storage power means larger block rewards, larger collateral and larger slashing. After all, we’re “storing humanity’s most important information” with Filecoin.
