---
title: "Transfer FIL"
description: "Due to the nature of Filecoin and Etheruem having different address types in the Filecoin network, the process for transfering FIL between addresses can be a bit nuanced. This page explains the process for transferring FIL."
lead: "Due to the nature of Filecoin and Etheruem having different address types in the Filecoin network, the process for transfering FIL between addresses can be a bit nuanced. This page explains the process for transferring FIL."
draft: false
images: []
type: docs
menu:
  basics:
    parent: "basics-assets"
    identifier: "transfer-fil-64e3212081d842e80c9baad9801a9e8d"
weight: 540
toc: true
aliases:
    - "/smart-contracts/wallets/transfer-fil/"
    - "/smart-contracts/wallets/fil-to-zero-x/"
---


Etheruem-style addresses start with `0x`. Filecoin addresses start with `f`. There are four paths for transferring funds across the Filecoin network depending on which address type you are transferring from and to:

|   | From an Ethereum-style address | From a Filecoin address |
| --- | --- | --- |
| **To an Ethereum-style address** | [Ethereum → Ethereum](#ethereum--ethereum) | [Filecoin → Ethereum](#filecoin--ethereum) |
| **To a Filecoin address** | [Ethereum → Filecoin](#ethereum--filecoin) | [Filecoin → Filecoin](#filecoin--filecoin) |

{{< alert >}}
⚠️ **ASSETS ON THE FILECOIN NETWORK ARE NOT AVAILABLE ON ANY OTHER NETWORK**.<hr>Remember that Filecoin is fully compatible with Ethereum tools, like wallets. But that doesn’t mean you’re using the Ethereum network. These instructions transfer assets only within the Filecoin network. [Learn how to configure your Ethereum wallet on the Filecoin network]({{< relref "/smart-contracts/wallets/metamask" >}}).
{{< /alert >}}
<!-- Use the form below to find out which type of transfer you should use: -->

<!-- {{< filecoin-transfer >}} -->

## Ethereum → Ethereum

<img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiM5ZmE4ZGEiIGQ9Ik0xMSAyNEwyNSAyIDM5IDI0IDI1IDMyeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM3OTg2Y2IiIGQ9Ik0yNSAyTDM5IDI0IDI1IDMyeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM5ZmE4ZGEiIGQ9Ik0xMSAyN0wyNSAzNSAzOSAyNyAyNSA0NnoiPjwvcGF0aD48cGF0aCBmaWxsPSIjNzk4NmNiIiBkPSJNMjUgMzVMMzkgMjcgMjUgNDZ6TTExIDI0TDI1IDE4IDM5IDI0IDI1IDMyeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM1YzZiYzAiIGQ9Ik0yNSAxOEwzOSAyNCAyNSAzMnoiPjwvcGF0aD4KPC9zdmc+"/>
<img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiM5ZmE4ZGEiIGQ9Ik0xMSAyNEwyNSAyIDM5IDI0IDI1IDMyeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM3OTg2Y2IiIGQ9Ik0yNSAyTDM5IDI0IDI1IDMyeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM5ZmE4ZGEiIGQ9Ik0xMSAyN0wyNSAzNSAzOSAyNyAyNSA0NnoiPjwvcGF0aD48cGF0aCBmaWxsPSIjNzk4NmNiIiBkPSJNMjUgMzVMMzkgMjcgMjUgNDZ6TTExIDI0TDI1IDE4IDM5IDI0IDI1IDMyeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM1YzZiYzAiIGQ9Ik0yNSAxOEwzOSAyNCAyNSAzMnoiPjwvcGF0aD4KPC9zdmc+"/>

There are no special steps or requirements for sending Filecoin from one Ethereum-style address to another on the Filecoin network. Follow the standard process for your wallet. [MetaMask has a simple guide](https://support.metamask.io/hc/en-us/articles/360015488931-How-to-send-tokens-from-your-MetaMask-wallet) for how to send Ethereum from one account to another.

## Ethereum → Filecoin

<img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiM5ZmE4ZGEiIGQ9Ik0xMSAyNEwyNSAyIDM5IDI0IDI1IDMyeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM3OTg2Y2IiIGQ9Ik0yNSAyTDM5IDI0IDI1IDMyeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM5ZmE4ZGEiIGQ9Ik0xMSAyN0wyNSAzNSAzOSAyNyAyNSA0NnoiPjwvcGF0aD48cGF0aCBmaWxsPSIjNzk4NmNiIiBkPSJNMjUgMzVMMzkgMjcgMjUgNDZ6TTExIDI0TDI1IDE4IDM5IDI0IDI1IDMyeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM1YzZiYzAiIGQ9Ik0yNSAxOEwzOSAyNCAyNSAzMnoiPjwvcGF0aD4KPC9zdmc+"/>
<img><svg width="60" height="60" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_248_552" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="70" height="70"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H70V69.6123H0V0Z" fill="white"/></mask><g mask="url(#mask0_248_552)"><path fill-rule="evenodd" clip-rule="evenodd" d="M35 69.6119C15.75 69.6119 0 53.9491 0 34.6316C0.175 15.4882 15.75 -0.174548 35.175 -0.000516747C54.425 0.173514 70 15.6623 70 35.1537C69.825 54.1231 54.25 69.6119 35 69.6119Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M38.325 30.6296L37.275 36.1986L47.25 37.5908L46.55 40.2013L36.75 38.809C36.05 41.0714 35.7 43.5079 34.825 45.5962C33.95 48.0327 33.075 50.4691 32.025 52.7315C30.625 55.69 28.175 57.7784 24.85 58.3005C22.925 58.6485 20.825 58.4745 19.25 57.2563C18.725 56.9082 18.2 56.2121 18.2 55.69C18.2 54.9939 18.55 54.1237 19.075 53.7757C19.425 53.6016 20.3 53.7757 20.825 53.9497C21.35 54.4718 21.875 55.1679 22.225 55.864C23.275 57.2563 24.675 57.4303 26.075 56.3861C27.65 54.9939 28.525 53.0795 29.05 51.1652C30.1 46.9885 31.15 42.9858 32.025 38.809V38.1129L22.75 36.7207L23.1 34.1102L32.725 35.5024L33.95 30.1075L23.975 28.5412L24.325 25.7567L34.65 27.149C35 26.1048 35.1749 25.2346 35.525 24.3645C36.4 21.2319 37.275 18.0994 39.375 15.3149C41.475 12.5304 43.925 10.7901 47.6 10.9641C49.175 10.9641 50.75 11.4862 51.8 12.7044C51.975 12.8784 52.325 13.2265 52.325 13.5746C52.325 14.2707 52.325 15.1408 51.8 15.6629C51.1 16.185 50.2249 16.011 49.525 15.3149C49 14.7928 48.65 14.2707 48.125 13.7486C47.075 12.3563 45.5 12.1823 44.275 13.4005C43.4 14.2707 42.525 15.4889 42 16.7071C40.775 20.3618 39.9 24.1904 38.675 28.0191L48.3 29.4114L47.6 32.0218L38.325 30.6296Z" fill="black"/></g></svg></img>

Use the [FilForwarder process]({{< relref "/smart-contracts/wallets/filforwader" >}}).

## Filecoin → Ethereum

<img><svg width="60" height="60" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_248_552" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="70" height="70"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H70V69.6123H0V0Z" fill="white"/></mask><g mask="url(#mask0_248_552)"><path fill-rule="evenodd" clip-rule="evenodd" d="M35 69.6119C15.75 69.6119 0 53.9491 0 34.6316C0.175 15.4882 15.75 -0.174548 35.175 -0.000516747C54.425 0.173514 70 15.6623 70 35.1537C69.825 54.1231 54.25 69.6119 35 69.6119Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M38.325 30.6296L37.275 36.1986L47.25 37.5908L46.55 40.2013L36.75 38.809C36.05 41.0714 35.7 43.5079 34.825 45.5962C33.95 48.0327 33.075 50.4691 32.025 52.7315C30.625 55.69 28.175 57.7784 24.85 58.3005C22.925 58.6485 20.825 58.4745 19.25 57.2563C18.725 56.9082 18.2 56.2121 18.2 55.69C18.2 54.9939 18.55 54.1237 19.075 53.7757C19.425 53.6016 20.3 53.7757 20.825 53.9497C21.35 54.4718 21.875 55.1679 22.225 55.864C23.275 57.2563 24.675 57.4303 26.075 56.3861C27.65 54.9939 28.525 53.0795 29.05 51.1652C30.1 46.9885 31.15 42.9858 32.025 38.809V38.1129L22.75 36.7207L23.1 34.1102L32.725 35.5024L33.95 30.1075L23.975 28.5412L24.325 25.7567L34.65 27.149C35 26.1048 35.1749 25.2346 35.525 24.3645C36.4 21.2319 37.275 18.0994 39.375 15.3149C41.475 12.5304 43.925 10.7901 47.6 10.9641C49.175 10.9641 50.75 11.4862 51.8 12.7044C51.975 12.8784 52.325 13.2265 52.325 13.5746C52.325 14.2707 52.325 15.1408 51.8 15.6629C51.1 16.185 50.2249 16.011 49.525 15.3149C49 14.7928 48.65 14.2707 48.125 13.7486C47.075 12.3563 45.5 12.1823 44.275 13.4005C43.4 14.2707 42.525 15.4889 42 16.7071C40.775 20.3618 39.9 24.1904 38.675 28.0191L48.3 29.4114L47.6 32.0218L38.325 30.6296Z" fill="black"/></g></svg></img>
<img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiM5ZmE4ZGEiIGQ9Ik0xMSAyNEwyNSAyIDM5IDI0IDI1IDMyeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM3OTg2Y2IiIGQ9Ik0yNSAyTDM5IDI0IDI1IDMyeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM5ZmE4ZGEiIGQ9Ik0xMSAyN0wyNSAzNSAzOSAyNyAyNSA0NnoiPjwvcGF0aD48cGF0aCBmaWxsPSIjNzk4NmNiIiBkPSJNMjUgMzVMMzkgMjcgMjUgNDZ6TTExIDI0TDI1IDE4IDM5IDI0IDI1IDMyeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM1YzZiYzAiIGQ9Ik0yNSAxOEwzOSAyNCAyNSAzMnoiPjwvcGF0aD4KPC9zdmc+"/>

Currently, most wallets and exchanges only support `f1` or `f3` addresses. The majority of exchanges are still implementing support for `f4` addresses. This means that many wallets and exchanges won’t let you directly transfer FIL to an `f4` address. The process for sending FIL from a Filecoin address to an Ethereum address depends on the kind of wallet you have.

### Ledger device

Currently Ledger Live does not support `0x` or `f4` addresses, so you cannot use it to directly send funds to a `0x` address. However, you can connect your Ledger device to the Glif.io wallet and transfer FIL from a Filecoin address to an Etheruem-style `0x` address. This method is more secure than the [Hot wallet](#hot-wallet) method detailed below, since your private keys never leave your Ledger device.

In this method, you will connect your Ledger device to the Glif.io website app, and use the app to send FIL from your Ledger to an Ethereum-style address.

1. Log in to Ledger Live dashboard and update your Ledger device’s Filecoin app to version `0.22.9`:
1. Ensure your Ledger device is connected to your computer and the Filecoin app is open on your hardware wallet. Your Ledger should display **Filecoin ready**:
1. Go to [Glif](https://glif.io) and click **Connect Wallet**:

    ![Screen Shot 2023-03-15 at 5 45 22 PM](https://user-images.githubusercontent.com/113331491/225487652-02f64b53-09dd-4e05-bf60-05cfc8793772.png)

1. Select **Ledger (Filecoin)** and unlock your Ledger device, selecting the Filecoin application:

    ![Screen Shot 2023-03-15 at 6 05 51 PM](https://user-images.githubusercontent.com/113331491/225487711-e0c9ee09-6d8a-42e8-9582-039ef15351dc.png)

1. Once connected you should see the details of your Filecoin account stored on your Ledger:

    ![Screen Shot 2023-03-15 at 5 28 41 PM](https://user-images.githubusercontent.com/113331491/225487875-5492345d-cbcb-4618-b358-dd94bc5fa00c.png)

1. Click **Send FIL**.
1. Enter the Ethereum-style `0x` address you with to send to. Glif with automatically converted the `0x` address into an `f4` address.

    ![Screen Shot 2023-03-15 at 6 12 07 PM](https://user-images.githubusercontent.com/113331491/225487916-c4e9e0ec-29f9-4f77-b8a2-ed6e159d61a7.png)

1. Enter the amount of FIL you want to send.
1. Click **Send**.
1. Verify the information on screen is correct and accept the transaction on your hardware device.
1. You can check the status of this transfer by clicking the transaction ID link:

    ![Screen Shot 2023-03-15 at 6 14 03 PM](https://user-images.githubusercontent.com/113331491/225488037-97af20d6-43ca-4c44-b25e-022133668711.png)

1. The transferred FIL will take around 2 mintutes to show up at the Ethereum-style `0x` address.

### Hot wallet

A hot wallet is a cryptocurreny wallet that is always connected to the internet. They allow you to store, send, and receive tokens. Because hot wallets are always connected to the internet, they tend to be somewhat more vulnerable to hacks and theft than cold storage methods. However, they a generaly easier to use than cold, and do not require any specific hardware like a Ledger device.

In this method, you will create a _burner wallet_ using Glif, transfer FIL to the burner wallet, and then transfer FIL from the burner wallet to Metamask.

1. Navigate to [https://wallet.glif.io/](https://wallet.glif.io/).
1. Under **Burner wallets**, click **Create Seed Phase**.
1. Write down your seed phrase somewhere safe. You can also copy or download the seed phrase. You will need it later.
1. Click **I've recorded my seed phrase**.
1. Using your seed phrase, enter the missing words in the blank text fields.
1. Click **Next**.
1. Click **Next** again.
1. In the upper left corner of your wallet dashboard, click on the double squares icon next to your address to copy it.
1. Record this address. You will need it later.
1. From your main wallet account or exchange, transfer some funds to this address.
1. From Metamask, copy your 0x address.
1. Once the funds appear in the burner wallet, click on **Send**.
1. Enter the necessary information into the text fields:
   - In the **Recipient** field, enter your 0x style address. GLIF automatically converts it to an f4 address.
   - In the **Amount** field, enter the amount of Fil to send.
   - In **Params**, add optional Base64 parameters. 
1. Click **Review**.
1. Once you've reviewed, click **Send**.
1. The Fil will arrive in your Metamask wallet shortly.

## Filecoin → Filecoin

<img><svg width="60" height="60" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_248_552" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="70" height="70"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H70V69.6123H0V0Z" fill="white"/></mask><g mask="url(#mask0_248_552)"><path fill-rule="evenodd" clip-rule="evenodd" d="M35 69.6119C15.75 69.6119 0 53.9491 0 34.6316C0.175 15.4882 15.75 -0.174548 35.175 -0.000516747C54.425 0.173514 70 15.6623 70 35.1537C69.825 54.1231 54.25 69.6119 35 69.6119Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M38.325 30.6296L37.275 36.1986L47.25 37.5908L46.55 40.2013L36.75 38.809C36.05 41.0714 35.7 43.5079 34.825 45.5962C33.95 48.0327 33.075 50.4691 32.025 52.7315C30.625 55.69 28.175 57.7784 24.85 58.3005C22.925 58.6485 20.825 58.4745 19.25 57.2563C18.725 56.9082 18.2 56.2121 18.2 55.69C18.2 54.9939 18.55 54.1237 19.075 53.7757C19.425 53.6016 20.3 53.7757 20.825 53.9497C21.35 54.4718 21.875 55.1679 22.225 55.864C23.275 57.2563 24.675 57.4303 26.075 56.3861C27.65 54.9939 28.525 53.0795 29.05 51.1652C30.1 46.9885 31.15 42.9858 32.025 38.809V38.1129L22.75 36.7207L23.1 34.1102L32.725 35.5024L33.95 30.1075L23.975 28.5412L24.325 25.7567L34.65 27.149C35 26.1048 35.1749 25.2346 35.525 24.3645C36.4 21.2319 37.275 18.0994 39.375 15.3149C41.475 12.5304 43.925 10.7901 47.6 10.9641C49.175 10.9641 50.75 11.4862 51.8 12.7044C51.975 12.8784 52.325 13.2265 52.325 13.5746C52.325 14.2707 52.325 15.1408 51.8 15.6629C51.1 16.185 50.2249 16.011 49.525 15.3149C49 14.7928 48.65 14.2707 48.125 13.7486C47.075 12.3563 45.5 12.1823 44.275 13.4005C43.4 14.2707 42.525 15.4889 42 16.7071C40.775 20.3618 39.9 24.1904 38.675 28.0191L48.3 29.4114L47.6 32.0218L38.325 30.6296Z" fill="black"/></g></svg></img>
<img><svg width="60" height="60" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_248_552" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="70" height="70"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H70V69.6123H0V0Z" fill="white"/></mask><g mask="url(#mask0_248_552)"><path fill-rule="evenodd" clip-rule="evenodd" d="M35 69.6119C15.75 69.6119 0 53.9491 0 34.6316C0.175 15.4882 15.75 -0.174548 35.175 -0.000516747C54.425 0.173514 70 15.6623 70 35.1537C69.825 54.1231 54.25 69.6119 35 69.6119Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M38.325 30.6296L37.275 36.1986L47.25 37.5908L46.55 40.2013L36.75 38.809C36.05 41.0714 35.7 43.5079 34.825 45.5962C33.95 48.0327 33.075 50.4691 32.025 52.7315C30.625 55.69 28.175 57.7784 24.85 58.3005C22.925 58.6485 20.825 58.4745 19.25 57.2563C18.725 56.9082 18.2 56.2121 18.2 55.69C18.2 54.9939 18.55 54.1237 19.075 53.7757C19.425 53.6016 20.3 53.7757 20.825 53.9497C21.35 54.4718 21.875 55.1679 22.225 55.864C23.275 57.2563 24.675 57.4303 26.075 56.3861C27.65 54.9939 28.525 53.0795 29.05 51.1652C30.1 46.9885 31.15 42.9858 32.025 38.809V38.1129L22.75 36.7207L23.1 34.1102L32.725 35.5024L33.95 30.1075L23.975 28.5412L24.325 25.7567L34.65 27.149C35 26.1048 35.1749 25.2346 35.525 24.3645C36.4 21.2319 37.275 18.0994 39.375 15.3149C41.475 12.5304 43.925 10.7901 47.6 10.9641C49.175 10.9641 50.75 11.4862 51.8 12.7044C51.975 12.8784 52.325 13.2265 52.325 13.5746C52.325 14.2707 52.325 15.1408 51.8 15.6629C51.1 16.185 50.2249 16.011 49.525 15.3149C49 14.7928 48.65 14.2707 48.125 13.7486C47.075 12.3563 45.5 12.1823 44.275 13.4005C43.4 14.2707 42.525 15.4889 42 16.7071C40.775 20.3618 39.9 24.1904 38.675 28.0191L48.3 29.4114L47.6 32.0218L38.325 30.6296Z" fill="black"/></g></svg></img>

There are no special steps or requirements for sending Filecoin from one Filecoin-style address to another on the Filecoin network.
