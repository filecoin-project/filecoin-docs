---
title: "FIL collateral"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "fil-collateral-5410330c778d23a6de3c962d57bf85fb"
weight: 20
toc: true
---

Before a Storage Provider can do anything on the network he has to create FIL wallets and add FIL to them. This is used to send messages to the blockchain but is also used for collateral. Providing storage capacity to the network requires a Storage Provider to provide FIL as collateral, which goes into a locked wallet on their miner instance. Filecoin uses upfront token collaterals, as in proof-of-stake protocols, proportional to the storage hardware committed. This gets the best of both worlds to protect the network: attacking the network requires both acquiring and running the hardware, but it also requires acquiring large quantities of the token.

To satisfy the multiple needs for collateral in a way that is minimally burdensome to Storage Providers, Filecoin includes three different collateral mechanisms: initial pledge collateral, block reward as collateral, and storage deal provider collateral. The first is an initial commitment of filecoin that a miner must provide with each sector. The second is a mechanism to reduce the initial token commitment by vesting block rewards over time. The third aligns incentives between miner and client, and can allow miners to differentiate themselves in the market. 

For more detailed information about the calculation of collateral, see the following sections in the [Filecoin spec](https://spec.filecoin.io/systems/filecoin_mining/miner_collaterals/).

When a Storage Provider fails to answer to the WindowsPoSt challenges within the 30 minute deadline (see [Storage Proving]({{< relref "storage-proving" >}})) or when he takes his storage offline and thereby breaks the rules of the storage deal, he will get penalized against the provided collateral. This penalty is called “slashing” and means a portion of the pledged collateral is forfeited and the storage power of the Storage Provider is reduced.

Providing collateral for multiple PiB’s of data is not cheap. As the amount of required collateral depends on the amount of storage pledged to the Filecoin network, the bigger volume one stores, the more collateral is required. Programs like Fil+ that use a QAP multiplier increase the collateral requirement equal to the multiplier. See [Verified Deals with Filecoin Plus]({{< relref "verified-deals" >}}) for more information on that.

The formula for the required collateral is:

> Collateral needed for X TiBs = (Current Sector Initial Pledge) x (32) x (X TiBs)
>
> So for instance for 100TiB at a 0.20FIL / 32GiB sector this means:
>
> 0.20FIL x 32 x 100 = 640 FIL

The “Current Sector Initial Pledge '' can be found on blockchain explorers like [Filfox](https://filfox.info/en) and [Filscout](https://filscout.com/en).

The ecosystem does have FIL Lenders who can provide you FIL (at a cost)  to get started which you can pay back over time and with the help of earned block rewards. Every lender will require you to hold 20% of the required collateral though.


