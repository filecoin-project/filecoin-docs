---
description: >-
  Filecoin address types explained: f0 ID, f1 secp256k1, f2 actor, f3 BLS and f4
  delegated addresses, how they convert, and how they map to 0x.
---

# Addresses

**A Filecoin address identifies an actor, and most actors have several. There are five types, shown by the number after the leading `f`.**

To send FIL between address types, see [Transfer FIL](../fil/transfer-fil.md). For the actors behind these addresses, see [Actors](actors.md).

## Address types

| Prefix | Type | What it is |
| --- | --- | --- |
| `f0` | ID address | The short integer ID an actor gets when it is created. |
| `f1` | Wallet address | Derived from a secp256k1 public key. |
| `f2` | Actor address | A robust address for an actor that has no public key. |
| `f3` | Wallet address | Derived from a BLS public key. |
| `f4` | Delegated address | A user-defined address assigned by an address manager. `f410` is the Ethereum-compatible space, where each address matches a `0x` address. |

An address in text form has four parts:

| Network prefix | Protocol indicator | Payload | Checksum |
| --- | --- | --- | --- |
| `f` for Mainnet, `t` for any testnet | `0`, `1`, `2`, `3`, or `4` | _n_ bytes | 4 bytes |

Onchain, an address is stored as raw bytes. The text form, with the network prefix and checksum, is only for people and never appears onchain.

## ID addresses (`f0`)

When an actor is created, the init actor gives it the next short integer, its ID. An ID address is that ID with the network prefix and the type. Every actor has one.

For example, the [Mainnet](../networks/mainnet.md) burn account is `f099`:

```plaintext
f 0 99
| | |
| | Actor ID
| Address type
Network prefix
```

ID addresses depend on chain state, so they are not _robust_. Like an auto-incrementing database key, the same ID can point to different actors on different forks until the chain settles. After the state that created the ID is final, the ID belongs to that actor forever.

{% hint style="warning" %}
`f0` addresses are not stable across chain reorganizations. Don't rely on one until the chain has settled.
{% endhint %}

## Wallet addresses (`f1` and `f3`)

Wallet addresses belong to actors that users control directly, such as accounts. Each is derived from a public-private key pair. If you hold the private key, you can sign messages from that address.

There are two kinds:

* `f1` addresses use [secp256k1](https://en.wikipedia.org/wiki/Secp256k1) keys.
* `f3` addresses use [BLS](https://en.wikipedia.org/wiki/BLS_digital_signature) keys on the BLS12-381 curve.

Wallet addresses are _robust_: they don't depend on chain state. A device such as a hardware wallet can derive the address from the public key alone, without asking a node for the ID address.

## Actor addresses (`f2`)

An actor address gives a robust address to an actor that has no public key. It is generated from a `sha256` hash of the output of the account creation.

## Delegated addresses (`f4`)

[FIP-0048](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0048.md) added `f4` addresses so that other addressing systems can be used on Filecoin. They give the network:

* Predictable addresses for actors that don't exist onchain yet.
* Custom addressing systems without network upgrades.
* Support for the address formats of other runtimes, such as the EVM.

An `f4` address is `f4`, then the actor ID of an _address manager_, then `f`, then the new actor's ID. An address manager is an actor that creates new actors and assigns each an `f4` address. For now, only built-in address managers can do this.

### Ethereum Address Manager

The Ethereum Address Manager (EAM) is the built-in address manager for the `f410` space. It works like an EVM smart contract factory: it assigns an `f410` address to each Ethereum address, and the last part of an `f410` address is the original `0x` address.

On [Calibration](../networks/calibration.md) Testnet, for example:

| Ethereum address | Filecoin address |
| --- | --- |
| `0xd388ab098ed3e84c0d808776440b48f685198498` | `t410f2oekwcmo2pueydmaq53eic2i62crtbeyuzx2gmy` |
| `0x5f6044198a16279f87d2839c998893858bbf8d9c` | `t410fl5qeigmkcytz7b6sqoojtcetqwf37dm4zv4aijq` |

If you send tFIL to the first address from a wallet like MetaMask, the tFIL arrives at the `t410` address. When you call a smart contract with Ethereum tooling, use its `0x` address.

### Convert to a `0x` address

Only `f0` and `f410f` addresses have a `0x` form.

* **`f0`:** take the actor ID, for example `1234` in `f01234`, and hex-encode it as 16 digits after the prefix `0xff0000000000000000000000`.
* **`f410f`:**
  1. Remove the `f410f` prefix.
  2. Decode the rest as base 32 (RFC 4648, no padding).
  3. Drop the last 4 bytes, which are a checksum.
  4. Check that 20 bytes remain, then hex-encode them with a `0x` prefix.

### Convert to a Filecoin address

* If the address starts with `0xff0000000000000000000000`, read the last 16 hex digits as a number. The Filecoin address is `f0` followed by that number in decimal.
* Any other `0x` address maps to an `f410f` address.

## Next steps

* [Actors](actors.md): the three actor types the Filecoin EVM runtime adds.
* [Transfer FIL](../fil/transfer-fil.md): send FIL between address types.
* [Wallets](../fil/wallets.md): choose a wallet and connect it to Filecoin.
* [Precompiles](../fvm/precompiles.md): built-in contracts at fixed addresses.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/concepts/addresses)
