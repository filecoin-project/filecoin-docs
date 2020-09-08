---
title: 'Lotus: switch networks'
description: There may be times where you need to swtich to a different Filecoin network, or need to reconnect to a network after a network reset. This guide will show you how to switch between different Filecoin networks with Lotus.
breadcrumb: Switch networks
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

1. Shutdown any Lotus daemons that are currently running. If you are running a miner, see the [Miner deadline](#miner-deadline) section to see if it is safe to shutdown your miner.
1. Backup `~/.lotus` and `~/.lotusminer` data before doing anything else:

   ```bash
   mkdir ~/.lotus-backups
   cp -r ~/.lotus ~/.lotus-backups/
   cp -r ~/.lotusminer ~/.lotus-backups/
   ```

   If anything breaks during this guide, you can restore your wallets, settings, and chain data by copying these folders back to their original destination.

1. Move to where you have the Lotus git repository stored:

   ```bash
   cd ~/lotus
   ```

   If you no longer have the Lotus git repository, download it:

   ```bash
   cd ~/
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus
   ```

1. Each network has it's own branch. Find the branch that you need to checkout to:

   | Network name | Branch           |
   | ------------ | ---------------- |
   | Testnet      | `master`         |
   | Nerpa        | `ntwk-nerpa`     |
   | Butterfly    | `ntwk-butterfly` |

1. Checkout to the branch of the network you want to use:

   ```bash
   git checkout ntwk-nerpa
   ```

1. Rebuild the Lotus package for the new network:

   ```bash
   make clean && make build
   ```

1. Install the binaries in the correct location:

   ```bash
   make install
   ```

   You may have to run this command as root, depending on your operating system:

   ```bash
   sudo make install
   ```

1. You can now restart your Lotus daemons.

   Lotus daemon:

   ```bash
   lotus daemon
   ```

   Lotus miner:

   ```bash
   lotus-miner run
   ```

## Miner deadline

Check that your miners are safe to shutdown before attempting to do so. Run `lotus-miner proving info`. If any deadline shows a block height in the past, do not restart.

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
