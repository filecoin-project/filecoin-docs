---
description: >-
  Reference for Filecoin and Ethereum precompiles in the FEVM: addresses,
  inputs, outputs and the Filecoin-specific 0xfe00 set.
---

# Precompiles

**A precompile is code built into the runtime that a contract calls at a fixed address. The Filecoin EVM runtime has two sets: Filecoin-specific precompiles at addresses that start with `0xfe00`, and the standard Ethereum precompiles.**

## Filecoin precompiles

| Address | Precompile | What it does |
| --- | --- | --- |
| `0xfe00…01` | [Resolve address](#resolve-address) | Turns a Filecoin address into an actor ID |
| `0xfe00…02` | [Lookup delegated address](#lookup-delegated-address) | Finds the delegated (`f4`) address of an actor ID |
| `0xfe00…03` | [Call actor by address](#call-actor-by-address) | Calls an actor, by its Filecoin address |
| `0xfe00…05` | [Call actor by ID](#call-actor-by-id) | Calls an actor, by its actor ID |
| `0xfe00…06` | [Get randomness](#get-randomness) | Returns the beacon randomness for an epoch |

The full address of each is `0xfe` followed by 18 zero bytes and the index, for example `0xfe00000000000000000000000000000000000001`. `0xfe00…04` is reserved and currently disabled.

### Resolve address

Address: `0xfe00000000000000000000000000000000000001`

Resolves a Filecoin address, such as `f01` or `f2abcde`, into a Filecoin actor ID (`uint64`). Every actor has an actor ID.

* **Input:** the Filecoin address in its bytes representation.
* **Output:**
  * If the actor exists, succeeds and returns the ABI-encoded actor ID.
  * If the actor doesn't exist, succeeds with no return value.
  * If the address can't be parsed as a Filecoin address, reverts.

```solidity
(bool success, bytes memory actor_id_bytes) = address(0xfe00000000000000000000000000000000000001).staticcall(fil_address_bytes);
require(success, "invalid address");
require(actor_id_bytes.length == 32, "actor not found");
uint64 actor_id = abi.decode(actor_id_bytes, (uint64));
```

### Lookup delegated address

Address: `0xfe00000000000000000000000000000000000002`

Looks up the delegated address (`f4` address) of an actor by its ID. You usually use it to find an actor's Ethereum-style address:

1. Look up the delegated address.
2. Check that it is 22 bytes long and starts with `0x040a`.
3. Take the last 20 bytes. That is the Ethereum-style address.

* **Input:** an ABI-encoded actor ID (a `uint64` encoded as a `uint256`).
* **Output:**
  * If the actor ID is larger than the maximum `uint64`, reverts.
  * If the actor exists and has a delegated address, succeeds and returns it as raw bytes.
  * Otherwise, succeeds with no return value.

```solidity
(bool success, bytes memory delegated_address_bytes) = address(0xfe00000000000000000000000000000000000002).staticcall(abi.encode(uint256(actor_id)));
```

### Call actor by address

Address: `0xfe00000000000000000000000000000000000003`

Calls an actor with the native FVM calling convention, by its Filecoin address. You must call it with `DELEGATECALL`, because it calls the target actor on behalf of the contract that is running.

**Input (ABI-encoded):**

```text
(uint64 method, uint256 value, uint64 flags, uint64 codec, bytes params, bytes filAddress)
```

* `method` is the Filecoin method number. It must be `0` (a bare-value send) or greater than 1023. Methods 1 to 1023 are reserved.
* `value` is the amount to transfer, in attoFIL.
* `flags` is `1` for a read-only call and `0` otherwise.
* `codec` is the IPLD codec of `params`. It must be `0x51` (CBOR, a compact binary data format) when `params` isn't empty, and `0` when `params` is empty.
* `params` are the CBOR-encoded parameters, if any.
* `filAddress` is the Filecoin address of the actor to call.

**Output (ABI-encoded):**

```text
(int256 exit_code, uint64 return_codec, bytes return_value)
```

* `exit_code` is `0` if the call succeeded, a positive number if the target actor reverted with that exit code, and a negative number if the call itself failed with a syscall error.
* `return_codec` is `0x51` or `0x71` for CBOR, `0x55` for raw data, or `0` if nothing was returned.

{% hint style="danger" %}
The precompile reverts only if an input is statically invalid. If it fails to call the target actor for any other reason, it returns a non-zero `exit_code` and doesn't revert. Always check `exit_code`.
{% endhint %}

```solidity
(bool success, bytes memory data) = address(0xfe00000000000000000000000000000000000003).delegatecall(abi.encode(method, value, flags, codec, params, filAddress));
require(success, "precompile call failed");
(int256 exit, uint64 return_codec, bytes memory return_value) = abi.decode(data, (int256, uint64, bytes));
```

### Call actor by ID

Address: `0xfe00000000000000000000000000000000000005`

The same as call actor by address, except that the last parameter is an actor ID (`uint64`) instead of an address:

```text
(uint64 method, uint256 value, uint64 flags, uint64 codec, bytes params, uint64 actorId)
```

```solidity
(bool success, bytes memory data) = address(0xfe00000000000000000000000000000000000005).delegatecall(abi.encode(method, value, flags, codec, params, actorId));
require(success, "precompile call failed");
(int256 exit, uint64 return_codec, bytes memory return_value) = abi.decode(data, (int256, uint64, bytes));
```

### Get randomness

Address: `0xfe00000000000000000000000000000000000006`

Returns the beacon randomness for an epoch. This is the randomness that comes from [drand](../concepts/drand.md).

* **Input:** the epoch, as a `uint256` that fits in an `int64`.
* **Output:** 32 bytes of randomness. Reverts if the randomness can't be fetched.

## Ethereum precompiles

The runtime also provides the standard Ethereum precompiles:

| Address | Precompile |
| --- | --- |
| `0x01` | `ecrecover` |
| `0x02` | SHA2-256 |
| `0x03` | RIPEMD-160 |
| `0x04` | Identity |
| `0x05` | `modexp` |
| `0x06` to `0x08` | `ecAdd`, `ecMul`, `ecPairing` on the BN254 curve |
| `0x09` | `blake2f` |
| `0x0b` to `0x11` | BLS12-381 operations: G1 and G2 addition, G1 and G2 multi-scalar multiplication, pairing check, and the two map-to-curve functions |
| `0x0100` | `P256VERIFY`: secp256r1 signature verification |

## Next steps

* [Filecoin EVM runtime](filecoin-evm-runtime.md)
* [Filecoin.sol](filecoin.sol.md): a library that wraps these calls for you.
* [Addresses](../concepts/addresses.md): the five address types and how they map to 0x.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/fvm/precompiles)
