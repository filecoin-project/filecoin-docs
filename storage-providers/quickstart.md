---
description: >-
  One page covering everything you need to start providing storage on Filecoin,
  either as a PDP service provider or as a consensus miner.
keywords: "become storage provider, Filecoin storage provider quickstart, PDP service provider, Curio-PDP, Filecoin miner, consensus miner, Curio, Lotus, FWSS, Filecoin Onchain Cloud"
---

# Storage provider quickstart

This page walks you through becoming a Filecoin storage provider, from choosing a path to running your first proofs. It's written so that a person or an AI agent can follow it from top to bottom without needing any other page.

There are two ways to provide storage on Filecoin today. Pick one before you buy hardware, because the two need very different machines, amounts of capital, and skills.

## Choose your path

| | **PDP service provider** | **Consensus miner** |
| --- | --- | --- |
| **What you do** | Store client data as-is and prove you still hold it using Proof of Data Possession (PDP). You serve it over HTTPS as part of Filecoin Onchain Cloud. | Seal data or empty capacity into sectors using Proof of Replication (PoRep). You prove the sectors every 24 hours, gain storage power, and compete to produce blocks. |
| **How you earn** | Storage fees from clients, paid in USDFC through Filecoin Pay. | Block rewards (FIL) plus fees from storage deals. |
| **Collateral** | No sector pledge. A small FIL balance pays for proof messages. | FIL initial pledge locked for each sector, plus a working balance for fees and messages. |
| **Minimum hardware** | 1 server: 8+ cores, 32 GiB+ RAM, 1 TiB NVMe, 10 TiB+ HDD. No GPU. | A sealing and proving cluster: SHA-extension CPUs, 512 GiB–1 TiB RAM on sealing nodes, 10 GB+ GPUs, several TiB of NVMe scratch, and PiB-scale disk to be competitive. |
| **Software** | Curio-PDP in Docker (bundles Forest and YugabyteDB). | Lotus + YugabyteDB + Curio. |
| **Time to first proof** | Hours, mostly waiting for the chain to sync. | Days to weeks, including hardware setup, chain sync, and sealing. |
| **Retrieval** | Data is always hot and served over HTTPS. | Sealed data must be unsealed (or kept unsealed) to serve retrievals. |
| **Good fit if you…** | Run reliable, internet-facing servers and want a fast, low-capital start. | Run data-center infrastructure, can lock up FIL, and want to earn block rewards. |

Many operators start as a PDP service provider and add a consensus miner later. Both run on Curio, so the skills carry over.

{% hint style="info" %}
**Always start on the Calibration testnet.** Calibration is a full copy of the network that uses free test FIL (tFIL). Every step on this page works on Calibration first. Once your setup survives a few days of proving there, repeat the same steps on mainnet.
{% endhint %}

Jump to your path:

* [Path A: PDP service provider](#path-a-pdp-service-provider)
* [Path B: Consensus miner](#path-b-consensus-miner)

***

## Before you start (both paths)

You need the following no matter which path you choose:

* **Linux admin skills.** You'll work in a terminal on Ubuntu or Debian (22.04 or newer recommended), manage systemd services or Docker containers, open firewall ports, and read logs.
* **A machine that stays online.** Both paths prove to the chain on a fixed schedule. When your node is down, proofs are missed. On the consensus path, missed proofs cost you FIL (see [Know the penalties](#b1-understand-the-economics)).
* **A way to get FIL.** On Calibration, a faucet gives you tFIL for free. To find one, search "Filecoin Calibration faucet"; the ChainSafe faucet at `faucet.calibnet.chainsafe-fil.io` is a common choice. On mainnet you buy FIL.
* **A place to ask for help.** In the Filecoin Slack, `#fil-curio-help` covers Curio, `#fil-pdp` covers PDP and FWSS, and `#fil-lotus-help` covers Lotus.

***

## Path A: PDP service provider

A PDP service provider stores unsealed client data and answers random, on-chain challenges that prove the data is still there. PDP is the verification layer of **Filecoin Onchain Cloud (FOC)**. Clients store data through the **Filecoin Warm Storage Service (FWSS)** and pay providers through **Filecoin Pay**. Once you register your node with FWSS, clients can find you and send you data.

Here's how PDP proving works. You compute Merkle trees over the pieces you store. A smart contract uses the drand randomness beacon to challenge you at random. You answer with Merkle inclusion proofs, and the contract checks them on-chain. PDP needs no sealing, no GPU, and no sector collateral.

You'll run **Curio-PDP**, the Docker-based, PDP-only build of Curio. It is the supported way to run a PDP-only provider. One `docker compose` stack runs three containers:

* **Forest**, a Filecoin chain node. It downloads a snapshot and syncs automatically.
* **YugabyteDB**, which stores Curio's state, piece indexes, and your PDP wallet key.
* **Curio-PDP**, which runs PDP proving, the public PDP HTTPS API, and a local admin GUI.

### A1. Get the hardware and a domain

| Resource | Requirement |
| --- | --- |
| CPU | 8+ cores |
| RAM | 32 GiB+ |
| Fast disk | 1 TiB+ NVMe or SSD for the chain, the database, and the Curio repo |
| Bulk disk | 10 TiB+ HDD (or more) for client piece data |
| GPU | Not required |
| Network | Public IPv4 address and stable upstream bandwidth |
| DNS | A domain name (for example `pdp.example.com`) with an **A record pointing to your server's public IP** |
| Firewall | Inbound **TCP 80 and 443 only**. Keep everything else closed. |

Curio-PDP gets a TLS certificate from Let's Encrypt automatically. For that to work, your domain must already resolve to the server and port 443 must be reachable from the internet.

### A2. Install Docker

If Docker isn't installed yet, install Docker Engine and the Compose plugin:

```sh
sudo apt update && sudo apt install -y ca-certificates curl git
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker "$USER"   # log out and back in afterwards
docker compose version
```

### A3. Get Curio-PDP and configure your disks and domain

Clone the Curio repository **onto your fast disk** and go to the Curio-PDP compose directory:

```sh
cd /mnt/nvme            # your NVMe/SSD mount
git clone https://github.com/filecoin-project/curio.git
cd curio/docker/skiff
```

Edit `.env` in this directory **before the first start**. The domain is written into Curio's configuration on first start, and the data paths decide which disk everything lands on.

```bash
# Image: use the published release image, not the default :dev
SKIFF_IMAGE=filecoin/curio-pdp:calibnet     # Calibration
# SKIFF_IMAGE=filecoin/curio-pdp:latest     # Mainnet

# Your public PDP domain (must already resolve to this server)
SKIFF_HTTP_DOMAIN=pdp.example.com

# Fast disk (NVMe/SSD): database, chain, Curio repo
YUGABYTE_DATA=/mnt/nvme/curio-pdp/yugabyte
FOREST_DATA=/mnt/nvme/curio-pdp/forest
FOREST_TOKEN_DATA=/mnt/nvme/curio-pdp/forest-token
SKIFF_REPO_DATA=/mnt/nvme/curio-pdp/skiff

# Bulk disk (HDD): client piece data, visible inside the container as /data
SKIFF_STORAGE=/mnt/hdd/curio-pdp-pieces
```

Create the directories you listed:

```sh
mkdir -p /mnt/nvme/curio-pdp/{yugabyte,forest,forest-token,skiff} /mnt/hdd/curio-pdp-pieces
```

{% hint style="info" %}
Curio-PDP ships with its own Forest chain node. If you already run a synced Lotus or Forest node, set `FULLNODE_API_INFO` in `.env` (for example `FULLNODE_API_INFO=/ip4/host.docker.internal/tcp/1234/http` for Lotus on the same host). Inside the container, use `host.docker.internal` or a LAN IP, never `127.0.0.1`.
{% endhint %}

### A4. Start the stack

**Calibration:**

```sh
docker compose -f docker-compose.yaml -f docker-compose.calibnet.yaml up -d
```

**Mainnet:**

```sh
docker compose up -d
```

Check health and follow the logs (Ctrl-C stops following, not the containers):

```sh
docker compose ps
docker compose logs -f
```

On first start, Forest downloads a chain snapshot. The mainnet snapshot is large, so this can take a while. Curio-PDP starts as soon as Forest accepts RPC connections, but wallet balances and FWSS registration only work **after Forest has finished syncing**. To watch progress:

```sh
docker compose logs -f forest
```

To stop the stack later, run `docker compose down`. Your data remains in the directories set in `.env`.

### A5. Open the admin GUI

The admin GUI listens on `127.0.0.1:4701` on the server. **It has no login.** Anyone who can reach it can manage your keys, so never expose port 4701 to the internet.

From your laptop, open an SSH tunnel to the server and browse to it locally:

```sh
ssh -fN -L 4701:127.0.0.1:4701 youruser@your-server
# then open http://127.0.0.1:4701 in your browser
```

### A6. Attach piece storage

In the GUI, open **Storage**:

1. Pick a suggested folder under `/data`. This is the `SKIFF_STORAGE` bulk disk from `.env`. You can also enter any existing path inside the container.
2. Select **Attach**. Paths aren't registered automatically, so you must attach at least one.

Client piece data is written to the attached folders. Piece indexes stay in YugabyteDB on your fast disk.

### A7. Create and fund your PDP wallet

Curio-PDP signs its on-chain PDP messages with an Ethereum-style (0x) key stored in YugabyteDB.

1. In the GUI, open **PDP** → wallet section.
2. Choose one:
   * **Create** generates a new key on the node. **The private key is shown only once.** Copy it into your password manager or secrets store before you close the dialog.
   * **Import** lets you paste the hex private key of a 0x address you already control.
3. Copy the **0x address** that the GUI displays and fund it:
   * **Calibration:** at least **5 tFIL** from a faucet.
   * **Mainnet:** about **8 FIL**. Any wallet or exchange that can send to a 0x (f410) address works.

This balance pays gas for registration and for your ongoing proof messages. Keep it topped up. Curio allows only one PDP key per cluster.

{% hint style="warning" %}
The key lives in YugabyteDB. Back up the `YUGABYTE_DATA` directory, or use YugabyteDB's backup tooling, before you redeploy or move servers. If you lose the database without a backup, you lose the key.
{% endhint %}

### A8. Turn on the public HTTPS endpoint

In the GUI, open **Configurations** and edit the **`base`** layer. Curio-PDP reads only `base`, so don't create separate layers. Confirm these values:

```toml
[Subsystems]
EnablePDP = true
EnableWebGui = true
GuiAddress = "127.0.0.1:4701"   # never 0.0.0.0

[HTTP]
Enable = true
DomainName = "pdp.example.com"
DelegateTLS = false             # Curio-PDP terminates TLS itself using Let's Encrypt on port 443
```

Save, then restart Curio-PDP:

```sh
docker compose restart skiff
```

From a machine **outside** your network, check that the endpoint answers over HTTPS:

```sh
curl https://pdp.example.com
```

The response should be a short "Hello" message from Curio. If the check only succeeds from the server itself, see [A10. Troubleshooting](#a10-troubleshooting).

### A9. Register with the Filecoin Warm Storage Service

Registration publishes your node to the on-chain FWSS service provider registry. That's how clients find you.

In the GUI, open **PDP** and find the registration section (labelled **Register**, or **Filecoin Service Registry**):

1. **Provider details.** Enter a **Name** (up to 128 characters) and a **Description** (up to 256 characters), then submit.
2. **PDP offering.** Set the following fields, then submit:

   | Field | Suggested starting value |
   | --- | --- |
   | Service URL | `https://pdp.example.com` |
   | Minimum piece size (bytes) | `1048576` (1 MiB) |
   | Maximum piece size (bytes) | `1073741824` (1 GiB) |
   | Storage price (USDFC per TiB per day) | Your price. `0.833` is roughly USD 25 per TiB per month. |
   | Minimum proving period (epochs) | `30` |
   | Location | For example `C=US;ST=California;L=San Francisco`. Only `C=` is required. |

3. **Capabilities.** Add these key/value pairs:

   | Key | Value |
   | --- | --- |
   | `serviceStatus` | `prod` |
   | `capacityTib` | Your available capacity in TiB |

Each submission is an on-chain transaction paid from your PDP wallet. You can come back and change the offering at any time.

Optionally, confirm end-to-end reachability with `pdptool`, which ships in the Curio repo and needs Go installed:

```sh
cd ~/curio/cmd/pdptool && go build .   # use the path where you cloned Curio in A3
./pdptool ping --service-url https://pdp.example.com --service-name public
# Expected: Ping successful: Service is reachable and JWT token is valid.
```

**You're now a PDP service provider.** Your node syncs the chain, stores pieces on your bulk disk, answers PDP challenges, and is listed in the FWSS registry. When you're comfortable on Calibration, repeat A3–A9 on mainnet with the mainnet image, a mainnet domain, and a new mainnet data directory.

### A10. Troubleshooting

| Symptom | What to check |
| --- | --- |
| Wallet balance shows an error | Forest is still syncing. Run `docker compose logs -f forest` and wait. |
| Curio-PDP can't reach the chain node | Bundled Forest: check that the `forest` container is healthy. External node: use `host.docker.internal` or a LAN IP, not `127.0.0.1`. |
| "PDP wallet not configured" alert | Complete [A7](#a7-create-and-fund-your-pdp-wallet). |
| No storage paths | Complete [A6](#a6-attach-piece-storage). Check that the container can write to the folder. |
| HTTPS works locally but not remotely | Check that the DNS A record points to your public IP, that ports 80 and 443 are open inbound, and that no other service holds port 443. |
| Registration fails | Check that the wallet is funded, Forest is synced, and `HTTP.DomainName` matches a domain that resolves to this server. |

***

## Path B: Consensus miner

A consensus miner (the traditional Filecoin storage provider) commits storage to the network in **sectors**. Each sector is 32 GiB or 64 GiB of data, or empty "committed capacity," sealed with Proof of Replication. The sectors you prove give you **storage power**. Every 30-second epoch, the network elects miners in proportion to their power to produce blocks and earn **block rewards**.

You'll run three pieces of software:

* **Lotus**, a full Filecoin chain node. It syncs the chain, holds your wallets, and sends messages.
* **YugabyteDB**, the database that coordinates every Curio node in your cluster (Curio calls it HarmonyDB).
* **Curio**, the storage provider software. It seals sectors, runs WindowPoSt and WinningPoSt, and runs the storage market. It replaces the older `lotus-miner`, `lotus-worker`, and Boost stack. Boost no longer works with current Curio releases.

### B1. Understand the economics

Read this section before you buy anything. Consensus mining locks up capital, and penalties are automatic.

**How you prove storage:**

* **Sealing (PoRep).** Sealing encodes each sector into a unique replica. It's the compute-heavy step, and it's what your sealing hardware is for.
* **WindowPoSt.** Every sector is proven once every 24 hours. The day is split into 48 deadlines of 30 minutes each. Your sectors are assigned to deadlines, and you must submit each proof on-chain within its 30-minute window.
* **WinningPoSt.** When you're elected to produce a block, you must produce a short proof within seconds to claim the reward.

**How you earn:**

* **Block rewards.** Your odds of winning a block are proportional to your share of network power. You need **at least 10 TiB of raw power** to be eligible at all. Even above that threshold, small miners may wait a long time for their first block. 25% of each reward is available immediately; the other 75% vests over about 180 days.
* **Deal fees.** Clients can pay you to store their data in your sectors. Verified deals (Filecoin Plus) give those sectors a 10× quality-adjusted power multiplier, which raises your block-reward odds and your pledge by the same factor.

**What you lock up and pay:**

* **Initial pledge.** FIL locked per sector for the sector's lifetime. As a rule of thumb, *pledge for X TiB ≈ (current initial pledge per 32 GiB sector) × 32 × X*. Chain explorers show the current per-sector pledge. For example, at 0.20 FIL per sector, 100 TiB needs about 640 FIL.
* **Pre-commit deposit.** A smaller deposit when a sector is pre-committed. You lose it if the sector never completes sealing.
* **Gas.** Paid for pre-commit, prove-commit, and WindowPoSt messages.
* **Daily sector fee (FIP-0100).** Every new, extended, or updated sector pays a small daily fee based on its power. The fee comes first from your vesting rewards, then from your miner's available balance. Any shortfall becomes **fee debt**. While you have fee debt, you can't win block rewards, and some messages (such as new pre-commits) may be blocked.

**What it costs you when things go wrong:**

* **Fault fee.** Charged for each day a sector misses its WindowPoSt.
* **Sector penalty.** Charged for a fault you didn't declare before the proof was due.
* **Termination fee.** Charged when a sector ends early.
* **Consensus fault slashing.** For provably malicious behavior.

{% hint style="warning" %}
**Plan for the startup gap.** Before your first block reward arrives, you pay pledge, gas, and daily fees out of pocket. Keep a FIL buffer in your miner actor for fees and WindowPoSt messages, and don't withdraw it all. An underfunded miner can get stuck: it can't seal new sectors, it can miss proofs, and it can't win blocks.
{% endhint %}

Committed capacity (CC) sectors, which are sealed with no client data, are the simplest way to start. Their profitability depends heavily on the FIL price. Most serious operators add verified client deals over time, either by sealing them into new sectors or by upgrading CC sectors in place with SnapDeals.

### B2. Get the hardware

You can start on Calibration with everything on one large machine. A production mainnet setup splits the work across roles. Sector sizes on Calibration match mainnet, so you need real sealing hardware on Calibration too.

| Role | Typical spec | Notes |
| --- | --- | --- |
| **Chain node** (Lotus) | 8+ cores, 64 GiB+ RAM, 2 TB NVMe, public IP | Must be available at all times. Run a second daemon for failover in production. |
| **YugabyteDB** | 3 nodes in production (can share hosts with Curio) | A single node is fine for testing. In production, losing the database stops Curio, so run 3+ nodes, back them up, and don't use ZFS for the database disks. |
| **PoSt node(s)** (Curio `post` layer) | 16 cores, 128 GiB+ RAM, 1 GPU with 10 GB+ VRAM | Runs WindowPoSt and WinningPoSt. Run at least two for redundancy. Missing a proof costs you FIL. |
| **Sealing: SDR (PC1)** | 32+ cores **with SHA extensions** (AMD EPYC or recent Xeon), 1 TiB RAM, about 450 GiB NVMe scratch per parallel sector | CPU-bound. Check support with `grep -c sha_ni /proc/cpuinfo` (any non-zero result means supported). |
| **Sealing: trees (PC2) and SNARK (C2)** | 32 cores, 512 GiB RAM, GPU with 24 GB+ VRAM, NVMe scratch | GPU-bound. Plan about two PC2 GPUs per PC1 node. |
| **Long-term storage** | Large HDD pools (for example RAIDZ2, 12-disk vdevs) with about 20% headroom | Holds sealed (and optionally unsealed) sectors. Must be readable by your PoSt nodes. |
| **Network** | 10 GbE internally, 1–10 Gbps internet if you take online deals | Deal data ingest is bandwidth-heavy. |

For scale, a well-balanced 1 PiB setup seals up to about 7 TiB per day. To start without owning sealing hardware, you can buy sealing from a Sealing-as-a-Service provider. You still need the chain node, the database, PoSt nodes, and storage.

### B3. Prepare each Linux host

Run the following on every host that will run Lotus or Curio (Ubuntu or Debian).

```sh
sudo apt update && sudo apt upgrade -y && sudo apt install -y \
  mesa-opencl-icd ocl-icd-opencl-dev gcc git jq pkg-config curl clang \
  build-essential hwloc libhwloc-dev libarchive-dev wget ntp \
  python-is-python3 aria2 libgmp-dev libconfig++-dev protobuf-compiler

# Raise the UDP buffer (needed by Curio and Lotus networking)
sudo sysctl -w net.core.rmem_max=2097152
sudo sysctl -w net.core.rmem_default=2097152
echo 'net.core.rmem_max=2097152'     | sudo tee -a /etc/sysctl.conf
echo 'net.core.rmem_default=2097152' | sudo tee -a /etc/sysctl.conf
```

If you'll build from source, which you must for Calibration, also install Go and Rust. Use the Go version that Curio's `go.mod` requires (1.26.8 at the time of writing):

```sh
wget -c https://go.dev/dl/go1.26.8.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc && source ~/.bashrc

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh   # choose the default install
source "$HOME/.cargo/env"
```

On GPU hosts, install your NVIDIA driver and the **CUDA Toolkit 12.x or later** so that `nvcc` is on your `PATH`. Curio's Linux build uses CUDA by default.

### B4. Run the Lotus chain node

Build Lotus from the latest release:

```sh
git clone https://github.com/filecoin-project/lotus.git && cd lotus
git checkout $(curl -s https://api.github.com/repos/filecoin-project/lotus/releases/latest | jq -r .tag_name)

make clean && make GOFLAGS="-tags=calibnet" lotus   # Calibration
# make clean && make lotus                          # Mainnet
sudo make install-daemon
lotus --version
```

Import a recent snapshot instead of syncing from genesis, then start the daemon:

```sh
aria2c -x5 -o snapshot.car.zst https://forest-archive.chainsafe.dev/latest/calibnet/   # Calibration
# aria2c -x5 -o snapshot.car.zst https://forest-archive.chainsafe.dev/latest/mainnet/  # Mainnet

lotus daemon --import-snapshot snapshot.car.zst --remove-existing-chain --halt-after-import
nohup lotus daemon > ~/lotus.log 2>&1 &
lotus sync wait      # returns when the node has caught up with the chain
```

In production, run the daemon as a systemd service rather than with `nohup`.

### B5. Create and fund your wallets

A miner needs an **owner** address (it controls the miner and receives withdrawals), a **worker** address (it signs routine messages), and a **sender** address (it pays for the create-miner message). The same address can fill more than one role. On the Lotus node, create two BLS wallets:

```sh
lotus wallet new bls   # wallet 1: owner and sender
lotus wallet new bls   # wallet 2: worker
lotus wallet list
```

Fund each wallet. On Calibration, about 5 tFIL each from a faucet is plenty to get started. On mainnet, the owner or miner balance must eventually cover your initial pledge (see [B1](#b1-understand-the-economics)).

{% hint style="danger" %}
Back up your owner key offline: `lotus wallet export <owner-address> > owner.key`. Store the file in a secure location, not on the server. Whoever holds the owner key controls your miner and its funds.
{% endhint %}

### B6. Run YugabyteDB

For a test setup, run a single node. For production, deploy a 3-node cluster using the same steps on each host.

```sh
# Raise the open-file limit first
echo "$(whoami) soft nofile 1048576" | sudo tee -a /etc/security/limits.conf
echo "$(whoami) hard nofile 1048576" | sudo tee -a /etc/security/limits.conf
ulimit -n 1048576

wget https://software.yugabyte.com/releases/2.25.1.0/yugabyte-2.25.1.0-b381-linux-x86_64.tar.gz
tar xvfz yugabyte-2.25.1.0-b381-linux-x86_64.tar.gz && cd yugabyte-2.25.1.0
./bin/post_install.sh
./bin/yugabyted start --advertise_address 127.0.0.1 \
  --master_flags rpc_bind_addresses=127.0.0.1 \
  --tserver_flags rpc_bind_addresses=127.0.0.1
./bin/yugabyted status
```

If the start fails with a locale error, run `sudo locale-gen en_US.UTF-8` and try again. The default connection values are host `127.0.0.1`, port `5433`, user `yugabyte`, password `yugabyte`, and database `yugabyte`.

### B7. Install Curio

**Mainnet, Debian package (recommended):**

```sh
sudo wget -O /usr/share/keyrings/curiostorage-archive-keyring.gpg https://filecoin-project.github.io/apt/KEY.gpg
echo "deb [signed-by=/usr/share/keyrings/curiostorage-archive-keyring.gpg] https://filecoin-project.github.io/apt stable main" \
  | sudo tee /etc/apt/sources.list.d/curiostorage.list
sudo apt update
sudo apt install curio-cuda      # NVIDIA GPUs
# sudo apt install curio-opencl  # OpenCL GPUs
```

**Calibration, or building from source on any network:**

```sh
git clone https://github.com/filecoin-project/curio.git && cd curio
git checkout $(curl -s https://api.github.com/repos/filecoin-project/curio/releases/latest | jq -r .tag_name)

export RUSTFLAGS="-C target-cpu=native -g"
export FFI_BUILD_FROM_SOURCE=1
export FFI_USE_CUDA=1 FFI_USE_CUDA_SUPRASEAL=1    # NVIDIA; for OpenCL use FFI_USE_OPENCL=1 instead

make clean calibnet     # Calibration
# make clean build      # Mainnet
sudo make install       # installs /usr/local/bin/curio
curio --version
```

Download the proving parameters on every Curio host. The download is large, so put the cache on fast disk:

```sh
export FIL_PROOFS_PARAMETER_CACHE=/mnt/nvme/filecoin-proof-parameters
curio fetch-params 32GiB
```

### B8. Create your miner

Run the guided setup on your first Curio node. Curio must be built for the same network as your Lotus node. A Calibration Lotus node can't be used with a mainnet Curio.

```sh
export FULLNODE_API_INFO=$(lotus auth api-info --perm admin | cut -d= -f2-)
curio guided-setup
```

1. Choose **Create a new miner**. If you're moving an existing `lotus-miner`, choose **Migrate from existing Lotus-Miner** instead, and run the setup on the `lotus-miner` host.
2. Enter your YugabyteDB connection details (the defaults from B6), then choose **Continue to connect and update schema**.
3. Enter your **owner**, **worker**, and **sender** addresses from B5. Set **Sector size** to `32 GiB`. You can't change the sector size later without creating a new miner.
4. Wait for the `CreateMiner` message to land. Curio prints your new miner ID (for example `t01004` on Calibration or `f0…` on mainnet) and writes it into the `base` configuration layer.
5. Choose what telemetry to share with the Curio team, then finish.

If a later step fails after the miner was created, complete the configuration with `curio config new-cluster <minerID>`.

### B9. Run Curio as a service

Curio's configuration lives in YugabyteDB as stackable **layers**. `base` is always applied. The built-in layers `post` (WindowPoSt and WinningPoSt), `seal` (the full sealing pipeline), and `gui` (the web UI on port 4701) switch on the matching tasks. Each node runs the layers that match its hardware. On a single test machine, run all of them.

Create `/etc/curio.env`. The Debian package creates it for you, so just edit it.

```sh
CURIO_LAYERS=gui,post,seal
CURIO_ALL_REMAINING_FIELDS_ARE_OPTIONAL=true
CURIO_DB_HOST=127.0.0.1          # comma-separate all Yugabyte nodes in production
CURIO_DB_USER=yugabyte
CURIO_DB_PASSWORD=yugabyte
CURIO_DB_PORT=5433
CURIO_DB_NAME=yugabyte
CURIO_DB_CASSANDRA_PORT=9042
CURIO_REPO_PATH=/home/youruser/.curio   # use an absolute path; systemd doesn't expand ~
CURIO_NODE_NAME=curio-1
FIL_PROOFS_USE_MULTICORE_SDR=1
FIL_PROOFS_PARAMETER_CACHE=/mnt/nvme/filecoin-proof-parameters
```

If you built from source, create `/etc/systemd/system/curio.service`:

```ini
[Unit]
Description=Curio
After=network.target

[Service]
ExecStart=/usr/local/bin/curio run
Environment=GOLOG_FILE="/var/log/curio/curio.log"
Environment=GOLOG_LOG_FMT="json"
EnvironmentFile=/etc/curio.env
LimitNOFILE=1000000
Restart=always
RestartSec=10
RestartForceExitStatus=100

[Install]
WantedBy=multi-user.target
```

Start it:

```sh
sudo mkdir -p /var/log/curio
sudo systemctl daemon-reload
sudo systemctl enable --now curio.service
systemctl status curio.service
```

To reach the web GUI, open an SSH tunnel to port 4701 (`ssh -fN -L 4701:127.0.0.1:4701 youruser@your-server`) and browse to `http://127.0.0.1:4701`. The GUI has no login, so don't expose it publicly. To add more machines, install Curio on each one, give it the same `/etc/curio.env` with the `CURIO_LAYERS` that match its role, and start the service.

### B10. Attach storage

Each Curio node needs to know where it can seal and where to store finished sectors. Run the following on the node that owns each disk:

```sh
curio cli storage attach --init --seal  /mnt/nvme/sealing     # fast NVMe scratch for sealing
curio cli storage attach --init --store /mnt/hdd/sectors      # long-term storage for sealed sectors
curio cli storage list
```

To attach storage on a remote node, add `--machine <ip>:12300` after `cli`. Curio can place sealed and unsealed copies on different paths. Each path's `sectorstore.json` file controls which file types it accepts (`AllowTypes` and `DenyTypes`).

### B11. Test proving, then seal your first sectors

Before you seal anything, confirm that the cluster can compute a WindowPoSt:

```sh
curio test window-post task --addr <minerID>
```

The task should be picked up by a node running the `post` layer and complete without errors. Then seal one committed-capacity sector end to end:

```sh
curio seal start --now --cc --count 1 --actor <minerID>
curio seal events --actor <minerID>      # follow the pipeline
```

You can also watch the sector move through the pipeline (SDR, trees, pre-commit, PoRep, commit) on the sealing pipeline page in the GUI. When it finishes, your miner has storage power. Increase `--count` as your hardware allows. By default, sectors are committed for 1,278 days (about 3.5 years); set a different term with `--duration-days`.

Once you have **10 TiB of power**, you become eligible for block rewards.

### B12. Take storage deals (optional)

Sealing client data earns deal fees, and verified deals give you a 10× power multiplier. Curio has a built-in storage market. You don't need Boost.

1. Point a domain at the node that will run the market, and open port 443 on it.
2. Put the domain in the `base` layer (`curio config edit base`):

   ```toml
   [HTTP]
   Enable = true
   DomainName = "market.example.com"
   ListenAddress = "0.0.0.0:443"
   ```

3. Create a `market` layer (`curio config edit market`) and add it to that node's `CURIO_LAYERS`:

   ```toml
   [Subsystems]
   EnableDealMarket = true
   EnableCommP = true
   EnableParkPiece = true
   ```

4. Restart Curio. If it fails to bind port 443, run `sudo setcap 'cap_net_bind_service=+ep' /usr/local/bin/curio` and restart again.
5. From outside your network, run `curl https://market.example.com`. You should get a "Hello" response from Curio.

To find clients, look at Filecoin Plus programs and data onboarding programs. Ask in `#fil-curio-help` for current options.

**You're now a consensus miner.** Your miner has an on-chain identity, proves its sectors every day, gains power as it seals, and becomes eligible to win blocks. When you're ready for mainnet, repeat B4–B11 with mainnet builds, new wallets, and real FIL.

### B13. Day-two checklist

* **Watch every WindowPoSt deadline.** The GUI shows proving status per deadline. Set up alerts so a missed deadline pages a human.
* **Keep balances funded.** Keep enough FIL in your worker and sender wallets for messages, and in the miner actor for FIP-0100 daily fees. Fee debt blocks block rewards.
* **Keep the database healthy.** Losing YugabyteDB stops Curio, so run a multi-node cluster and back it up regularly.
* **Upgrade on time.** Network upgrades have hard deadlines, and outdated Lotus or Curio builds stop working at the upgrade epoch.
* **Protect your keys.** Store the owner key offline, restrict SSH access, and never expose ports 4701 (GUI) or 12300 (Curio API) to the internet.

***

## Quick reference for agents

If you're automating either path, these are the minimum steps and the checks that must pass at each stage.

**PDP service provider (Curio-PDP)**

1. The host meets A1. DNS A record → public IP. Inbound TCP 80 and 443 are open.
2. `git clone https://github.com/filecoin-project/curio.git && cd curio/docker/skiff`
3. Set `.env`: `SKIFF_IMAGE`, `SKIFF_HTTP_DOMAIN`, `*_DATA` → NVMe, `SKIFF_STORAGE` → HDD.
4. `docker compose [-f docker-compose.yaml -f docker-compose.calibnet.yaml] up -d`. Check: `docker compose ps` shows all three services healthy.
5. Wait for Forest to sync. Check: `docker compose logs forest` shows the chain at head.
6. GUI (`127.0.0.1:4701` via SSH tunnel) → Storage → attach `/data/...`.
7. GUI → PDP → Create or Import a key → fund the 0x address (5 tFIL or 8 FIL).
8. GUI → Configurations → `base`: `HTTP.Enable = true`, `HTTP.DomainName` set. Then `docker compose restart skiff`. Check: external `curl https://<domain>` succeeds.
9. GUI → PDP → Register: provider details, PDP offering, `serviceStatus=prod`, `capacityTib`. Check: `pdptool ping --service-url https://<domain> --service-name public` succeeds.

**Consensus miner (Lotus + YugabyteDB + Curio)**

1. The host meets B2 and has the B3 packages. `sha_ni` is present on the SDR hosts.
2. Lotus is built for the target network, imported from a snapshot, and running. Check: `lotus sync wait` returns.
3. `lotus wallet new bls` ×2, funded. The owner key is exported and stored offline.
4. YugabyteDB is running. Check: `yugabyted status` reports healthy.
5. Curio is installed for the same network. Check: `curio --version`. Run `curio fetch-params 32GiB`.
6. `curio guided-setup` → Create a new miner → 32 GiB sectors. Record the miner ID.
7. `/etc/curio.env` with `CURIO_LAYERS=gui,post,seal`. `systemctl enable --now curio`.
8. `curio cli storage attach --init --seal …` and `--store …`.
9. Check: `curio test window-post task --addr <minerID>` succeeds.
10. `curio seal start --now --cc --count 1 --actor <minerID>`. Check: the sector reaches the proving state and the miner has non-zero power.

***

## Getting help

* **Curio, sealing, and proving:** Filecoin Slack `#fil-curio-help`
* **PDP, FWSS, and Filecoin Onchain Cloud:** Filecoin Slack `#fil-pdp`
* **Lotus chain node:** Filecoin Slack `#fil-lotus-help`

When you ask for help, include your Curio and Lotus versions (`curio --version`, `lotus --version`), which network you're on, the exact command you ran, and the relevant log lines.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/storage-providers/quickstart)
