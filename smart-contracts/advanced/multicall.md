---
description: >-
  Multicall allows you to aggregate multiple contract reads into a single JSON-RPC request, and execute multiple state-changing calls in a single transaction on the FVM.
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
To use Multicall3 to send batch contract read/write to your smart contract, you will need to:

1. Obtain the Multicall3 contract address for the network you're using (Filecoin mainnet or Calibration testnet).
2. Get the Multicall3 ABI, which can be downloaded or copied from various sources mentioned above.
3. Create an instance of the Multicall3 contract using a web3 library like ethers.js or viem.
4. Prepare your batch calls, including the target contract addresses, function selectors, and input data.
5. Use the appropriate Multicall3 method (e.g., `aggregate3` for multiple calls) to execute your batch operations.
6. Process the returned data from the Multicall3 contract.

The steps above differ slightly for integrations using smart contracts, where steps 2 and 3 are replaced with:

2. Import the Multicall3 interface in your smart contract.
3. Create a function that interacts with the Multicall3 contract using the imported interface.

Many libraries and tools such as [ethers-rs](https://docs.rs/ethers/latest/ethers/), [viem](https://viem.sh/), and [ape](https://apeworx.io/) have native Multicall3 integration which can be used in your projects directly. To learn how to use Multicall3 with these tools, check out [Multicall3 examples folder](https://github.com/mds1/multicall/blob/main/examples)

### Batching Contract Reads
Batching contract reads, one of the most common use cases, allows a single `eth_call` JSON RPC request to return the results of multiple contract function calls. It has many benefits:

1. **Reduced JSON RPC Requests**: Multicall reduces the number of separate JSON RPC requests that need to be sent. This is particularly useful when using remote nodes like Infura. By aggregating multiple contract reads into a single JSON-RPC request, Multicall (1) reduces RPC usage and therefore costs, and (2) reduces the number of round trips between the client and the node, which can significantly improve performance.

2. **Consistent Data from the Same Block**: Multicall guarantees that all values returned are from the same block. This ensures data consistency and reliability, as all the read operations are performed on the same state of the blockchain.

3. **Detection of Stale Data**: Multicall enables the block number or timestamp to be returned with the read data. This feature helps in detecting stale data, as developers can compare the block number or timestamp with the current state of the blockchain to ensure the data is up-to-date.


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


> :warning: Multicall3, while unaudited, can be safely used for batching on-chain writes when used correctly. As a stateless contract, it should never hold funds after a transaction ends, and users should never approve it to spend tokens.


When using Multicall3, it's crucial to understand two key aspects: the behavior of `msg.sender` in calls versus delegatecalls, and the risks associated with `msg.value` in multicalls.

In FVM, there are two types of accounts: Externally Owned Accounts (EOAs) controlled by private keys, and Contract Accounts controlled by code. The `msg.sender` value during contract execution depends on whether a CALL or DELEGATECALL opcode is used. CALL changes the execution context, while DELEGATECALL preserves it.

For EOAs, which can only use CALL, Multicall3's address becomes the `msg.sender` for subsequent calls. This limits its usefulness from EOAs to scenarios where **`msg.sender` is irrelevant**. However, contract wallets or other contracts can use either CALL or DELEGATECALL, with the latter preserving the original `msg.sender`.

The handling of `msg.value` in multicalls requires caution. Since `msg.value` doesn't change with delegatecalls, relying on it within a multicall can lead to security vulnerabilities. To learn more about this, see [here](https://github.com/runtimeverification/verified-smart-contracts/wiki/List-of-Security-Vulnerabilities#payable-multicall) and [here](https://samczsun.com/two-rights-might-make-a-wrong/).