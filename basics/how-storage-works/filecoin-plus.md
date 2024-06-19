---
description: >-
  Allocators verify that the data clients want to store with a Filecoin Storage Providor is useful.  Storage Providers are heavily incentivized to accept Filecoin+ deals.
---

# Filecoin+


## What is Filecoin+?

The goal of the Filecoin+ program is to increase the amount of useful data stored with storage providers by clients on the Filecoin network. 

In short, this is achieved by appointing allocators responsible for assigning DataCap tokens to clients that are vetted by the allocator as trusted parties storing useful data.  Clients then pay DataCap to storage providers as part of a storage deal, which increases a storage provider’s probability they earn block rewards.  A full description of this mechanism is described below.

Filecoin+ creates honest demand on the Filecoin network.  

## Storage Providers & DataCap

Filecoin+ introduces two concepts important to interactions on the Filecoin network – DataCap and Quality Adjusted Power.  

- DataCap | DataCap is a token paid to storage providers as part of a deal in which the client and the data they are storing is verified by a Filecoin+ allocator.  Batches of DataCap are granted to allocators by Root-key Holders, allocators give DataCap to verified clients, and clients pay DataCap to storage providers as part of a deal.  The more DataCap a storage provider ends up with, the higher probability they have to earn block rewards.  The role of each of these participants, and how DataCap is used in a Filecoin+ deal, is described below.  

- Quality Adjusted Power | Quality Adjusted Power is an assigned rating to a given [sector](https://spec.filecoin.io/systems/filecoin_mining/sector/), the basic unit of storage on the Filecoin network.  Quality Adjusted Power is a function of a number of features of the sector, including, but not limited to, the sector’s size and promised duration,  and whether the sector includes a Filecoin+ deals, as determined by DataCap paid to the storage provider in deals included in the given sector.  The more Filecoin+ verified storage the storage provider has in a sector, the higher the Quality-Adjusted Power a storage provider has, which linearly increases the number of votes a miner has in the [Secret Leader Election](https://spec.filecoin.io/algorithms/expected_consensus/), determining which storage provider gets to serve as the verifier for the next block in the blockchain, and thus increasing the probability the storage provider is afforded the opportunity to earn block rewards.  For more details on Quality Adjusted Power, see the [Filecoin specification](https://spec.filecoin.io/systems/filecoin_blockchain/storage_power_consensus/).  

There is a common misconception that a Filecoin+ deal increases the miner’s reward for or FIL deal payment to a Filecoin storage provider by a factor of ten.  This is not true, Filecoin+ does not increase the amount of block rewards available to storage providers.

Including Filecoin+ deals in a sector increases the Quality Adjusted Power of a storage provider, which does increase the probability a storage provider is selected as the block verifier, and thus increases the probability they earn block rewards.  

Consider first a network with ten storage providers.  Initially, each storage provider has an equal 10% probability of winning available block rewards in a given period.

<img width="155" alt="filecoinplus1" src="https://github.com/filecoin-project/filecoin-docs/assets/46801006/d577d1d7-5e4f-4b3d-9b60-f102b5ca27bb">

If two of these storage providers begin filling their sectors with verified deals, their chances of winning a block reward increases by a factor of ten relative to their peers.  Each one of these storage providers with verified deals in their sectors has a 36% chance of winning the block reward, while storage providers with only [regular deals](https://spec.filecoin.io/systems/filecoin_blockchain/storage_power_consensus/#section-systems.filecoin_mining.sector.sector_quality) in their sectors have a 4% probability of winning the block rewards.  

![filecoinplus2](https://github.com/filecoin-project/filecoin-docs/assets/46801006/a13dcf38-0115-49b0-896c-11da82808d70)

If two of these storage providers begin filling their sectors with verified deals, their chances of winning a block reward increases by a factor of ten relative to their peers.  Each one of these storage providers with verified deals in their sectors has a 36% chance of winning the block reward, while storage providers with only regular deals in their sectors have a 4% probability of winning the block rewards.  

![filecoinplus3](https://github.com/filecoin-project/filecoin-docs/assets/46801006/a7ec2921-ea7c-4c0b-94d8-94f8eb5a2824)

Incentives for storage providers to accept verified deals is strongest initially.  As more and more storage providers include verified deals in their sectors, the probability any one of them earns the block rewards returns to an equal chance.   

As seen in the diagrams above, Filecoin+ increases the collateral requirements needed by a storage provider.  As a higher percentage of storage providers include verified deals in their sectors, the collateral needed by each storage provider will increase.  To learn more about storage provider collateral, see [this link](https://docs.filecoin.io/storage-providers/filecoin-economics/fil-collateral).  

## Filecoin+ Processes & Participants

The participants of the Filecoin+ program, along with how they interact with each other, is detailed here:  

- Governance | Decisions as to  who the Root-Key Holders should be, how they should grant and remove batches of DataCap to/from allocators, and other important decisions about the Filecoin+ program are determined through Filecoin Improvement Proposals (FIPs) the community governance process.  To learn more about Filecoin+ governance, see this [Github repository](https://github.com/filecoin-project/allocator-governance/tree/main). To see a list of previous FIPs, see this [link](https://fips.filecoin.io/).  

- Root-Key Holders | Root-Key Holders execute the governance process for Filecoin+ as determined through community executed Filecoin Improvement Proposals, their role is to grant and remove batches of DataCap to/from allocators.  Root-Key Holders are signers to a multisig wallet on-chain –a majority of signers are needed for an allocator to be granted or removed.  

- Allocators | Allocators perform due diligence on clients and the data they are storing, allocate DataCap to trusted clients, and facilitate predetermined dispute resolution processes.  To learn more about how allocators are chosen and evaluated, see [this blog](https://blog.allocator.tech/2024/05/who-are-allocators.html). 

- Clients | Clients are participants in the Filecoin network who store data with a storage provider.  A trusted client, as determined by an allocator who performs due diligence on the client and the data they are looking to store, will be given DataCap by the allocator.  Clients offer to give this DataCap to a storage provider as part of a deal, which increases the “deal quality multiplier” of the deal, and in turn the likelihood a storage provider will accept the deal.

- Storage providers | Storage providers who receive DataCap as part of a deal are able to use this DataCap to increase their “quality adjusted power” of the storage provider on the network by a factor of ten.  As described above, this increases their probability of being selected as the verifier for a block, affording them the opportunity to earn block rewards.   

A visualization of the interactions between parties involved in a Filecoin+ deal described above is shown below in Figure 1.  

![filecoinplus4](https://github.com/filecoin-project/filecoin-docs/assets/46801006/48788262-165b-450c-abee-8ed875a4250a)

Figure 1 | Diagram showing participant interactions in a Filecoin+ deal.  

## Acquiring DataCap for Clients & Builders

Clients can secure datacap by making a request to an allocator.  Each one of the allocators maintain their own applications for requesting DataCap.  

One such allocator is Filecoin Incentive Design Labs (FIDL).  They maintain a [Github repository](https://github.com/fidlabs) that includes an [application](https://github.com/fidlabs/Open-Data-Pathway/issues/new/choose) where clients can make a request of FIDL for DataCap.  Clients and builders looking to acquire DataCap may consider applying directly with FIDL, noting that all DataCap applications are transparent and open for public review on the [issues page](https://github.com/fidlabs/Open-Data-Pathway/issues). 

The steps a client should follow to acquire DataCap are as follows: 

- Establish a Filecoin wallet.  See details about Filecoin wallets [HERE](https://docs.filecoin.io/basics/assets/wallets). 

- Choose an allocator.  You can see the full list of active allocators at this [Github repository](https://github.com/filecoin-project/Allocator-registry) and see an active list of allocators who have verified public datasets [HERE](https://allocator.tech/).

- Check that you satisfy the requirements of the allocator.  In the case of uploading open source datasets with FIDL as the allocator, the client will need to demonstrate to FIDL that they can (1) satisfy a third party KYC (identity) check, (2) provide the details of storage provider (entity, storage location) where the data is intended to be stored, and (3) demonstrate proof that the dataset can be actively retrieved.  More details on FIDL’s requirements can be found [HERE](https://www.fidl.tech/apply-for-datacap).  

- Submit an application for DataCap from an allocator.  You can submit a request to FIDL via their [Github application](https://github.com/fidlabs/Open-Data-Pathway/issues/new/choose) or [Google Form](https://www.fidl.tech/apply-for-datacap). 

- Use the DataCap in a storage deal.  

For builders on the Calibration testnet who need testnet DataCap to test their applications, a faucet is available.   The steps a builder should follow to acquire testnet DataCap are as follows: 

- Establish a wallet on Filecoin Calibration testnet. For more information, see the Calibration [docs](https://docs.filecoin.io/networks/calibration) or [Github](https://github.com/filecoin-project/testnet-calibration).  

- Grant the wallet address DataCap by using this [faucet](https://faucet.calibnet.chainsafe-fil.io/datacap.html).

## **Smart contracts**

Smart contracts can acquire and use DataCap just like any regular client. To do so, simply enter the `f410` address of the smart contract as the client address when making a request for DataCap.  It’s important to note that DataCap allocations are a one-time credit for a Filecoin address and cannot be transferred between smart contracts. If you need to redeploy the smart contract, you must request additional DataCap. 

## Spend DataCap

Once you have an address with DataCap, you can make deals using DataCap as a part of the payment. Because storage providers receive a deal quality multiplier for taking Fil+ deals, many storage providers offer special pricing and services to attract clients who use DataCap to make deals.

By default, when you make a deal with an address with DataCap allocated, you will spend DataCap when making the deal.

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

Once you have received DataCap to an address, you can check the remaining balance either by visiting a site that enables this (e.g. [verify.glif.io](https://verify.glif.io/)) or by querying your address on a node.

#### **With lotus v1.10.0 ^**

```shell
lotus filplus check-client-datacap f00000
```

#### **With lotus v1.9.0 and below**

_Note:_ [_Lotus-shed_](https://github.com/filecoin-project/lotus/tree/master/cmd/lotus-shed) _is a separate package you will need to build and install (`make lotus-shed` in the_ [_Lotus_](https://github.com/filecoin-project/lotus) _source), although these features are slated to be merged into Lotus._

```shell
lotus-shed verifreg check-client f00000
```

## Visualizing the Blockchain Data for Filecoin+ 

There are two resources you can use to check the current status of the Filecoin+ deals and participants: 

- The [Filecoin Pulse dashbord](https://filecoinpulse.pages.dev/allocators/), which includes visualizations of and tables for data about Filecoin+ deals on the Filecoin blockchain, organized by Allocators, Clients, and Storage Providers. 

- The [Starboard Dashboard](https://dashboard.starboard.ventures/market-deals), which includes network health data related to Filecoin+.  
