---
description: >-
  Set up a multisig on Filecoin with the native multisig actor or Safe on the
  FEVM, with Safe contract addresses and troubleshooting.
---

# Multisig

**A multisig wallet is controlled by several parties and only executes a transaction when a set number of them approve it. No single party controls the funds.**

You can use a multisig to:

* **Govern a shared wallet.** Members propose transactions, and the others approve them when it suits them.
* **Remove a single point of failure.** Stealing one key isn't enough to move the funds.
* **Manage funds together.** A team, a DAO or a storage provider can hold funds that need several sign-offs.

Filecoin has two kinds of multisig: the native multisig actor and Safe.

## Native multisig

The native multisig is a built-in actor. See [Actors](../../concepts/actors.md). It doesn't run on the Filecoin EVM. Its addresses start with `f2`, and it supports up to 256 signers. A signer can be a user or another multisig, and can have an `f1` or `f3` address. See [Addresses](../../concepts/addresses.md).

To use it:

* [Glif Multisig](https://www.glif.io/en/multisig/) is a non-custodial web UI.
* The [Lotus CLI](https://lotus.filecoin.io/lotus/manage/multisig/) has multisig commands.

## Safe

[Safe](https://safe.global/) is a widely used multisig account for EVM chains. It is non-custodial and works with many EVM wallets, and it is deployed on the Filecoin EVM.

* **Web UI:** [safe.filecoin.io](https://safe.filecoin.io). It opens on [Mainnet](../../networks/mainnet.md).
* **Transaction service:** [transaction.safe.filecoin.io](https://transaction.safe.filecoin.io) for Mainnet and [transaction-testnet.safe.filecoin.io](https://transaction-testnet.safe.filecoin.io) for [Calibration](../../networks/calibration.md). See the [Safe transaction service documentation](https://docs.safe.global/core-api/api-safe-transaction-service).
* **Finality:** the service treats a transaction as final after 60 epochs (30 minutes), as set by [FRC-0089](https://github.com/filecoin-project/FIPs/blob/master/FRCs/frc-0089.md). Full finality takes 900 epochs, about 7.5 hours, so wait longer for large transfers.
* **Help:** use the **Need Help?** section of the Safe web UI.

### Troubleshooting

* **Signing fails.** An account with no earlier activity on the Filecoin chain can't sign. Send it a transaction with zero FIL to start its activity.
* **Gas estimation fails when you execute.** This happens when the account holds very little FIL.
* **The UI shows "processing" for a long time.** Confirmation times can be long.
* **Using a Safe address from another network.** This sometimes works but needs extra steps, and the same address and owners aren't always possible. Confirm that the Safe is fully created as an EVM contract on Filecoin, not just a placeholder, before you send large amounts. If the other chain uses the L1 Safe proxy, you must map it to the L2 version used on Filecoin. Ask Safe support for help.

### Safe contracts

Safe's contracts are deployed on Mainnet and Calibration at the same addresses.

| Contract | Address |
| --- | --- |
| [SimulateTxAccessor](https://filecoin.blockscout.com/address/0x3d4BA2E0884aa488718476ca2FB8Efc291A46199) | `0x3d4BA2E0884aa488718476ca2FB8Efc291A46199` |
| [SafeProxyFactory](https://filecoin.blockscout.com/address/0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67) | `0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67` |
| [TokenCallbackHandler](https://filecoin.blockscout.com/address/0xeDCF620325E82e3B9836eaaeFdc4283E99Dd7562) | `0xeDCF620325E82e3B9836eaaeFdc4283E99Dd7562` |
| [CompatibilityFallbackHandler](https://filecoin.blockscout.com/address/0xfd0732Dc9E303f09fCEf3a7388Ad10A83459Ec99) | `0xfd0732Dc9E303f09fCEf3a7388Ad10A83459Ec99` |
| [CreateCall](https://filecoin.blockscout.com/address/0x9b35Af71d77eaf8d7e40252370304687390A1A52) | `0x9b35Af71d77eaf8d7e40252370304687390A1A52` |
| [MultiSend](https://filecoin.blockscout.com/address/0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526) | `0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526` |
| [MultiSendCallOnly](https://filecoin.blockscout.com/address/0x9641d764fc13c8B624c04430C7356C1C7C8102e2) | `0x9641d764fc13c8B624c04430C7356C1C7C8102e2` |
| [SignMessageLib](https://filecoin.blockscout.com/address/0xd53cd0aB83D845Ac265BE939c57F53AD838012c9) | `0xd53cd0aB83D845Ac265BE939c57F53AD838012c9` |
| [SafeL2](https://filecoin.blockscout.com/address/0x29fcB43b46531BcA003ddC8FCB67FFE91900C762) | `0x29fcB43b46531BcA003ddC8FCB67FFE91900C762` |
| [Safe](https://filecoin.blockscout.com/address/0x41675C099F32341bf84BFc5382aF534df5C7461a) | `0x41675C099F32341bf84BFc5382aF534df5C7461a` |

More: [Safe documentation](https://docs.safe.global/home/what-is-safe).

## Related pages

* [FVM advanced](README.md): tools and services for FVM developers.
* [Wallets](../../fil/wallets.md): choose a wallet and connect it to Filecoin.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/fvm/advanced/multisig)
