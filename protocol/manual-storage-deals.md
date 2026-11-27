---
description: >-
  Make a storage deal directly with a storage provider and record it onchain
  with the Market actor. The deal lifecycle and what each side does.
---

# Manual storage deals

**A manual storage deal is a deal you negotiate directly with a storage provider and record onchain with the Market actor, instead of using a managed service or the PoRep Market. You choose the provider and the terms, and you run each step yourself.**

Most people don't need it. To store data without choosing providers, see [Choose a storage option](../getting-started/choose-a-storage-option.md). Use a manual deal when you want to pick the provider and set the terms yourself, and you are comfortable with the deal lifecycle below.

## How a deal works

A deal moves through these steps:

1. **Prepare the data.** Pack your files into CAR files that fit a sector. A sector is 32 GiB or 64 GiB, and a piece is padded to a power-of-two size. Each piece has a piece CID. Tools such as [Singularity](https://github.com/data-preservation-programs/singularity) and the [data-prep-tools](https://github.com/filecoin-project/data-prep-tools) CLIs do this. A provider can also prepare the data for you.
2. **Agree the terms.** Choose a provider and agree the price per epoch, the duration, the start epoch and the collateral. A deal must last between 180 days and 1,278 days.
3. **Fund the deal.** Both sides lock FIL in the Market actor. The client adds its balance with `AddBalance`. The provider adds the deal's collateral, which must be at least a network minimum that depends on the size of the deal and the circulating supply. The client's collateral is optional: its minimum is zero.
4. **Propose the deal.** The client signs a deal proposal with the piece CID, piece size, provider, price, start and end epoch, and collateral, and sends the signed proposal and the data to the provider. The data goes offchain, usually over HTTP. Deal-market software such as [Boost](https://boost.filecoin.io/) receives it on the provider's side.
5. **Publish the deal.** The provider checks the proposal, then calls `PublishStorageDeals` on the Market actor from its worker or control address. The chain returns a deal ID.
6. **Seal the sector.** The provider puts the piece in a sector and seals it. See [Storage proving](economics/storage-proving.md). The deal becomes active when the sealed sector is proven onchain. This must happen before the start epoch. If it doesn't, the deal is invalid and the provider loses its deal collateral.
7. **Payment and proof.** Payment accrues in a straight line between the start and end epoch, at the agreed price per epoch. For the whole term, the provider keeps proving the sector with WindowPoSt, and faults are [slashed](economics/slashing.md).
8. **Retrieve.** The provider can keep an unsealed copy to serve retrievals, and sets its own price for them. Boost handles HTTP retrievals.

## DataCap and verified deals

A deal proposal still has a `verified_deal` field, but it has no effect. Since the Solstice upgrade on 19 October 2026 ([FIP-0118](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0118.md)), Filecoin Plus is deprecated: no new DataCap is minted or allocated, and unused DataCap can't be used. Every new sector gets 10x quality-adjusted power whatever it holds, so you don't need DataCap to give a provider a reason to take your deal, and there is nothing to apply for.

## Snap deals

A provider that has already sealed empty capacity sectors can put your data into one with a _snap deal_, without sealing again. The provider replaces the sector's contents and proves the update, which skips the heaviest sealing step. The sector keeps 10x power, and the provider may need to lock more collateral if the update raises it.

## Next steps

* [Storage proving](economics/storage-proving.md)
* [Slashing](economics/slashing.md)
* [Addresses](concepts/addresses.md)
* For provider-side tools, pricing and setup, see [Provide Storage](../provide-storage/overview.md).
* [Actors](concepts/actors.md): the programs that hold state and run the network.
* [Committed capacity](economics/committed-capacity.md): sectors that add power without customer data.
* [The FIL token](fil/the-fil-token.md): what FIL pays for, its supply and its units.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/manual-storage-deals)
