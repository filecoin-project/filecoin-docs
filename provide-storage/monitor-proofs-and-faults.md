---
description: >-
  Watch your proofs, catch problems early, and recover before they cost you
  money.
---

# Monitor proofs and faults

**Proofs run on a fixed schedule. A down machine, failed disk or empty wallet means missed proofs, and missed proofs cost you money.** There are two kinds of proofs:

* **PDP proofs** for warm storage. They show you still hold each client's data.
* **PoRep proofs** for sealed storage (archival storage). Each sealed sector is proven once a day (WindowPoSt).

## What to watch

| What | Why |
| --- | --- |
| Daily sector proofs (WindowPoSt) | Every sealed sector is proven once a day, in one of 48 half-hour windows. A missed window is a fault. |
| Block proofs (WinningPoSt) | When you win a block, you have seconds to prove it, or you lose the reward. |
| PDP proofs | Filecoin Pay uses them to decide what clients pay you. |
| Wallet balances | Proofs are messages, and messages cost gas. An empty wallet means missed proofs. |
| Miner balance | Daily fees come from it. Fee debt stops block rewards. |
| Disk space and the database | Full disks stop sealing. If YugabyteDB stops, Curio stops. |

## Where to see it

**PDP proofs:** the dashboard's **PDP Overview** page shows proofs passing, income, wallet balance and alerts.

**PoRep proofs:** the dashboard shows proof status for each of the 48 daily windows and the sealing pipeline. From the command line:

```sh
sptool --actor <minerID> proving info        # current proving period
sptool --actor <minerID> proving deadlines   # all 48 windows
sptool --actor <minerID> proving faults      # sectors with faults
```

## Set up alerts

Curio checks your cluster every hour and raises an alert when:

* A wallet has less than 5 FIL.
* A deadline has no proof task.
* A block proof wasn't made, or a block you made was dropped.
* Long-term storage doesn't have room for the sectors being sealed.

Send alerts to PagerDuty, Prometheus Alertmanager or a Slack webhook. See [Alert Manager](https://docs.curiostorage.org/configuration/alert-manager). Make sure a missed deadline wakes someone up.

## When a proof fails

**Sealed sectors:**

* **Fault fee:** charged for each day a sector misses its proof.
* **Sector penalty:** charged if the fault wasn't reported before the proof was due.
* **Termination fee:** charged if a sector ends early.

Curio checks faulty sectors at each deadline. Once a sector can be proven again, Curio reports it as recovered for you.

**Warm storage (PDP):** there's no FIL penalty, but Filecoin Pay uses your proof results to set what you're paid, so missed proofs cost you income.

## Fix the cause

| Cause | Fix |
| --- | --- |
| A proving machine is down | Run two proving machines so one can cover for the other. |
| A disk failed | Replace it, and keep spare disks. Sealed sectors on the lost disk may need to be re-sealed. |
| A wallet is empty | Top it up, and set alerts below 5 FIL. |
| Fee debt | Pay it with `sptool --actor <minerID> actor repay-debt <amount>`. |
| Old software after a network upgrade | Upgrade Lotus and Curio before each upgrade date. |

For more, see [Curio troubleshooting](https://docs.curiostorage.org/troubleshooting) or ask in `#fil-curio-help`.

## Next steps

* [Payouts and withdrawals](payouts-and-withdrawals.md)
* [Curio reference](curio-reference.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/provide-storage/monitor-proofs-and-faults)
