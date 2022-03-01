---
title: "Network performance"
description: "It is highly non-trivial to provide highly reliable benchmarks for Filecoin network performance. However, as you begin interacting with Filecoin, you can use these heuristics to understand general Filecoin network performance and how it fits your use case."
weight: 20
menu:
    networks:
        parent: "networks-overview"
---

The Filecoin Network is a decentralized storage market and network that provides data persistence via a decentralized protocol and publicly verifiable storage proofs on a blockchain. Current Filecoin network performance is primarily determined by security parameters and Filecoin's [proof constructions](https://spec.filecoin.io/#algorithms__pos).

It is highly non-trivial to provide highly reliable benchmarks for Filecoin network performance. However, as you begin interacting with Filecoin, you can use these heuristics to understand general Filecoin network performance and how it fits your use case.

### Financial transfers

A message that requires [transferring FIL](https://lotus.filecoin.io/docs/set-up/manage-fil/) is often extremely fast, and will take on average ~1 blocktime (or around 30 seconds) to be reflected on-chain. We consider 120 blocks (1 hour) a conservative number of confirmations for high-value transfers.

## Data storage

The Filecoin [data storage protocol](https://lotus.filecoin.io/docs/developers/store-data/) has a few key components once a deal is proposed and accepted:

1. Funding the storage market actor: This process takes ~1-2 minutes and ensures that both the client and the storage provider have funds and collateral to pay for the deal.

2. Data transfer: This portion of the deal flow involves the client's node sending the relevant data to the providing node. The data transfer rate varies widely, depending on the client and the storage provider's network and disk bandwidths. Usually, the network speed between client and storage provider will be the critical determining factor.

3. Deal shows up on-chain: once the storage provider receives the data, they verify it to make sure it matches the deal parameters, and then they publish the deal on the chain.

4. Sector sealing: Once the deal shows up on-chain, the storage provider must still complete [generating a Proof-of-Replication and sealing the sector](https://spec.filecoin.io/#systems__filecoin_mining__sector__adding_storage). This process is currently estimated to take ~1.5hours for a 32 GB sector on a machine that meets these [minimum hardware requirements for storage providers]({{< relref "../storage-provider/hardware-requirements.md#general-hardware-requirements" >}}).

For most storage clients, the most important metric is the time it takes from deal acceptance to deal appearance on-chain. This metric is the sum of steps (1) to (3) above. Based on current high-level benchmarks, these steps are estimated to take around ~5-10 minutes for a 1 MiB file.

## Data retrieval

There are two methods by which one can directly [retrieve data](https://lotus.filecoin.io/docs/developers/retrieve-data/) from the Filecoin network:

- **Fast retrieval**: By default, some Filecoin clients, like lotus, enable storage storage providers to store an unsealed copy of the stored data in addition to a sealed copy. The sealed copy is necessary for the ongoing storage proofs that a storage provider must submit, while the unsealed copy can be used for quicker retrievals of the data from the storage storage provider. While this is a valuable feature, there is no guarantee that all storage providers are storing extra unsealed copies of the stored data, as this is not a verifiable part of the protocol. In lotus, this feature is called _fast-retrieval_.
- **Retrieval after unsealing**: Because of the Filecoin protocol’s design, storage storage providers are essentially cryptographically guaranteed to store client data in its sealed format. Therefore, if the storage storage provider doesn’t have an unsealed copy of the data stored, they will have to unseal the sealed data first (i.e., decoding the encoded data) and then serve it back up to the requester (i.e., the retrieval client).

In both methods, the data retrieval process after a retrieval deal is accepted includes:

1. **Funding the payment channel for retrieval**: Similar to the storage deal payment channel funding above, except for data retrieval. The timing estimates for payment channel creation and funding are roughly the same as noted above.

2. **Unsealing (if needed)**: The storage provider unseals (decodes) the data so that the requester can read it. Sealing and unsealing are symmetric processes, which means they take roughly the same amount of time in either direction. Thus, the unsealing step is estimated to take around as long as the sealing step listed above, or around ~3hours for a 32 GiB sector on a machine running minimum hardware requirements.

3. **Data transfer**: The storage provider begins transferring the data back to the data requester. This is also transferred back at a rate similar to the original data transfer rate, which depends on several factors.

Because of the various steps involved in the data retrieval process, Filecoin storage currently meets similar performance bars as traditional _warm_ or _cold_ storage. To get performance that is similar to other hot storage solutions, most users utilize Filecoin with a caching layer such as IPFS. These hybrid and multi-tiered storage solutions use IPFS for hot storage and Filecoin for affordable, frequent, and versioned backups. Some example hybrid storage products include [Powergate]({{< relref "../build/powergate.md" >}}) and [Textile Buckets]({{< relref "../build/filecoin-pinning-services.md" >}}).
