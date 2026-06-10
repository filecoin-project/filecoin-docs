---
description: >-
  PDP is a cryptographic protocol that verifies storage providers hold client
  data without re-downloading it.
---

# About PDP

## What PDP is

Proof of Data Possession (PDP) is a cryptographic challenge-response protocol on Filecoin. It lets applications verify that a storage provider still holds specific data without downloading it.

The protocol works in four steps:

1. Providers compute Merkle trees over stored pieces.
2. The PDP contract generates randomized challenges using the drand beacon.
3. Providers submit Merkle inclusion proofs in response.
4. The contract verifies the proofs on-chain.

PDP is a core component of [Filecoin Onchain Cloud (FOC)](../../build/filecoin-onchain-cloud/README.md). Within FOC, the Filecoin Warm Storage Service (FWSS) uses PDP to verify provider availability and Filecoin Pay uses PDP results to adjust payments automatically.

## When to use PDP

* You need verifiable proof that your data is stored and available.
* You want on-chain storage guarantees as part of your application logic.

## What PDP replaces

PDP replaces older programmatic storage patterns built around direct Deal Client contracts and RaaS. Those workflows are preserved as [legacy reference material](../../reference/general/legacy-content.md) only.

## Getting started

1. **Learn about FOC** at [Filecoin Onchain Cloud](../../build/filecoin-onchain-cloud/README.md).
2. **Run PDP infrastructure** with [Install and run PDP](install-and-run-pdp.md).
3. **Build with the Synapse SDK** using the [FOC developer guides](https://docs.filecoin.cloud/developer-guides).
4. **Choose a storage path** via [Upload to Filecoin](../../getting-started/how-storage-works/upload-to-filecoin.md).

## Resources

* [FOC documentation](https://docs.filecoin.cloud/)
* [PDP overview (FOC docs)](https://docs.filecoin.cloud/core-concepts/pdp-overview)
* [FWSS overview (FOC docs)](https://docs.filecoin.cloud/core-concepts/fwss-overview)
* [Synapse SDK repository](https://github.com/FilOzone/synapse-sdk)
