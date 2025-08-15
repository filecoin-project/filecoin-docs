---
description: >-
  Foundry is a fast toolkit for application development written in Rust equipped
  with a testing framework, as well as utilities for interacting with smart
  contracts and getting chain data.
---

# Foundry

The template repository contains submodules and remappings for ds-test assertions for testing, solmate building blocks for contracts, and forge-std to layer on top of EVM cheat codes to improve UX.

## Prerequisites

You must have the following installed:

- [Git](https://git-scm.com/)
- [Yarn](https://yarnpkg.com/)

You should also have an address on the Filecoin Calibration testnet. See the [MetaMask setup page](../../basics/assets/metamask-setup.md) for information on how to get an address. You also need test `tFIL` in your wallet.

## Steps

1. Clone the `filecoin-project/fevm-foundry-kit` repository and move into the `fevm-foundry-kit` directory:

```
git clone https://github.com/filecoin-project/fevm-foundry-kit/tree/main.git
cd fevm-foundry-kit
```

2. Install the project dependencies with Yarn:

```
yarn install
```

3. Export your private key from MetaMask. See the [MetaMask documentation](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key) to find out how to export your private key.

4. Create your env file by running

```
cp .env.example .env
```

5. In your newly created`.env` replace `PRIVATE_KEY` with the one gathered from MetaMask. Also, do the same for the `CALIBRATIONNET_RPC_URL`.:

```bash
PRIVATE_KEY=eed8e9d727a647f7302bab440d405ea87d36726e7d9f233ab3ff88036cfbce9c
CALIBRATIONNET_RPC_URL=https://api.calibration.node.glif.io/rpc/v1
```

6. Inside the `src` folder in a contract called `SimpleCoin.sol`. Deploy this contract using Foundry:

```shell
forge build
forge create --rpc-url https://api.calibration.node.glif.io/rpc/v1 --private-key $PRIVATE_KEY src/SimpleCoin.sol:SimpleCoin --broadcast
```

7. You can now interact with your contract using the contract address given by Foundry.

Done! For more information, see the [Foundry book](https://book.getfoundry.sh/).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/smart-contracts/developing-contracts/foundry)
