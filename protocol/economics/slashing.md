---
description: >-
  Filecoin slashing and fault fees: what triggers a penalty, how much it costs,
  and the exceptions that protect honest providers.
---

# Slashing

**Slashing is the set of penalties the network applies when a storage provider fails to keep its sectors available, ends a sector early, or acts maliciously against consensus.**

For how proofs work, see [Storage proving](storage-proving.md). If you run a provider, see [Monitor proofs and faults](../../provide-storage/monitor-proofs-and-faults.md).

## Storage fault penalties

A sector becomes _faulty_ when its provider misses a WindowPoSt. A faulty sector loses its storage power, which lowers the provider's chance of winning block rewards. The provider also pays:

| Penalty | When it applies |
| --- | --- |
| Fault fee | For each day a sector stays faulty. It equals 3.51 days of the sector's expected block rewards. |
| Sector penalty | When a sector fails a WindowPoSt without having been declared faulty in advance. It is paid first, and fault fees follow. |
| Termination fee | When a sector is terminated, whether the provider ends it or the network does. The network terminates a sector that has been faulty for 42 days in a row. |

Penalty payments are burned: they go to the burn account `f099`. A fee that a provider can't pay right away becomes _fee debt_, which is paid from its block rewards as they become available.

## Consensus fault slashing

A provider that commits a consensus fault, meaning it acts maliciously against the network's consensus, is slashed. This is a separate penalty from the storage fault penalties above.

## Exceptions for honest providers

Providers sometimes miss a WindowPoSt because of downtime or a bug. To keep the network welcoming to smaller providers, [FIP-0002](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0002.md) gives these exceptions:

* A provider with a history of acting honestly pays no penalty in the current proving period for a sector that newly faults on a missed WindowPoSt.
* There are no fees if the sector is recovered in a later proving period.
* Fault fees apply only to sectors that were already faulty in a previous proving period or are marked for recovery. They are never charged for the current proving period.

## Next steps

* [Committed capacity](committed-capacity.md): storage a provider must keep online to avoid these penalties.
* [Block rewards](block-rewards.md): what a provider earns when it wins a block.
* [The FIL token](../fil/the-fil-token.md): what FIL pays for, its supply and its units.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/economics/slashing)
