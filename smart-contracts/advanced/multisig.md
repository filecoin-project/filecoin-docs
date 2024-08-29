---
description: >-
  Multisig wallets enhance security and decentralization by requiring multiple signatures for transactions, distributing control among multiple participants.
---

# Multisig Wallets 

In the Filecoin network, multisig wallets allow multiple parties to jointly manage a wallet by requiring a predefined number of signatures (approvals) for a transaction to be executed. This enhances security and decentralization by distributing control among multiple participants.

Multisig wallets are an essential component of many blockchain applications, as they enable collaborative management of funds and application state. Users initiate a transaction to be signed by fellow collaborators. Once the required number of approvals is met, the transaction is executed.

Multisig wallets enable builders to integrate the following features into their projects:

* **Decentralized Governance**: Parties asynchronously approve transactions initiated by its members.
* **Security**: Distributing control among multiple participants ensures that no single party has full control over the wallet.
* **Collaborative fund management**: Multiple parties can jointly manage a wallet by requiring a predefined number of signatures (approvals) for a transaction to be executed.

## Available multisig wallet implementations

There are several multisig wallet implementations built upon the FVM. Builders can integrate these multisig wallets into their applications today.

### [Safe](https://safe.global/)

Safe is a popular smart account infrastructure provider that allows users to manage their digital assets securely. It is formally verified, secures over $100B in assets, and is used by more than 200 projects.

**Note**: The Safe.global web UI does not currently support Filecoin. Users can only interact with Safe on the Filecoin network using the CLI and Filecoin explorers.


**Safe Smart Contracts**

Gnosis Safe’s smart contracts are live on the Filecoin Mainnet and Calibration testnet.

| Name                             | Address                                      | Mainnet | Calibration |
| -------------------------------- | -------------------------------------------- | ------- | ----------- |
| [SimulateTxAccessor](https://filecoin.blockscout.com/address/0x3d4BA2E0884aa488718476ca2FB8Efc291A46199)           | `0x3d4BA2E0884aa488718476ca2FB8Efc291A46199` | ✔️      | ✔️            |
| [SafeProxyFactory](https://filecoin.blockscout.com/address/0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67)             | `0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67` | ✔️      | ✔️            |
| [TokenCallbackHandler](https://filecoin.blockscout.com/address/0xeDCF620325E82e3B9836eaaeFdc4283E99Dd7562)         | `0xeDCF620325E82e3B9836eaaeFdc4283E99Dd7562` | ✔️      | ✔️            |
| [CompatibilityFallbackHandler](https://filecoin.blockscout.com/address/0xfd0732Dc9E303f09fCEf3a7388Ad10A83459Ec99) | `0xfd0732Dc9E303f09fCEf3a7388Ad10A83459Ec99` | ✔️      | ✔️            |
| [CreateCall](https://filecoin.blockscout.com/address/0x9b35Af71d77eaf8d7e40252370304687390A1A52)                   | `0x9b35Af71d77eaf8d7e40252370304687390A1A52` | ✔️      | ✔️            |
| [MultiSend](https://filecoin.blockscout.com/address/0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526)                    | `0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526` | ✔️      | ✔️            |
| [MultiSendCallOnly](https://filecoin.blockscout.com/address/0x9641d764fc13c8B624c04430C7356C1C7C8102e2)            | `0x9641d764fc13c8B624c04430C7356C1C7C8102e2` | ✔️      | ✔️            |
| [SignMessageLib](https://filecoin.blockscout.com/address/0xd53cd0aB83D845Ac265BE939c57F53AD838012c9)               | `0xd53cd0aB83D845Ac265BE939c57F53AD838012c9` | ✔️      | ✔️            |
| [SafeL2](https://filecoin.blockscout.com/address/0x29fcB43b46531BcA003ddC8FCB67FFE91900C762)                       | `0x29fcB43b46531BcA003ddC8FCB67FFE91900C762` | ✔️      | ✔️            |
| [Safe](https://filecoin.blockscout.com/address/0x41675C099F32341bf84BFc5382aF534df5C7461a)                         | `0x41675C099F32341bf84BFc5382aF534df5C7461a` | ✔️      | ✔️            |

#### **Further Gnosis Safe resources**

* [Safe Smart Account Docs](https://docs.safe.global/advanced/smart-account-overview)
* [Create Your Own Multisig via. the Safe CLI](https://docs.safe.global/advanced/cli-overview)
* [Safe - Deploy a Recovery Safe Example](https://docs.safe.global/advanced/cli-guides/recovery-safe-deployment)