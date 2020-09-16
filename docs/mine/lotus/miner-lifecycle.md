---
title: 'Lotus Miner: lifecycle'
description: 'This guide contains information on how to safely perform some maintenance operations with Lotus miners.'
breadcrumb: Lifecycle'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

These operations are normally related to maintenances and upgrades. Given that miners are expected to submit proofs to the chain in a continuous fashion and have to run long, expensive operations, it is important that operators become familiar with how to manage some of the events in the miner lifecycle so that they can be performed with the maximum guarantees.

[[TOC]]

## Safely restarting the miner daemon

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

You can re-start the miner as soon as you wish. Any sealing operations that were ongoing will be reset to the last checkpoint and continue.

Note that workers do not need to be re-started (unless you also want to when performing an upgrade etc), as they will reconnect to the miner automatically when it comes back up.

## Restarting workers

Lotus [seal workers](seal-workers.md) can be re-started any time, but they are in the middle of one of the sealing steps, the operation will start again (from the last checkpoint).

::: warning
There is a maximum of 3 attempts to complete a sealing operation before it is fully started from scratch (_pre-commit1_ phase).
:::

## Changing storage locations

If you wish to change the location of your miner-related storage (for the miner or the seal workers) to a different path (for example, to move things to a larger disk etc), you will need to make sure that the Lotus miner (and potentially seal workers) become aware of the new location.

```sh
lotus-miner storage list
```

The above command will give you an overview of [storage locations known to the miner](custom-storage-layout.md). This information is stored in `~/lotusminer/storage.json` (or `$LOTUS_MINER_PATH/storage.json` if defined). Lotus seal workers store all the data in the `~/lotusworker` folder (or `$LOTUS_WORKER_PATH` if defined).

If you wish to change any of the storage locations of the **lotus miner** follow these steps:

1. [Stop the miner](#safely-restarting-the-miner-daemon)
2. Copy/move the data. Note that **you should move the data folder "as-is" from the original location to the destination**.
3. Edit `storage.json` with the new location.
4. Start the miner.

Note that you can always [add additional storage locations to a Lotus miner](custom-storage-layout) with `lotus storage attach`.

If you wish to change the storage location for any of the **lotus workers**:

1. Stop the Lotus Worker.
2. Move the data to the new location.
3. Set `$LOTUS_WORKER_PATH` accordingly.
4. Start the worker again.

Note that any operations that the worker was performing before stopping will be restarted from the last checkpoint.

:::warning
Right now it is not supported to move data between different workers. Moving the worker storage folder to a different worker machine will not work as the miner expects the ongoing sealing operations to be completed by the worker they were assigned to in the first place and will not recognize if the data appears in a different worker.
:::
