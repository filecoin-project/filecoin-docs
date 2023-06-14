---
title: "MetaMask setup"
description: "MetaMask is a popular browser extension that allows users to interact with blockchain applications. This guide shows you how to configure MetaMask to work with the Filecoin mainnet."
lead: "MetaMask is a popular browser extension that allows users to interact with blockchain applications. This guide shows you how to configure MetaMask to work with the Filecoin mainnet, Calibration testnet, or the Hyperspace testnet."
draft: false
images: []
type: docs
menu:
  basics:
    identifier: "metamask-setup-6367921279d3535af07299e2f6efe3a8"
    parent: "basics-assets"
weight: 525
toc: true
aliases:
    - "/networks/mainnet/add-to-metamask"
    - "/networks/hyperspace/add-to-metamask"
    - "/networks/calibration/add-to-metamask"
    - "/fvm/how-tos/add-to-metamask/"
    - "/developers/smart-contracts/how-tos/add-to-metamask/"
---

## Using Chainlist

Chainlist is a website that lets users easily connect their wallets to EVM-compatible blockchains. Chainlist is managed by [DeFi Llama](https://defillama.com/). Chainlist is the simplest way to add the Filecoin network to your MetaMask wallet.

{{< tabs tabTotal="4" >}}
{{< tab tabName="Mainnet" >}}
<br>

1. Search for [`Filecoin`](https://chainlist.org/chain/314) on [chainlist.org](https://chainlist.org).

1. Click **Connect Wallet**.
1. Click **Approve** when prompted to _Allow this site to add a network_.
1. Click **Switch network** when prompted by MetaMask.
1. Open MetaMask from the browser extensions tab.
1. You should see _Filecoin_ listed at the top.
{{< /tab >}}
{{< tab tabName="Calibration" >}}
<br>

1. Go [chainlist.org](https://chainlist.org).

1. Click the **Include Testnets** checkbox.
1. Search for [`Filecoin Calibration`](https://chainlist.org/chain/314159).
1. Click **Connect Wallet**.
1. Click **Approve** when prompted to _Allow this site to add a network_.
1. You may be shown a warning that you are connecting to a test network. If prompted, click **Accept**.
1. Click **Switch network** when prompted by MetaMask.
1. Open MetaMask from the browser extensions tab. You should see _Filecoin Calibration_ listed at the top.
{{< /tab >}}
{{< tab tabName="Hyperspace" >}}
<br>

1. Go [chainlist.org](https://chainlist.org).

1. Click the **Include Testnets** checkbox.
1. Search for [`Filecoin Hyperspace`](https://chainlist.org/chain/3141).
1. Click **Connect Wallet**.
1. Click **Approve** when prompted to _Allow this site to add a network_.
1. You may be shown a warning that you are connecting to a test network. If prompted, click **Accept**.
1. Click **Switch network** when prompted by MetaMask.
1. Open MetaMask from the browser extensions tab. You should see _Filecoin Hyperspace_ listed at the top.
{{< /tab >}}
{{< tab tabName="Local-testnet" >}}
<br>

1. Go [chainlist.org](https://chainlist.org).

1. Click the **Include Testnets** checkbox.
1. Search for [`Filecoin Local testnet`](https://chainlist.org/chain/31415926).
1. Click **Connect Wallet**.
1. Click **Approve** when prompted to _Allow this site to add a network_.
1. You may be shown a warning that you are connecting to a test network. If prompted, click **Accept**.
1. Click **Switch network** when prompted by MetaMask.
1. Open MetaMask from the browser extensions tab. You should see _Filecoin Local testnet_ listed at the top.
{{< /tab >}}
{{< /tabs >}}

You can now use MetaMask to interact with the Filecoin network.

## Manual process

If you can't or don't want to use Chainlist, you can add the Filecoin network to your MetaMask manually.

### Prerequisites

Before we get started, you'll need the following:

- A [Chromium-based browser](https://en.wikipedia.org/wiki/Chromium_web_browser#Browsers_based_on_Chromium), or [Firefox](https://www.mozilla.org/en-CA/firefox/products/).
- A browser with [MetaMask](https://metamask.io/) installed.

### Steps

The process for configuring MetaMask to use Filecoin is fairly simple, but has some very specific variables that you must copy exactly.

{{< tabs tabTotal="4" >}}
{{< tab tabName="Mainnet" >}}
<br>

1. Open your browser and open the MetaMask plugin. If you haven't opened the MetaMask plugin before, you'll be prompted to create a new wallet. Follow the prompts to create a wallet.
1. Click the user circle and select **Settings**:
1. Select **Networks**.
1. Click **Add a network**.
1. Scroll down and click **Add a network manually**.
1. Enter the following information into the fields:

    | Field | Value |
    | --- | --- |
    | Network name | `Filecoin` |
    | New RPC URL | Either: <br> - `https://api.node.glif.io/rpc/v1` <br> - `https://filecoin.chainup.net/rpc/v1` <br> - `https://filecoin-mainnet.chainstacklabs.com/rpc/v1` <br> - `https://infura.sftproject.io/filecoin/rpc/v1` <br> - `https://rpc.ankr.com/filecoin` |
    | Chain ID | `314` |
    | Currency symbol | `FIL` |

1. Pick one a [block explorers]({{< relref "/networks/mainnet/explorers" >}}), and enter the URL into the **Block explorer (optional)** field.
1. Review the values in the fields and click **Save**.
1. The Filecoin network should now be shown in your MetaMask window.
1. Done!
{{< /tab >}}

{{< tab tabName="Calibration" >}}
<br>

1. Open your browser and open the MetaMask plugin. If you haven't opened the MetaMask plugin before, you'll be prompted to create a new wallet. Follow the prompts to create a wallet.
1. Click the user circle and select **Settings**:
1. Select **Networks**.
1. Click **Add a network**.
1. Scroll down and click **Add a network manually**.
1. Enter the following information into the fields:

    | Field | Value |
    | --- | --- |
    | Network name | `Filecoin Calibration testnet` |
    | New RPC URL | Either:<br> - `https://api.calibration.node.glif.io/rpc/v1` <br> - `https://filecoin-calibration.chainup.net/rpc/v1` |
    | Chain ID | `314159` |
    | Currency symbol | `FIL` |

1. Pick one a [block explorers]({{< relref "/networks/calibration/explorers" >}}), and enter the URL into the **Block explorer (optional)** field.
1. Review the values in the fields and click **Save**.
1. The Filecoin network should now be shown in your MetaMask window.
1. Done!
{{< /tab >}}

{{< tab tabName="Hyperspace" >}}
<br>

1. Open your browser and open the MetaMask plugin. If you haven't opened the MetaMask plugin before, you'll be prompted to create a new wallet. Follow the prompts to create a wallet.
1. Click the user circle and select **Settings**:
1. Select **Networks**.
1. Click **Add a network**.
1. Scroll down and click **Add a network manually**.
1. Enter the following information into the fields:

    | Field | Value |
    | --- | --- |
    | Network name | `Filecoin Hyperspace testnet` |
    | New RPC URL | Either:<br> - `https://api.calibration.node.glif.io/rpc/v1` <br> - `https://filecoin-calibration.chainup.net/rpc/v1` <br> - `https://filecoin-calibration.chainstacklabs.com/rpc/v1` <br> - `https://rpc.ankr.com/filecoin_testnet` |
    | Chain ID | `3141` |
    | Currency symbol | `tFIL` |

1. Pick one a [block explorers]({{< relref "/networks/calibration/explorers" >}}), and enter the URL into the **Block explorer (optional)** field.
1. Review the values in the fields and click **Save**.
1. The Filecoin network should now be shown in your MetaMask window.
1. Done!
{{< /tab >}}
{{< tab tabName="Local-testnet" >}}
<br>

1. Open your browser and open the MetaMask plugin. If you haven't opened the MetaMask plugin before, you'll be prompted to create a new wallet. Follow the prompts to create a wallet.
1. Click the user circle and select **Settings**:
1. Select **Networks**.
1. Click **Add a network**.
1. Scroll down and click **Add a network manually**.
1. Enter the following information into the fields:

    | Field | Value |
    | --- | --- |
    | Network name | `Filecoin Local testnet` |
    | New RPC URL | `http://localhost:1234/rpc/v1` |
    | Chain ID | `31415926` |
    | Currency symbol | `tFIL` |

1. Pick one a [block explorers]({{< relref "/networks/calibration/explorers" >}}), and enter the URL into the **Block explorer (optional)** field.
1. Review the values in the fields and click **Save**.
1. The Filecoin network should now be shown in your MetaMask window.
1. Done!
{{< /tab >}}
{{< /tabs >}}

You can now use MetaMask to interact with the Filecoin network.
