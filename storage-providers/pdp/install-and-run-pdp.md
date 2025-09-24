---
description: >-
  This guide walks you through setting up a PDP-enabled Filecoin Storage
  Provider using Lotus, YugabyteDB, and Curio
---

# Install & Run PDP

{% hint style="danger" %}
**DEPRECATED DEVELOPER TOOL**

This documentation refers to the legacy `pdptool`, which is intended only for low-level developer testing.
It is not the recommended method for onboarding or interacting with PDP Storage Providers.

For current usage, including working with live PDP SPs and submitting real deals, please use the [Synapse SDK](https://github.com/FilOzone/synapse-sdk) and [Synapse dApp Tutorial](https://github.com/FIL-Builders/fs-upload-dapp).
{% endhint %}

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-cover data-type="files"></th></tr></thead><tbody><tr><td><a href="https://lotus.filecoin.io/lotus/get-started/what-is-lotus/">Lotus Documentation</a></td><td></td><td><a href="../../.gitbook/assets/lotus-logo-big.png">lotus-logo-big.png</a></td></tr><tr><td><a href="https://docs.yugabyte.com/preview/tutorials/quick-start/linux/">Yugabyte Documentation</a></td><td></td><td><a href="../../.gitbook/assets/yugabyte.svg">yugabyte.svg</a></td></tr><tr><td><a href="https://docs.curiostorage.org/">Curio Documentation</a></td><td></td><td><a href="../../.gitbook/assets/Curio_placeholder.webp">Curio_placeholder.webp</a></td></tr><tr><td><a href="https://docs.curiostorage.org/experimental-features/enable-pdp">PDP Documentation</a></td><td></td><td><a href="../../.gitbook/assets/Curio_placeholder.webp">Curio_placeholder.webp</a></td></tr><tr><td><a href="https://filecoinproject.slack.com/archives/C0717TGU7V2">Filecoin Slack - #fil-pdp</a></td><td></td><td><a href="../../.gitbook/assets/Filecoin.svg.png">Filecoin.svg.png</a></td></tr><tr><td><a href="https://filecoinproject.slack.com/archives/C06LF5YP8S3">Filecoin Slack - #fil-curio-help</a></td><td></td><td><a href="../../.gitbook/assets/Filecoin.svg.png">Filecoin.svg.png</a></td></tr><tr><td><a href="https://filecoinproject.slack.com/archives/CPFTWMY7N">Filecoin Slack - #fil-lotus-help</a></td><td></td><td><a href="../../.gitbook/assets/Filecoin.svg.png">Filecoin.svg.png</a></td></tr><tr><td><a href="../../basics/assets/metamask-setup.md">Filecoin Wallet - MetaMask Setup</a></td><td></td><td><a href="../../.gitbook/assets/Filecoin.svg.png">Filecoin.svg.png</a></td></tr><tr><td><a href="https://inviter.co/yugabytedb">Yugabyte Slack</a></td><td></td><td><a href="../../.gitbook/assets/yugabyte.svg">yugabyte.svg</a></td></tr></tbody></table>

## Prerequisites

{% hint style="info" %}
This guide is written specifically for Ubuntu 22.04. If you are using a different Linux distribution, refer to the relevant documentation for package installation and compatibility.
{% endhint %}

Before starting, make sure you have a user with **sudo privileges**. This section prepares your system for the PDP stack.

### System Package Installation

```sh
sudo apt update && sudo apt upgrade -y && sudo apt install -y \
mesa-opencl-icd ocl-icd-opencl-dev gcc git jq pkg-config curl clang \
build-essential hwloc libhwloc-dev libarchive-dev wget ntp python-is-python3 aria2
```

***

### Install Go

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

### Install Rust

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

### Add Go and Rust to Secure Sudo Path

```sh
sudo tee /etc/sudoers.d/dev-paths <<EOF
Defaults secure_path="/usr/local/go/bin:$HOME/.cargo/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
EOF
```

## Install & Run Lotus

Lotus is your gateway to the Filecoin network. It syncs the chain, manages wallets, and is required for Curio to interact with your node.

### Build Lotus Daemon

Clone and check out Lotus:

```sh
git clone https://github.com/filecoin-project/lotus.git
cd lotus
git checkout $(curl -s https://api.github.com/repos/filecoin-project/lotus/releases/latest | jq -r .tag_name)
```

#### **Build and Install for Mainnet**

```sh
make clean lotus
sudo make install-daemon
lotus --version
```

#### **Build and Install for Calibration**

```sh
make clean && make GOFLAGS="-tags=calibnet" lotus
sudo make install-daemon
lotus --version
```

{% hint style="success" %}
You should see something like: `lotus version 1.33.1+mainnet+git.ff88d8269`
{% endhint %}

***

### Import a Snapshot and Start the Daemon

Download the Snapshot

#### Mainnet:

```sh
aria2c -x5 -o snapshot.car.zst https://forest-archive.chainsafe.dev/latest/mainnet/
```

#### Calibration:

```sh
aria2c -x5 -o snapshot.car.zst https://forest-archive.chainsafe.dev/latest/calibnet/
```

#### Import and Start the Daemon

```sh
lotus daemon --import-snapshot snapshot.car.zst --remove-existing-chain --halt-after-import
nohup lotus daemon > ~/lotus.log 2>&1 &
```

{% hint style="warning" %}
If you encounter errors related to `EnableEthRPC` or `EnableIndexer`, run the command below and restart Lotus
{% endhint %}

```sh
sed -i 's/EnableEthRPC = .*/EnableEthRPC = true/; s/EnableIndexer = .*/EnableIndexer = true/' ~/.lotus/config.toml
```

#### **Monitor Sync Progress**

```sh
lotus sync wait
```

To monitor continuously:

```sh
lotus sync wait --watch
```

#### **Monitor Logs**

```sh
tail -f ~/lotus.log
```

***

### Create Wallets

You'll need to create **two BLS wallets**:

* One for **owner**: used to fund sector pledges and submit proofs
* One for **worker**: used to publish and manage storage deals

```sh
lotus wallet new bls  # Create owner wallet
lotus wallet new bls  # Create worker wallet
lotus wallet list     # List all created wallets
```

Make sure to send a small amount of FIL (Mainnet) or tFIL (Calibration) to each wallet - we recommend 1 FIL/tFIL per wallet to ensure the creation of your Storage Provider in Curio. [Calibration test FIL faucet information](https://docs.filecoin.io/smart-contracts/developing-contracts/get-test-tokens).

{% hint style="info" %}
Both wallets will be used during Curio initialisation.
{% endhint %}

{% hint style="danger" %}
[Back up](https://lotus.filecoin.io/lotus/manage/manage-fil/#exporting-and-importing-addresses) your wallet keys securely before continuing. Losing them will result in permanent loss of access to funds.
{% endhint %}

## Install & Run YugabyteDB

### Set ulimit configuration

{% hint style="info" %}
 Before starting Yugabyte, you must increase the default `ulimit` values to ensure system limits do not interfere with the database.
{% endhint %}

To do this:

#### **Persist new limits across reboots**

Add these lines to `/etc/security/limits.conf`:

```sh
echo "$(whoami) soft nofile 1048576" | sudo tee -a /etc/security/limits.conf
echo "$(whoami) hard nofile 1048576" | sudo tee -a /etc/security/limits.conf
```

This ensures the increased limits are automatically applied to future sessions.

#### **Apply limit immediately (for current shell only)**

```sh
ulimit -n 1048576
# Verify limit change:
ulimit -n
```

{% hint style="success" %}
This should output `1048576`.
{% endhint %}

### Install Yugabyte

```sh
wget https://software.yugabyte.com/releases/2.25.1.0/yugabyte-2.25.1.0-b381-linux-x86_64.tar.gz
tar xvfz yugabyte-2.25.1.0-b381-linux-x86_64.tar.gz
cd yugabyte-2.25.1.0
./bin/post_install.sh
```

### Start the DB

```sh
./bin/yugabyted start \
  --advertise_address 127.0.0.1 \
  --master_flags rpc_bind_addresses=127.0.0.1 \
  --tserver_flags rpc_bind_addresses=127.0.0.1
```

{% hint style="danger" %}
 If you encounter locale-related errors when starting Yugabyte for the first time, run:
{% endhint %}

```sh
sudo locale-gen en_US.UTF-8
```

{% hint style="success" %}
Visit `127.0.0.1:15433` to confirm successful installation. This is the YugabyteDB web UI — it should display the dashboard if the service is running correctly and all nodes are healthy.
{% endhint %}

{% hint style="info" %}
You can also check your Yugabyte cluster details directly in the CLI with:
{% endhint %}

```sh
./bin/yugabyted status
```

## Install & Run Curio

Curio is the core PDP client that coordinates sealing, interacts with Lotus and submits PDP proofs.

### System Configuration

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

### Build Curio

Clone the repository and switch to the PDP branch:

```sh
git clone https://github.com/filecoin-project/curio.git
cd curio
git checkout synapse
```

{% hint style="info" %}
Curio is compiled for a specific Filecoin network at build time. Choose the appropriate build command below.
{% endhint %}

```sh
# For Filecoin Mainnet:
make clean build

# For Calibration Testnet:
make clean calibnet
```

{% hint style="success" %}
This step will take a few minutes to complete.
{% endhint %}

### Install and Verify Curio

Run the following to install the compiled binary:

```sh
sudo make install
```

This will place curio in `/usr/local/bin`

Verify the installation:

```shell
curio --version
```

Expected output:

```sh
# Example output for Mainnet:
curio version 1.24.4+mainnet+git_f954c0a_2025-04-06T15:46:32-04:00

# Example output for Calibration:
curio version 1.24.4+calibnet+git_f954c0a_2025-04-06T15:46:32-04:00
```

***

### Guided Setup

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
💡 Selecting a sector size is required during the Curio guided setup, but **PDP itself doesn't use sectors**. Proof set sizes in PDP are **arbitrary and fully flexible.**
{% endhint %}

#### 5️⃣ Create Miner Actor

Review the information to ensure all inputs are correct. Then select "**Continue to verify the addresses and create a new miner actor**" to proceed.

{% hint style="info" %}
This step may take a few minutes to complete as Curio pushes the message and waits for it to land on-chain.
{% endhint %}

Once the actor is created, Curio will:

* `Register your miner ID`

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

## Enable PDP

This section enables Proof of Data Possession (PDP) for a Storage Provider node using Curio. These steps guide you through running a standalone PDP service using Curio and pdptool.

### Attach Storage Locations

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

### Add a PDP Configuration Layer

Browse to the Configurations page of the Curio GUI.

Create a new layer named pdp. Enable and set to `true` the following under Subsystems:

{% hint style="info" %}
You may find it helpful to search for the setting names in your browser.
{% endhint %}

* ✅ `EnableParkPiece`
* ✅ `EnablePDP`
* ✅ `EnableCommP`
* ✅ `EnableMoveStorage`

In the HTTP section:

* ✅ Enable: `true`
* 🌐 DomainName: `your domain (e.g., pdp.mydomain.com)`
* 📡 ListenAddress: `0.0.0.0:443`

{% hint style="info" %}
You must point your domain's A record to your server's public IP address for Let's Encrypt to issue a certificate.
{% endhint %}

***

### Set Up PDP Service Keys

Build the pdptool:

```sh
cd curio/cmd/pdptool
go build .
```

Generate a service secret:

```sh
./pdptool create-service-secret
```

```sh
# Example output:

-----BEGIN PUBLIC KEY-----
LxP9MzVmHdC7KwYBvNAo1jXuIRfGXqQyo2JzE4Uctn0a5eFZbs6Wlvq3dKYgphTD
XAqRsm38LPt2iVcGb9MruZJxEkBhO71wDdNyaFMoXpCJnUqRAezvKlfbIg==
-----END PUBLIC KEY-----
```

Browse to the **PDP** page of the Curio GUI and in the **Services** section:

* Select **Add PDP Service**
* Input a **Service Name** of your choice (e.g. `pdp-service`)
* Copy the previously generated public key into the **Public Key** field.
* Select **Add Service**

***

### Import your Filecoin Wallet Private Key:

{% hint style="info" %}
There are several ways to obtain private keys for Ethereum addresses. For this guide, we will use a new delegated Filecoin wallet address.
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

d4c2e3f9a716bb0e47fa91b2cf4a29870be3c5982fd6eafed71e8ac3f9c0b12
```

Browse to the **PDP** page of the Curio GUI and in the **Owner Address** section:

* Select **Import Key**
* Copy the previously generated private wallet key into the **Private Key (Hex)** field.
* Select **Import Key**

{% hint style="success" %}
Your 0x wallet address - the delegated Ethereum address derived from your Filecoin Metamask private key - will be added to the **Owner Address** section of the Curio PDP page.
{% endhint %}

Make sure to send a small amount of FIL to your 0x wallet - we recommend 5 FIL to ensure uninterrupted PDP operation during initial setup and testing.

{% hint style="danger" %}
Important: Secure your private key material. Don't expose or store it in plain text without protection.
{% endhint %}

***

### Restart and Verify

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

```sh
./pdptool ping --service-url https://your-domain.com --service-name <ServiceName>
```

{% hint style="success" %}
Use the service name specified in the **Service Name** field when you added your public **PDP Service** key - e.g. `pdp-service`
{% endhint %}

Expected output:

```sh
Ping successful: Service is reachable and JWT token is valid.
```

{% hint style="info" %}
Note: The first ping often fails. Try again after a short delay.
{% endhint %}

## Use PDP

PDP ensures that your data is verifiably stored by a Filecoin Storage Provider using cryptographic proofs without needing to retrieve the file itself.

### Prerequisites

Before beginning, ensure:

* You have access to a terminal with internet connectivity
* Your system has pdptool installed (bundled with Curio)

### If pdptool is not installed:

* **Option 1**: Clone Curio and build pdptool:

```sh
git clone
https://github.com/filecoin-project/curio.git

cd curio
cd cmd/pdptool
go build .
```

* **Option 2**: Install the [Docker version ](https://github.com/LesnyRumcajs/pdp)of pdptool - Provided by our friends at [ChainSafe](https://chainsafe.io/)

***

### Authenticate Your Client (JWT Token)

You first need to authenticate your pdptool with a PDP-enabled Storage Provider

Generate a service secret:

```sh
./pdptool create-service-secret
```

```sh
# Example output:

-----BEGIN PUBLIC KEY-----
LxP9MzVmHdC7KwYBvNAo1jXuIRfGXqQyo2JzE4Uctn0a5eFZbs6Wlvq3dKYgphTD
XAqRsm38LPt2iVcGb9MruZJxEkBhO71wDdNyaFMoXpCJnUqRAezvKlfbIg==
-----END PUBLIC KEY-----
```

{% hint style="success" %}
Reach out in the [#fil-pdp](https://filecoinproject.slack.com/archives/C0717TGU7V2) channel in Filecoin Slack to register your public key with a PDP-enabled Storage Provider
{% endhint %}

***

### Connect to a PDP Service

Start by pinging the PDP service to confirm availability:

```sh
./pdptool ping --service-url https://yablu.net --service-name pdp-service
```

{% hint style="success" %}
You should see something like:
{% endhint %}

```sh
Ping successful: Service is reachable and JWT token is valid.
```

***

### Create a Proof Set

Start by creating an empty proof set. This step must happen **before** uploading files:

```sh
./pdptool create-proof-set \
  --service-url https://yablu.net \
  --service-name pdp-service \
  --recordkeeper 0x6170dE2b09b404776197485F3dc6c968Ef948505
```

```sh
# Example output:

Proof set creation initiated successfully.
Location: /pdp/proof-sets/created/0xf91617ef532748efb5a51e64391112e5328fbd9a5b9ac20e5127981cea0012a5
Response:
```

Use the `0x` transaction hash from the previous output to monitor proof set creation status:

```sh
./pdptool get-proof-set-create-status \
  --service-url https://yablu.net \
  --service-name pdp-service \
  --tx-hash 0xf91617ef532748efb5a51e64391112e5328fbd9a5b9ac20e5127981cea0012a5
```

{% hint style="success" %}
You should see something like:
{% endhint %}

```sh
Proof Set Creation Status:
Transaction Hash: 0xf91617ef532748efb5a51e64391112e5328fbd9a5b9ac20e5127981cea0012a5
Transaction Status: confirmed
Transaction Successful: true
Proofset Created: true
ProofSet ID: 43
```

{% hint style="info" %}
The proof set creation process can take a few seconds to complete
{% endhint %}

***

### Upload Files to the Storage Provider

Once your proof set is ready, you can begin uploading files:

```sh
./pdptool upload-file --service-url https://yablu.net --service-name pdp-service /path/to/file.ext
```

{% hint style="success" %}
Example output:
{% endhint %}

```sh
0: pieceSize: 65536
baga6ea4seaqhsevhssmv3j7jjavm4gzdckpjrvbwhhvn73sgibob5bdvtzoqkli:baga6ea4seaqhsevhssmv3j7jjavm4gzdckpjrvbwhhvn73sgibob5bdvtzoqkli
```

***

### 🌳 Add File Roots to Proof Set

After uploading each file, extract its CID and add it to your proof set:

```sh
./pdptool add-roots \
  --service-url https://yablu.net \
  --service-name pdp-service \
  --proof-set-id <PROOF-SET-ID> \
  --root <CID1>+<CID2>+<CID3>...
```

Example using the information returned in the previous steps:

```sh
./pdptool add-roots \
  --service-url https://yablu.net \
  --service-name pdp-service \
  --proof-set-id 43 \
  --root baga6ea4seaqhsevhssmv3j7jjavm4gzdckpjrvbwhhvn73sgibob5bdvtzoqkli:baga6ea4seaqhsevhssmv3j7jjavm4gzdckpjrvbwhhvn73sgibob5bdvtzoqkli
```

{% hint style="info" %}
In the above example, `--proof-set-id` came from the Create Proof Set step, and `--root` from the Upload Files to the Storage Provider step.
{% endhint %}

{% hint style="success" %}
Example output:
{% endhint %}

```sh
Roots added to proof set ID 43 successfully.
Response:
```

***

### View a Piece or Proof Set

You can retrieve a proof set or inspect a file root directly:

```sh
./pdptool get-proof-set \
  --service-url https://yablu.net \
  --service-name pdp-service 43
```

{% hint style="success" %}
Example output:
{% endhint %}

```sh
Proof Set ID: 43
Next Challenge Epoch: 2577608
Roots:
  - Root ID: 0
    Root CID: baga6ea4seaqhsevhssmv3j7jjavm4gzdckpjrvbwhhvn73sgibob5bdvtzoqkli
    Subroot CID: baga6ea4seaqhsevhssmv3j7jjavm4gzdckpjrvbwhhvn73sgibob5bdvtzoqkli
    Subroot Offset: 0
```

***

### Retrieve From a Proof Set

Download a file using an ordered chunks list:

```sh
./pdptool download-file \
  --service-url https://yablu.net \
  --chunk-file chunks.list \
  --output-file file.ext
```

{% hint style="info" %}
💡In the above example, `–chunk-file` and `–output-file` flags were defined in the Upload Files to the Storage Provider step
{% endhint %}

***

## 🎉 You're Ready!

You've successfully launched a PDP-enabled Filecoin Storage Provider stack. Your system is now:

* ✅ Syncing with the Filecoin network via Lotus
* ✅ Recording deal and sector metadata in YugabyteDB
* ✅ Operating Curio to manage sealing and coordination
* ✅ Submitting Proof of Data Possession to verify storage integrity

You've also:

✅ Connected to a PDP-enabled storage provider
✅ Created a proof set
✅ Uploaded files and added file roots
✅ Verified availability and proof status

***

## 🔜 Next Steps

* 🧭 Monitor logs and metrics
* 🧭 Track your proof sets in the PDP Explorer:
  * [Calibration PDP Explorer](https://calibration.pdp-explorer.eng.filoz.org)
  * [Mainnet PDP Explorer](https://pdp-explorer.eng.filoz.org)
* 💬 Join the community - Filecoin Slack - [#fil-pdp](https://filecoinproject.slack.com/archives/C0717TGU7V2)

💬 Questions? Join the conversation on Filecoin Slack: [#fil-pdp](https://filecoinproject.slack.com/archives/C0717TGU7V2)