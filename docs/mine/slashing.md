---
title: 'Slashing'
description: 'Slashing penalizes miners that either fail to provide reliable uptime or act maliciously against the network.'
breadcrumb: 'Slashing'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

In Filecoin, miners are succeptible to two different kinds of slashing: _storage fault slashing_, and _consensus fault slashing_.

## Storage fault slashing

This term encompasses a broader set of penalties which are to be paid by miners if they fail to provide sector reliability or decide to voluntarily exit the network. These include:

- **Fault fees**: a penalty that a miner incurs for each day a miner's sector is offline (fails to submit Proofs-of-Spacetime to the chain). Fault fees continue until the associated wallet is empty and the miner is removed from the network. In the case of a faulted sector, there will be an additional sector penalty added immediately following the fault fee.
- **Sector penalties**: a penalty that a miner incurs for a faulted sector that was not declared faulted before a _WindowPoSt_ check occurs. The sector will pay a fault fee after a Sector Penalty once the fault is detected.
- **Termination fees** is a penalty that a miner incurs when a sector is voluntarily or involuntarily terminated and is removed from the network.

## Consensus fault slashing

This penalty is incurred when committing consensus faults. This penalty is applied to miners that have acted maliciously against the network's consensus functionality.
