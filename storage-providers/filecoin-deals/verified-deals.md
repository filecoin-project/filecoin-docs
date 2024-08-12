---
description: >-
  This page discusses what verified deals are, and how they can impact storage
  providers.
---

# Verified deals

Filecoin aims to be a decentralized storage network for humanity’s essential information. To achieve this, it’s crucial to add valuable data to the network. Filecoin Plus is a social trust program encouraging storage providers to store data in _verified deals_. A deal becomes _verified_ after the data owner (client) completes a verification process, where community _allocators_ assess the client’s use of Filecoin to determine its relevance and value to the Filecoin mission: storing and preserving humanity’s vital data. Allocators conduct due diligence by questioning clients and building reasonable confidence in their trustworthiness and use case.

## DataCap

Notaries are responsible for allocating a resource called _DataCap_ to clients with valuable storage use cases. DataCap is a non-exchangeable asset that is allocated by notaries to data clients. DataCap gets assigned to a wallet but cannot be sold or exchanged. The client can only spend the DataCap as part of making a verified deal with a storage provider. DataCap is a single use credit, and a client’s DataCap balance is deducted based on the size of the data stored in verified deals.

## Quality Adjusted Power (QAP)

Storage providers are incentivized by the Filecoin network to store verified deals. A 10x quality adjustment multiplier is set at the protocol level for storage offered for verified deals. A 100 TiB dataset will account for 1 PiB of _Quality-Adjusted-Power_ (QAP). This means the storage provider has a larger share of storage power on the Filecoin network and will be more likely to get elected for WinningPoSt (see [Storage proving](../filecoin-economics/storage-proving.md)). The storage provider will earn 10x more block rewards for the same capacity made available to the network, if that capacity is storing verified deals.

When storing real customer data and not simply [CC sectors](../../reference/general/glossary.md#capacity-commitment), a whole new set of responsibilities arises. A storage provider must have the capacity to make deals, to be able to obtain a copy of the data, to prepare the data for the network, prove the data on-chain via sealing, and last but not least, have a means to offer retrieval of the data to the client when requested.

## Responsibilities

As a storage provider, you play a crucial role in the ecosystem. Unlike miners in other blockchains, storage providers must do more than offer disk space to the network. Whether onboarding new customers to the network, or storing copies data from other storage providers for clients seeking redundancy, providing storage can involve:

* Business development.
* Sales and marketing efforts.
* Hiring additional personnel.
* Networking.
* Relationship building.

Acquiring data copies requires systems and infrastructure capable of ingesting large volumes of data, sometimes up to a PiB. This necessitates significant internet bandwidth, with a minimum of 10 GB. For instance, transferring 1 PiB of data takes approximately 240 hours on a 10 GB connection. However, many large storage providers use up to 100 GB internet connections. \`\`\`

Data preparation, which involves separating files and folders in CAR files, is time-consuming and requires expertise. You can delegate this task to a Data Preparer for a fee or assume the role yourself. Tools like [Singularity](https://singularity.storage/) simplify this process.

Once the data is sealed and you are proving your copies on-chain (i.e. on the blockchain), you will need to offer retrievals to your customer as well. This obviously requires network bandwidth once more, so you may need to charge for retrievals accordingly.

## Tools

Tools and programs exist to support Fil+, but storage providers need to know how to operate this entire workflow. See [Filecoin Plus Programs](filecoin-programs.md) for more information on available programs. See [Architecture](../architecture/lotus-components.md) for more information on the tooling and software components.

## Rewards & penalties

With great power, comes great responsibility, which also counts for storage power: rewards on Fil+ deals are 10x, but so are the penalties. Because a sector of 32 GiB counts for 320 GiB of storage power (10x), the rewards and the penalties are calculated on the QAP of 320 GiB. Fil+ allows a storage provider to earn more block rewards on a verified deal, compared to a regular data deal. The 10x multiplier on storage power that comes with a verified deal, however, also requires 10x collateral from the storage provider.

If the storage provider is then not capable of keeping the data and systems online and fails to submit the daily required proofs (WindowPoSt) for that data, the penalties (_slashing_) are also 10x higher than over regular data deals or CC sectors. Larger storage power means larger block rewards, larger collateral and larger slashing. The stakes are high - after all, we’re storing humanity’s most important information with Filecoin.
