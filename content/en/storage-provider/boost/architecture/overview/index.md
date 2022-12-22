---
title: "Overview"
description: ""
lead: ""
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "overview-0d84b10c393703e716145d9cc0d25d1c"
weight: 1
toc: true
---

The `boostd` executable runs as a daemon alongside a lotus node and lotus miner. This daemon replaces the current markets subsystem in the lotus miner. The boost daemon exposes a libp2p interface for storage and retrieval deals. It performs on-chain operations by making API calls to the lotus node. The daemon hands off downloaded data to the lotus miner for sealing via API calls to the lotus miner.

`boostd` has a web interface for fund management and deal monitoring. The web interface is a react app that consumes a graphql interface exposed by the daemon.

![](boost-interfaces.png)

### Storage Deal Flow

The typical flow for a Storage Deal is:

1. The Client puts funds in escrow with the Storage Market Actor on chain.
2. The Client uploads a CAR file to a web server.
3. The Client sends a storage deal proposal to Boost with the URL of the CAR file.
4. Boost checks that the client has enough funds in escrow to pay for storing the file.
5. Boost accepts the storage deal proposal.
6. Boost downloads the CAR file from the web server.
7. Boost publishes the deal on chain.
8. The client checks that the deal was successfully published on chain.

![](boost-flow.png)

Boost exposes a libp2p interface to listen for storage deal proposals from clients. This is similar to the libp2p interface exposed by the lotus market subsystem.&#x20;

Boost communicates with the lotus node over its JSON-RPC API for on-chain operations like checking client funds and publishing the deal.

Once the deal has been published, Boost hands off the downloaded file to `lotus-miner` for sealing.
