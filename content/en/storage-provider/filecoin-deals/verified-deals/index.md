---
title: "Verified deals"
description: "The goal of Filecoin is to be the decentralized storage network for humanity’s most important information."
lead: ""
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-filecoin-deals"
    identifier: "verified-deals-4566094f3f1b681b923abad2bdce9aef"
weight: 320
toc: true
---

The goal of Filecoin is to be the decentralized storage network for humanity’s most important information. With that in mind, it is vital to onboard real and valuable data onto the network. Filecoin Plus (Fil+) is a social trust program that incentivizes storage providers to store that data in _verified deals_. A deal is _verified_ when the data owner (i.e. the client) undergoes a verification process, where a group of community _notaries_ judge the client and their particular usage of Filecoin to be useful or valuable in some way<!--TODO NOBLOCK STEF BOB how? -->. Notaries are responsible for asking questions to the client and conducting due diligence to build reasonable confidence in the trustworthiness of the client and their use case.

## DataCap

Notaries are responsible for allocating a resource called _DataCap_ to clients with valuable storage use cases. DataCap is a non-exchangeable asset that is allocated by notaries to data clients. DataCap gets assigned to a wallet but cannot be sold or exchanged. The client can only spend the DataCap as part of making a verified deal with a storage provider. DataCap is a single use credit, and a client's DataCap balance is deducted based on the size of the data stored in verified deals.

## Quality Adjusted Power (QAP)

Storage providers are incentivized by the Filecoin network to store verified deals. A 10x quality adjustment multiplier is set at the protocol level for storage offered for verified deals. A 100TiB dataset will account for 1PiB of _Quality-Adjusted-Power_ (QAP). This means the storage provider has a larger share of storage power on the Filecoin network and will be more likely to get elected for WinningPoSt (see [Storage proving]({{<relref "storage-proving" >}})). The storage provider will earn 10x more block rewards for the same capacity made available to the network, if that capacity is storing verified deals.

When storing real customer data and not simply [CC sectors](https://docs.filecoin.io/reference/general/glossary/#capacity-commitment), a whole new set of responsibilities arises. A storage provider must have the capacity to make deals, to be able to obtain a copy of the data, to prepare the data for the network, prove the data on-chain via sealing, and last but not least, have a means to offer retrieval of the data to the client when requested.

## Responsibilities

As a storage provider, you are a vital part of the ecosystem. Being a storage provider is not like being a miner on other blockchains - it requires much more than providing some disk space to the network. Making deals, and doing your own business development is vital to growing a business on Filecoin. You can get copies of data to store from other storage providers (as clients often store multiple copies with different providers, for redundancy), but even that requires you to network and build relationships with others. Bringing your own customers onto the Filecoin network requires people and processes for business development, sales and marketing, and might mean you have to hire additional sales people for your team.

Getting a copy of the data requires systems and infrastructure to allow for large volumes, sometimes up to <!--TODO STEF BOB can we give a meaningful example here--> of data to be ingested into your system. This requires substantial internet bandwidth, with a minimum of 10Gb. However, many large storage providers use up to 100Gb internet connections. As an example, transferring 1 PiB of data takes XX hours on a 10Gb connection.

Data preparation, which includes seperating files and folders in car files, takes time and skill. You can offload this task to a Data Preparer at a service cost, or you can choose to take on this role yourself. Tools like [Singularity](https://singularity.storage/) make this easier.

Once the data is sealed and you are proving your copies on-chain (i.e. on the blockchain), you will need to offer retrievals to your customer as well. This obviously requires network bandwidth once more, so you may need to charge for retrievals accordingly.

## Tools

Tools and programs exist to support Filecoin Plus, but storage providers need to know how to operate this entire workflow. See [Filecoin Plus Programs]({{<relref "filecoin-programs" >}}) for more information on available programs. See [Architecture]({{<relref "lotus-components" >}}) for more information on the tooling and software components.

## Rewards & penalties

With great power, comes great responsibility, which also counts for storage power: rewards on Filecoin Plus deals are 10x, but so are the penalties. Because a sector of 32GiB counts for 320GiB of storage power (10x), the rewards and the penalties are calculated on the QAP of 320GiB. Filecoin Plus allows a storage provider to earn more block rewards on a verified deal, compared to a regular data deal. The 10x multiplier on storage power that comes with a verified deal, however, also requires 10x collateral from the storage provider.

If the storage provider is then not capable of keeping the data and systems online and fails to submit the daily required proofs (WindowPoSt) for that data, the penalties (_slashing_) are also 10x higher than over regular data deals or CC sectors. Larger storage power means larger block rewards, larger collateral and larger slashing. The stakes are high - after all, we’re storing humanity’s most important information with Filecoin.
