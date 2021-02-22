---
title: Disputer
description: Help secure the Filecoin network by checking blocks from other miners and disputing invalid blocks.
---

# Disputer

[Window PoSt](../../reference/glossary.md#window-proof-of-spacetime-windowpost) messages are necessary for ongoing maintenance of storage power. Verifying the submitted proofs is expensive, and when the gas base fee rises due to congestion, these messages become even more expensive. For miners with mostly empty partitions, this cost can exceed the miner's expected reward from maintaining power. We need to ensure that these messages are cheap for miners, even when specifying a very high gas fee cap.

The Filecoin Improvement Proposal 0010 (FIP0010) allows miners to _optimistically_ accept Window Proof of Spacetime proofs (Windows PoSt) on-chain without verification, allowing them to be disputed later by off-chain verifiers.

## Run the disputer

You can run the disputer by using the `chain disputer` command within Lotus.

1. Fully sync a Lotus node.
1. Call the `chain disputer` function with the following variables, following by the `stat` command:

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

You can send a specific dispute message by running `.lotus chain disputer dispute [minerAddress] [index] [postIndex]`, where:

| Variable name  | Description                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| `minerAddress` | The miner id that submitted the proof you want to dispute. The same address is also the recipient of the message |
| `index`        | The deadline index of the proof you want to dispute for the miner, it should be in.                              |
| `postIndex`    | The post snapshot index.                                                                                         |
