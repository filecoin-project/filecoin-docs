---
description: >-
  Become a Filecoin Onchain Cloud storage provider in about five minutes with
  the Dockerized Curio-PDP stack.
---

# Run a PDP provider

Storage is one of the most common things people buy online. [Filecoin Onchain Cloud (FOC)](../../build/filecoin-onchain-cloud/README.md) lets you sell it from your own hardware, and everything you need runs on a single machine. The chain proves you’re still holding the data, and the network sends paying customers your way.

Until recently, getting a PDP node running meant setting up a chain node, a database, and Curio yourself, then wiring the three together. That part is packaged for you now. One command brings the stack up, and a web guide handles the rest. You do **not** need Lotus-miner, Boost, or a PoRep sealing pipeline.

Downloads aside, setup takes about five minutes.

## What’s in the box

Curio-PDP ships as a single Docker Compose stack made up of three pieces:

* **Forest** — the Filecoin chain daemon
* **Yugabyte** — the database
* **Curio-PDP** — the storage node itself, with a web dashboard

They all run in Docker on their own private network. Only Curio-PDP faces the internet, on ports 80 and 443. An external Lotus or Forest node works instead of the bundled Forest, pointed at with `FULLNODE_API_INFO`.

The first time you open the dashboard, it lands you on a setup guide. The guide checks your node and ticks off each step as it completes. Everything is set from the dashboard, so there’s no config file to edit.

## What you need

* A Linux or macOS machine with Docker installed (Docker Compose comes with it)
* 64 GB+ RAM and a 16-thread+ CPU (no GPU required)
* NVMe or SSD for Yugabyte and Forest
* About 100 GB of disk for the chain state and database, plus the storage you want to sell (the guide needs at least 20 GiB of that attached)
* A reliable internet connection
* A domain or subdomain you own
* A little FIL to fund a wallet

## Start the stack

Run these on the machine that’s going to be the node. Use the mainnet lines to run for real, or the Calibration lines to try it on the test network first, where everything runs on free test funds:

```bash
git clone https://github.com/filecoin-project/curio.git

# Mainnet
docker compose -f curio/docker/skiff/docker-compose.yaml up -d
docker compose -f curio/docker/skiff/docker-compose.yaml logs -f

# Calibration test network (free test funds, no real FIL)
cd curio/docker/skiff
docker compose -f docker-compose.yaml -f docker-compose.calibnet.yaml up -d
docker compose -f docker-compose.yaml -f docker-compose.calibnet.yaml logs -f
```

That brings up the node. Yugabyte is up in seconds. Forest downloads a chain snapshot the first time it starts, which takes about 20 minutes, and the first run also builds the Curio-PDP image. Curio-PDP starts as soon as Forest is accepting connections, although the wallet balance and registration checks wait for Forest to finish syncing. By default, everything lives under `curio/docker/skiff/data/`.

Now open `http://127.0.0.1:4701` in a browser. The dashboard only listens on localhost and has no login, so keep it that way. If you’re working on a remote box, forward the port over SSH:

```bash
ssh -fN -L 4701:127.0.0.1:4701 you@your-host
```

You’ll land on the PDP Guide page.

{% hint style="warning" %}
Open only TCP 80 and 443 on your public firewall. Port `4701` is an unauthenticated admin GUI for local operator access — do not publish it to the internet.
{% endhint %}

## The PDP Guide does the rest

The guide is a checklist that the node verifies for you. The boxes tick themselves as each step is confirmed, and you can re-run the checks with the **Re-check** button.

1. **Fund a wallet** — Click **Create wallet** to make a new signing key, or paste in one you already have. A hex private key or the output of `lotus wallet export` will both do. Keep the key safe: if you create it here, this is the only time it’s shown. Then send some FIL to the address on screen. Once it lands, the box ticks itself.
2. **Attach your storage** — Open the Storage page and attach the folders Curio-PDP should use. The stack has already mounted a `/data` folder for you, and attaching that is the simplest option. If your disks are elsewhere, map them under `/data` in `docker/skiff/.env` before you start the stack.
3. **Set your domain** — On the Configuration page, set `HTTP.DomainName` to a domain or subdomain you own and point its DNS at this machine. The guide then checks if it can reach your node at that address. Don’t want to open inbound ports? Create a tunnel in the Cloudflare Zero Trust dashboard and paste its token into the guide. It downloads `cloudflared` and starts the tunnel for you — entirely optional.
4. **Register with FOC** — When the first three are green, the register button unlocks. One click adds you to the Filecoin Onchain Cloud service provider registry. Once the working group approves you, data starts arriving.

From then on, the PDP Overview is your home page: data under proof, proving success and net income over the last 30 days, chain status, wallet balance, and any open alerts, all on one screen.

## What you earn

Customers pay in USDFC, a US dollar stablecoin on Filecoin, and the money streams to you through Filecoin Pay as you prove you’re holding their data. The price list is written into the storage contract, so every provider gets paid the same rates. There is no commission on the storage rate — a 0.5% network fee comes off at settlement, and that’s the only deduction.

Registration gets you into the registry. Once the working group approves you, data is routed to you. Keep the node up and proving, and the data will come.

See the current schedule and how it was worked out in the [FOC pricing docs](https://docs.filecoin.cloud/introduction/about/#pricing), and the [Medium walkthrough](https://medium.com/@filoz/become-a-filecoin-onchain-cloud-storage-provider-in-five-minutes-57abbcd95876) for worked examples.

## Go deeper

Hardware, custom storage paths, external chain nodes, TLS, and troubleshooting:

**[Curio-PDP](https://docs.curiostorage.org/getting-started/curio-pdp)** — [docs.curiostorage.org](https://docs.curiostorage.org/)

* See [About PDP](about.md) for how the protocol fits FOC
* See [Provide Storage](../getting-started.md) if you wanted the PoRep sealing path instead
* Come say hello in [#fil-curio-help](https://filecoinproject.slack.com/archives/C06LF5YP8S3) on Filecoin Slack if you get stuck
