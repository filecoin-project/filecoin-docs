---
description: >-
  Slashing penalizes storage providers that either fail to provide reliable
  uptime or act maliciously against the network. This page discusses what
  slashing means to storage providers.
---

# Slashing

## Storage fault slashing

This term encompasses a broad set of penalties which are to be paid by storage providers if they fail to provide sector reliability or decide to voluntarily exit the network. These include:

* **Fault fees** are incurred for each day a storage provider’s sector is offline (fails to submit Proofs-of-Spacetime to the chain). Fault fees continue until the associated wallet is empty and the storage provider is removed from the network. In the case of a faulted sector, there will be an additional sector penalty added immediately following the fault fee.
* **Sector penalties** are incurred for a faulted sector that was not declared faulted before a _WindowPoSt_ check occurs. The sector will pay a fault fee after a Sector Penalty once the fault is detected.
* **Termination fees** are incurred when a sector is voluntarily or involuntarily terminated and is removed from the network.

## Consensus fault slashing

This penalty is incurred when committing consensus faults. This penalty is applied to storage providers that have acted maliciously against the network’s consensus functionality.



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/storage-providers/filecoin-economics/slashing)
