---
description: >-
  Multisig wallets enhance security and decentralization by requiring multiple
  signatures for transactions, distributing control among multiple participants.
---

# Multisig

In the Filecoin network, multisig wallets allow multiple parties to jointly manage a wallet by requiring a predefined number of signatures (approvals) for a transaction to be executed. This enhances security and decentralization by distributing control among multiple participants.

Multisig wallets are an essential component of many blockchain applications, as they enable collaborative management of funds and application state. Users initiate a transaction to be signed by fellow collaborators. Once the required number of approvals is met, the transaction is executed.

Multisig wallets enable builders to integrate the following features into their projects:

* **Decentralized Governance**: Parties asynchronously approve transactions initiated by its members.
* **Security**: Distributing control among multiple participants ensures that no single party has full control over the wallet.
* **Collaborative fund management**: Multiple parties can jointly manage a wallet by requiring a predefined number of signatures (approvals) for a transaction to be executed.

## Available multisig wallet implementations

There are several multisig wallet implementations on Filecoin. Builders can integrate these multisig wallets into their applications today.

### Filecoin Native Multisig

The Filecoin Native [MultisigActor](/basics/the-blockchain/actors#multisigactor) is a built-in actor that does not interact directly with the Filecoin EVM. Like other Filecoin actors, native multisig addresses begin with `f2` and represent a group of transaction signers with a maximum of 256 signers. Signers may be external users or the MultisigActor itself and can include `f1` and `f3` [addresses](https://docs.filecoin.io/basics/the-blockchain/addresses).

A [MultisigActor CLI](https://lotus.filecoin.io/lotus/manage/multisig/) is available from the Lotus CLI, and a web UI for MultisigActors is available at https://www.glif.io/en/multisig/.

### Safe multisig

[Safe](https://safe.global/) is a popular smart EVM multisig account infrastructure provider that allows users to manage their digital assets securely. It is non-custodial, formally verified, secures over $100B in assets, and is used by more than 200 projects. Safe has been deployed to the Filecoin EVM.

#### Safe UI

A web interface for the Safe multisig on Filecoin is available at:
- https://safe.filecoin.io on [Filecoin Mainnet](https://docs.filecoin.io/networks/mainnet)
- https://staging.safe.filecoin.io on [Filecoin Calibration testnet](https://docs.filecoin.io/networks/calibration)

![SafeUI](https://github.com/user-attachments/assets/450d925e-c280-4c0d-b5da-cdb148c146fd)


#### Safe Troubleshooting

- **Signing a transaction** from an *account with no previous activity* on the Filecoin blockchain will fail. You can send a transaction to this account with zero funds to initiate its on-chain activity and the issue will not persist anymore.
- **Executing a transaction** can produce gas estimation issues for *accounts that have a very small amount of funds* (that would not or barely cover the transaction).
- **Due to transaction confirmation times** users may experience prolonged "processing" status in the UI.
   - See [finality](https://docs.filecoin.io/reference/general/glossary#finality) for more info on current finality (note that faster finality is coming to Filecoin in the near future).
- Safe-related support can be found in the "Need Help?" section of the Safe web UI.

#### Safe Transaction Service

The [Safe transaction service](https://docs.safe.global/core-api/api-safe-transaction-service) on Filecoin is available at:
- https://transaction.safe.filecoin.io on [Filecoin Mainnet](https://docs.filecoin.io/networks/mainnet)
- https://transaction-testnet.safe.filecoin.io on [Filecoin Calibration testnet](https://docs.filecoin.io/networks/calibration)

#### Safe Smart Contracts

Safe’s multisig smart contracts are live on the Filecoin Mainnet and Calibration testnet.

| Name                                                                                                               | Address                                      | Mainnet | Calibration |
| ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- | ------- | ----------- |
| [SimulateTxAccessor](https://filecoin.blockscout.com/address/0x3d4BA2E0884aa488718476ca2FB8Efc291A46199)           | `0x3d4BA2E0884aa488718476ca2FB8Efc291A46199` | ✔️      | ✔️          |
| [SafeProxyFactory](https://filecoin.blockscout.com/address/0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67)             | `0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67` | ✔️      | ✔️          |
| [TokenCallbackHandler](https://filecoin.blockscout.com/address/0xeDCF620325E82e3B9836eaaeFdc4283E99Dd7562)         | `0xeDCF620325E82e3B9836eaaeFdc4283E99Dd7562` | ✔️      | ✔️          |
| [CompatibilityFallbackHandler](https://filecoin.blockscout.com/address/0xfd0732Dc9E303f09fCEf3a7388Ad10A83459Ec99) | `0xfd0732Dc9E303f09fCEf3a7388Ad10A83459Ec99` | ✔️      | ✔️          |
| [CreateCall](https://filecoin.blockscout.com/address/0x9b35Af71d77eaf8d7e40252370304687390A1A52)                   | `0x9b35Af71d77eaf8d7e40252370304687390A1A52` | ✔️      | ✔️          |
| [MultiSend](https://filecoin.blockscout.com/address/0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526)                    | `0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526` | ✔️      | ✔️          |
| [MultiSendCallOnly](https://filecoin.blockscout.com/address/0x9641d764fc13c8B624c04430C7356C1C7C8102e2)            | `0x9641d764fc13c8B624c04430C7356C1C7C8102e2` | ✔️      | ✔️          |
| [SignMessageLib](https://filecoin.blockscout.com/address/0xd53cd0aB83D845Ac265BE939c57F53AD838012c9)               | `0xd53cd0aB83D845Ac265BE939c57F53AD838012c9` | ✔️      | ✔️          |
| [SafeL2](https://filecoin.blockscout.com/address/0x29fcB43b46531BcA003ddC8FCB67FFE91900C762)                       | `0x29fcB43b46531BcA003ddC8FCB67FFE91900C762` | ✔️      | ✔️          |
| [Safe](https://filecoin.blockscout.com/address/0x41675C099F32341bf84BFc5382aF534df5C7461a)                         | `0x41675C099F32341bf84BFc5382aF534df5C7461a` | ✔️      | ✔️          |

#### **Further Safe resources**

* [Safe Docs](https://docs.safe.global/home/what-is-safe)


[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/smart-contracts/advanced/multisig)
