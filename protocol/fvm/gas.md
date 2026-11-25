---
description: >-
  How gas works on the Filecoin EVM runtime, why opcodes have no fixed cost and
  how to estimate the fee for a contract call.
---

# Gas

**The Filecoin EVM runtime doesn't give each opcode a fixed gas cost. It charges Filecoin gas for executing the interpreter that runs your contract's bytecode, so you can't work out a cost without estimating it.**

## How a message is charged

When a message invokes a contract, the FVM first charges for including the message onchain, if the message came from offchain. It then calls the EVM actor, which runs the contract with the runtime's interpreter.

The interpreter has to load its state, including the contract's state, which costs gas. Each opcode it runs can compute, make syscalls, read and write state, and send new messages, and each of those costs gas. If the contract's state changes, the interpreter flushes it to the blockstore, which costs more.

Each block has a gas limit of 10 billion gas units.

## Calculate the fee

The total fee of a message is:

```text
  (GasUsed × BaseFee)
+ (GasLimit × GasPremium)
+ (OverEstimationBurn × BaseFee)
```

Gas amounts are in gas units. `BaseFee` and `GasPremium` are prices, in attoFIL per gas unit. The sender can also set `GasFeeCap`, the highest price per gas unit they will pay. If the sender sets `GasLimit` too high, the network works out how much gas to refund and how much to burn as `OverEstimationBurn`.

For example, take these values:

* `GasUsed` = 1,000 gas units
* `BaseFee` = 20 attoFIL per gas unit
* `GasLimit` = 2,000 gas units
* `GasPremium` = 5 attoFIL per gas unit

With no over-estimation burn, the fee is `(1,000 × 20) + (2,000 × 5)` = 20,000 + 10,000 = 30,000 attoFIL.

## Estimate gas

You can't compute the gas for a contract call in advance. Estimate it by running the call speculatively. Filecoin nodes offer JSON-RPC methods for this:

* `GasEstimateMessageGas` estimates `GasLimit`, `GasPremium` and `GasFeeCap` for a message with no gas fields set, and returns the message with them filled in.
* `GasEstimateGasLimit` estimates `GasLimit` from the execution cost and a safety multiplier.
* `GasEstimateGasPremium` estimates the `GasPremium` needed for a message to be included within `N` epochs. The smaller `N` is, the larger the premium.
* `GasEstimateFeeCap` estimates `GasFeeCap` from the base fee of the parent blocks.

If you leave the optional gas fields unset, they are estimated when the message is pushed to the message pool. Estimates differ between networks: the base fee on [Mainnet](../networks/mainnet.md) is not the base fee on [Calibration](../networks/calibration.md).

Nodes also offer Ethereum-compatible estimation:

* [`EthEstimateGas`](../../reference/json-rpc/eth.md#ethestimategas) estimates the gas a transaction needs to complete.
* [`EthMaxPriorityFeePerGas`](../../reference/json-rpc/eth.md#ethmaxpriorityfeepergas) estimates the priority fee, or tip, needed to be included in the current block.

For example, to get the current priority fee on Calibration:

```shell
curl -X POST 'https://api.calibration.node.glif.io/rpc/v1' \
  --header 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","method":"eth_maxPriorityFeePerGas","params":null,"id":1}' | jq
```

The result is a hexadecimal number in attoFIL. To convert it to decimal, for example `0x31157`, drop the `0x` and run `echo $((16#31157))`, which prints `201047`.

## Learn more

* Gas FIPs: [FIP-0032](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0032.md), [FIP-0037](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0037.md) and [FIP-0054](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0054.md)
* [Gas price list](https://github.com/filecoin-project/ref-fvm/blob/master/fvm/src/gas/price_list.rs) in the reference FVM
* [Gas JSON-RPC methods](../../reference/json-rpc/gas.md)
* [Filecoin EVM runtime](filecoin-evm-runtime.md): what Ethereum compatibility covers on Filecoin.
* [The FIL token](../fil/the-fil-token.md): what FIL pays for, its supply and its units.
* [Blocks and tipsets](../concepts/blocks-and-tipsets.md): how blocks group into tipsets each epoch.
* [Quickstart: ERC-20](erc-20-quickstart.md): deploy your first contract on Calibration.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/fvm/gas)
