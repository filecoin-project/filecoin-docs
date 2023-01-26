---
title: "Accounts and assets"
description: "Everything you need to know about how accounts and assets are managed within the FVM. A lot of this information is identical to how accounts and assets are managed within the Filecoin network as a whole, however there are some nuances."
lead: "An `f4` address allows an actor, referred to as an address manager, to _control_ an address-space. This allows the address manager to implement foreign addressing schemes and allows users to refer to addresses that could contain an actor with a set of properties enforced by the address manager."
draft: false
images: []
type: docs
weight: 10
menu:
  build:
    parent: "build-concepts"
    identifier: "accounts-and-assets-3fbb8ytr2864t9fbs6t"
toc: true
aliases:
    - "/fvm/concepts/accounts-and-assets/"
---

## Accounts

In Filecoin, addresses are used to identify actors. There are four address types:

| Prefix | Description |
| --- | --- |
| `f0` | An ID address. |
| `f1` | A [SECP256K1](https://en.bitcoin.it/wiki/Secp256k1) public key address. |
| `f2` | An actor address |
| `f3` | A [BLS](https://en.wikipedia.org/wiki/BLS_digital_signature) public key address. |
| `f4` | An extensible address class. See [FIP-0048](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0048.md) for detailed information. |

Address types `f0`, `f1`, `f2`, and `f3` are specific to Filecoin. `f4` addresses, however, allow extensions to addressing-systems used in third-party blockchains like Ethereum.

<!-- ### F0 addresses -->

<!-- ### F1 addresses -->

<!-- ### F2 addresses -->

<!-- ### F3 addresses -->

### F4 addresses

<!-- An `f4` address is essentially an actor address that is user-programmable. It's possible to send funds to an `f1` or `f3` address that doesn't yet exist on-chain, but there's no way to send funds to a non-account actor that doesn't yet exist on-chain, such as a multisig actor with an `f2` address. This is where `f4` addresses come in. -->

F4 addresses allow users to:

- Implement foreign addressing systems in Filecoin, such as the system used in Ethereum.
- Implement predictable addressing systems so that an actor's address may be computed before deployment.
- Send funds to such a pre-computed actor address before actually deploying the actor there.

Prior to the implementation of `f4` addresses, adding new address types and address derivation methods to the Filecoin network required extensive changes and a network upgrade.

#### Format

An address manager will own `f4` addresses starting with the {{< tooltip "leb128" >}} encoded actor ID and followed by an arbitrary sub-address:

```plaintext
[0x4 (f4 address class)] || {leb128(actor-id)} || {sub-address}
```

In text, this address will be formatted as `f4{decimal(actor-id)}f{base32(sub-address || checksum)}` where `checksum` is the blake2b-32 (32bit/4byte {{< tooltip "blake2b" >}}) hash of the address in its binary representation. This is the same checksumming approach used in the textual representation of `f1`, `f2`, and `f3` addresses.

An address management actor at `f010` will be able to assign addresses starting with `f410f` in text or `[4, 10, ...]` in binary. Where the address manager ID address is `f01111` and the sub-address is `0xeff924032365F51a36541efA24217bFc5B85bc6B`, the resulting textual format would be `f41111f574siazdmx2runsud35ciil37rnylpdl`.

The textual format defined here is the universal textual format for `f4` addresses. It's expected that chain explorers and client implementations understand specific well-known address types and format these addresses according to their _native_ representation. Tooling should transparently convert Ethereum addresses in the `0x...` to and from the equivalent `f4` address.

For example, for an address manager `f01112` that manages a namespace of raw ASCII addresses _hello world_, the standard format would be `f41112fnbswy3dpeb3w64tmmqqq` though clients should recognize the address manager and display it as text `{hello world}`.

<!-- OMMITING FOR NOW. CAN BRING BACK IN ONCE -->
<!-- WE EXPLAIN F2 ADDRESSES IN THIS DOC -->
<!-- ------------------------------------------->
<!-- #### F2 and F4 comparison -->

<!-- The key distinction is that `f2` addresses are designed to be stable and that `f4` addresses are designed to be "user-programmable". -->

<!-- An `f2` address allows a user to create a chain of messages where a later message refers to an actor created in an earlier message. An `f2` address refers to the actor created by a specific message. -->

<!-- An `f4` address allows an actor, referred to as an address manager, to _control_ an address-space. This allows the address manager to implement foreign addressing schemes and allows users to refer to addresses that could contain an actor with a set of properties enforced by the address manager. -->
<!-- ------------------------------------------->

<!-- ### Converting addresses -->

<!-- <!-1- How to convert from a Filecoin address to a Eth address -1-> -->
<!-- <!-1- - Do I need ETH to use FEVM? -1-> -->

<!-- ### Account management -->

<!-- #### Hot wallets -->

<!-- <!-1- - Can I use Metamask? -1-> -->
<!-- <!-1- - Do I need Filsnap? -1-> -->

<!-- #### Cold wallets -->

<!-- ## Assets -->

<!-- <!-1- - How do I get FIL to test? Is there a faucet? -1-> -->
<!-- <!-1- - How do I get FIL -1-> -->
