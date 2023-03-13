---
title: "Hardhat"
description: "Learn how to use Hardhat with the Filecoin network."
lead: "Hardhat is an open-source development environment for building and testing smart contracts. It is designed to provide developers with a flexible and extensible framework for building, testing, and deploying smart contracts in a reliable and efficient manner."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-developing-contracts"
    identifier: "hardhat-493e35b7b05034632e53a13b339be61f"
weight: 450
toc: true
---

While originally created for the Ethereum blockchain, the Filecoin EVM-runtime allows Hardhat to be used to develop and deploy smart contracts on the Filecoin network.

## Quickstart

The [Filecoin EVM-runtime Hardhat kit](https://github.com/filecoin-project/FEVM-Hardhat-Kit) is a starter hardhat project for developing, deploying, and testing Solidity smart contracts on the Filecoin network. It functions in the same way as other Hardhat development kits. Check out the quickstart below to test it out!

### Prerequisites

This guide assumes you have the following installed:

- [Yarn](https://yarnpkg.com/)
- A Filecoin address stored in [MetaMask]({{< relref "/smart-contracts/wallets/metamask" >}})

### Environment setup

First, we need to grab the starter kit and install the dependencies.

1. Clone the Hardhat starter kit and move into the new `fevm-hardhat-kit` directory:

    ```shell
    git clone https://github.com/filecoin-project/fevm-hardhat-kit.git
    cd fevm-hardhat-kit
    ```

    ```plaintext
    Cloning into 'fevm-hardhat-kit'...
    remote: Enumerating objects: 758, done.
    remote: Counting objects: 100% (725/725), done.

    ...
    ```

1. Use Yarn to install the project's dependencies:

    ```shell
    yarn install
    ```

    ```plaintext
    [1/4] 🔍  Resolving packages...
    [2/4] 🚚  Fetching packages...
    [3/4] 🔗  Linking dependencies...

    ...

    ✨  Done in 16.34s.
    ```

1. Create an environment variable for your private key. You can [export it from MetaMask]({{< relref "/smart-contracts/wallets/metamask" >}}).

    ```shell
    export PRIVATE_KEY='<YOUR PRIVATE KEY>'
    ```

    For example:

    ```shell
    export PRIVATE_KEY='d52cd65a5746ae71cf3d07a8cf392ca29d7acb96deba7d94b19a9cf3c9f63022'
    ```

    Always be careful when dealing with your private key. Double-check that you're not hardcoding it anywhere or committing it to source control like GitHub. Anyone with access to your private key has complete control over your funds.

1. Get the deployer address from Hardhat:

    ```shell
    yarn hardhat get-address
    ```

    ```plaintext
    Ethereum address (this addresss should work for most tools): 0x11Fc070e5c0D32024c9B63c136913405e07C8c48
    f4address (also known as t4 address on testnets): f410fch6aods4buzaete3mpatnejuaxqhzdci3j67vyi
    ✨  Done in 1.40s.
    ```

    This will show you the Ethereum-style address associated with that private key and the Filecoin-style `f4` or `t4` address. The Ethereum address can be used for almost all Ethereum tooling.

Now that we've got the kit set up, we can start using it to develop and deploy our contracts.

### Manage the contracts

There are two main types of contracts:

- Basic Solidity examples: Simple contracts to show off basic Solidity.
- Filecoin API Examples: Contracts that demo how to use the Filecoin APIs in Solidity to access storage deals and other Filecoin-specific functions.

{{< alert >}}
Make sure that your account has funds. You won't be able to deploy any contracts without FIL or tFIL.
{{< /alert >}}

1. Run `hardhat deploy` to deploy all the contracts. This can take a few minutes:

    ```shell
    yarn hardhat deploy
    ```

    ```plaintext
    Compiled 18 Solidity files successfully
    Wallet Ethereum Address: 0x11Fc070e5c0D32024c9B63c136913405e07C8c48
    Deploying Simplecoin...

    ...

    ✨  Done in 211.76s.
    ```

    This will compile all the contracts in the contracts folder and deploy them to the Hyperspace test network automatically!

1. Interact with the contracts using the available functions within the `tasks` folder. For example, you can get the balance of the `simple-coin` contract by calling the `get-balance` function:

    ```shell
    yarn hardhat get-balance --contract '0xA855520fcCB6422976F7Ac78534edec2379Be5f6' --account '0x11Fc070e5c0D32024c9B63c136913405e07C8c48'
    ```

    ```plaintext
    Reading SimpleCoin owned by 0x11Fc070e5c0D32024c9B63c136913405e07C8c48 on network hyperspace
    Amount of Simplecoin owned by 0x11Fc070e5c0D32024c9B63c136913405e07C8c48 is 12000
    Total amount of minted tokens is 12000
    ✨  Done in 3.73s.
    ```

## Hardhat docs

You can view the official Hardhat documentation over at [hardhart.org/docs](https://hardhat.org/docs).
