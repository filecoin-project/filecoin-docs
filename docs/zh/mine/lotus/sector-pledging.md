---
title: 'Lotus Miner: sector pledging'
description: "Pledging sectors is a technique to seal sectors with random data to make increase the miner's power in the network. This guide covers the motivation, steps to create and upgrade pledged sectors back to a usable state."
breadcrumb: 'Sector pledging'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Reasons to pledge sectors

As we have [explained](../how-mining-works.md#power-and-rewards), the amount of power of a miner in the Filecoin network is directly proportional to the amount of live storage (active sectors) contributed to the network. Miners with more power have more chances to be selected to mine new blocks.

By sealing sectors with random data, a miner can demonstrate to the network that it can potentially offer that much storage for real deals when there is enough demand or when it decides to do so. This is known as _pledging_. In the meantime, pledged sectors work similar to regular sectors and result in an increase in the miner's power.

Taking the above into account, **pledging sectors [on mainnet] network makes most sense when doing it at a scale where it provides enough power to have real chances to mine new blocks**. Otherwise, it is only useful for testing purposes.

::: tip
Pledging one sector during miner setup can be useful to test how long the sealing process takes and make sure that the miner's hardware is correctly configured before taking on real deals.
:::

## Pledging a sector

To pledge a sector use:

```sh
lotus-miner sectors pledge
```

In Lotus, this will pledge the space for ~538 days by default. 

> The protocol allows a sector to have expiration time between [180-540](https://github.com/filecoin-project/specs-actors/blob/73e0409ac77c918c8fc91681c250a710c4b9a374/actors/builtin/miner/policy.go#L201-L206) days. Lotus will allow user to set the committed capacity sector expiration time upon pledge once [issue #4760](https://github.com/filecoin-project/lotus/issues/4760) is addressed.

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

## Inspect expiring sectors

You can check which sectors are about to expire. Sectors that will expire within 60 days can be checked by default with the following command:

```shell
lotus-miner sectors check-expire
```

If you want to check for sectors that will expire within 33 days (669600 epoch in devnet) , add the `--cutoff` option along with your desired epoch:

```shell with-output
lotus-miner sectors check-expire --cutoff 669600
```

```shell output
ID  SealProof  InitialPledge  Activation                      Expiration                  MaxExpiration                 MaxExtendNow                  
5   5          59.605 nFIL    1519 (1 day 9 hours ago)        691857 (in 4 weeks 2 days)  5257519 (in 34 weeks 3 days)  1587303 (in 10 weeks 2 days)  
10  5          59.605 nFIL    3588 (1 day 7 hours ago)        697617 (in 4 weeks 2 days)  5259588 (in 34 weeks 4 days)  1587303 (in 10 weeks 2 days)  
11  5          59.605 nFIL    4695 (1 day 6 hours ago)        697617 (in 4 weeks 2 days)  5260695 (in 34 weeks 4 days)  1587303 (in 10 weeks 2 days)  
15  5          59.605 nFIL    6891 (1 day 4 hours ago)        700497 (in 4 weeks 2 days)  5262891 (in 34 weeks 4 days)  1587303 (in 10 weeks 2 days)  
17  5          59.605 nFIL    7004 (1 day 3 hours ago)        700497 (in 4 weeks 2 days)  5263004 (in 34 weeks 4 days)  1587303 (in 10 weeks 2 days)
```

## Extend sectors

You can extend the lifecycle of a sector with the command:

```shell
lotus-miner sectors renew [command options] [arguments...]
```

This is an example of selecting sectors with a lifecycle between `epochnumber-a` epoch and `epochnumber-b` epoch and updating it to 1555200 epoch:

```shell
lotus-miner sectors renew  --from <epochnumber-a> --to <epochnumber-b> --new-expiration 1555200
```

This is an example of updating the lifecycle of a sector read from a file to 1555200 epoch:

```shell
lotus-miner sectors renew  --sector-file <your-sectorfile> --new-expiration 1555200
```

::: warning
You have to select the sectors to renew. That means you have to specify the `--from` and `--to` option, or specify the sector file, if no sector is selected this command will have no effect.

Format of sector file:

```  
1  
2  
...
```  
:::
