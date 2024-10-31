---
description: >-
  Learn how the Filecoin Plus program works, how DataCap is obtained and used by
  clients, and how allocators verify that the data clients want to store with a
  Filecoin storage provider is useful.
---

# Filecoin plus

## What is Filecoin Plus?

The goal of the Filecoin Plus program is to increase the amount of useful data stored with storage providers by clients on the Filecoin network.

In short, this is achieved by appointing allocators responsible for assigning DataCap tokens to clients that are vetted by the allocator as trusted parties storing useful data. Clients then pay DataCap to storage providers as part of a storage deal, which increases a storage provider’s probability of earning block rewards. A full description of this mechanism is described below.

Filecoin Plus creates demand on the Filecoin network, ensuring the datasets stored on the network are legitimate and useful to either the clients, or a third party.

## Storage Providers & DataCap

Filecoin Plus introduces two concepts important to interactions on the Filecoin network – DataCap and Quality Adjusted Power (QAP).

### DataCap

DataCap is a token paid to storage providers as part of a deal in which the client and the data they are storing is verified by a Filecoin Plus allocator. Batches of DataCap are granted to allocators by root-key holders, allocators give DataCap to verified clients, and clients pay DataCap to storage providers as part of a deal. The more DataCap a storage provider ends up with, the higher probability they have to earn block rewards. The role of each of these participants, and how DataCap is used in a Filecoin Plus deal, is described below in the "Filecoin Plus Processes & Participants" section.

### Quality Adjusted Power

Quality Adjusted Power is an assigned rating to a given [sector](https://spec.filecoin.io/systems/filecoin\_mining/sector/), the basic unit of storage on the Filecoin network. Quality Adjusted Power is a function of a number of features of the sector, including, but not limited to, the sector’s size and promised duration, and whether the sector includes a Filecoin+ deal. It's clear to the network that a sector includes a Filecoin Plus deal if a deal in that sector involves DataCap paid to the storage provider. The more Filecoin Plus verified data the storage provider has in a sector, the higher the Quality-Adjusted Power a storage provider has, which linearly increases the number of votes a miner has in the [Secret Leader Election](https://spec.filecoin.io/algorithms/expected\_consensus/), determining which storage provider gets to serve as the verifier for the next block in the blockchain, and thus increasing the probability the storage provider is afforded the opportunity to earn block rewards. For more details on Quality Adjusted Power, see the [Filecoin specification](https://spec.filecoin.io/systems/filecoin\_blockchain/storage\_power\_consensus/).

\[!IMPORTANT] There is a common misconception that a Filecoin Plus deal increases the miner’s reward paid to a Filecoin storage provider by a factor of ten. This is not true, Filecoin+ does not increase the amount of block rewards available to storage providers. Including Filecoin Plus deals in a sector increases the Quality Adjusted Power of a storage provider, which increases the probability a storage provider is selected as the block verifier for the next block on the Filecoin blockchain, and thus increases the probability they earn block rewards.

Consider first a network with ten storage providers. Initially, each storage provider has an equal 10% probability of winning available block rewards in a given period:

![filecoinplus1](https://github.com/filecoin-project/filecoin-docs/assets/46801006/d577d1d7-5e4f-4b3d-9b60-f102b5ca27bb)

In the above visualization, "VD" means "verified deals", that is, deals that have been reviewed by allocators and have associated spending of datacap.

If two of these storage providers begin filling their sectors with verified deals, their chances of winning a block reward increases by a factor of ten relative to their peers. Each one of these storage providers with verified deals in their sectors has a 36% chance of winning the block reward, while storage providers with only [regular deals](https://spec.filecoin.io/systems/filecoin\_blockchain/storage\_power\_consensus/#section-systems.filecoin\_mining.sector.sector\_quality) in their sectors have a 4% probability of winning the block rewards.

![filecoinplus2](https://github.com/filecoin-project/filecoin-docs/assets/46801006/a13dcf38-0115-49b0-896c-11da82808d70)

Incentives for storage providers to accept verified deals is strongest initially. As more and more storage providers include verified deals in their sectors, the probability any one of them earns the block rewards returns to an equal chance.

![filecoinplus3](https://github.com/filecoin-project/filecoin-docs/assets/46801006/a7ec2921-ea7c-4c0b-94d8-94f8eb5a2824)

As seen in the diagrams above, Filecoin Plus increases the collateral requirements needed by a storage provider. As a higher percentage of storage providers include verified deals in their sectors, the collateral needed by each storage provider will increase. To learn more about storage provider collateral, see [this link](https://docs.filecoin.io/storage-providers/filecoin-economics/fil-collateral).

## Filecoin+ Processes & Participants

The participants of the Filecoin+ program, along with how they interact with each other, is detailed here:

* Decisions as to who the root-key holders should be, how they should grant and remove batches of DataCap to/from allocators, and other important decisions about the Filecoin+ program are determined through Filecoin Improvement Proposals (FIPs), the community governance process. Learn more about [Filecoin+ governance](https://github.com/filecoin-project/allocator-governance/tree/main). To see a list of FIPs, see this [link](https://github.com/filecoin-project/FIPs).
* Root-key holders execute the governance process for Filecoin+ as determined through community executed Filecoin Improvement Proposals, their role is to grant and remove batches of DataCap to/from allocators. Root-key holders are signers to a multisig wallet on-chain –a majority of signers are needed for an allocator to be granted or removed.
* Allocators perform due diligence on clients and the data they are storing, allocate DataCap to trusted clients, and facilitate predetermined dispute resolution processes. To learn more about how allocators are chosen and evaluated, see [this blog](https://blog.allocator.tech/2024/05/who-are-allocators.html).
* Clients are participants in the Filecoin network who store data with a storage provider. A trusted client, as determined by an allocator who performs due diligence on the client and the data they are looking to store, will be given DataCap by the allocator. Clients offer to give this DataCap to a storage provider as part of a deal, which increases the “deal quality multiplier” of the deal, and in turn the likelihood a storage provider will accept the deal.
* Storage providers who receive DataCap as part of a deal are able to use this DataCap to increase their “quality adjusted power” of the storage provider on the network by a factor of ten. As described above, this increases their probability of being selected as the verifier for a block, affording them the opportunity to earn block rewards.

A visualization of the interactions between parties involved in a Filecoin+ deal described above is shown below in Figure 1.

![Screenshot 2024-06-28 at 12 11 23 AM](https://github.com/filecoin-project/filecoin-docs/assets/46801006/efd006ae-ea6f-4851-b072-ae73787e6975)

Figure 1 | Diagram showing participant interactions in a Filecoin+ deal.

## Acquiring DataCap for Clients & Builders

Clients can secure DataCap by making a request to an allocator. Each one of the allocators maintain their own applications for requesting DataCap.

One such allocator is [Filecoin Incentive Design Labs (FIDL)](https://www.fidl.tech). They maintain a [Github repository](https://github.com/fidlabs) that includes an [application](https://github.com/fidlabs/Open-Data-Pathway/issues/new/choose) where clients can make a request of FIDL for DataCap. Clients and builders looking to acquire DataCap may consider applying directly with FIDL, noting that all DataCap applications are transparent and open for public review on the [issues page](https://github.com/fidlabs/Open-Data-Pathway/issues).

The steps a client should follow to acquire DataCap are as follows:

1. Create a [Filecoin wallet](https://docs.filecoin.io/basics/assets/wallets).
2. Choose an allocator from the [full list of active allocators](https://github.com/filecoin-project/Allocator-registry) or the [active list of allocators](https://allocator.tech/) who have verified public datasets.
3. Check that you satisfy the requirements of the allocator. In the case of uploading open source datasets with FIDL as the allocator, the client will need to demonstrate to FIDL that they can (1) satisfy a third party Know Your Customer(KYC) identity check, (2) provide the details of storage provider (entity, storage location) where the data is intended to be stored, and (3) demonstrate proof that the dataset can be actively retrieved. You can learn more about [FIDL’s requirements and application process](https://www.fidl.tech/apply-for-datacap).
4. Submit an application for DataCap from an allocator. You can submit a request to FIDL via their [Github application form](https://github.com/fidlabs/Open-Data-Pathway/issues/new/choose) or [Google Form](https://www.fidl.tech/apply-for-datacap).
5. Use the DataCap in a storage deal.

For builders on the [Calibration testnet](../../networks/calibration/) who need testnet DataCap to test their applications, a faucet is available. The steps a builder should follow to acquire testnet DataCap are as follows:

1. Create a wallet on Filecoin Calibration testnet. For more information, see the [Calibration docs](../../networks/calibration/) or [Github](https://github.com/filecoin-project/testnet-calibration).
2. Grant the wallet address DataCap by using this [faucet](https://faucet.calibnet.chainsafe-fil.io/datacap.html).

## **Smart contracts**

Smart contracts can acquire and use DataCap just like any regular client. To do so, simply enter the `f410` address of the smart contract as the client address when making a request for DataCap.

\[!Important] It’s important to note that DataCap allocations are a one-time credit for a Filecoin address and cannot be transferred between smart contracts. If you need to redeploy the smart contract, you must request additional DataCap.

## Spend DataCap

Once you have an address with DataCap, you can make deals using DataCap as a part of the payment. Because storage providers receive a deal quality multiplier for taking Filecoin+ deals, many storage providers offer special pricing and services to attract clients who use DataCap to make deals.

By default, when you make a deal with an address with DataCap allocated, you will spend that DataCap when making the deal.

If making deals through the [API](https://github.com/filecoin-project/lotus/blob/master/documentation/en/api-v0-methods.md#ClientStartDeal), make sure that the `VerifiedDeal` parameter is set to `true` when calling `ClientStartDeal`.

```json
[
  {
    "Data": {
      "TransferType": "string value",
      "Root": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "PieceCid": null,
      "PieceSize": 1024
    },
    "Wallet": "f01234",
    "Miner": "f01234",
    "EpochPrice": "0",
    "MinBlocksDuration": 42,
    "ProviderCollateral": "0",
    "DealStartEpoch": 10101,
    "FastRetrieval": true,
    "VerifiedDeal": true
  }
]
```

If making deals from the command line, make sure to pass the flag `--verified-deal=true` as a parameter.

```shell
 lotus client deal --verified-deal=true
```

### Checking remaining DataCap balance

Once you have received DataCap to an address, you can check the remaining balance by querying your address on a node.

#### With the lotus cli

```shell
lotus filplus check-client-datacap f00000
```

## Visualizing the Blockchain Data for Filecoin+

There are three resources you can use to check the current status of the Filecoin+ deals and participants:

* The [Filecoin Pulse dashboard](https://filecoinpulse.pages.dev/allocators/) includes visualizations of and tables for data about Filecoin+ deals on the Filecoin blockchain, organized by Allocators, Clients, and Storage Providers.
* The [Datacap Stats dashboard](https://datacapstats.io) shows DataCap allocations, including the number of allocators, clients, and storage providers. You can also see number and size of deals.
* The [Starboard Dashboard](https://dashboard.starboard.ventures/market-deals) includes network health data related to Filecoin+ verified deals.



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/basics/how-storage-works/filecoin-plus)
