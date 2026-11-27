---
description: >-
  Bridges with contracts on Filecoin: Axelar and Celer, their token addresses on
  Mainnet, and how wrapped FIL fits in.
---

# Cross-chain bridges

**A cross-chain bridge moves an asset from one blockchain to another. Bridges let exchanges list assets from many chains and let users reach apps on other networks.**

The bridges below are third-party services. A bridge is a security risk, so check each project's documentation for the current supported networks, assets and addresses before you use one.

## Axelar

[Axelar](https://axelar.network/) offers token bridging and general message passing between major EVM chains and the Cosmos ecosystem. Its contracts are on Filecoin [Mainnet](../../networks/mainnet.md).

| Token | Mainnet address |
| --- | --- |
| wFIL | `0x60E1773636CF5E4A227d9AC24F20fEca034ee25A` |
| axlUSDC | `0xEB466342C4d449BC9f53A865D5Cb90586f405215` |
| axlUSDT | `0x7f5373AE26c3E8FfC4c77b7255DF7eC1A9aF52a6` |
| axlWBTC | `0x1a35EE4640b0A3B87705B0A4B45D227Ba60Ca2ad` |
| axlWETH | `0xb829b68f57CC546dA7E5806A929e53bE32a4625D` |
| axlDAI | `0x5C7e299CF531eb66f2A1dF637d37AbB78e6200C7` |

More: [Axelar developer documentation](https://docs.axelar.dev/dev/intro), [Squid Router](https://app.squidrouter.com/) and a [getting started tutorial](https://www.youtube.com/watch?v=L7cw5FhxW4s).

## Celer

[Celer](https://cbridge.celer.network/1/314) offers token bridging through cBridge and message passing through Celer Inter-chain Messaging (Celer IM). Its contracts are on Mainnet and [Calibration](../../networks/calibration.md).

| Contract | Mainnet | Calibration |
| --- | --- | --- |
| wFIL | `0x60E1773636CF5E4A227d9AC24F20fEca034ee25A` | |
| ceUSDC | `0x2421db204968A367CC2C866CD057fA754Cb84EdF` | `0xf5C6825015280CdfD0b56903F9F8B5A2233476F5` |
| ceUSDT | `0x422849b355039bc58f2780cc4854919fc9cfaf94` | `0x7d43AABC515C356145049227CeE54B608342c0ad` |
| ceWBTC | `0x592786e04c47844aa3b343b19ef2f50a255a477f` | `0x265B25e22bcd7f10a5bD6E6410F10537Cc7567e8` |
| ceWETH | `0x522b61755b5ff8176b2931da7bf1a5f9414eb710` | `0x5471ea8f739dd37E9B81Be9c5c77754D8AA953E4` |
| MessageBus | `0x6ff2130fbdd2837b0c92d7f56f6c017642d84f66` | `0xd5818D039A702DdccfD11A900A40B3dc6DA03CEc` |

More: [cBridge documentation](https://cbridge-docs.celer.network/) and [Celer IM documentation](https://im-docs.celer.network/).

## Wrapped FIL

To move FIL itself, wrap it first. See [Wrapped FIL](wrapped-fil.md).

## Related pages

* [FVM advanced](README.md): tools and services for FVM developers.
* [The FIL token](../../fil/the-fil-token.md): what FIL pays for, its supply and its units.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/fvm/advanced/cross-chain-bridges)
