---
title: "How gas works"
description: "Gas in the Filecoin EVM runtime works quite differently from the regular Ethereum virtual machine (EVM)."
lead: "Gas in the Filecoin EVM runtime works quite differently from the regular Ethereum virtual machine (EVM). Instead of assigning a fixed gas cost in each instruction, the Filecoin EVM runtime charges FIL gas based on the WASM code execution of the Filecoin EVM runtime interpreter."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-filecoin-evm-runtime"
    identifier: "how-gas-works-b2f64e9deac2e82424df15a11874914b"
weight: 230
toc: true
aliases:
    - "/developers/smart-contracts/how-tos/calculate-gas/"
---

When executing a message that invokes an EVM contract, the Filecoin virtual machine charges for the message chain inclusion (when the message originates off-chain) and then invokes the actor that hosts the contract. The actor is an instance of the EVM actor, which uses the Filecoin EVM runtime interpreter to execute the contract.

The Filecoin EVM-runtime interpreter must first load its state, including the contract state, which costs additional gas. The interpreter then begins the execution of the contract bytecode. Each opcode interpreted may perform computation, syscalls, state i/o, and send new messages, all of which are charged with FIL gas. Finally, if the contract state is modified, the interpreter must flush it to the blockstore, which costs additional gas.

Generally, it is not possible to compute gas costs for a contract invocation without using gas estimation through speculative execution.

## Calculation example

The total gas fee of a message is calculated as the following:

```plaintext
  (Gas usage × Base fee)
+ (GasLimit × GasPremium)
+ (OverEstimationBurn × BaseFee)
```

Take a look at the [Gas usage section of the How Filecoin works page]({{< relref "how-gas-works" >}}) for more information on the various gas-related parameters attached to each message.

Let's take a transaction as an example. Our gas parameters are:

- `GasUsage` = `1000` attoFIL
- `BaseFee` = `20` attoFIL
- `Gas limit` = `2000` attoFIL
- `Gas premium` = `5` attoFIL

The total fee is `(GasUsage × BaseFee) + (Gaslimit x GasPremium)`:

```plaintext
   1000 
x    20
= 20000

   2000 
x     5 
= 10000 

  20000
+ 10000
= 30000 attoFIL
```

Additionally, the message sender can also set the `GasFeeCap` parameter they are willing to pay. If the sender sets the `GasLimit` too high, the network will compute the amount of gas to be refunded and the amount of gas to be burned as `OverEstimationBurn`.

## Estimate gas

Filecoin nodes, such as Lotus, have several JSON-API API endpoints designed to help developers estimate gas usage. The available JSON-RPC APIs are:

- `GasEstimateMessageGas`: estimate gas values for a message without any gas fields set, including GasLimit, GasPremium, and GasFeeCap. Returns a message object with those gas fields set.
- `GasEstimateGasLimit` takes the input message and estimates the `GasLimit` based on the execution cost as well as a transaction multiplier.
- `GasEstimateGasPremium`: estimates what `GasPremium` price you should set to ensure a message will be included in `N` epochs. The smaller `N` is the larger `GasPremium` is likely to be.
- `GasEstimateFeeCap`: estimate the `GasFeeCap` according to `BaseFee` in the parent blocks.

If you want to learn more about how to use those JSON-RPC APIs for the Filecoin gas model, please check the [JSON RPC API docs for Gas]({{< relref "reference/json-rpc/gas" >}}).

{{< alert  >}}
Gas estimation varies from network to network. For example, the `BaseFee` on mainnet is different from the `BaseFee` on the Hyperspace testnet.
{{< / alert  >}}

If you'd rather not calculate and estimate gas for every message, you can just leave the optional fields unset. The gas fields will be estimated and set when the message is pushed to the mempool.

## Ethereum compatibility

Since Filecion is fully EVM-compatible, Filecoin nodes also provide Ethereum-compatible APIs to support gas estimation:

- [EthEstimateGas]({{< relref "/reference/json-rpc/eth#ethestimategas" >}}): generates and returns an estimate of how much gas is necessary to allow the transaction to complete.
- [EthMaxPriorityFeePerGas]({{< relref "/reference/json-rpc/eth#ethmaxpriorityfeepergas" >}}): returns a fee per gas that is an estimate of how much you can pay as a priority fee, or ’tip’, to get a transaction included in the current block.

To request the current max priority fee in the network, you can send a request to a public Filecoin endpoint:

```shell
curl --location --request POST 'https://api.hyperspace.node.glif.io/rpc/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "method":"eth_maxPriorityFeePerGas",
    "params": null,
    "id":1
}' | jq
```

```plaintext
{
  "jsonrpc": "2.0",
  "result": "0x31157",
  "id": 1
}
```

You can convert the `result` field from hexadecimal to base-10 in your terminal. Take the `result` output and remove the `0x` from the start. Then use `echo` to output the conversion:

```shell
echo $((16#31157))
```

```plaintext
201047
```

## Additional Resources

- Gas Filecoin improvement proposals (FIPs):
  - [FIP 0032](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0032.md)
  - [FIP 0037](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0037.md)
  - [FIP 0054](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0054.md)
- [Primitive Gas Price list](https://github.com/filecoin-project/ref-fvm/blob/master/fvm/src/gas/price_list.rs)
