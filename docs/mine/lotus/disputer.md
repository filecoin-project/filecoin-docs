---
title: Disputer
description: Help secure the Filecoin network by checking blocks from other miners, and disputing invalid blocks.
---

# Disputer

[Window PoSt](../../reference/glossary.md#window-proof-of-spacetime-windowpost) messages are necessary for ongoing maintenance of storage power. Verifying the submitted proofs is expensive and when the gas base fee rises due to congestion these messages become expensive. In bad cases, for small miners with mostly-empty partitions, this cost can exceed their expected reward from maintaining power. We need to ensure that these messages are cheap for miners, even when specifying a very high gas fee cap.

The Filecoin Improvement Proposal 0010 (FIP0010) allows miners to optimistically accept Window Proof of Spacetime proofs (Windows PoSt) on-chain without verification, allowing them to be disputed later by off-chain verifiers.

## Run the disputer

You can run the disputer by using the `chain disputer` command within Lotus.

1. Fully sync a Lotus node.
1. Call the `chain disputer` function with the following variables:

   | Name        | Description                                                                                                         |
   | ----------- | ------------------------------------------------------------------------------------------------------------------- |
   | `--max-fee` | The maximum amount of `FIL` that you are willing to spend for a `DisputeWindowedPoSt` message.                      |
   | `--from`    | The address you want to send the messages from. If an address is not specified, Lotus will use the default address. |
