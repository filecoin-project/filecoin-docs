---
description: >-
  MetaMask is a popular browser extension that allows users to interact with
  blockchain applications. This guide shows you how to configure MetaMask to
  work with the Filecoin
---

# Metamask setup

## Using Chainlist

Chainlist is a website that lets users easily connect their wallets to EVM-compatible blockchains. Chainlist is managed by [DeFi Llama](https://defillama.com/). Chainlist is the simplest way to add the Filecoin network to your MetaMask wallet.

{% tabs %}
{% tab title="Mainnet" %}
1. Navigate to [chainlist.network](https://chainlist.network).
2. Search for `Filecoin Mainnet`.
3. Click **Connect Wallet**.
4. Click **Approve** when prompted to _Allow this site to add a network_.
5. Click **Switch network** when prompted by MetaMask.
6. Open MetaMask from the browser extensions tab.
7. You should see _Filecoin_ listed at the top.

You can now use MetaMask to interact with the Filecoin network.
{% endtab %}

{% tab title="Calibration" %}
1. Navigate to [chainlist.network](https://chainlist.network).
2. Search for `Filecoin Calibration`.
3. Click **Connect Wallet**.
4. Click **Approve** when prompted to _Allow this site to add a network_.
5. You may be shown a warning that you are connecting to a test network. If prompted, click **Accept**.
6. Click **Switch network** when prompted by MetaMask.
7. Open MetaMask from the browser extensions tab. You should see _Filecoin Calibration_ listed at the top.

You can now use MetaMask to interact with the Filecoin network.
{% endtab %}

{% tab title="Local testnet" %}
1. Navigate to [chainlist.network](https://chainlist.network).
2. Search for `Filecoin Local testnet`.
3. Click **Connect Wallet**.
4. Click **Approve** when prompted to _Allow this site to add a network_.
5. You may be shown a warning that you are connecting to a test network. If prompted, click **Accept**.
6. Click **Switch network** when prompted by MetaMask.
7. Open MetaMask from the browser extensions tab. You should see _Filecoin Local testnet_ listed at the top.

You can now use MetaMask to interact with the Filecoin network.
{% endtab %}
{% endtabs %}

## Manual process

If you can’t or don’t want to use Chainlist, you can add the Filecoin network to your MetaMask manually.

### Prerequisites

Before we get started, you’ll need the following:

* A [Chromium-based browser](https://en.wikipedia.org/wiki/Chromium\_web\_browser#Browsers\_based\_on\_Chromium), or [Firefox](https://www.mozilla.org/en-CA/firefox/products/).
* A browser with [MetaMask](https://metamask.io/) installed.

### Steps

The process for configuring MetaMask to use Filecoin is fairly simple but has some very specific variables that you must copy exactly.

1. Open your browser and open the MetaMask plugin. If you haven’t opened the MetaMask plugin before, you’ll be prompted to create a new wallet. Follow the prompts to create a wallet.
2. Click the user circle and select **Settings.**
3. Select **Networks**.
4. Click **Add a network**.
5. Scroll down and click **Add a network manually**.
6. Enter the following information into the fields:

{% tabs %}
{% tab title="Mainnet" %}
<table><thead><tr><th width="159">Field</th><th>Value</th></tr></thead><tbody><tr><td>Network name</td><td><code>Filecoin</code></td></tr><tr><td>New RPC URL</td><td>Either:<br>- <code>https://api.node.glif.io/rpc/v1</code><br>- <code>https://filecoin.chainup.net/rpc/v1</code><br>- <code>https://filecoin-mainnet.chainstacklabs.com/rpc/v1</code><br>- <code>https://infura.sftproject.io/filecoin/rpc/v1</code><br>- <code>https://rpc.ankr.com/filecoin</code></td></tr><tr><td>Chain ID</td><td><code>314</code></td></tr><tr><td>Currency symbol</td><td><code>FIL</code></td></tr></tbody></table>
{% endtab %}

{% tab title="Calibration" %}
<table><thead><tr><th width="176">Field</th><th>Value</th></tr></thead><tbody><tr><td>Network name</td><td><code>Filecoin Calibration testnet</code></td></tr><tr><td>New RPC URL</td><td>Either:<br>- <code>https://api.calibration.node.glif.io/rpc/v1</code><br>- <code>https://filecoin-calibration.chainup.net/rpc/v1</code></td></tr><tr><td>Chain ID</td><td><code>314159</code></td></tr><tr><td>Currency symbol</td><td><code>tFIL</code></td></tr></tbody></table>
{% endtab %}

{% tab title="Local testnet" %}
<table><thead><tr><th width="201">Field</th><th>Value</th></tr></thead><tbody><tr><td>Network name</td><td><code>Filecoin Local testnet</code></td></tr><tr><td>New RPC URL</td><td><code>http://localhost:1234/rpc/v1</code></td></tr><tr><td>Chain ID</td><td><code>31415926</code></td></tr><tr><td>Currency symbol</td><td><code>tFIL</code></td></tr></tbody></table>
{% endtab %}
{% endtabs %}

7. Pick one block explorer from the [Networks section](broken-reference/), and enter the URL into the **Block explorer (optional)** field.
8. Review the values in the fields and click **Save**.
9. The Filecoin network should now be shown in your MetaMask window.
10. Done!

You can now use MetaMask to interact with the Filecoin network.
