---
description: >-
  Multicall allows you to aggregate multiple contract reads into a single JSON-RPC request,
  and execute multiple state-changing calls in a single transaction on the FVM.
---

# Multicall3

[Multicall3](https://www.multicall3.com/) is a powerful tool that offers batch contract calls to smart contracts on the Filecoin Virtual Machine (FVM). 

Multicall3 is deployed on over 100 chains at `0xcA11bde05977b3631167028862bE2a173976CA11`.
A sortable, searchable list of all chains it's deployed on can be found [here](https://multicall3.com/deployments).

The [multicall3 ABI](https://multicall3.com/abi) can be downloaded or copied to the clipboard in various formats, including:

- Solidity interface.
- JSON ABI, prettified.
- JSON ABI, minified.
- [ethers.js](https://docs.ethers.org/v5/) human readable ABI.
- [viem](https://viem.sh/) human readable ABI.

Alternatively, you can:

- Download the ABI from the [releases](https://github.com/mds1/multicall/releases) page.
- Copy the ABI from [Etherscan](https://etherscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code).
- Install [Foundry](https://github.com/gakonst/foundry/) and run `cast interface 0xcA11bde05977b3631167028862bE2a173976CA11`.

## Contract address

Multicall has the same, precomputed address for all of the networks it is deployed on. 
| Name             | Address                                      | Mainnet | Calibration |
| ---------------- | -------------------------------------------- | ------- | ----------- |
| [Multicall - Mainnet](https://filfox.info/en/address/0xcA11bde05977b3631167028862bE2a173976CA11?t=3) | `0xcA11bde05977b3631167028862bE2a173976CA11` | ✔️      | ❌          |
| [Multicall - Calibration](https://calibration.filscan.io/en/address/0xcA11bde05977b3631167028862bE2a173976CA11/) | `0xcA11bde05977b3631167028862bE2a173976CA11` | ❌      | ✔️          |

## Usage
Many libraries and tools such as [ethers-rs](https://docs.rs/ethers/latest/ethers/), [viem](https://viem.sh/), and [ape](https://apeworx.io/) have native Multicall3 integration which can be used in your projects directly. To learn how to use Multicall3 with these tools, check out [Multicall3 examples folder](https://github.com/mds1/multicall/blob/main/examples)

### Batching Contract Reads
Batching contract reads, one of the most common use cases, allows a single `eth_call` JSON RPC request to return the results of multiple contract function calls. It has many benefits:

1. **Reduced JSON RPC Requests**: Multicall reduces the number of separate JSON RPC requests that need to be sent. This is particularly useful when using remote nodes like Infura. By aggregating multiple contract reads into a single JSON-RPC request, Multicall (1) reduces RPC usage and therefore costs, and (2) reduces the number of round trips between the client and the node, which can significantly improve performance.

2. **Consistent Data from the Same Block**: Multicall guarantees that all values returned are from the same block. This ensures data consistency and reliability, as all the read operations are performed on the same state of the blockchain.

3. **Detection of Stale Data**: Multicall enables the block number or timestamp to be returned with the read data. This feature helps in detecting stale data, as developers can compare the block number or timestamp with the current state of the blockchain to ensure the data is up-to-date.

Many libraries and tools such as [ethers-rs](https://docs.rs/ethers/latest/ethers/), [viem](https://viem.sh/), and [ape](https://apeworx.io/) have native Multicall3 integration.

When directly interacting with the Multicall3 contract to batch calls, you'll typically use the `aggregate3` method. This method allows you to execute multiple contract calls in a single transaction. Here's an explanation of how it works, along with examples:

1. Solidity Implementation:
   The `aggregate3` method is implemented in the Multicall3 contract like this:

   ```solidity
   function aggregate3(Call3[] calldata calls) public payable returns (Result[] memory returnData) {
       uint256 length = calls.length;
       returnData = new Result[](length);
       for (uint256 i = 0; i < length;) {
           (bool success, bytes memory ret) = calls[i].target.call(calls[i].callData);
           if (calls[i].allowFailure) {
               returnData[i] = Result(success, ret);
           } else {
               require(success, "Multicall3: call failed");
               returnData[i] = Result(true, ret);
           }
           unchecked { ++i; }
       }
   }
   ```

2. Example of sending multicalls to this smart contract:
   Here's an example using ethers.js to interact with the Multicall3 contract:

   ```javascript
   const { ethers } = require("ethers");

   const provider = new ethers.providers.JsonRpcProvider("https://api.node.glif.io/rpc/v1");
   const multicallAddress = "0xcA11bde05977b3631167028862bE2a173976CA11";
   const multicallAbi = [/* Multicall3 ABI */];
   const multicall = new ethers.Contract(multicallAddress, multicallAbi, provider);

   // Example: Batch balance checks for multiple addresses
   async function batchBalanceChecks(addresses) {
     const calls = addresses.map(address => ({
       target: "0x...", // ERC20 token address
       allowFailure: false,
       callData: ethers.utils.id("balanceOf(address)").slice(0, 10) + 
                 ethers.utils.defaultAbiCoder.encode(["address"], [address]).slice(2)
     }));

     const results = await multicall.aggregate3(calls);
     return results.map(result => ethers.utils.defaultAbiCoder.decode(["uint256"], result.returnData)[0]);
   }

   batchBalanceChecks(["0x123...", "0x456...", "0x789..."]).then(console.log);
   ```

This example demonstrates how to use Multicall3 to batch multiple `balanceOf` calls for an ERC20 token in a single transaction, significantly reducing the number of separate RPC calls needed.

### Batch Contract Writes

_If using Multicall3 for this purpose, be aware it is unaudited, so use at your own risk._
_However, because it is a stateless contract, it should be safe when used correctly—**it should never hold your funds after a transaction ends, and you should never approve Multicall3 to spend your tokens**_.

Multicall3 can also be used to batch on-chain transactions using the methods described in the [Batch Contract Reads](#batch-contract-reads) section.

When using Multicall3 for this purpose, there are **two important details you MUST understand**.

1. How `msg.sender` behaves when calling vs. delegatecalling to a contract.
2. The risks of using `msg.value` in a multicall.

Before explaining both of these, let's first cover some background.

There are two types of accounts: Externally Owned Accounts (EOAs) and Contract Accounts.
EOAs are controlled by private keys, and Contract Accounts are controlled by code.

When an EOA calls a contract, the `msg.sender` value during execution of the call provides the address of that EOA. This is also true if the call was executed by a contract.
The word "call" here specifically refers to the [`CALL`](https://www.evm.codes/#f1?fork=shanghai) opcode.
Whenever a CALL is executed, the _context_ changes.
New context means storage operations will be performed on the called contract, there is a new value (i.e. `msg.value`), and a new caller (i.e. `msg.sender`).

The FVM also supports the [`DELEGATECALL`](https://www.evm.codes/#f4) opcode, which is similar to `CALL`, but different in a very important way: it _does not_ change the context of the call.
This means the contract being delegatecalled will see the same `msg.sender`, the same `msg.value`, and operate on the same storage as the calling contract.

It's important to note that you cannot delegatecall from an EOA — an EOA can only call a contract, not delegatecall it.

Because you cannot delegatecall from an EOA, this significantly reduces the benefit of calling Multicall3 from an EOA—any calls the Multicall3 executes will have the MultiCall3 address as the `msg.sender`.

**This means you should only call Multicall3 from an EOA if the `msg.sender` does not matter.** `msg.sender` will be different depending on which opcode you use.

If you are using a contract wallet or executing a call to Multicall3 from another contract, you can either CALL or DELEGATECALL.
Calls will behave the same as described above for the EOA case, and delegatecalls will preserve the context.
This means if you delegatecall to Multicall3 from a contract, the `msg.sender` of the calls executed by Multicall3 will be that contract.
This can be very useful, and is how the Gnosis Safe [Transaction Builder](https://help.safe.global/en/articles/40841-transaction-builder) works to batch calls from a Safe.

Similarly, because `msg.value` does not change with a delegatecall, you must be careful relying on `msg.value` within a multicall.
To learn more about this, see [here](https://github.com/runtimeverification/verified-smart-contracts/wiki/List-of-Security-Vulnerabilities#payable-multicall) and [here](https://samczsun.com/two-rights-might-make-a-wrong/).
