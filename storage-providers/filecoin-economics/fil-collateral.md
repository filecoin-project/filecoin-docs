---
description: >-
  This page discusses the concept of collateral in Filecoin for storage
  providers.
---

# FIL collateral

As a storage provider on the network, you will have to create FIL wallets and add FIL to them. This is used to send messages to the blockchain but is also used for collateral. Providing storage capacity to the network requires you to provide FIL as collateral, which goes into a locked wallet on your Lotus instance. The [Lotus documentation](https://lotus.filecoin.io/storage-providers/operate/addresses/) details the process of setting up your wallets and funding wallets for the initial setup. Filecoin uses upfront token collateral, as in proof-of-stake protocols, proportional to the storage hardware committed. This gets the best of both worlds to protect the network: attacking the network requires both acquiring and running the hardware, but it also requires acquiring large quantities of the token.

## Types of collateral

To satisfy the varied collateral needs of storage providers in a minimally burdensome way, Filecoin includes three different collateral mechanisms:

* _Initial pledge collateral_, an initial commitment of FIL that a miner must provide with each sector.
* _Block rewards as collateral_, a mechanism to reduce the initial token commitment by vesting block rewards over time.
* _Storage deal provider collateral_, which aligns incentives between storage provider and client and can allow storage providers to differentiate themselves in the market.

For more detailed information about how collateral requirements are calculated, see the [miner collateral section in the Filecoin spec](https://spec.filecoin.io/systems/filecoin\_mining/miner\_collaterals/).

When a storage provider fails to answer to the WindowsPoSt challenges within the 30-minute deadline (see [Storage Proving](storage-proving.md)), storage is taken offline, or any storage deal rules are broken, the provider is penalized against the provided collateral. This penalty is called [_slashing_](slashing.md) and means that a portion of the pledged collateral is forfeited to the `f099` address from your locked or available rewards, and your storage power is reduced. The `f099` address is the address where all burned FIL goes.

## Commit Pledge

The amount of required collateral depends on the amount of storage pledged to the Filecoin network. The bigger volume you store, the more collateral is required. Additionally, Filecoin Plus uses a [QAP](../../reference/general/glossary.md#quality-adjusted-storage-power) multiplier to increase the collateral requirement. See [Verified Deals with Filecoin Plus](../filecoin-deals/verified-deals.md) for more information.

The formula for the required collateral is as follows:

_Collateral needed for X TiB = (Current Sector Initial Pledge) x (32) x (X TiB)_

For instance, for 100 TiB at 0.20 FIL / 32 GiB sector, this means:

_0.20 FIL x 32 x 100 = 640 FIL_

The “Current Sector Initial Pledge" can be found on blockchain explorers like [Filfox](https://filfox.info/en) and on the [Starboard dashboards](https://dashboard.starboard.ventures/capacity-services#commit-pledge-per-32gib-qap).

## Gas fees

Another cost factor in the network is gas. Storage providers not only pledge collateral for the capacity they announce on-chain. The network also burns FIL in the form of gas fees. Most activity on-chain has some level of gas involved. For storage providers, this is the case for committing sectors.

The gas fees fluctuate over time and can be followed on various websites like [Filfox - Gas Statistics](https://filfox.info/en/stats/gas) and [Beryx - Gas Estimator](https://beryx.io/estimate\_gas).

## FIL lending programs

<!-- TODO: Update FIL lending link - filecoin-lending.com is no longer accessible -->
The ecosystem has FIL lenders who can provide you FIL (with interest) to get you started, which you can pay back over time and with the help of earned block rewards. Every lender, though, will still require you to supply up to 20% of the required collateral. The [Filecoin Virtual Machine](../../smart-contracts/fundamentals/the-fvm.md), introduced in March 2023, enables the creation of new lending mechanisms via smart contracts.



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/storage-providers/filecoin-economics/fil-collateral)
