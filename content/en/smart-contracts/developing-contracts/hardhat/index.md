---
title: "Hardhat"
description: ""
lead: ""
draft: false
images: []
type: docs
menu:
  smart-contracts:
    identifier: "hardhat-493e35b7b05034632e53a13b339be61f"
weight: 100
toc: true
---

Hardhat is an open-source development environment for building and testing smart contracts. It is designed to provide developers with a flexible and extensible framework for building, testing, and deploying smart contracts in a reliable and efficient manner.

While originally created for the Ethereum blockchain, the Filecoin EVM-runtime allows Hardhat to be used to develop and deploy smart contracts on the Filecoin network.

## Hardhat kit

The [Filecoin EVM-runtime Hardhat kit](https://github.com/filecoin-project/FEVM-Hardhat-Kit) is a starter hardhat project for developing, deploying, and testing Solidity smart contracts on the Filecoin network. It functions in the same way as other Hardhat development kits. Check out the quickstart below to test it out!

### Prerequisities

This guide assumes you have the following installed:

- [Yarn](https://yarnpkg.com/)
- A Filecoin address stored in [MetaMask]({{< relref "/smart-contracts/ethereum-wallet/metamask" >}})

### Set up your environment

First we need to grab the starter kit and install the dependencies.

1. Clone the Hardhat starter kit and move into the new `fevm-hardhat-kit` directory:

    ```shell
    git clone https://github.com/filecoin-project/fevm-hardhat-kit.git
    cd fevm-hardhat-kit
    ```

1. Use Yarn to install the project's dependencies:

    ```shell
    yarn install
    ```

1. Create an environment variable for your private key. You can [export it from MetaMask]({{< relref "/smart-contracts/ethereum-wallet/metamask" >}}).

    ```shell
    export PRIVATE_KEY='<YOUR PRIVATE KEY>'
    ```

    For example:

    ```shell
    export PRIVATE_KEY='d52cd65a5746ae71cf3d07a8cf392ca29d7acb96deba7d94b19a9cf3c9f63022'
    ```

{{< alert >}}
Always be careful when dealing with your private key. Double check that you're not hardcoding it anywhere, or commiting it to source control like GitHub. Anyone with access to your private key has complete control over your funds.
{{< /alert >}}

