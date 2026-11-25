---
description: >-
  Committed capacity (CC) sectors hold no customer data but earn the same 10x
  power as data sectors after Solstice. Why the network needs them and what
  providers must keep online.
---

# Committed capacity

**Committed capacity (CC) is storage that a provider commits to the network without any customer data. A CC sector is filled with random data when it is created, and it counts toward the provider's storage power.**

For what running a provider involves, see [How storage providers earn](../../provide-storage/how-storage-providers-earn.md).

## Why the network needs it

Filecoin's consensus is based on proof of storage, so the network needs enough providers committing capacity to take part in it. A CC sector is how a provider does that without customer data. CC sectors can be 32 GiB or 64 GiB.

Storage power is what [Consensus](../concepts/consensus.md) weighs when it elects block producers, so committed capacity helps a provider win [block rewards](block-rewards.md).

Since the Solstice upgrade on 19 October 2026 ([FIP-0118](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0118.md)), every new sector gets 10x quality-adjusted power for its whole life, whatever it holds. A CC sector therefore earns the same power as a sector full of customer data. Sectors onboarded before the upgrade keep the power they had.

## Availability requirement

The network relies on committed storage staying available and unaltered, so a provider must keep its capacity online and show that it is. The WindowPoSt check does this. See [Storage proving](storage-proving.md).

If a provider fails the check, the sector is penalized and loses its storage power. That is an immediate cost, and it also lowers future earnings, because block rewards follow storage power. See [Slashing](slashing.md).

## Next steps

* [Storage proving](storage-proving.md): how WindowPoSt checks that capacity is online.
* [Slashing](slashing.md): the penalties for failing the check.
* [Manual storage deals](../manual-storage-deals.md): negotiate and record a deal directly with a provider.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/economics/committed-capacity)
