---
description: >-
  Install Filecoin Pin, connect your wallet, deposit storage credit, and pin
  your first file to Filecoin in around 10 minutes.
---

# Getting Started

This guide walks you through pinning your first file to Filecoin using the Filecoin Pin CLI. By the end, you'll be set up to:

* ✅ Install the Filecoin Pin CLI
* ✅ Connect your Ethereum-style wallet on Filecoin
* ✅ Deposit storage credit on Filecoin Pay
* ✅ Pin a file to Filecoin and retrieve it via IPFS

***

## 🚀 Prerequisites

Before starting, make sure you have:

* **An Ethereum-style wallet on Filecoin** - MetaMask is the easiest option. If you don't have one set up, see [Wallets](../../basics/assets/wallets.md) and [Metamask setup](../../basics/assets/metamask-setup.md).
* **FIL in your wallet** - to pay transaction gas fees on Filecoin.
* **USDFC in your wallet** - to pay for storage. USDFC is the stablecoin used by Filecoin Onchain Cloud. The easiest way to get some is to [swap FIL for USDFC on Sushi](https://www.sushi.com/filecoin/swap?token0=NATIVE&token1=0x80b98d3aa09ffff255c3ba4a241111ff1262f045).
* **Node.js 22 or later** - the Filecoin Pin CLI runs on Node.js. Install from [nodejs.org](https://nodejs.org/) or via your package manager.

<table data-view="cards"><thead><tr><th></th><th data-hidden></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td>Filecoin Pin Repository</td><td><a href="https://github.com/filecoin-project/filecoin-pin">https://github.com/filecoin-project/filecoin-pin</a></td><td><a href="https://github.com/filecoin-project/filecoin-pin">https://github.com/filecoin-project/filecoin-pin</a></td></tr><tr><td>Filecoin Pin Support Channels</td><td><a href="https://filecoinproject.slack.com/archives/C07CGTXHHT4">Filecoin Slack - #fil-foc</a></td><td><a href="https://filecoinproject.slack.com/archives/C07CGTXHHT4">https://filecoinproject.slack.com/archives/C07CGTXHHT4</a></td></tr></tbody></table>

***

## 📦 Install the Filecoin Pin CLI

Install the CLI globally with npm:

```sh
npm install -g filecoin-pin
```

Verify the installation:

```sh
filecoin-pin --version
```

To see all available commands at any time:

```sh
filecoin-pin --help
```

***

## 🔐 Connect your wallet

The Filecoin Pin CLI signs transactions using your wallet's private key. You provide it as an environment variable - the CLI reads it directly and never stores it on disk.

### 1️⃣ Export your private key from MetaMask

{% hint style="danger" %}
**Treat your private key like a password.** Anyone with your private key has full control of your wallet and any funds in it. Never paste it into a website, share it over chat, commit it to a repository, or store it in plain text on a shared system.
{% endhint %}

In MetaMask:

1. Open the MetaMask extension.
2. Click the three dots next to your account name.
3. Select **Account details**.
4. Click **Show private key**.
5. Enter your MetaMask password.
6. Copy the private key shown.

The private key is a 64-character hex string, with or without an `0x` prefix.

### 2️⃣ Save the private key to a `.env` file

Create a file named `.env` in your working directory containing:

```
export PRIVATE_KEY="0xYOUR_PRIVATE_KEY_HERE"
```

Then secure it and load it into your shell:

```sh
chmod 600 .env
source .env
```

Add `.env` to your `.gitignore` if you're inside a git repository.

***

## 💰 Set up payments

Filecoin Pin uses [Filecoin Pay](https://github.com/FilOzone/filecoin-pay) to manage storage payments. Before you can pin anything, you need to:

1. Authorise the Warm Storage Service contract to spend USDFC on your behalf.
2. Deposit USDFC into Filecoin Pay so storage providers can be paid.

The CLI walks you through both steps interactively.

```sh
filecoin-pin payments setup
```

The CLI will guide you through the following stages:

#### 1️⃣ Connect and check balances

The CLI confirms it can connect to Filecoin Mainnet and reports your wallet's FIL and USDFC balances.

{% hint style="info" %}
If you don't have enough FIL for gas or USDFC for storage, the CLI will tell you and stop. Top up your wallet and try again.
{% endhint %}

#### 2️⃣ Review pricing

The CLI shows current storage pricing per GiB per month and per TiB per month. Use this to estimate how much USDFC you want to deposit.

#### 3️⃣ Choose a deposit amount

The CLI asks: **"Would you like to deposit USDFC to enable storage?"** Answer **Yes**.

It then shows example monthly costs for common storage amounts (100 GiB, 1 TiB, 10 TiB) so you can pick a sensible deposit.

When prompted **"How much USDFC would you like to deposit?"**, enter the amount you want. A first-time deposit of `10.0` USDFC is a reasonable starting point.

{% hint style="info" %}
**Coming from Storacha?** Refer to the email we sent you for the specific USDFC amount we'd recommend depositing for your dataset size.
{% endhint %}

#### 4️⃣ Confirm the deposit

The CLI submits the deposit transaction onchain and shows the transaction hash and your new storage capacity.

{% hint style="success" %}
You should see something like:

```
✓ Deposit complete
  Deposit tx: 0x1234...abcd

New Storage Capacity:
  Total deposit: 10.00 USDFC
  Capacity: ~XX GiB for 1 month
```
{% endhint %}

***

## 💵 Top up your runway (optional)

If you want to ensure your deposit covers a specific number of days at your current storage usage, run:

```sh
filecoin-pin payments fund --days 30
```

This deposits (or withdraws) the right amount of USDFC to give you exactly 30 days of runway based on what you're currently storing. You can use any number of days you like.

To check your current deposit balance, runway, and payment status at any time:

```sh
filecoin-pin payments status
```

***

## 📌 Pin your first file

Now you're ready to pin. Create a test file:

```sh
echo "Hello Filecoin Pin!" > demo.txt
```

Pin it to Filecoin:

```sh
filecoin-pin add demo.txt
```

The CLI will:

1. Pack your file into IPFS-compatible format (a CAR file).
2. Select storage providers automatically.
3. Upload your file to two providers for redundancy.
4. Verify the upload was advertised on the IPFS network indexer.

{% hint style="success" %}
You should see something like:

```
✓ File validated (20 B)
✓ Connected to Filecoin Mainnet
✓ File packed with root CID: bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly
✓ IPFS content loaded (96 B)

━━━ Add Complete ━━━

Root CID:  bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly
Piece CID: bafkzcibcfab4grpgq6e6rva4kfuxfcvibdzx3kn2jdw6q3zqgwt5cou7j6k4wfq
Copies:    2/2

Add completed successfully
```
{% endhint %}

The **Root CID** is your IPFS Content Identifier - it's how you'll retrieve your data. Save it somewhere.

You can also pin a directory by passing the directory path instead of a file:

```sh
mkdir my-data
echo "File 1" > my-data/file1.txt
echo "File 2" > my-data/file2.txt
filecoin-pin add my-data/
```

***

## 🌐 Retrieve your file

Your file is now retrievable via any IPFS Mainnet gateway using its Root CID. For example:

```
https://<YOUR_ROOT_CID>.ipfs.inbrowser.link
```

Or via the dweb.link gateway:

```
https://dweb.link/ipfs/<YOUR_ROOT_CID>
```

Try opening one of those URLs in your browser - your file should load.

You can also retrieve it programmatically using any IPFS-compatible client (Kubo, Helia, Lassie, etc.) by referencing the Root CID.

***

## 🎉 You're Done!

You've successfully pinned your first file to Filecoin. You now have:

* ✅ The Filecoin Pin CLI installed and configured
* ✅ Your wallet connected with funded payments on Filecoin Pay
* ✅ Files pinned to two Filecoin storage providers with daily cryptographic proofs
* ✅ Your content retrievable via standard IPFS gateways

***

## 🔜 Next Steps

* 📖 Run `filecoin-pin --help` to explore advanced usage, including auto-funding and custom provider selection.
* 🤖 Automate pinning in your CI/CD pipeline with the [Filecoin Pin GitHub Action](github-action.md).
* 💬 Join the community in Filecoin Slack [#fil-foc](https://filecoinproject.slack.com/archives/C07CGTXHHT4) for help, discussion, and updates.
* 🐛 Found a bug or have a feature request? [Open an issue](https://github.com/filecoin-project/filecoin-pin/issues) on GitHub.
