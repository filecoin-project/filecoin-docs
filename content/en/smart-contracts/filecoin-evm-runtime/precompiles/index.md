---
title: "Precompiles"
description: ""
lead: ""
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-filecoin-evm-runtime"
    identifier: "precompiles-5544d4c9d2960540625aa69529c6fc50"
weight: 240
toc: true
---

The Filecoin virtual machine (FVM) has several pre-compiled contracts called precompiles. Each precompile address starts with `0xfe000...`. Specifically:

- [Resolve address `0xfe00..01`](#resolve-address)
- [Lookup delegated address `0xfe00..02`](#lookup-delegated-address)
- [Call actor by address `0xfe00..03`](#call-actor-by-address)
- [Call actor by ID `0xfe00..05`](#call-actor-by-id)

## Resolve Address

Address: `0xfe00000000000000000000000000000000000001`

Resolves a Filecoin address (e.g., "f01", "f2abcde") into a Filecoin actor ID (`uint64`). Every actor in Filecoin has an actor ID.

- Input: The Filecoin address in its _bytes_ representation.
- Output:
  - If the target actor exists, succeed and return an ABI-encoded actor ID (u64).
  - If the target actor doesn't exist, succeed with no return value.
  - If the supplied address is invalid (cannot be parsed as a Filecoin address), revert.

Example:

```solidity
(bool success, bytes memory actor_id_bytes) = address(0xfe00000000000000000000000000000000000001).staticcall(fil_address_bytes);
require(success, "invalid address");
require(actor_id_bytes.length == 32, "actor not found");
uint64 actor_id = abi.decode(actor_id_bytes);
```

## Lookup Delegated Address

Address: `0xfe00000000000000000000000000000000000002`

Looks up the "delegated address" (f4 address) of an actor by ID. This precompile is _usually_ used to lookup the Ethereum-style address of an actor by:

1. Looking up the delegated address.
2. Checking that the delegated address is 22 bytes long and starts with `0x040a`.
3. Returning the last 20 bytes (which will be the Ethereum-style address of the target actor).

- Input: An ABI-encoded actor ID (u64 encoded as a u256).
- Output:
  - If the supplied actor ID is larger than max u64, revert.
  - If the target actor exists and has a delegated address, succeed and return the delegated address as raw bytes.
  - Otherwise, succeed with no return value.

Example:

```solidity
(bool success, bytes memory delegated_address_bytes) = address(0xfe00000000000000000000000000000000000002).staticcall(abi.encode(uint256(actor_id)));
```

## Call Actor By Address

Address: `0xfe00000000000000000000000000000000000003`

Calls the specified actor using the native FVM calling convention by its _Filecoin_ address. This precompile must be called with `DELEGATECALL` as the precompile will call the target actor _on behalf of_ the currently executing contract.

- Input: ABI Encoded:

  ```solidity
  (uint64 method, uint256 value, uint64 flags, uint64 codec, bytes params, bytes filAddress)
  ```

  - `method` is the Filecoin method number. The precompile will revert if the method number is not either 0 (bare value transfer) or at least 1024. Methods between 1 and 1023 inclusive are currently restricted (but may be allowed in the future).
  - `value` is the value to transfer in attoFIL.
  - `codec` is the IPLD codec of the parameters. This must either be 0x51 or 0x00 (for now) and will revert if passed an illegal codec:
    - If the parameters are non-empty, they must be CBOR, and the codec must be 0x51.
    - If the parameters are empty, the codec must be 0x00.
  - `params` are the CBOR-encoded message parameters, if any.
  - `filAddress` is the Filecoin address of the callee.

- Output: ABI Encoded:

  ```solidity
  (int256 exit_code, uint64 return_codec, bytes return_value)
  ```

  - `exit_code` is one of:
    - `= 0` to indicate the call exited successfully.
    - `> 0` to indicate that the target actor _referted_ with the specified `exit_code`.
    - `< 0` to indicate the call itself failed with the [syscall-error](https://docs.rs/fvm_sdk/0.6.1/fvm_sdk/sys/enum.ErrorNumber.html) `-exit_code`.
  - `return_codec` codec of returned data. This will be one of (for now):
    - 0x51 or 0x71 - CBOR
    - 0x55 - raw (the target actor returned raw data)
    - 0x00 - nothing (the returned data will be empty as well).

{{< alert >}}
⚠️ This precompile only reverts if an input is statically invalid. If the precompile fails to call the target actor for any other reason, it will return a non-zero `exit_code` but will not revert.
{{< /alert >}}

Example:

```solidity
(bool success, bytes memory data) = address(0xfe00000000000000000000000000000000000003).delegatecall(abi.encode(method, value, flags, codec, params, filAddress));
(int256 exit, uint64 return_codec, bytes memory return_value) = abi.decode(data, (int256, uint64, bytes));
```

[syscall-error](https://docs.rs/fvm_sdk/0.6.1/fvm_sdk/sys/enum.ErrorNumber.html)

## Call Actor By ID

Address: `0xfe00000000000000000000000000000000000005`

This precompile is identical to the "Call Actor By Address" (0xfe00..03) except that it accepts an actor ID (`uint64`) instead of an actor address as the last parameter. That is:

```solidity
(uint64 method, uint256 value, uint64 flags, uint64 codec, bytes params, uint64 actorId)
```

Example:

```solidity
(bool success, bytes memory data) = address(0xfe00000000000000000000000000000000000005).delegatecall(abi.encode(method, value, flags, codec, params, id));
(int256 exit, uint64 return_codec, bytes memory return_value) = abi.decode(data, (int256, uint64, bytes));
```
<!--REVIEWED!-->