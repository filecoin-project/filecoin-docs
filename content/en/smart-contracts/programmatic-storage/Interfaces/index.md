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

## RaaS Base Interface

RaaS refers to replication, renewal and repair as a service, for data stored in storage deals on Filecoin. Developers can leverage the RaaS base interface to provide RaaS features, within their storage solution, using the RaaS Starter Kit.

The base interface requires 4 components:

- Client who has data to upload

- Aggregator platform (a type of storage solution) that receives the Client’s data and makes a storage deal on Filecoin

- The RaaS node, hosted by the Aggregator, that checks if the storage deal requires replication, renewal and/or repair

- The RaaS DealStatus smart contract that the RaaS node executes checks with

### In the example of replication:

1. The client requests the aggregator platform to store data and defines the number of replicas of their data to store (e.g. “This data needs to have a minimum of 10 copies on the network”)

2. The aggregator takes the client’s data, generates a ```CID``` for the data and makes the storage deal onto Filecoin. 

3. The aggregator registers a replication job to the RaaS node and defines the number of replicas of their data to store, by calling the ```/register_jobs``` API on the RaaS node. 

4. The RaaS node periodically checks the client data’s ```CID``` for its deal status on Filecoin.

5. The RaaS node requests deal status with the DealStatus smart contract, via ```getActiveDeals(CID)``` and checks if the client’s data is stored with the accurate number of replicas. 

6. The DealStatus smart contract returns the information of active deals to the RaaS node. 

7. If the number of replicas does not match the client’s requirements, the RaaS node will fetch the data via its ```CID``` and resubmit a request to create new storage deals (repeat step 2).

### In the example of renewal:

1. The client requests the aggregator platform to store data and defines the renewal threshold for the data’s storage deal (e.g. renew storage deals that are 1 month away from expiry)

2. The aggregator platform takes the client’s data, generates a ```CID``` for the data and makes the storage deal onto Filecoin.

3. The aggregator registers a renewal job to the RaaS node and defines the renewal threshold for the data’s storage deal, by calling the ```/register_jobs``` API on the RaaS node.

4. The RaaS node periodically checks the client data’s ```CID``` for its deal status on Filecoin.

5. The RaaS node requests deal status with the DealStatus smart contract, via ```getExpiringDeals(CID)``` and checks if any of its active deals is expiring. 

6. The DealStatus smart contract returns the information of expiring deals to the RaaS node.

7. If deals with the client’s data are expiring, the RaaS node will fetch the data via its ```CID``` and resubmit a request to create new storage deals (repeat step 2).

Below is a diagram for both renewal and replication:


<img width="2853" alt="shapes (9)" src="https://github.com/trruckerfling/filecoin-docs/assets/113331491/d49347c8-4544-4bdc-8ca6-1dbe3242b33e">


### In the example of repair:

1. The client requests the aggregator platform to store data and defines the repair threshold for the data’s storage deal (e.g. “this deal needs repairing if it is not proven active for X epochs”)

2. The aggregator platform takes the client’s data, generates a ```CID``` for the data and makes the storage deal onto Filecoin.

3. The aggregator registers a repair job to the RaaS node and defines the repair threshold for the data’s storage deal, by calling the ```/register_jobs``` API on the RaaS node.

4. The RaaS node periodically checks the Client data’s ```CID``` for its deal status on Filecoin.

5. The RaaS node receives client data’s storage deal information from the aggregator including deal ID and miner ID via ```getAllDeals(CID)```.

6. The RaaS node periodically checks with Lotus, if the deal ID and corresponding miner, is actively being proven by the miner on Filecoin. The node calls StateMarketStorageDeal, with provided deal and miner IDs.

7. If the deal ID and corresponding deal sector are not being actively proven for X epochs, the deal will require repairing. 

8. To repair the deal, the RaaS node will fetch the data via its ```CID``` and resubmit a request to the aggregator, to create new storage deals (repeat step 2).

Below is a diagram for repair:


<img width="2804" alt="shapes (10)" src="https://github.com/trruckerfling/filecoin-docs/assets/113331491/2558a178-58d8-4eea-b1c5-1b0ef4b81ad2">


Check out the [RaaS starter kit](https://github.com/filecoin-project/raas-starter-kit) to build your own RaaS interface.

## RaaS Full Interface

The RaaS full interface refers to a solution that utilizes the base interface, hosts all the components (except for the Client) and provides a seamless interface to the Client. [Lighthouse.storage](https://www.lighthouse.storage/) is the first FVM project to integrate RaaS and provide a full interface, via its SDK. See its website and [docs](https://docs.lighthouse.storage/lighthouse-1/filecoin-virtual-machine/fvm-contract-overview). 
