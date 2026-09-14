---
description: >-
  PDP is a cryptographic protocol that verifies storage providers hold client data. It is a core component of Filecoin Onchain Cloud.
---

# PDP (Proof of Data Possession)

PDP is a challenge-response protocol that lets applications verify storage providers still hold specific data without re-downloading it. It is a core component of [Filecoin Onchain Cloud (FOC)](../../build/filecoin-onchain-cloud/README.md), where it powers the verification layer for FWSS and Filecoin Pay.

## Run a PDP provider

Clone [Curio](https://github.com/filecoin-project/curio) and start the Docker stack:

```bash
git clone https://github.com/filecoin-project/curio.git
docker compose -f curio/docker/skiff/docker-compose.yaml up -d
```

That brings up Curio-PDP. Detailed operator docs (hardware, disks, wallet, TLS, FWSS registration) live in Curio:

**[Curio-PDP](https://docs.curiostorage.org/getting-started/curio-pdp)** on [docs.curiostorage.org](https://docs.curiostorage.org/)

## Table of contents

* [About PDP](about.md) — how the protocol works, when to use it, and what it replaces
* [Run a PDP provider](install-and-run-pdp.md) — clone Curio, `docker compose up`, and the Curio-PDP docs
