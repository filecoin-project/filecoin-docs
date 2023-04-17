---
title: "Foundry"
description: "Learn how to use Foundry with the Filecoin network."
lead: "Foundry is a fast toolkit for application development written in Rust equipped with a testing framework, as well as utilities for interacting with smart contracts and getting chain data. We're going to use the [FEVM Foundry Kit repository](https://github.com/xBalbinus/fevm-foundry-kit) to get started."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-developing-contracts"
    identifier: "foundry-riejwu384uw9eus8wu283uw9riwus8w"
weight: 440
toc: true
---

The template repository contains submodules and remappings for ds-test assertions for testing, solmate building blocks for contracts, and forge-std to layer on top of evm cheatcodes to improve UX.

## Prerequisites

You must have the following installed:

- [Git](https://git-scm.com/)
- [Yarn](https://yarnpkg.com/)

You should also have an address on the Filecoin Hyperspace testnet. See the [Add to MetaMask page]({{< relref "/basics/assets/metamask-setup" >}}) for information on how to get an address. You also need test-FIL `tFIL` in your wallet. See the [Use a Faucet]({{< relref "get-test-tokens" >}}) page for information on how to get test funds.

## Steps

1. Clone the `xBalbinus/fevm-foundry-kit` repository and move into the `fevm-foundry-kit` directory:

    ```shell
    git clone https://github.com/xBalbinus/fevm-foundry-kit/tree/main.git
    cd fevm-foundry-kit
    ```

1. Install the project dependencies with Yarn:

    ```shell
    yarn install
    ```

1. Export your private key from MetaMask. See the [MetaMask documentation](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key) to find out how to export your private key.
1. In your .env.example, create an environment variable called `PRIVATE_KEY` and paste in the private key from MetaMask. Also, do the same for the `HYPERSPACE_RPC_URL`. Then rename the file to .env:

    ```markdown
    PRIVATE_KEY=eed8e9d727a647f7302bab440d405ea87d36726e7d9f233ab3ff88036cfbce9c
    HYPERSPACE_RPC_URL=https://api.hyperspace.node.glif.io/rpc/v1
    ```

1. Inside the `src` folder in a contract called `SimpleCoin.sol`. Deploy this contract using Foundry:

    ```shell
    forge build
    forge script script/SimpleCoin.s.sol:MyScript --rpc-url https://api.hyperspace.node.glif.io/rpc/v1 --broadcast --verify -vvvv
    ```

    ```plaintext
    ...

    Script ran successfully.
    Gas used: 234642
    ```

    Alternatively, you can do the same using the `forge create` command:

    ```shell
    forge build

    forge create --rpc-url https://api.hyperspace.node.glif.io/rpc/v1 --private-key $PRIVATE_KEY src/SimpleCoin.sol:SimpleCoin
    ```

    The deployment process should be almost instantaneous. Once the contract has been successfully deployed, Foundry will give you a contract address you can use to interact with the contract.

1. You can now interact with your contract using the contract address given by Foundry.
1. Done! For more information, see the [Foundry book](https://book.getfoundry.sh/).
