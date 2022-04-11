---
title: "Overview"
description: "Filecoin Plus aims to enable the demand side of the Filecoin network and maximize the amount of useful storage on Filecoin by adding a layer of social trust to the network and introducing a novel resource called DataCap. Clients looking to onboard storage onto the network apply to community-selected Notaries to receive DataCap, which can be used to incentivize storage providers to take storage deals."
weight: 2
menu:
    store:
        parent: "store-filecoin-plus"
---

## Concepts

Filecoin Plus is based on a set of guiding principles, [detailed in FIP-0003](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0003.md), that focus the program on increasing Filecoin's effectiveness at becoming the decentralized storage network for humanity's most important information.

Root key-holders, notaries, clients, and storage providers, interact through the allocation and spending of DataCap. Notaries retrieve DataCap in batches and then allocate it to trustworthy clients that spend the DataCap to fund storage deals. Storage Providers that receive DataCap receive a 10x boost to their quality-adjusted power for the storage space offered in that deal, which increases their block reward share in the network. This creates a mechanism that incentivizes all participants to make Filecoin more useful.

### DataCap

DataCap, when allocated to a client, can be spent by the client in storage deals with storage providers. Those deals carry a higher deal quality multiplier, which increases the "quality adjusted power" of the storage provider on the network by a factor of 10, yielding better block rewards for the storage provider over time. DataCap is granted in batches to Notaries, who can allocate it to clients that spend the DataCap to fund storage deals. DataCap is consumed as it is used to make deals.

### Notary

Notaries are selected to serve as fiduciaries for the Filecoin Network and are responsible for allocating DataCap to clients with valuable storage use cases. The base responsibilities of notaries include:

- Allocate DataCap responsibly to clients to subsidize reliable and valuable storage on the network.
- Ensure that in the allocation of the DataCap, no party is given excessive trust in any form that might jeopardize the network.
- Follow operational guidelines, keep a record of decision flow, and respond to any requests for audits of their allocation decisions.

You can find a list of current [active notaries at plus.fil.org](https://plus.fil.org).

Notaries are selected through an [application process](https://github.com/filecoin-project/notary-governance/tree/main/notaries#application--selection-process). If approved, [root key-holders](https://github.com/filecoin-project/notary-governance/tree/main/root-key-holders#overview) (executors of the decisions made by the community on-chain) grant notary status and DataCap amounts. Those interested in becoming Notaries should apply for this role by filing an Issue in the [notary governance repo](https://github.com/filecoin-project/notary-governance/).

### Client

Clients can use their DataCap to incentivize storage providers to serve their needs. This can include providing additional features and levels of services that meet their specific requirements. In doing so, storage-related goods and services on Filecoin are made more valuable and competitive over time. Notaries vet clients to ensure the client receives DataCap commensurate with their reputation and needs and that the client responsibly allocates that DataCap.

## Using DataCap

### Get DataCap

Clients are required to have an on-chain Filecoin address where DataCap can be received. If you are setting up a new address, make sure to initialize it by sending a minimal amount of FIL to the address by purchasing some FIL from an exchange, for example. You will need an address to proceed with getting DataCap in any of the following ways.

_Note: As of network version 12, DataCap allocations are a single-use credit on a Filecoin address. If you receive an allocation and require more, you should make a new request with a unique address that you have initialized like above. [FIP-0012](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0012.md) was accepted and implemented in network version 13(actor v5), which allows client addresses to receive DataCap multiple times._

Clients get DataCap by making a request to a notary. For your first DataCap allocation of 32GiB, you can use an auto-verifier such as https://verify.glif.io/. Auto-verifiers exist to grant DataCap immediately to clients that can authenticate themselves via a specific method. For example, the verify.glif.io automatic notary grants DataCap to clients who have a GitHub account that is > 180 days old and has not been used at this site in the past 30 days.

1. Head over to https://verify.glif.io/
2. Connect your GitHub account - click the **Start** button on the top right of the page
3. Sign in to GitHub if you have not already
4. Paste in the address to which you'd like to receive DataCap in the box under "Request" and hit **Request**
5. The auto-notary will now attempt to send a message to the Filecoin Network whereby your address will be granted 32GiB of DataCap. This will take about 1 min
6. When complete, you now have 32GiB to start making deals with! You can always come back to this site and use the "Check" box to see how much DataCap you have left on a specific address

For receiving DataCap at a larger scale (for business needs and production use cases), depending on the amount of data being onboarded to the network, a client has two options:

- Applying directly to a specific notary - best for clients looking for < 100TiB of DataCap
- Applying for a Large Dataset notary dedicated to a specific project - best for clients looking for > 100TiB of DataCap (usually in the 500TiB-5PiB range)


For applying directly to a specific notary:
1. Head over to the [Filecoin Plus Registry](https://plus.fil.org/), and proceed with **For Clients**
2. Click **Get Verified**
3. Click on **General Verification**. This link will take you to the notary registry, where you can request DataCap to a specific notary. Notaries may specialize in the types of requests they'll choose to support. It is recommended that you select a notary in your region of operation that also covers the general category of *Use Case* you would classify yourself under
4. Identify the notary you would like to apply to by selecting the checkbox on their row, and click **Make Request**
5. Fill out the form that should pop up. This is used by notaries in conducting any necessary due diligence before granting you the requested DataCap
6. Click **Sign in with GitHub** to allow the app to create a GitHub issue on your behalf
7. After you are signed in, the button should change to **Send request**. Click this to have an issue created on your behalf and sent to the right notary!

Each request is tracked as a GitHub issue in the [Fil+ Client Onboarding repo](https://github.com/filecoin-project/filecoin-plus-client-onboarding). You can follow the progress of your application there as well. Notaries may ask for additional information before they will allocate you DataCap.

To apply for a Large Dataset Notary, follow the steps at [Applying for a large DataCap allocation](https://github.com/filecoin-project/filecoin-plus-large-datasets#applying-for-a-large-datacap-allocation).

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

#### With lotus v1.10.0 ^

```
lotus filplus check-client-datacap f00000
```

#### With lotus v1.9.0 and below
_Note: [Lotus-shed](https://github.com/filecoin-project/lotus/tree/master/cmd/lotus-shed) is a separate package you will need to build and install (`make lotus-shed` in the [Lotus](https://github.com/filecoin-project/lotus) source), although these features are slated to be merged into Lotus._

```
lotus-shed verifreg check-client f00000
```

### Finding storage providers to take Fil+ deals

There are a few different ways in which a client can find a storage provider to take a Fil+ storage deal:
1. In the **For Clients** section of the [Filecoin Plus Registry](https://plus.fil.org/), there is a [Miner Registry](https://plus.fil.org/miners) which lists a self-selected set of storage providers who are willing to take Fil+ storage deals
1. Use a Miner Reputation system such as [Filecoin Reputation System](http://filrep.io/) or Textile's [Miner Index](https://docs.textile.io/filecoin/miner-index/) to identify storage providers who can meet your needs
1. Join the [#fil-plus](https://filecoinproject.slack.com/archives/C01DLAPKDGX) channel on Filecoin Slack to discuss storage options
1. Hop into the network with your node and query storage providers (using `query-ask`) to check their verified deal prices

## Get involved in Fil+ governance

If you are interested in participating in governance and shaping the program, here is how you can get involved:

- Join the [#fil-plus](https://filecoinproject.slack.com/archives/C01DLAPKDGX) channel on Filecoin Slack
- Participate in Community Governance calls, which happen every other Tuesday. Use the Filecoin Community Events calendar to join or watch for updates in #fil-plus
- Create and comment on open issues in the [notary governance repo](https://github.com/filecoin-project/notary-governance/issues)

