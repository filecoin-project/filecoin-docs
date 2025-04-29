---
description: >-
  Lotus is your gateway to the Filecoin network. It syncs the chain, manages
  wallets, and is required for Curio to interact with your node.
---

# Install & Run Lotus

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-cover data-type="files"></th></tr></thead><tbody><tr><td><a href="https://lotus.filecoin.io/lotus/get-started/what-is-lotus/">Lotus Documentation</a></td><td></td><td><a href="../../.gitbook/assets/lotus-logo-big.png">lotus-logo-big.png</a></td></tr><tr><td><a href="https://filecoinproject.slack.com/archives/CPFTWMY7N">Filecoin Slack - #fil-lotus-help</a></td><td></td><td><a href="../../.gitbook/assets/Filecoin.svg.png">Filecoin.svg.png</a></td></tr></tbody></table>

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
You should see something like: lotus version 1.32.2+mainnet+git.ff88d8269
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

You’ll need to create **two BLS wallets**:

* One for **owner**: used to fund sector pledges and submit proofs
* One for **worker**: used to publish and manage storage deals

```sh
lotus wallet new bls  # Create owner wallet
lotus wallet new bls  # Create worker wallet
lotus wallet list     # List all created wallets
```

Make sure to send a small amount of FIL to each wallet - we recommend 1 FIL per wallet to ensure the creation of your Storage Provider in Curio.

{% hint style="info" %}
Both wallets will be used during Curio initialisation.
{% endhint %}

{% hint style="danger" %}
[Back up](https://lotus.filecoin.io/lotus/manage/manage-fil/#exporting-and-importing-addresses) your wallet keys securely before continuing. Losing them will result in permanent loss of access to funds.
{% endhint %}
