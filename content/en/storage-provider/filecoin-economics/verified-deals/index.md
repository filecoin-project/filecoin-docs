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

## Fil+
The goal of Filecoin is to be the decentralized storage network for humanity’s most important information. With that in mind it is vital to onboard real and valuable data onto the network. Filecoin Plus (Fil+) is a social trust program built to incentivizes Storage Providers to store that data in what is called “verified deals”. Deals are verified because the data owner (i.e. the client) undergoes a "verification" process, where a group of community "notaries" judge the client and their particular usage of Filecoin to be useful or valuable in some way. Notaries are responsible for asking questions to the client and conducting due diligence to build reasonable confidence in the trustworthiness of the client and their use case. 

## DataCap
Notaries are responsible for allocating a resource called “DataCap” to clients with valuable storage use cases. DataCap is a non-exchangeable asset that is allocated by notaries to data clients. DataCap gets assigned to a wallet but cannot be sold or exchanged. The client can only spend the DataCap as part of making a verified deal with a Storage Provider. DataCap is a single use credit, and a client's DataCap balance is deducted based on the size of the data stored in verified deals. 

## QAP
Storage Providers are incentivized by the Filecoin network to store verified deals. A 10x quality adjustment multiplier is set at the protocol level for storage offered for verified deals. A 100TiB dataset will account for 1PiB of “Quality-Adjusted-Power” (or “QAP” in short). This means the Storage Provider gains a larger share of storage power on the Filecoin network and will get more chances to get elected for WinningPoSt (see [Storage Proving]({{<relref "storage-proving" >}}). As such, the Storage Provider will earn more block rewards for the same capacity made available to the network through verified deal data storage.

With providing real customer data a whole new set of responsibilities arises. A Storage Provider must have the capacity to make deals, to get a copy of the data, to prepare the data for the network, prove the data on-chain via sealing, and last but not least, have a means to offer retrieval of the data to the data client when requested.

## Responsibilities
You are a vital part of the ecosystem. Being a storage provider is more than providing some disk space to the network. Making deals, doing your own business development, is vital to growing a business on Filecoin. You can get copies of data to store from other Storage Providers, but even then it requires you to network and build relationships with other Storage Providers. Bringing your own customers onto the Filecoin network requires people and processes to do proper business development and might mean you have to hire additional sales force on your team.

Getting a copy of the data requires systems and infrastructure to allow for big volumes of data to be ingested into your system. It starts with substantial internet bandwidth, starting at 10Gb but many large Storage Providers go up to 100Gb internet connections.

Data preparation takes time and skill. You can offload this task to a Data Preparer at a service cost, or you can choose to take on this role yourself. Tools like [Singularity](https://singularity.storage/) make this easier.

Once the data is sealed and you’re proving your copies on-chain (i.e. on the blockchain) you will need to offer retrievals to your customer as well. This requires network bandwidth once more, so you may need to be able to charge for retrievals accordingly.

## Tools
Tools and programs exist for this to work but a Storage Provider needs to know how to operate this entire workflow. See [Filecoin Plus Programs]({{<relref "fil-plus-programs" >}}) for more information on available programs. See [Architecture]({{<relref "lotus-components" >}}) for more information on the tooling and software components.

## Rewards & penalties
With great power comes great responsibility, which also counts for storage power: rewards on Fil+ deals are 10x, but so are the penalties. Because a sector of 32GiB counts for 320GiB of storage power (10x), the rewards and the slashes are calculated on the QAP of 320GiB. The Fil+ allows a Storage Provider to earn more block rewards over a verified deal compared to a regular data deal. The 10x multiplier on storage power that comes with a verified deal however also requires 10x collateral from the Storage Provider. If the Storage Provider is then not capable of keeping the data and systems online and fails to submit the daily required proofs (WindowPoSt) for that data, the slashing (penalties) are also 10x higher than over regular data deals or CC sectors (committed capacity). Larger storage power means larger block rewards, larger collateral and larger slashing. After all, we’re “storing humanity’s most important information” with Filecoin.
