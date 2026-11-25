---
description: >-
  Batch contract reads and writes with Multicall3 on Filecoin. Same address on
  Mainnet and Calibration, with ethers and cast examples.
---

# Multicall

**Multicall3 is a contract that runs a list of calls in order and returns all the results together. You can use it to read many values in one JSON-RPC request, or to send several calls in one transaction.**

## Contract address

[Multicall3](https://www.multicall3.com/) is deployed at the same address on many chains, including Filecoin:

| Network | Address | Explorer |
| --- | --- | --- |
| Mainnet | `0xcA11bde05977b3631167028862bE2a173976CA11` | [Filfox](https://filfox.info/en/address/0xcA11bde05977b3631167028862bE2a173976CA11?t=3) |
| Calibration | `0xcA11bde05977b3631167028862bE2a173976CA11` | [Filscan](https://calibration.filscan.io/en/address/0xcA11bde05977b3631167028862bE2a173976CA11/) |

Get the ABI from the [Multicall3 site](https://multicall3.com/abi), from the [releases page](https://github.com/mds1/multicall/releases), or by running `cast interface 0xcA11bde05977b3631167028862bE2a173976CA11` with [Foundry](https://book.getfoundry.sh/). Libraries such as [viem](https://viem.sh/) and [ethers-rs](https://docs.rs/ethers/latest/ethers/) have built-in Multicall3 support. See the [examples folder](https://github.com/mds1/multicall/tree/main/examples).

## Use it

1. Get the Multicall3 address for your network and its ABI.
2. Create a contract instance with a library such as ethers.js or viem. From a contract, import the Multicall3 interface instead.
3. Build the list of calls. Each has a target address, the call data, and whether it is allowed to fail.
4. Call `aggregate3` with the list.
5. Decode each result.

## Batch reads

Batching reads is the most common use. One `eth_call` returns the results of many calls. This:

* Cuts the number of JSON-RPC requests, which lowers RPC usage and the round trips to a remote node.
* Returns every value from the same block, so the data is consistent.
* Lets you return the block number or timestamp with the data, so you can detect stale reads.

This example uses ethers.js v5 to read an ERC-20 balance for several addresses. It uses `callStatic`, because `aggregate3` is not a `view` function and would otherwise send a transaction:

```javascript
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("https://api.node.glif.io/rpc/v1");
const multicallAddress = "0xcA11bde05977b3631167028862bE2a173976CA11";
const multicallAbi = [/* Multicall3 ABI */];
const multicall = new ethers.Contract(multicallAddress, multicallAbi, provider);

const tokenAddress = "0x..."; // ERC-20 token address
const erc20 = new ethers.utils.Interface(["function balanceOf(address) view returns (uint256)"]);

async function batchBalances(addresses) {
  const calls = addresses.map((address) => ({
    target: tokenAddress,
    allowFailure: false,
    callData: erc20.encodeFunctionData("balanceOf", [address]),
  }));

  const results = await multicall.callStatic.aggregate3(calls);
  return results.map((r) => erc20.decodeFunctionResult("balanceOf", r.returnData)[0]);
}

batchBalances(["0x123...", "0x456...", "0x789..."]).then(console.log);
```

## Batch writes

Multicall3 is unaudited, but it is safe for batching writes if you use it correctly. It is stateless, so it should never hold funds after a transaction ends, and you should never approve it to spend your tokens.

Two details matter:

* **`msg.sender`.** Multicall3 uses `CALL`, so each target sees the Multicall3 contract as `msg.sender`, not you. That means it only helps from a regular wallet when the targets don't care who the sender is. A contract wallet or another contract can use `DELEGATECALL` instead, which keeps the original `msg.sender`.
* **`msg.value`.** `msg.value` doesn't change under `DELEGATECALL`, so a payable multicall that relies on it can be exploited. See [this list of vulnerabilities](https://github.com/runtimeverification/verified-smart-contracts/wiki/List-of-Security-Vulnerabilities#payable-multicall) and [this write-up](https://samczsun.com/two-rights-might-make-a-wrong/).

## Multicall and JSON-RPC batching

Lotus also supports Ethereum JSON-RPC batch requests, but that is different. A batch is an array of separate requests sent together and run one after another. Multicall runs several calls inside a single request, against the same block. See the [Geth batch documentation](https://geth.ethereum.org/docs/interacting-with-geth/rpc/batch).

## Related pages

* [FVM advanced](README.md): tools and services for FVM developers.
* [Gas](../gas.md): how gas is charged and estimated.
* [FEVM indexers](fevm-indexers.md): query contract events without scanning the chain.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/fvm/advanced/multicall)
