---
title: 'Lotus Miner: sector pledging'
description: "Pledging sectors is a technique to seal sectors with random data to make increase the miner's power in the network. This guide covers the motivation, steps to create and upgrade pledged sectors back to a usable state."
breadcrumb: 'Sector pledging'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Reasons to pledge sectors

As we have [explained](../how-mining-works.md#power-and-rewards), the amount of power of a miner in the Filecoin network is directly proportional to the amount of live storage (active sectors) contributed to the network. Miners with more power have more chances to be selected to mine new blocks.

By sealing sectors with random data (pledging), a miner can demonstrate to the network that it has setup and could potentially offer that much storage for real deals when there is enough demand or when it decides to do so. In the meantime, pledged sectors work similar to regular sectors and result in an increase in the miner's power.

Taking the above into account **pledging sectors [on mainnet] network makes most sense when doing it at a scale where it provides enough power to have real chances to mine new blocks**. Otherwise it is only useful for testing purposes.

::: tip
Pledging one sector during miner setup can be useful to test how long the sealing process takes and make sure that the miner's hardware is correctly configured before taking on real deals.
:::

## Pledging a sector

To pledge a sector use:

```sh
lotus-miner sectors pledge
```

This will, by default, pledge the space for 540 days.

::: warning
This will write data to `$TMPDIR` so make sure that there is enough space available.
:::

Check that the sealing job has started with:

```sh
lotus-miner sealing jobs
```

This will be accommpanied by a file in `<PATH_FOR_SEALING_STORAGE>/unsealed`.

After some minutes, you can check the sealing progress with:

```sh
lotus-miner sectors list
# and
lotus-miner sealing workers
```

When sealing for the new is complete, `pSet: NO` will become `pSet: YES`.

## Adjusting the expected seal duration setting

If you pledged a sector, you can use the duration of the operation to update the [`ExpectedSealDuration` setting](miner-configuration.md#dealmaking-section).

To find out how long it took to seal the sector, run:

```
lotus-miner sectors status --log 0
```

Then follow the instructions in the configuration reference linked above.

## Upgrading pledged sectors

The minimum pledge period is 6 months. However, the pledged sector can be replaced before then by replacing it with a new sector containing deals, as long as the replacement sector expires after the pledged sector. The following command marks a sector for _upgrade_:

```sh
lotus-miner sectors mark-for-upgrade <sector number>
```

The sector should become inactive within 24 hours after a new replacement sector has sealed. From that point, the pledged storage can be re-used for new sectors.
