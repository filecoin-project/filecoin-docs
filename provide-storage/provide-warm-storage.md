---
description: >-
  Run a warm storage provider on one server with the Curio-PDP Docker stack,
  and register with Filecoin Warm Storage.
---

# Provide warm storage

**Curio-PDP is the Docker build of Curio for warm storage.** One command starts three containers: **Forest** (the chain node), **YugabyteDB** (the database) and **Curio-PDP** (the storage node with a web dashboard). A setup guide in the dashboard walks you through the rest. You don't need lotus-miner, Boost or sealing hardware.

Want an AI agent to set this up and run it for you? See [Provide warm storage with an agent](provide-warm-storage-with-an-agent.md).

## Before you start

* A Linux server with 16 threads, 64 GB RAM, 1 TiB NVMe or SSD, and 10 TiB or more of hard disk. No GPU.
* A public IPv4 address. Open only TCP ports 80 and 443 to the internet.
* A domain, such as `pdp.example.com`, with an A record that points to your server.
* FIL for your PDP wallet: 5 test FIL on Calibration Testnet (free from a faucet), or about 8 FIL on Mainnet.

Start on Calibration Testnet. Move to Mainnet once your node has proved for a few days.

## Step 1: Install Docker

```sh
sudo apt update && sudo apt install -y ca-certificates curl git
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker "$USER"   # log out and back in afterwards
docker compose version
```

## Step 2: Get Curio and set your disks and domain

Clone Curio onto your fast disk:

```sh
cd /mnt/nvme
git clone https://github.com/filecoin-project/curio.git
cd curio/docker/skiff
```

Edit `.env` in this folder **before the first start**:

```bash
SKIFF_IMAGE=filecoin/curio-pdp:calibnet     # Calibration Testnet
# SKIFF_IMAGE=filecoin/curio-pdp:latest     # Mainnet

SKIFF_HTTP_DOMAIN=pdp.example.com

# Fast disk: database, chain, Curio files
YUGABYTE_DATA=/mnt/nvme/curio-pdp/yugabyte
FOREST_DATA=/mnt/nvme/curio-pdp/forest
FOREST_TOKEN_DATA=/mnt/nvme/curio-pdp/forest-token
SKIFF_REPO_DATA=/mnt/nvme/curio-pdp/skiff

# Hard disk: client data, shown as /data inside the container
SKIFF_STORAGE=/mnt/hdd/curio-pdp-pieces
```

Create those folders:

```sh
mkdir -p /mnt/nvme/curio-pdp/{yugabyte,forest,forest-token,skiff} /mnt/hdd/curio-pdp-pieces
```

Already run a synced Lotus or Forest node? Set `FULLNODE_API_INFO` in `.env` to use it. Inside the container, use `host.docker.internal` or a LAN IP, not `127.0.0.1`.

## Step 3: Start the stack

```sh
# Calibration Testnet
docker compose -f docker-compose.yaml -f docker-compose.calibnet.yaml up -d

# Mainnet
docker compose up -d
```

Check that all three containers are healthy:

```sh
docker compose ps
```

On first start, Forest downloads a copy of the chain. On Calibration Testnet this takes about 20 minutes; Mainnet takes longer. Wallet balances and registration only work once Forest has caught up. Watch it with `docker compose logs -f forest`.

## Step 4: Open the dashboard

The dashboard runs on port 4701 and **has no login**, so never open that port to the internet. From your laptop, use an SSH tunnel:

```sh
ssh -fN -L 4701:127.0.0.1:4701 youruser@your-server
```

Then open `http://127.0.0.1:4701`. You land on the **PDP Guide**, a checklist that ticks itself as each step works.

## Step 5: Follow the PDP Guide

1. **Fund a wallet.** Select **Create wallet**, or import a key you already have. If you create one, **the private key is shown only once**: save it in your password manager. Send FIL to the 0x address on screen. This balance pays for your proof messages, so keep it topped up.
2. **Attach storage.** On the Storage page, attach a folder under `/data`. This is the hard disk you set as `SKIFF_STORAGE`.
3. **Set your domain.** On the Configuration page, check that `HTTP.DomainName` is your domain. Curio gets an HTTPS certificate for it automatically.
4. **Register.** When the first three steps are green, select **Register**. Fill in a name, a description, your location (only the country, such as `C=US`, is required) and your storage capacity in TiB.

Then update your offering: set **Service URL** to `https://pdp.example.com`, and add the capability `serviceStatus` with the value `prod`.

You don't set a price. The contract sets the same price for every provider.

## Step 6: Check it works

From a machine **outside** your network:

```sh
curl https://pdp.example.com
```

You should get a short "Hello" from Curio.

Registering puts you in the provider list, but client data doesn't arrive right away. The network tests your node and the working group approves you first. Keep the node online and proving while you wait. The **PDP Overview** page shows your data, proofs, income, wallet balance and alerts.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Wallet balance shows an error | Forest is still catching up. Wait and check `docker compose logs -f forest`. |
| Curio can't reach the chain node | Check the `forest` container is healthy. For your own node, use `host.docker.internal` or a LAN IP. |
| "PDP wallet not configured" | Finish the wallet step in the PDP Guide. |
| No storage paths | Attach a folder under `/data`, and check the container can write to it. |
| HTTPS works on the server but not from outside | Check the A record points to your public IP, ports 80 and 443 are open, and nothing else uses port 443. |
| Register button stays off | Fund the wallet, wait for Forest to catch up, and check the domain points to this server. |

Back up the `YUGABYTE_DATA` folder before you move or rebuild the server. Your PDP wallet key is stored there.

## Next steps

* [Verify and go live](verify-and-go-live.md)
* [Payouts and withdrawals](payouts-and-withdrawals.md)
* [Monitor proofs and faults](monitor-proofs-and-faults.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/provide-storage/provide-warm-storage)
