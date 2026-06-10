---
description: >-
  Hardhat is an open-source development environment designed to provide
  developers with a flexible and extensible framework for building, testing, and
  deploying smart contracts.
---

# Hardhat

While originally created for the Ethereum blockchain, the Filecoin Ethereum Virtual Machine runtime (FEVM) allows Hardhat to be used to develop and deploy smart contracts on the Filecoin network.

## Quickstart

The [FEVM Hardhat kit](https://github.com/filecoin-project/FEVM-Hardhat-Kit) is a starter hardhat project for developing, deploying, and testing Solidity smart contracts on the Filecoin network. It functions in the same way as other Hardhat development kits. Check out the quickstart below to test it out!

### Prerequisites

This guide assumes you have the following installed:

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/)
* A Filecoin address stored in [MetaMask](../../networks-and-tools/assets/metamask-setup.md)
* Calibration testnet `tFIL` or mainnet `FIL` for the account you will deploy from

### Environment setup

First, we need to grab the starter kit and install the dependencies.

1. Clone the Hardhat starter kit and move into the new `fevm-hardhat-kit` directory:

```shell
git clone --recurse-submodules https://github.com/filecoin-project/fevm-hardhat-kit.git
cd fevm-hardhat-kit
```

2. Use Yarn to install the project’s dependencies:

```shell
yarn install
```

3. Create your `.env` file and replace the placeholder private key:

```shell
cp .env.example .env
```

```shell
PRIVATE_KEY=your_private_key_here
```

{% hint style="info" %}
Always be careful when dealing with your private key. Double-check that you’re not hardcoding it anywhere or committing it to Git. Remember: anyone with access to your private key has complete control over your funds.
{% endhint %}

4. Get the addresses associated with the private key from Hardhat:

```shell
yarn hardhat get-address
```

The command output is environment-dependent. It prints the Ethereum-style `0x` address and the Filecoin `f4` address for the private key in `.env`. Use the Ethereum-style address with the Calibration faucet and most FEVM tools.

Now that we’ve got the kit set up, we can start using it to develop and deploy our contracts.

### Manage the contracts

There are two main types of contracts:

* Basic Solidity examples: Simple contracts to show off basic Solidity.
* Filecoin API Examples: Contracts that demo how to use the Filecoin APIs in Solidity to access storage deals and other Filecoin-specific functions.

Make sure that your account has funds. You won’t be able to deploy any contracts without `FIL` or `tFIL`.

1. Run `hardhat deploy` to deploy the kit contracts. The current kit defaults to the Calibration network:

```shell
yarn hardhat deploy
```

Deployment is network-dependent and may attempt Blockscout and Filfox verification after broadcasting. To deploy without verifier calls, set the kit’s skip flags:

```shell
IGNORE_FILFOX_VERIFICATION=true IGNORE_BLOCKSCOUT_VERIFICATION=true yarn hardhat deploy
```

2. Interact with the contracts using the available functions within the `tasks` folder. For example, you can get the balance of the `simple-coin` contract by calling the `get-balance` function:

```shell
export CONTRACT_ADDRESS=0xYourDeployedSimpleCoinAddress
export ACCOUNT_ADDRESS=0xYourEthereumStyleAccountAddress

yarn hardhat get-balance --contract "$CONTRACT_ADDRESS" --account "$ACCOUNT_ADDRESS"
```

## Hardhat docs

You can view the official Hardhat documentation over at [`hardhat.org/docs`](https://hardhat.org/docs).



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/build/development-frameworks/hardhat)
