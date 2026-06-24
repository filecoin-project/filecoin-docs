---
description: >-
  PDP is a cryptographic protocol that verifies storage providers hold client data. It is a core component of Filecoin Onchain Cloud.
---

# PDP (Proof of Data Possession)

PDP is a challenge-response protocol that lets applications verify storage providers still hold specific data without re-downloading it. It is a core component of [Filecoin Onchain Cloud (FOC)](../../build/filecoin-onchain-cloud/README.md), where it powers the verification layer for FWSS and Filecoin Pay.

## Table of contents

* [Store with PDP](../store-with-pdp.md) — choose the PDP provider path from the Provide Storage getting-started flow
* [About PDP](about.md) — how the protocol works, when to use it, and what it replaces
* [Install and run PDP](install-and-run-pdp.md) — set up a PDP-enabled storage provider with Lotus, YugabyteDB, and Curio
* [Withdraw funds from Filecoin Pay](withdraw-filecoin-pay.md) — withdraw available USDFC with filpay-cli or Foundry
* [Advanced PDP operations](advanced.md) — configure nginx reverse proxying and LXD container isolation
