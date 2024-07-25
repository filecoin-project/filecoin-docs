---
description: >-
  Multicall allows you to aggregate multiple contract reads into a single JSON-RPC request,
  and execute multiple state-changing calls in a single transaction on the FVM.
---

# Multicall

Multicall is a powerful tool that offers several advantages for interacting with smart contracts on the Filecoin Virtual Machine (FVM). 

## Contract address

Multicall has the same, precomputed address for all of the networks it is deployed on. 
| Name             | Address                                      | Mainnet | Calibration |
| ---------------- | -------------------------------------------- | ------- | ----------- |
| [Multicall - Mainnet](https://filfox.info/en/address/0xcA11bde05977b3631167028862bE2a173976CA11?t=3) | `0xcA11bde05977b3631167028862bE2a173976CA11` | ✔️      | ❌          |
| [Multicall - Calibration](https://calibration.filscan.io/en/address/0xcA11bde05977b3631167028862bE2a173976CA11/) | `0xcA11bde05977b3631167028862bE2a173976CA11` | ❌      | ✔️          |

## Usage

Batching contract reads, one of the most common use cases, allows a single `eth_call` JSON RPC request to return the results of multiple contract function calls. It has many benefits:

1. **Reduced JSON RPC Requests**: Multicall reduces the number of separate JSON RPC requests that need to be sent. This is particularly useful when using remote nodes like Infura. By aggregating multiple contract reads into a single JSON-RPC request, Multicall (1) reduces RPC usage and therefore costs, and (2) reduces the number of round trips between the client and the node, which can significantly improve performance.

2. **Consistent Data from the Same Block**: Multicall guarantees that all values returned are from the same block. This ensures data consistency and reliability, as all the read operations are performed on the same state of the blockchain.

3. **Detection of Stale Data**: Multicall enables the block number or timestamp to be returned with the read data. This feature helps in detecting stale data, as developers can compare the block number or timestamp with the current state of the blockchain to ensure the data is up-to-date.

Many libraries and tools such as ethers-rs, viem, and ape have native Multicall3 integration.

When directly interacting with the contract to batch calls, the aggregate3 method is likely what you'll want to use. It accepts an array of Call3 structs and returns an array of Result structs.

```
struct Call3 {
    // Target contract to call.
    address target;
    // If false, the entire call will revert if the call fails.
    bool allowFailure;
    // Data to call on the target contract.
    bytes callData;
}

struct Result {
    // True if the call succeeded, false otherwise.
    bool success;
    // Return data if the call succeeded, or revert data if the call reverted.
    bytes returnData;
}

/// @notice Aggregate calls, ensuring each returns success if required
/// @param calls An array of Call3 structs
/// @return returnData An array of Result structs
function aggregate3(Call3[] calldata calls) public payable returns (Result[] memory returnData);
```

