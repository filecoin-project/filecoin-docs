---
title: "Slashing"
description: "Slashing penalizes storage providers that either fail to provide reliable uptime or act maliciously against the network."
lead: "Slashing penalizes storage providers that either fail to provide reliable uptime or act maliciously against the network. In Filecoin, storage providers are succeptible to two different kinds of slashing: _storage fault slashing_, and _consensus fault slashing_."
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-filecoin-economics"
    identifier: "slashing-080aabd0b6cff052ccbf1c996f4b3b78"
weight: 240
toc: true
aliases:
    - "/storage-provider/slashing/"
    - "/mine/slashing/"
    - "storage-provider/rewards/slashing/"
---

## Storage fault slashing

This term encompasses a broad set of penalties which are to be paid by storage providers if they fail to provide sector reliability or decide to voluntarily exit the network. These include:
<!--TODO NOBLOCK STEF BOB I think this page really needs an explanation of how the various penalties are calculated and applied-->
- **Fault fees** are incurred for each day a storage provider's sector is offline (fails to submit Proofs-of-Spacetime to the chain). Fault fees continue until the associated wallet is empty and the storage provider is removed from the network. In the case of a faulted sector, there will be an additional sector penalty added immediately following the fault fee.
- **Sector penalties** are incurred for a faulted sector that was not declared faulted before a _WindowPoSt_ check occurs. The sector will pay a fault fee after a Sector Penalty once the fault is detected.
- **Termination fees** are incurred when a sector is voluntarily or involuntarily terminated and is removed from the network.

## Consensus fault slashing

This penalty is incurred when committing consensus faults. This penalty is applied to storage providers that have acted maliciously against the network's consensus functionality.
