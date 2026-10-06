---
description: >-
  PDP is a cryptographic protocol that verifies storage providers hold client data. It is a core component of Filecoin Onchain Cloud.
---

# PDP (Proof of Data Possession)

PDP is a challenge-response protocol that lets applications verify storage providers still hold specific data without re-downloading it. It is a core component of [Filecoin Onchain Cloud (FOC)](../../build/filecoin-onchain-cloud/README.md), where it powers the verification layer for FWSS and Filecoin Pay.

## Run a PDP provider

FOC lets you sell storage from your own hardware, and everything you need runs on a single machine. The Curio-PDP Docker stack packages Forest (chain), Yugabyte (database), and Curio-PDP (the storage node with a web dashboard). One command brings it up; a web guide on `http://127.0.0.1:4701` handles wallet, disks, domain, and FOC registration. Downloads aside, setup takes about five minutes.

```bash
git clone https://github.com/filecoin-project/curio.git

# Mainnet
docker compose -f curio/docker/skiff/docker-compose.yaml up -d

# Calibration test network (free test funds)
cd curio/docker/skiff
docker compose -f docker-compose.yaml -f docker-compose.calibnet.yaml up -d
```

Full walkthrough — what’s in the box, what you need, the PDP Guide steps, and what you earn:

**[Run a PDP provider](install-and-run-pdp.md)** · **[Curio-PDP](https://docs.curiostorage.org/getting-started/curio-pdp)** on [docs.curiostorage.org](https://docs.curiostorage.org/)

## Table of contents

* [About PDP](about.md) — how the protocol works, when to use it, and what it replaces
* [Run a PDP provider](install-and-run-pdp.md) — Docker Compose stack, PDP Guide, and Curio-PDP docs
