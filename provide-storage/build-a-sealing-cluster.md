---
description: >-
  Build a Curio sealing cluster, the base for archival storage. Seal client
  data into sectors and prove them every day.
---

# Build a sealing cluster

**Archival storage runs on a sealing cluster.** Sealing turns client data into a unique, provable copy called a **sector**. Sealed sectors also give you storage power, which earns FIL block rewards. You run three things: **Lotus** (the chain node and wallets), **YugabyteDB** (the database) and **Curio** (sealing, proving and the storage market).

## Before you start

* Read [How storage providers earn](how-storage-providers-earn.md). Sealing locks up FIL, and penalties are automatic.
* Get the hardware in [Requirements](requirements.md). Calibration Testnet uses the same sector sizes as Mainnet, so you need real sealing hardware there too. You can test with everything on one large machine.
* Run Ubuntu or Debian on every machine.

## Step 1: Prepare each machine

On every machine that will run Lotus or Curio:

```sh
sudo apt update && sudo apt upgrade -y && sudo apt install -y \
  mesa-opencl-icd ocl-icd-opencl-dev gcc git jq pkg-config curl clang \
  build-essential hwloc libhwloc-dev libarchive-dev wget ntp \
  python-is-python3 aria2 libgmp-dev libconfig++-dev protobuf-compiler

sudo sysctl -w net.core.rmem_max=2097152
sudo sysctl -w net.core.rmem_default=2097152
echo 'net.core.rmem_max=2097152'     | sudo tee -a /etc/sysctl.conf
echo 'net.core.rmem_default=2097152' | sudo tee -a /etc/sysctl.conf
```

To build from source (needed for Calibration Testnet), also install Go (the version in Curio's `go.mod`) and Rust. On GPU machines, install your NVIDIA driver and CUDA Toolkit 12 or later.

## Step 2: Run the Lotus chain node

```sh
git clone https://github.com/filecoin-project/lotus.git && cd lotus
git checkout $(curl -s https://api.github.com/repos/filecoin-project/lotus/releases/latest | jq -r .tag_name)

make clean && make GOFLAGS="-tags=calibnet" lotus   # Calibration Testnet
# make clean && make lotus                          # Mainnet
sudo make install-daemon
```

Start from a recent copy of the chain instead of syncing from the start:

```sh
aria2c -x5 -o snapshot.car.zst https://forest-archive.chainsafe.dev/latest/calibnet/   # Calibration Testnet
# aria2c -x5 -o snapshot.car.zst https://forest-archive.chainsafe.dev/latest/mainnet/  # Mainnet

lotus daemon --import-snapshot snapshot.car.zst --remove-existing-chain --halt-after-import
nohup lotus daemon > ~/lotus.log 2>&1 &
lotus sync wait
```

`lotus sync wait` returns when Lotus has caught up. In production, run Lotus as a systemd service.

## Step 3: Create and fund wallets

A miner needs an **owner** address (controls the miner and receives withdrawals), a **worker** address (signs routine messages) and a **sender** address (pays to create the miner). One address can fill more than one role.

```sh
lotus wallet new bls   # owner and sender
lotus wallet new bls   # worker
```

Fund each one. On Calibration Testnet, about 5 test FIL each is enough. On Mainnet, the owner or miner balance must cover your pledge.

Back up the owner key offline: `lotus wallet export <owner-address> > owner.key`. Whoever holds this key controls your miner and its funds.

## Step 4: Run YugabyteDB

For testing, one node is fine. In production, run three or more nodes, and don't use ZFS for their disks.

```sh
echo "$(whoami) soft nofile 1048576" | sudo tee -a /etc/security/limits.conf
echo "$(whoami) hard nofile 1048576" | sudo tee -a /etc/security/limits.conf
ulimit -n 1048576

wget https://software.yugabyte.com/releases/2.25.1.0/yugabyte-2.25.1.0-b381-linux-x86_64.tar.gz
tar xvfz yugabyte-2.25.1.0-b381-linux-x86_64.tar.gz && cd yugabyte-2.25.1.0
./bin/post_install.sh
./bin/yugabyted start --advertise_address 127.0.0.1 \
  --master_flags rpc_bind_addresses=127.0.0.1 \
  --tserver_flags rpc_bind_addresses=127.0.0.1
```

The default login is host `127.0.0.1`, port `5433`, user, password and database all `yugabyte`.

## Step 5: Install Curio

**Mainnet (Debian package):**

```sh
sudo wget -O /usr/share/keyrings/curiostorage-archive-keyring.gpg https://filecoin-project.github.io/apt/KEY.gpg
echo "deb [signed-by=/usr/share/keyrings/curiostorage-archive-keyring.gpg] https://filecoin-project.github.io/apt stable main" \
  | sudo tee /etc/apt/sources.list.d/curiostorage.list
sudo apt update
sudo apt install curio-cuda      # NVIDIA GPUs
```

**Calibration Testnet, or any network from source:**

```sh
git clone https://github.com/filecoin-project/curio.git && cd curio
git checkout $(curl -s https://api.github.com/repos/filecoin-project/curio/releases/latest | jq -r .tag_name)
export RUSTFLAGS="-C target-cpu=native -g" FFI_BUILD_FROM_SOURCE=1 FFI_USE_CUDA=1 FFI_USE_CUDA_SUPRASEAL=1
make clean calibnet     # Calibration Testnet
# make clean build      # Mainnet
sudo make install
```

On every Curio machine, download the proof files to fast disk:

```sh
export FIL_PROOFS_PARAMETER_CACHE=/mnt/nvme/filecoin-proof-parameters
curio fetch-params 32GiB
```

## Step 6: Create your miner

Curio and Lotus must be built for the same network.

```sh
export FULLNODE_API_INFO=$(lotus auth api-info --perm admin | cut -d= -f2-)
curio guided-setup
```

1. Choose **Create a new miner**.
2. Enter your YugabyteDB details.
3. Enter your owner, worker and sender addresses. Set sector size to `32 GiB`. You can't change it later.
4. Wait for Curio to print your new miner ID, such as `f0...`.

If a later step fails after the miner exists, finish with `curio config new-cluster <minerID>`.

## Step 7: Run Curio as a service

Curio's settings live in the database as **layers**: `post` runs proofs, `seal` runs sealing, and `gui` runs the dashboard. Each machine runs the layers that suit its hardware. On one test machine, run all three.

Edit `/etc/curio.env` (the Debian package creates it):

```sh
CURIO_LAYERS=gui,post,seal
CURIO_ALL_REMAINING_FIELDS_ARE_OPTIONAL=true
CURIO_DB_HOST=127.0.0.1
CURIO_DB_USER=yugabyte
CURIO_DB_PASSWORD=yugabyte
CURIO_DB_PORT=5433
CURIO_DB_NAME=yugabyte
CURIO_DB_CASSANDRA_PORT=9042
CURIO_REPO_PATH=/home/youruser/.curio
CURIO_NODE_NAME=curio-1
FIL_PROOFS_USE_MULTICORE_SDR=1
FIL_PROOFS_PARAMETER_CACHE=/mnt/nvme/filecoin-proof-parameters
```

Start it:

```sh
sudo mkdir -p /var/log/curio
sudo systemctl enable --now curio.service
```

If you built from source, create the systemd unit first. See [Curio service](https://docs.curiostorage.org/curio-service).

Open the dashboard through an SSH tunnel to port 4701. It has no login, so never open that port to the internet. To add machines, install Curio on each one, copy `/etc/curio.env` with the right layers, and start the service.

## Step 8: Attach storage

On the machine that owns each disk:

```sh
curio cli storage attach --init --seal  /mnt/nvme/sealing   # fast disk for sealing
curio cli storage attach --init --store /mnt/hdd/sectors    # long-term storage
curio cli storage list
```

## Step 9: Test proving, then seal

Check that the cluster can run a daily proof:

```sh
curio test window-post task --addr <minerID>
```

Then seal one test sector from start to finish:

```sh
curio seal start --now --cc --count 1 --actor <minerID>
curio seal events --actor <minerID>
```

Watch it move through the pipeline on the dashboard. When it finishes, your miner has power. Raise `--count` as your hardware allows. Sectors last 1,278 days (about 3.5 years) by default; change it with `--duration-days`. At 10 TiB of power, you can win blocks.

## Step 10: Turn on the storage market

Curio has a built-in storage market. You don't need Boost.

1. Point a domain at the machine that will run the market, and open port 443.
2.  Add the domain to the `base` layer (`curio config edit base`):

    ```toml
    [HTTP]
    Enable = true
    DomainName = "market.example.com"
    ListenAddress = "0.0.0.0:443"
    ```
3.  Create a `market` layer (`curio config edit market`) and add it to that machine's `CURIO_LAYERS`:

    ```toml
    [Subsystems]
    EnableDealMarket = true
    EnableCommP = true
    EnableParkPiece = true
    ```
4. Restart Curio. If it can't use port 443, run `sudo setcap 'cap_net_bind_service=+ep' /usr/local/bin/curio` and restart.
5. From outside your network, run `curl https://market.example.com`. You should get a "Hello".

Next, register with FCSS to have client datasets matched to you. See [Provide archival storage](provide-archival-storage.md).

## Day-two checklist

* Watch every daily proof deadline, and set alerts so a missed one wakes someone up.
* Keep FIL in your worker and sender wallets for messages, and in your miner for daily fees. Fee debt stops block rewards.
* Run YugabyteDB on several nodes and back it up.
* Upgrade Lotus and Curio before each network upgrade. Old versions stop working.
* Keep the owner key offline, limit SSH, and never open ports 4701 or 12300 to the internet.

## Next steps

* [Provide archival storage](provide-archival-storage.md)
* [Verify and go live](verify-and-go-live.md)
* [Monitor proofs and faults](monitor-proofs-and-faults.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/provide-storage/build-a-sealing-cluster)
