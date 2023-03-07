---
title: "Calculate gas"
description: "Gas is a measurement of how many resources are consumed by each message on the Filecoin network. This page covers how developers can manage gas and calculate fees."
lead: "On this page we're going to cover how developers can manage gas and calculate fees. Check out the [How Filecoin Works page]({{< relref \"how-filecoin-works#gas-fees\" >}}) for more conceptual information on how gas and gas fees work."
draft: false
images: []
type: docs
weight: 40
menu:
  build:
    parent: "build-how-to"
    identifier: "calculate-gas-iwje0392ksiwodjeicn5"
toc: true
---

## Calculate gas

The total gas fee of a message is calculated as the following:

```plaintext
  (Gas usage × Base fee)
+ (GasLimit × GasPremium)
+ (OverEstimationBurn × BaseFee)
```

Take a look at the [Gas usage section of the How Filecoin works page]({{< relref "how-filecoin-works#gas-usage" >}}) for more information on the various gas-related parameters attached to each message.

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

Additionally, the message sender can also set the `GasFeeCap` parameter they are willing to pay. If the sender sets the `GasLimit` too high, the network will compute amount of Gas to be refunded and the amount of Gas to be burned as `OverEstimationBurn`.

## Estimate gas

Filecoin nodes, such as Lotus, have severate JSON-API API endpoints designed to help developers estimate gas usage. The available JSON-RPC APIs are:

- `GasEstimateMessageGas`: estimate gas values for a message without any gas fields set, including GasLimit, GasPremium, and GasFeeCap. Returns an message object with those gas fields set.
- `GasEstimateGasLimit` takes the input message and estimates the `GasLimit` based on the execution cost as well as a transaction multiplier.
- `GasEstimateGasPremium`: estimates what `GasPremium` price you should set to ensure a message will be included in `N` epochs. The smaller `N` is the larger `GasPremium` is likely to be.
- `GasEstimateFeeCap`: estimate the `GasFeeCap` according to `BaseFee` in the parent blocks.

If you want to learn more about how to use those JSON-RPC APIs for Filecoin gas model, please check the [JSON RPC API docs for Gas]({{< relref "/developers/reference/json-rpc/gas" >}}).

{{< alert  >}}
Gas estimation vary from network to network. For example, the `BaseFee` on mainnet is different to the `BaseFee` on the Hyperspace testnet.
{{< / alert  >}}

If you'd rather not calculate and estimate gas for every message, you can just leave the optional fields unset. The gas fields will be estiamted and set when the message is pushed to the mempool.

## Ethereum compatibility

Since Filecion is fully EVM-compatible, Filecoin nodes also provide Ethereum compatible APIs to support gas estimation:

- [EthEstimateGas]({{< relref "/developers/reference/json-rpc/eth#ethestimategas" >}}): generates and returns an estimate of how much gas is necessary to allow the transaction to complete.
- [EthMaxPriorityFeePerGas]({{< relref "/developers/reference/json-rpc/eth#ethmaxpriorityfeepergas" >}}): returns a fee per gas that is an estimate of how much you can pay as a priority fee, or ’tip’, to get a transaction included in the current block.

To request the current max priority fee in the network you can send a request to a public Filecoin endpoint:

```shell
curl --location --request POST 'https://api.node.glif.io' \
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
