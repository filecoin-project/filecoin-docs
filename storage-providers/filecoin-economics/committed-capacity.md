---
description: >-
  The content discusses participating in the network by providing Committed
  Capacity (CC) sectors. CC sectors are storage sectors that are filled with
  random data, instead of customer data.
---

# Committed capacity

One way of participating in the Filecoin network is by providing [_Committed Capacity_ (CC) sectors](../../reference/general/glossary.md#capacity-commitment) to the network. CC sectors do not contain customer data but are filled with random data when they are created. The goal for the Filecoin network is to have a distributed network of verifiers and collaborators to the network in order to run and maintain a healthy blockchain. Any public blockchain network requires enough participants in the consensus mechanism of the blockchain, in order to guarantee that transactions being logged onto the blockchain are legitimate. Because Filecoin’s consensus mechanism is based on Proof-of-Storage, we need sufficient storage providers that pledge capacity to the network, and thus take part in the consensus process. This is done via Committed Capacity sectors. This can be done in sectors of 32 GiB or 64 GiB. For more detail, see the [architectural overview](../architecture/lotus-components.md).

## Availability requirements

Because the Filecoin network needs consistency, meaning all data stored is still available and unaltered, a storage provider is required to keep their capacity online, and be able to demonstrate to the network that the capacity is online. WindowPoSt verification is the process that checks that the provided capacity remains online. If not, a storage provider is penalized (or _slashed_) over the collateral FIL they provided for that capacity and their storage power gets reduced. This means an immediate reduction in capital (lost FIL), but also a reduction in future earnings because block rewards are correlated to storage power, as explained above. See [Slashing](slashing.md), [Storage Proving](storage-proving.md) and [FIL Collateral](fil-collateral.md) for more information.

## What’s next?

Providing committed capacity is the easiest way to get started as a storage provider, but the economics are very dependent on the price of FIL. If the price of FIL is low, it can be unprofitable to provide only committed capacity. The optimal FIL-price your business needs to be profitable will depend on your setup. Profitability can be increased by utilizing [Filecoin Plus](../../basics/how-storage-works/filecoin-plus.md), along with [extra services you can charge for](../filecoin-deals/auxiliary-services.md).
