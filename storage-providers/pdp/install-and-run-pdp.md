---
description: >-
  Run a Filecoin Onchain Cloud PDP provider with Dockerized Curio-PDP. Detailed
  operator docs live in the Curio repository.
---

# Run a PDP provider

PDP providers for [Filecoin Onchain Cloud (FOC)](../../build/filecoin-onchain-cloud/README.md) run **Curio-PDP**. You do not need Lotus-miner, Boost, or a PoRep sealing pipeline.

Clone Curio and start the Docker stack:

```bash
git clone https://github.com/filecoin-project/curio.git
docker compose -f curio/docker/skiff/docker-compose.yaml up -d
```

That is the setup. Hardware, fast vs slow disks, the admin GUI, the PDP wallet, HTTPS, and FWSS registration are documented in Curio:

**[Curio-PDP](https://docs.curiostorage.org/getting-started/curio-pdp)** — [docs.curiostorage.org](https://docs.curiostorage.org/)

{% hint style="info" %}
Operator guides for Curio-PDP live in the [Curio repository](https://github.com/filecoin-project/curio) and are published at docs.curiostorage.org. This Filecoin docs page is only the FOC entry point.
{% endhint %}

See [About PDP](about.md) for how the protocol fits FOC, and [Provide Storage](../getting-started.md) if you wanted the PoRep sealing path instead.
