---
description: >-
  Allocators, clients, and storage providers interact through the allocation and
  spending of DataCap. Filecoin Plus increases the effectiveness & utilization of the data-storage network.
---

# Filecoin plus

## Concepts

Filecoin Plus is based on a set of guiding principles, [detailed in Filecoin Improvement Proposal (FIP) 0003](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0003.md) that focus the program on increasing Filecoin’s effectiveness at becoming the decentralized storage network for humanity’s most important information.

Root key-holders, notary allocators, clients, and storage providers interact through the allocation and spending of DataCap. Notary allocators retrieve DataCap in batches (from root-key holders) and then allocate it to trustworthy clients that spend the DataCap to fund storage deals. Storage providers that receive DataCap receive a 10x boost to their quality-adjusted power for the storage space offered in that deal, which increases their block reward share in the network. This creates a mechanism that incentivizes all participants to make Filecoin more useful.

### DataCap

DataCap, when allocated to a client, can be spent by the client in storage deals with storage providers. Those deals carry a higher deal quality multiplier, which increases the “quality adjusted power” of the storage provider on the network by a factor of 10, yielding better block rewards for the storage provider over time. DataCap is granted in batches to Allocators, who can allocate it to clients that spend the DataCap to fund storage deals. DataCap is consumed as it is used to make deals.

### Allocators (formerly known as Notaries)

Allocators publicly apply to serve as fiduciaries for the Filecoin Network. The base responsibilities of allocators include:

* Allocate DataCap responsibly to clients to subsidize reliable and valuable storage on the network.
* Ensure that in the allocation of the DataCap, no party is given excessive trust in any form that might jeopardize the network.
* Follow operational guidelines, keep a record of decision flow, and respond to any requests for audits of their allocation decisions.

You can find a list of [active entities at filplus.fil.org](https://filplus.fil.org).

The program has evolved since its launch back in 2019. With each new phase, the program has created new pathways to accommodate clients' needs. In late 2023, following a proposal made [here](https://github.com/filecoin-project/notary-governance/issues/984), the Filecoin plus program solicited applications from the Filecoin community to become trusted allocators, focusing on "Meta-Pathways". The overall process is similar to the previous Notary Election cycles, with interested parties submitting details to the Governance team for review. These teams are instrumental in developing specialized pathways, tailored to meet the diverse needs of clients within the Filecoin network. This initiative enhances the adaptability and responsiveness of the program, catering to a wide range of use cases in decentralized storage.

Entities interested in contributing to the Fil+ ecosystem as an allocator are selected through an [application process](https://github.com/filecoin-project/notary-governance/tree/main/notaries#application--selection-process). This involves submitting a detailed proposal outlining the intended user group, methodology for DataCap distribution, compliance strategies, tooling, budgeting, plans for dispute resolution, and pathway iteration. Applicants are assessed based on their alignment with the Fil+ program's objectives, capacity for effective distribution, and overall impact on the ecosystem. If approved, [root key-holders](https://github.com/filecoin-project/notary-governance/tree/main/root-key-holders#overview) (executors of the decisions made by the community on-chain) grant 'validator' status and DataCap amounts. Those interested in becoming allocators should apply for this role by filing an Issue in the [governance repository](https://github.com/filecoin-project/notary-governance/).

### Storage client

Clients can use _DataCap_ to incentivize storage providers to serve their needs. This can include providing additional features and levels of services that meet their specific requirements. In doing so, storage-related goods and services on Filecoin are made more valuable and competitive over time. Notaries vet clients to ensure the client receives DataCap commensurate with their reputation and needs and that the client responsibly allocates that DataCap.

#### **Smart contracts**

Smart contracts can acquire and use DataCap just like any regular client. To do so, simply enter the `f410` address of the smart contract as the client address when making a request for DataCap.

For a smart contract’s first DataCap allocation, we recommend using [verify.glif.io](https://verify.glif.io) to get 32 GiB of DataCap easily, as outlined below.

It’s important to note that DataCap allocations are a one-time credit for a Filecoin address and cannot be transferred between smart contracts. If you need to redeploy the smart contract, you must request additional DataCap. To improve this experience, we are developing a Filecoin request for comments (FRC) to allow DataCap to be held between redeployments.

## Using DataCap

### Get DataCap

Clients are required to have an on-chain Filecoin address where DataCap can be received. If you are setting up a new address, make sure to initialize it by sending a minimal amount of FIL to the address by purchasing some FIL from an exchange, for example. You will need an address to proceed with getting DataCap in any of the following ways.

_Note: As of network version 12, DataCap allocations are a single-use credit on a Filecoin address. If you receive an allocation and require more, you should make a new request with a unique address that you have initialized like above._ [_Filecoin Improvement Proposal (FIP) 0012_](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0012.md) _was accepted and implemented in network version 13(actor v5), which allows client addresses to receive DataCap multiple times._

Currently to receive DataCap at a larger scale (for business needs and production use cases), depending on the amount of data being onboarded to the network, a client has two options:

* Following the [client onboarding allocator pathway](https://github.com/filecoin-project/filecoin-plus-client-onboarding) and applying directly to a specific notary - best for clients looking for < 100TiB of DataCap
* Following the [Large Dataset Notary allocator pathway](https://github.com/filecoin-project/filecoin-plus-large-datasets) and applying for a Large Dataset notary dedicated to a specific project - best for clients looking for > 100TiB of DataCap (usually in the 500TiB-15PiB range)

Both of these pathways will sunset once the different allocator pathways are evaluated, targeting Q2’24. Each Allocator will be responsible for creating and managing a unique pathway. These pathways are designed to address specific client requirements, ensuring a more personalized and effective approach to DataCap allocation. Detailed information about each pathway is available, allowing clients to make informed decisions based on their storage needs and objectives.

Discover more about individual pathways here. More information to come.

For applying directly to a specific allocator ( < 100TiB of DataCap):

1. Head over to [filplus.storage](https://filplus.storage), and click **Apply Now** on the top right corner
2. Input how much DataCap you would like to apply for
3. Click on **Next** once you have decided on the amount. If you decide to apply for < 100TiB this link will take you to the notary registry, where you can request DataCap to a specific notary. Allocators may specialize in the types of requests they choose to support. It is recommended that you select a notary in your region of operation that also covers the general category of Use Case you would classify yourself under. 
4. Identify the notary you would like to apply to by selecting the checkbox on their row and clicking **Make Request**
5. Fill out the resulting form. This is used by Allocators in conducting any necessary due diligence before granting you the requested DataCap
6. Click Sign in with GitHub to allow the app to create a GitHub issue on your behalf
7. After you are signed in, the button will change to **Send request**. Click this to have an issue created on your behalf and sent to the right notary!


For applying directly to a specific allocator ( > 100TiB of DataCap):

* If you decide to apply for > 100TiB this link will take you to the Large DataCap Notary (LDN) application page where you will need to fill out.
* Once you have finished filling out the application, you will need to sign into Github 

Each request is tracked as a GitHub issue in the [Fil+ Client onboarding repository](https://github.com/filecoin-project/filecoin-plus-client-onboarding). You can follow the progress of your application there as well. Allocators may ask for additional information before they will allocate you DataCap.

More details about the Large Dataset Notary process are available in the [github repository](https://github.com/filecoin-project/filecoin-plus-large-datasets#applying-for-a-large-datacap-allocation).

### Spend DataCap

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

## Get involved in Fil+ governance

If you are interested in participating in governance and shaping the program, here is how you can get involved:

* Join the [#fil-plus](https://filecoinproject.slack.com/archives/C01DLAPKDGX) channel on Filecoin Slack.
* Participate in FIL notary community governance calls, which happen every other Tuesday. Use the [Filecoin Community Events Calendar](https://calendar.google.com/calendar/u/1?cid=Y19rMWdrZm9vbTE3ZzBqOGM2YmFtNnVmNDNqMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t). to join or watch for updates in #fil-plus
* Create and comment on open issues in the [notary governance repository](https://github.com/filecoin-project/notary-governance/issues).
