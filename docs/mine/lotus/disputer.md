---
title: Disputer
description: Verifying submitted Window PoSts is expensive, and that cost can drastically increase when network congestion causes the gas base fee to rise. To address this, Filecoin Improvement Proposal FIP-0010 enables node operators to optimistically accept Window PoSts on-chain without verification, allowing them to be disputed later by off-chain-verifiers.
---

# Disputer

[Window PoSt](../../reference/glossary.md#window-proof-of-spacetime-windowpost) messages are necessary for ongoing maintenance of storage power. Verifying the submitted proofs is expensive, and when the gas base fee rises due to congestion, these messages become even more costly. For miners with mostly empty partitions, this cost can exceed their expected rewards from maintaining power. We need to ensure that these messages are cheap for miners, even when specifying a very high gas fee cap.

The Filecoin Improvement Proposal 0010 (FIP0010) allows miners to _optimistically_ accept Window Proof of Spacetime proofs (Windows PoSt) on-chain without verification, allowing them to be disputed later by off-chain verifiers. Any Lotus node may dispute any on-chain storage proofs submitted in the past 1800 epochs (~15h) by invoking `DisputeWindowedPoSt`.

When a dispute successfully refutes an optimistically accepted Window PoSt, the miner is fined one invalid proof fee (IPF) per active sector in the partition at the moment when said miner submitted the proof, plus a flat fee of 20 FIL. All incorrectly proved sectors are marked faulty, and the address that submitted the dispute is awarded a fixed `DipsuteReward`.

## Penalties and rewards

The penalty for submitting an invalid Window PoSt and the reward for submitting a valid dispute are both subject to change. At the time of writing, those values are:

| Fee/Reward              | Value                                                      |
| ----------------------- | ---------------------------------------------------------- |
| Invalid proof fee (IPF) | (5.51 * the expected block reward per sector in 24 hours) + 20 FIL |
| Valid dispute reward    | 4 FIL                                                      |

## Run the disputer

You can run the disputer by using the `chain disputer` command within Lotus. The following examples were run on a local devnet.

1. Fully sync a Lotus node.
1. Call the `chain disputer` function with the following options, following by the `start` command:

   | Name        | Description                                                                                                         |
   | ----------- | ------------------------------------------------------------------------------------------------------------------- |
   | `--max-fee` | The maximum amount of `FIL` that you are willing to spend for a `DisputeWindowedPoSt` message.                      |
   | `--from`    | The address you want to send the messages from. If an address is not specified, Lotus will use the default address. |

   ```shell
   lotus chain disputer --max-fee 1 --from t3r25povzrwpomqlwtxtt25ou76galexvgr3ucgvvtwxiwy2gtqltlzshmtdyz4ys7mt5phoouedengajltbka start

   > checking sync status
   > Worker: 101; Base: 0; Target: 0 (diff: 0)
   > State: <unknown: 0>; Current Epoch: 0; Todo: 0
   > Validated 4 messages (1 per second)
   ```

1. The disputer will continue to verify submitted WinPoSts. To end the disputer press `CTRL` + `c`:

   ```shell
   > Exit by user
   > setting up window post disputer
   > 2021-02-22T17:44:11.362-0500	ERROR	rpc	go-jsonrpc@v0.1.2/client.go:392	got rpc message with cancelled context: context canceled
   > ERROR: Notify stream was invalid
   ```

   You can safely ignore any stream errors when exiting the disputer.

## Manual dispute

You can manually send a specific dispute message using the `dispute` command. This feature has a very narrow use-case and is for advanced users only. To perform a manual dispute run `lotus chain disputer dispute [minerAddress] [index] [postIndex]`, where:

| Variable name  | Description                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| `minerAddress` | The miner id that submitted the proof you want to dispute. The same address is also the recipient of the message |
| `index`        | The deadline index of the proof you want to dispute for the miner.                                               |
| `postIndex`    | The post snapshot index.                                                                                         |
