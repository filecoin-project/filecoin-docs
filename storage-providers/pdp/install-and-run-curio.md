---
description: >-
  Curio is the core PDP client that coordinates sealing, interacts with Lotus
  and submits PDP proofs.
---

# Install & Run Curio

<table data-view="cards"><thead><tr><th></th><th data-hidden data-card-cover data-type="files"></th></tr></thead><tbody><tr><td><a href="https://docs.curiostorage.org/">Curio Documentation</a></td><td><a href="../../.gitbook/assets/Curio_placeholder.webp">Curio_placeholder.webp</a></td></tr><tr><td><a href="https://filecoinproject.slack.com/archives/C06LF5YP8S3">Filecoin Slack - #fil-curio-help</a></td><td><a href="../../.gitbook/assets/Filecoin.svg.png">Filecoin.svg.png</a></td></tr></tbody></table>

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
💡 Selecting a sector size is required during the Curio guided setup, but **PDP itself doesn’t use sectors**. Proof set sizes in PDP are **arbitrary and fully flexible.**
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

You’ll be asked whether to share anonymised or signed telemetry with the Curio team to help improve the software.

Select your preference and continue.

#### 7️⃣ Save Database Configuration

At the final step of the guided setup, you’ll be prompted to choose where to save your database configuration file.

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
