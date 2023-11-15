---
description: >-
  With Filecoin Virtual Machine (FVM), Solidity developers can use existing
  libraries listed on this page in their FVM smart contracts.
---

# Solidity libraries

## OpenZeppelin

[OpenZeppelin](https://www.openzeppelin.com/contracts) provides a library of battle-tested smart contract templates, including widely used implementations of ERC token standards. For a guided example that implements an ERC20 token on the Filecoin network, see [Example using an ERC20 contract](../fundamentals/erc-20-quickstart.md).

### Benefits

OpenZeppelin offers the following to smart contract developers:

* Implementations of standards like ERC20, ERC721, and ERC1155.
* Flexible access control schemes like `Ownable`, `AccessControl`, and `onlyRole`.
* Useful and secure utilities for signature verification, `SafeMath`, etc..

Token standards, such as [ERC20](https://docs.openzeppelin.com/contracts/4.x/erc20), are the most widely used smart contract libraries from OpenZeppelin. These contracts, listed below, implement both _fungible_ and _non-fungible_ tokens:

* [ERC20](https://docs.openzeppelin.com/contracts/4.x/erc20) is the simplest and most widespread token standard for fungible assets.
* [ERC721](https://docs.openzeppelin.com/contracts/4.x/erc721) is the standard solution for non-fungible tokens and is often used for collectibles and games.
* [ERC777](https://docs.openzeppelin.com/contracts/4.x/erc777) provides a richer standard for fungible tokens, supporting new use cases and backwards compatibility with ERC20.
* [ERC1155](https://docs.openzeppelin.com/contracts/4.x/erc1155) is a new standard for _multi-tokens_, where a single contract represents multiple fungible and non-fungible tokens, and operations are batched for increased gas efficiency.

### Using OpenZeppelin with FVM

The _general_ procedure for using OpenZeppelin with FVM is as follows:

1. Install OpenZeppelin. For example, using `npm`:

```
npm install @openzeppelin/contracts
```

2. Import the specific library you want to use.
3. In your smart contract, inherit the library.

Thanks to the FVM, your contract can be integrated and deployed on the Filecoin network with OpenZeppelin inheritance. For a guided example that implements an ERC20 token on the Filecoin network, see [Example using an ERC20 contract](../fundamentals/erc-20-quickstart.md).

### Example using an ERC-20 contract

In the following tutorial, you’ll write and deploy a smart contract that implements the [ERC-20](https://docs.openzeppelin.com/contracts/4.x/erc20) on the Calibration testnet using Remix and MetaMask:

**Prerequisites**

Let’s take an ERC20 contract as an example to write and deploy it on the Calibration testnet using Remix & MetaMask:

* Remix.
* MetaMask.
* [MetaMask connected to the Calibration testnet](../../networks/calibration/).
* Test tokens (tFIL) [from the faucet](https://faucet.calibration.fildev.network/funds.html).

**Procedure**

In this procedure, you will create, deploy, mint and send an [ERC20](https://docs.openzeppelin.com/contracts/4.x/erc20) token on Calibration using Remix and MetaMask.

1. Navigate to [remix.ethereum.org](https://remix.ethereum.org/).
2. Next to **Workspaces**, click the **+** icon to create a new workspace.
3. In the **Choose a template** dropdown, select **ERC20** along with the **Mintable** checkbox
4. Click **OK**.
5. In the **contract** directory, open **MyToken.sol**.
6. Set the token `<name>` and `<symbol>`:

```solidity
// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
   constructor(uint256 initialSupply) ERC20(<name>, <symbol>) {
      _mint(msg.sender, initialSupply);
   }
}
```

7. Next, compile and deploy the contract on Filecoin.
8. At the top of the workspace, click the green play symbol to compile the contract.
9. Once the contract compiles, open the **Deploy** tab on the left.
10. Under the **Environment** dropdown, select **Injected Provider - MetaMask**.
11. In the MetaMask popup window, select **Confirmed connection**.
12. Click **Deploy**, and confirm the transaction on MetaMask. Your token contract will be deployed to the Calibration testnet once the network confirms the transaction.
13. In Remix, open the **Deployed Contracts** dropdown.
14. In the `mint` method, set:
    * `to` to your wallet address.
    * `amount` to `100000000000000000000` (1 `FIL`).
15. Click **Transact**.
16. In MetaMask, confirm the transaction.

Once the network processes the transaction, the token is minted and sent to your network address. Congratulations, you’ve completed the tutorial!

### Additional resources

Learn more about OpenZeppelin with the following resources:

* [OpenZeppelin Contracts website](https://www.openzeppelin.com/contracts)
* [Documentation](https://docs.openzeppelin.com/contracts/4.x/)
* [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)

## DappSys

The DappSys library provides safe, simple, and flexible Ethereum contract building blocks for common Ethereum and Solidity use cases.

* [Documentation](https://dappsys.readthedocs.io/en/latest/)
* [GitHub](https://github.com/dapphub/dappsys)

## 0x protocol

The 0x protocol library provides a set of secure smart contracts that facilitate peer-to-peer exchange of Ethereum-based assets.

* [Documentation](https://docs.0x.org/introduction/introduction-to-0x)
* [GitHub](https://github.com/0xProject)
