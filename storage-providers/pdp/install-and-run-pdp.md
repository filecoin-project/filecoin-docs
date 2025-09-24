---
description: >-
  This guide walks you through setting up a PDP-enabled Filecoin Storage
  Provider using Lotus, YugabyteDB, and Curio
---

# Install & Run PDP

{% hint style="danger" %}
**ALPHA FEATURE - UNDER DEVELOPMENT**

This documentation covers the PDP (Proof of Data Possession) feature, which is currently in alpha and under active development. This tool is intended for testing and experimental use only.

For production use and submitting real deals with live PDP Storage Providers, please use the [Synapse SDK](https://github.com/FilOzone/synapse-sdk).
{% endhint %}

## 🚀 Prerequisites

{% hint style="warning" %}
**Note:** This guide is written specifically for **Ubuntu 22.04**. If you are using a different Linux distribution, refer to the relevant documentation for package installation and compatibility.
{% endhint %}

Before starting, make sure you have a user with **sudo privileges**. This section prepares your system for the PDP stack.

***

### 🧰 System Package Installation

```sh
sudo apt update && sudo apt upgrade -y && sudo apt install -y \
  mesa-opencl-icd ocl-icd-opencl-dev gcc git jq pkg-config curl clang \
  build-essential hwloc libhwloc-dev libarchive-dev wget ntp python-is-python3 aria2
```

***

### :hammer: Install Go (v1.23.7)

```sh
sudo rm -rf /usr/local/go
wget https://go.dev/dl/go1.23.7.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.23.7.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc
go version
```

{% hint style="success" %}
You should see something like: `go version go1.23.7 linux/amd64`
{% endhint %}

***

### :wrench: Install Rust

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

{% hint style="info" %}
When prompted, choose the option 1) Proceed with standard installation (default — just press Enter).
{% endhint %}

```sh
source $HOME/.cargo/env
rustc --version
```

{% hint style="success" %}
You should see something like: `rustc 1.86.0 (05f9846f8 2025-03-31)`
{% endhint %}

***

### 🔐 Add Go and Rust to Secure Sudo Path

```sh
sudo tee /etc/sudoers.d/dev-paths <<EOF
Defaults secure_path="/usr/local/go/bin:$HOME/.cargo/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
EOF
```

***

## ⛓️ Installing and Running Lotus - Calibration Testnet

🧠 Lotus is your gateway to the Filecoin network. It syncs the chain, manages wallets, and is required for Curio to interact with your node.

<table data-view="cards"><thead><tr><th></th><th data-hidden></th><th data-hidden data-card-cover data-type="files"></th></tr></thead><tbody><tr><td>Lotus Documentation</td><td><a href="https://lotus.filecoin.io/lotus/get-started/what-is-lotus/">https://lotus.filecoin.io/lotus/get-started/what-is-lotus/</a></td><td><a href="../../.gitbook/assets/lotus-logo-big.png">lotus-logo-big.png</a></td></tr><tr><td>Lotus Support Channels</td><td><a href="https://filecoinproject.slack.com/archives/CPFTWMY7N">Filecoin Slack - #fil-lotus-help</a></td><td><a href="../../.gitbook/assets/Filecoin.svg.png">Filecoin.svg.png</a></td></tr></tbody></table>

### 🔧 Build Lotus Daemon

Clone and check out Lotus:

```sh
git clone https://github.com/filecoin-project/lotus.git
cd lotus
git checkout $(curl -s https://api.github.com/repos/filecoin-project/lotus/releases/latest | jq -r .tag_name)
```

**Build and Install for Calibration**

```sh
make clean && make GOFLAGS="-tags=calibnet" lotus
sudo make install-daemon
lotus --version
```

{% hint style="success" %}
You should see something like: `lotus version 1.32.2+calibnet+git.ff88d8269`
{% endhint %}

***

### 📦 Import a Snapshot and Start the Daemon

Download the Snapshot

**Calibration:**

```sh
aria2c -x5 -o snapshot.car.zst https://forest-archive.chainsafe.dev/latest/calibnet/
```

**Import and Start the Daemon**

```sh
lotus daemon --import-snapshot snapshot.car.zst --remove-existing-chain --halt-after-import
nohup lotus daemon > ~/lotus.log 2>&1 &
```

{% hint style="info" %}
If you encounter errors related to `EnableEthRPC` or `EnableIndexer`, run the following command and restart Lotus
{% endhint %}

```sh
sed -i 's/EnableEthRPC = .*/EnableEthRPC = true/; s/EnableIndexer = .*/EnableIndexer = true/' ~/.lotus/config.toml
```

**Monitor Sync Progress**

```sh
lotus sync wait
```

To monitor continuously:

```sh
lotus sync wait --watch
```

**Monitor Logs**

```sh
tail -f ~/lotus.log
```

***

### 🔐 Create Wallets

You'll need to create **two BLS wallets**:

* One for **owner**: used to fund sector pledges and submit proofs
* One for **worker**: used to publish and manage storage deals

```sh
lotus wallet new bls  # Create owner wallet
lotus wallet new bls  # Create worker wallet
lotus wallet list     # List all created wallets
```

Make sure to send a small amount of FIL to each wallet - we recommend 1 FIL per wallet to ensure the creation of your Storage Provider in Curio. [Calibration test FIL faucet information](https://docs.filecoin.io/smart-contracts/developing-contracts/get-test-tokens).

{% hint style="success" %}
Both wallets will be used during Curio initialisation.
{% endhint %}

{% hint style="warning" %}
**Tip:** [Back up](https://lotus.filecoin.io/lotus/manage/manage-fil/#exporting-and-importing-addresses) your wallet keys securely before continuing. Losing them will result in permanent loss of access to funds.
{% endhint %}

***

## 🐘 Running YugabyteDB

🧠 Curio uses YugabyteDB to store metadata about deals, sealing operations, and PDP submissions.

<table data-view="cards"><thead><tr><th></th><th data-hidden></th><th data-hidden data-card-cover data-type="files"></th></tr></thead><tbody><tr><td>Yugabyte Documentation</td><td><a href="https://docs.yugabyte.com/preview/tutorials/quick-start/linux/">https://docs.yugabyte.com/preview/tutorials/quick-start/linux/</a></td><td><a href="../../.gitbook/assets/yugabyte.svg">yugabyte.svg</a></td></tr><tr><td>Yugabyte Support Channels</td><td><a href="https://filecoinproject.slack.com/archives/C06LF5YP8S3">Filecoin Slack - #fil-curio-help</a> - <a href="https://inviter.co/yugabytedb">Yugabyte Slack</a></td><td><a href="../../.gitbook/assets/yugabyte.svg">yugabyte.svg</a></td></tr></tbody></table>

### 🛠 Set ulimit configuration

{% hint style="warning" %}
Before starting Yugabyte, you must increase the default `ulimit` values to ensure system limits do not interfere with the database.
{% endhint %}

To do this:

#### 🔁 **Persist new limits across reboots**

Add these lines to `/etc/security/limits.conf`:

```sh
echo "$(whoami) soft nofile 1048576" | sudo tee -a /etc/security/limits.conf
echo "$(whoami) hard nofile 1048576" | sudo tee -a /etc/security/limits.conf
```

This ensures the increased limits are automatically applied to future sessions.

#### ⚡ **Apply limit immediately (for current shell only)**

```sh
ulimit -n 1048576
```

Verify:

```sh
ulimit -n
```

{% hint style="success" %}
This should output `1048576`.
{% endhint %}

### ⚙️ Install Yugabyte

```sh
wget https://software.yugabyte.com/releases/2.25.1.0/yugabyte-2.25.1.0-b381-linux-x86_64.tar.gz
tar xvfz yugabyte-2.25.1.0-b381-linux-x86_64.tar.gz
cd yugabyte-2.25.1.0
./bin/post_install.sh
```

### 🚀 Start the DB

```sh
./bin/yugabyted start \
  --advertise_address 127.0.0.1 \
  --master_flags rpc_bind_addresses=127.0.0.1 \
  --tserver_flags rpc_bind_addresses=127.0.0.1
```

{% hint style="warning" %}
If you encounter locale-related errors when starting Yugabyte for the first time, run:
{% endhint %}

```sh
sudo locale-gen en_US.UTF-8
```

{% hint style="success" %}
Visit `http://127.0.0.1:15433` to confirm successful installation. This is the YugabyteDB web UI — it should display the dashboard if the service is running correctly and all nodes are healthy.
{% endhint %}

{% hint style="info" %}
You can also check your Yugabyte cluster details directly in the CLI with:
{% endhint %}

```sh
./bin/yugabyted status
```

***

## 🧱 Installing and Configuring Curio

🧠 Curio is the core PDP client that coordinates sealing, interacts with Lotus and submits PDP proofs.

<table data-view="cards"><thead><tr><th></th><th data-hidden></th><th data-hidden data-card-cover data-type="files"></th></tr></thead><tbody><tr><td>Curio Documentation</td><td><a href="https://docs.curiostorage.org/">https://docs.curiostorage.org/</a></td><td><a href="../../.gitbook/assets/Curio_placeholder.webp">Curio_placeholder.webp</a></td></tr><tr><td>Curio Support Channels</td><td><a href="https://filecoinproject.slack.com/archives/C06LF5YP8S3">Filecoin Slack - #fil-curio-help</a></td><td><a href="../../.gitbook/assets/Filecoin.svg.png">Filecoin.svg.png</a></td></tr></tbody></table>

### ⚙️ System Configuration

Before you proceed with the installation, you should increase the UDP buffer size:

```sh
sudo sysctl -w net.core.rmem_max=2097152
sudo sysctl -w net.core.rmem_default=2097152
```

To make this change persistent across reboots:

```sh
echo 'net.core.rmem_max=2097152' | sudo tee -a /etc/sysctl.conf
echo 'net.core.rmem_default=2097152' | sudo tee -a /etc/sysctl.conf
```

### 🔬 Build Curio

Clone the repository and switch to the PDP branch:

```sh
git clone https://github.com/filecoin-project/curio.git
cd curio
git checkout rename
```

{% hint style="info" %}
Curio is compiled for a specific Filecoin network at build time. Choose the appropriate build command below.
{% endhint %}

{% hint style="info" %}
This step will take a few minutes to complete.
{% endhint %}

```sh
make clean calibnet
```

### ✅ Install and Verify Curio

Run the following to install the compiled binary:

```sh
sudo make install
```

This will place curio in `/usr/local/bin`

Verify the installation:

```sh
curio --version
```

Expected example output:

```sh
curio version 1.24.4+calibnet+git_f954c0a_2025-04-06T15:46:32-04:00
```

***

### 🔧 Guided Setup

Curio provides a utility to help you set up a new miner interactively. Run the following command:

```sh
curio guided-setup
```

#### 1️⃣ Select "Create a new miner"

Use the arrow keys to navigate the guided setup menu and select "**Create a new miner**".

#### 2️⃣ Enter Your YugabyteDB Connection Details

If you used the default installation steps from this guide, the following values should work:

* Host: `127.0.0.1`
* Port: `5433`
* Username: `yugabyte`
* Password: `yugabyte`
* Database: `yugabyte`

You can verify these settings by running the following command from the Yugabyte directory:

```sh
./bin/yugabyted status
```

After selecting "**Continue to connect and update schema**", Curio will automatically create the required tables and schema in the database.

#### 3️⃣ Set Wallet Addresses

For this step, use the two BLS wallets you created earlier with Lotus:

* Use **wallet 1** for the **Owner Address**
* Use **wallet 2** for the **Worker Address**
* Use **wallet 1** again for the **Sender Address**

These addresses must match the Lotus wallets created earlier.

{% hint style="info" %}
You can display your Lotus wallets at any time by running:
{% endhint %}

```sh
lotus wallet list
```

#### 4️⃣ Choose Sector Size

Choose sector size:

* `64 GiB`

{% hint style="info" %}
Selecting a sector size is required during the Curio guided setup, but **PDP itself doesn't use sectors**. Proof set sizes in PDP are **arbitrary and fully flexible.**
{% endhint %}

#### 5️⃣ Create Miner Actor

Review the information to ensure all inputs are correct. Then select "**Continue to verify the addresses and create a new miner actor**" to proceed.

{% hint style="info" %}
This step may take a few minutes to complete as Curio pushes the message and waits for it to land on-chain.
{% endhint %}

Once the actor is created, Curio will:

* Register your miner ID

{% hint style="info" %}
If the guided setup fails after creating the miner actor, run the following command to complete the installation:
{% endhint %}

```sh
curio config new-cluster <miner ID>
```

#### 6️⃣ Telemetry (Optional)

You'll be asked whether to share anonymised or signed telemetry with the Curio team to help improve the software.

Select your preference and continue.

#### 7️⃣ Save Database Configuration

At the final step of the guided setup, you'll be prompted to choose where to save your database configuration file.

Use the arrow keys to select a location. A common default is:

```sh
/home/your-username/curio.env
```

Once selected, setup will complete, and the miner configuration will be stored.

#### 8️⃣ Launch the Curio Web GUI

To explore the Curio interface visually, start the GUI layer:

```sh
curio run --layers=gui
```

Then, open your browser and go to:

```sh
http://127.0.0.1:4701
```

This will launch the Curio web GUI locally.

***

## 🧪 Enabling FWSS PDP

🧠 This section enables **FWSS Proof of Data Possession (PDP)** on your SP node using Curio. These steps guide you through running a standalone PDP service using Curio and pdptool.

### 📦 Attach Storage Locations

With Curio running with the GUI layer:

```sh
curio run --layers=gui
```

Run the following commands in your Curio CLI to attach storage paths:

```sh
curio cli storage attach --init --seal /fast-storage/path
curio cli storage attach --init --store /long-term-storage/path
```

{% hint style="info" %}
Your fast-storage path should point to high-performance storage media such as NVMe or SSD
{% endhint %}

***

### 🔧 Add a PDP Configuration Layer

Browse to the **Configurations** page of the Curio GUI.

Create a new layer named **pdp** and enable the following under Subsystems:

{% hint style="info" %}
You may find it helpful to search for the setting names in your browser.
{% endhint %}

* ✅ `EnableParkPiece`
* ✅ `EnablePDP`
* ✅ `EnableCommP`
* ✅ `EnableMoveStorage`

In the **HTTP** section:

* ✅ Enable: `true`
* 🌐 DomainName: `your domain (e.g., pdp.mydomain.com)`
* 📡 ListenAddress: `0.0.0.0:443`

{% hint style="info" %}
**Tip:** You must point your domain's A record to your server's public IP address for Let's Encrypt to issue a certificate.
{% endhint %}

***

### 💰 Import your Filecoin Wallet Private Key:

{% hint style="warning" %}
There are several ways to obtain private keys for Ethereum addresses. In this guide, we will use a new delegated FIL wallet address.
{% endhint %}

Create a new delegated wallet:

```sh
lotus wallet new delegated
```

```sh
# Example output:
t410fuo4dghaeiqzokiqnxruzdr6e3cjktnxprrc56bi
```

{% hint style="info" %}
You can display your Lotus wallets at any time by running:
{% endhint %}

```sh
lotus wallet list
```

Export & convert your new delegated wallet address private key:

```sh
lotus wallet export <your-delegated-wallet-address> | xxd -r -p | jq -r '.PrivateKey' | base64 -d | xxd -p -c 32
```

```sh
# Example output:
d4c2e3f9a716bb0e47fa91b2cf4a29870be3c5982fd6eafed71e8ac3f9c0b127
```

Browse to the **PDP** page of the Curio GUI and in the **Owner Address** section:

* Select **Import Key**
* Copy the previously generated private wallet key into the **Private Key (Hex)** field.
* Select **Import Key**

{% hint style="success" %}
Your 0x wallet address - the delegated Ethereum address derived from your Filecoin delegated wallet private key - will be added to the **Owner Address** section of the Curio PDP page.
{% endhint %}

Make sure to send a small amount of tFIL to your 0x wallet - we recommend 5 tFIL to ensure uninterrupted PDP operation during initial setup and testing. [Calibration test FIL faucet information](https://docs.filecoin.io/smart-contracts/developing-contracts/get-test-tokens).

{% hint style="warning" %}
**Important:** Secure your private key material. Don't expose or store it in plain text without protection.
{% endhint %}

***

### 🚀 Restart and Verify

Restart Curio with both layers:

```sh
curio run --layers=gui,pdp
```

{% hint style="warning" %}
If you encounter errors binding to port 443 when starting Curio with the pdp configuration layer, run:
{% endhint %}

```sh
sudo setcap 'cap_net_bind_service=+ep' /usr/local/bin/curio
```

Test the PDP service:

{% hint style="info" %}
If `pdptool` is not installed, clone and build Curio:
{% endhint %}

```sh
git clone https://github.com/filecoin-project/curio.git
cd curio/cmd/pdptool
go build .
```

Generate a service secret:

```sh
./pdptool create-service-secret
```

```sh
./pdptool ping --service-url https://your-domain.com --service-name public
```

{% hint style="info" %}
Always use `public` for the `--service-name` flag
{% endhint %}

{% hint style="success" %}
Expected output:
{% endhint %}

```sh
Ping successful: Service is reachable and JWT token is valid.
```

{% hint style="info" %}
Note: The first ping often fails. Try again after a short delay.
{% endhint %}

***

## 🎉 You're Done!

You've successfully launched a **PDP-enabled Filecoin Storage Provider** stack. Your system is now:

* ✅ Syncing with the Filecoin network via Lotus
* ✅ Recording deal and sector metadata in YugabyteDB
* ✅ Operating Curio to manage sealing and coordination
* ✅ Enabled Proof of Data Possession (PDP)
* ✅ Connected to your PDP-enabled storage provider

***

## 🔜 Next Steps

* 🧭 Monitor logs and metrics
* 💬 Join the community - Filecoin Slack - [#fil-pdp](https://filecoinproject.slack.com/archives/C0717TGU7V2) [#spx-pdp](https://filecoinproject.slack.com/archives/C08JQBA7PEX)
