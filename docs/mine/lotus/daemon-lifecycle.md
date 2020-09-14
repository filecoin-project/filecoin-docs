---
title: 'Lotus Miner: daemon lifecycle'
description: 'This guide contains important information about starting and stopping the Lotus miner daemon.'
breadcrumb: 'Daemon lifecycle'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Safely stopping the daemon

Before shutting down your miner daemon, make sure that they have no pending operations that could get your miner slashed.

Run `lotus-miner proving info`. If any deadline shows a block height in the past, do not restart.

In the following example, Deadline Open is 454 which is earlier than Current Epoch of 500. This miner should not be shut down or restarted:

```bash
$ sudo lotus-miner proving info

Miner: t01001
Current Epoch:           500
Proving Period Boundary: 154
Proving Period Start:    154 (2h53m0s ago)
Next Period Start:       3034 (in 21h7m0s)
Faults:      768 (100.00%)
Recovering:  768
Deadline Index:       5
Deadline Sectors:     0
Deadline Open:        454 (23m0s ago)
Deadline Close:       514 (in 7m0s)
Deadline Challenge:   434 (33m0s ago)
Deadline FaultCutoff: 384 (58m0s ago)
```

In this next example, the miner can be safely restarted because no Deadlines are earlier than Current Epoch of 497. You have ~45 minutes before the miner must be back online to declare faults (FaultCutoff). If the miner has no faults, you have about an hour.

```bash
$ sudo lotus-miner proving info

Miner: t01000
Current Epoch:           497
Proving Period Boundary: 658
Proving Period Start:    658 (in 1h20m30s)
Next Period Start:       3538 (in 25h20m30s)
Faults:      0 (0.00%)
Recovering:  0
Deadline Index:       0
Deadline Sectors:     768
Deadline Open:        658 (in 1h20m30s)
Deadline Close:       718 (in 1h50m30s)
Deadline Challenge:   638 (in 1h10m30s)
Deadline FaultCutoff: 588 (in 45m30s)
```

Once you have verified that your miner is safe to shutdown you can run:

```sh
lotus-miner stop
# when using systemd run:
# systemctl stop lotus-miner
```
