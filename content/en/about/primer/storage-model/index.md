---
title: "Storage model"
description: "The storage model provides proven storage power in the network required for the consensus algorithm and also achieves the open storage market for storing and retrieving data on the Filecoin network. There are two major components to Filecoin markets, the storage and retrieval markets, which will be introduced in the following sections."
lead: "The storage model provides proven storage power in the network required for the consensus algorithm and also achieves the open storage market for storing and retrieving data on the Filecoin network. There are two major components to Filecoin markets, the storage and retrieval markets, which will be introduced in the following sections."
draft: false
images: []
type: docs
menu:
  about:
    identifier: "storage-model-046f7988550538de07ec23d2864d9d8d"
weight: 240
toc: true
---

## Providers

Based on the nature of the storage markets, there are two types of providers to provide service and earn FIL as rewards:

- Storage providers are responsible for storing files and data for clients on the network and providing cryptographic proofs to verify storage.
- Retrieval providers are responsible for providing quick pipes to retrieve data per clients’ requests. Sometimes, storage providers who store client data also act as retrieval providers.

## Deals

In the Filecoin network, providers provide their storage or retrieval service to data clients through deals that are negotiated and agreed upon between two parties, including terms like data size, price and deal duration, and collateral.

## Sectors

Sectors are the basic units of provable storage where storage providers store clients’ data and generate PoSt on behalf of the Filecoin network. Sectors have standard sizes and a lifetime that storage providers can extend before reaching the end of the lifetime. `32 GiB` and `64 GiB` sector sizes are supported.
