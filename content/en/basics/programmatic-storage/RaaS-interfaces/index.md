---
title: "RaaS base and full interfaces"
description: "This page explains the specifications for RaaS base and full interfaces."
lead: "RaaS has a base and full interface to enable replication, renew and repair of storage deals."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-programmatic-storage"
    identifier: "Interfaces"
weight: 120
toc: true
---

## Self-hosted RaaS 

RaaS refers to replication, renewal and repair as a service, for data stored in storage deals on Filecoin. Developers can leverage the self-hosted RaaS to provide RaaS features, within their storage solution, using the RaaS Starter Kit.

Self-hosted RaaS requires 4 components:

- The Client who has data to upload

- An Aggregator platform (a type of storage solution) that receives the Client’s data and makes a storage deal on Filecoin

- The RaaS node, hosted by the developer, that checks if the storage deal requires replication, renewal and/or repair

- The RaaS DealStatus smart contract that the RaaS node executes checks with

### In the example of replication:

1. The client generates a `CID` for the data and requests the RaaS node to store data.

2. The RaaS node takes the client’s data and makes the storage deal onto Filecoin. 

3. The client registers a replication job to the RaaS node and defines the number of replicas of their data to store, by calling the ```/register_jobs``` API on the RaaS node (e.g. “This data needs to have a minimum of 10 copies on the network”). 

4. The RaaS node periodically checks the client data’s ```CID``` for its deal status on Filecoin.

  - The RaaS node requests deal status with the DealStatus smart contract, via ```getActiveDeals(CID)``` and checks if the client’s data is stored with the accurate number of replicas. 

  - The DealStatus smart contract returns the information of active deals to the RaaS node. 

5. If the number of replicas does not match the client’s requirements, the RaaS node is notified.
  
6. The RaaS node fetches the data via its ```CID``` and resubmit a request to create new storage deals (repeat step 2).

7. When the client requests for retrieval of data, it queries the RaaS node, which will fetch the data from the storage provider on Filecoin or provide an IPFS pinned copy (depends on how RaaS node is setup to store the data).

### In the example of renewal:

1. The client generates a `CID` for the data and requests the RaaS node to store data.

2. The RaaS node takes the client’s data and makes the storage deal onto Filecoin.
   
3. The client registers a renewal job to the RaaS node and defines the renewal threshold for the data’s storage deal, by calling the ```/register_jobs``` API on the RaaS node (e.g. renew storage deals that are 1 month away from expiry).

4. The RaaS node periodically checks the client data’s ```CID``` for its deal status on Filecoin.

  - The RaaS node requests deal status with the DealStatus smart contract, via ```getExpiringDeals(CID)``` and checks if any of its active deals is expiring. 

  - The DealStatus smart contract returns the information of expiring deals to the RaaS node.

5. If deals with the client’s data are expiring, the RaaS node is notified.
  
6. The RaaS node fetches the data via its ```CID``` and resubmit a request to create new storage deals (repeat step 2).

7. When the client requests for retrieval of data, it queries the RaaS node, which will fetch the data from the storage provider on Filecoin or provide an IPFS pinned copy (depends on how RaaS node is setup to store the data).

The diagram below shows the replication and renewal process:


<img width="1766" alt="shapes (7)" src="https://github.com/filecoin-project/filecoin-docs/assets/113331491/6e260570-212c-4f2d-a6bb-7ba21fdab801">


### In the example of repair:

1. The client generates a `CID` for the data and requests the RaaS node to store data.

2. The RaaS node takes the client’s data and makes the storage deal onto Filecoin.

3. The client registers a repair job to the RaaS node and defines the repair threshold for the data’s storage deal, by calling the ```/register_jobs``` API on the RaaS node (e.g. “this deal needs repairing if it is not proven active for X epochs”).

4. The RaaS node periodically checks with [Lotus](https://lotus.filecoin.io/lotus/get-started/what-is-lotus/), if the deal ID and corresponding miner, is actively being proven by the miner on Filecoin. The node calls `StateMarketStorageDeal`, with provided deal and miner IDs.

5. If the deal ID and corresponding deal sector are not being actively proven for X epochs, the deal will require repairing.  

6. The RaaS node fetches the data via its ```CID``` and resubmit a request to create new storage deals (repeat step 2).

The diagram below shows the replication and renewal process:


<img width="1766" alt="shapes (11)" src="https://github.com/filecoin-project/filecoin-docs/assets/113331491/e5038642-45b1-420b-afa6-5f3cddbcf8ff">


Check out the [RaaS starter kit](https://github.com/filecoin-project/raas-starter-kit) to build your own RaaS interface.

## Aggregator-hosted RaaS

The aggregator-hosted RaaS refers to a solution that requires an aggregator to host all the components of RaaS and provides a seamless interface to the client. [Lighthouse.storage](https://www.lighthouse.storage/) is the first FVM project to provide an aggregator-hosted RaaS, via its SDK. See the docs [here](https://docs.lighthouse.storage/lighthouse-1/filecoin-virtual-machine/fvm-contract-overview). 
