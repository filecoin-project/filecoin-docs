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
    parent: "providers-filecoin-economics"
    identifier: "fil-collateral-5410330c778d23a6de3c962d57bf85fb"
weight: 20
toc: true
---

As Storage Provider on the network you will have to create FIL wallets, and add FIL to them. This is used to send messages to the blockchain but is also used for collateral. Providing storage capacity to the network requires you to provide FIL as collateral, which goes into a locked wallet on your Lotus instance. The [Lotus documentation](https://lotus.filecoin.io/storage-providers/operate/addresses/) details the process of setting up your wallets and funding wallets for the initial setup. Filecoin uses upfront token collateral, as in proof-of-stake protocols, proportional to the storage hardware committed. This gets the best of both worlds to protect the network: attacking the network requires both acquiring and running the hardware, but it also requires acquiring large quantities of the token.

## Types of collateral

To satisfy the multiple needs for collateral in a way that is minimally burdensome to Storage Providers, Filecoin includes three different collateral mechanisms: initial pledge collateral, block rewards as collateral, and storage deal provider collateral. The first is an initial commitment of filecoin that a miner must provide with each sector. The second is a mechanism to reduce the initial token commitment by vesting block rewards over time. The third aligns incentives between Storage Provider and client, and can allow miners to differentiate themselves in the market. <!--TODO NOBLOCK STEF BOB needs more explanation or linking? is the second basically re-investing earned blocks to give greater future capacity?-->

For more detailed information about how collateral requirements are calculated, see the [miner collateral section in the Filecoin spec](https://spec.filecoin.io/systems/filecoin_mining/miner_collaterals/).

When a Storage Provider fails to answer to the WindowsPoSt challenges within the 30 minute deadline (see [Storage Proving]({{<relref storage-proving >}})) or when you take your storage offline and thereby break the rules of the storage deal, you will get penalized against the provided collateral. This penalty is called [slashing]({{<relref slashing>}}) and means a portion of the pledged collateral is forfeited <!--TODO NOBLOCK STEF BOB where does it go? who gets it? Does it all go? -->and your storage power is reduced.

## How much collateral?

The amount of required collateral depends on the amount of storage pledged to the Filecoin network. The bigger volume you store, the more collateral is required. Additionally, Filecoin Plus uses a [QAP](https://docs.filecoin.io/reference/general/glossary/#quality-adjusted-storage-power) multiplier to increase the collateral requirement. See [Verified Deals with Filecoin Plus]({{<relref "verified-deals" >}}) for more information.

The formula for the required collateral is:

{{< alert  >}}
_Collateral needed for X TiBs = (Current Sector Initial Pledge) x (32) x (X TiBs)_

So for instance for 100TiB at a 0.20FIL / 32GiB sector this means:

_0.20FIL x 32 x 100 = 640 FIL_
{{< /alert >}}

The “Current Sector Initial Pledge" can be found on blockchain explorers like [Filfox](https://filfox.info/en) and [Filscout](https://www.filscout.com/en).

## FIL lending programs

The ecosystem does have [FIL Lenders](https://filecoin-lending.com/read-more) <!-- TODO NOBLOCK STEF BOB is this platform actually doing anything?--> who can provide you FIL (but with interest) to get you started which you can pay back over time and with the help of earned block rewards. Every lender, though,  will still require you to supply upto 20% of the required collateral.
The introduction of the [Filecoin Virtual Machine]({{<relref "the-filecoin-virtual-machine" >}}), in March 2023, should enable the creation of new lending mechanisms, via smart contracts.
