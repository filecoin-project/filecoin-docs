---
description: >-
  With Filecoin Virtual Machine (FVM), Solidity developers can use existing
  libraries listed on this page in their FVM smart contracts.
---

# Solidity libraries

## OpenZeppelin

[OpenZeppelin](https://www.openzeppelin.com/contracts) provides a library of battle-tested smart contract templates, including widely used implementations of ERC token standards. For a guided example that implements an ERC20 token on the Filecoin network, see [Example using an ERC20 contract](./erc-20-quickstart.md).

### Benefits

OpenZeppelin offers the following to smart contract developers:

* Implementations of standards like ERC20, ERC721, and ERC1155.
* Flexible access control schemes like `Ownable`, `AccessControl`, and `onlyRole`.
* Useful and secure utilities for signature verification, math, strings, and cryptography.

Token standards, such as [ERC20](https://docs.openzeppelin.com/contracts/5.x/erc20), are the most widely used smart contract libraries from OpenZeppelin. These contracts, listed below, implement both _fungible_ and _non-fungible_ tokens:

* [ERC20](https://docs.openzeppelin.com/contracts/5.x/erc20) is the simplest and most widespread token standard for fungible assets.
* [ERC721](https://docs.openzeppelin.com/contracts/5.x/erc721) is the standard solution for non-fungible tokens and is often used for collectibles and games.
* [ERC1155](https://docs.openzeppelin.com/contracts/5.x/erc1155) is a multi-token standard where a single contract represents multiple fungible and non-fungible tokens, and operations are batched for increased gas efficiency.
* [ERC6909](https://docs.openzeppelin.com/contracts/5.x/erc6909) is a compact multi-token standard for managing several token IDs in one contract.

### Using OpenZeppelin with FVM

The _general_ procedure for using OpenZeppelin with FVM is as follows:

1. Install OpenZeppelin. For example, using `npm`:

```shell
npm install @openzeppelin/contracts
```

2. Import the specific library you want to use.
3. In your smart contract, inherit the library.

Thanks to the FVM, your contract can be integrated and deployed on the Filecoin network with OpenZeppelin inheritance. For a guided example that implements an ERC20 token on the Filecoin network, see [Example using an ERC20 contract](./erc-20-quickstart.md).

### Example using an ERC-20 contract

In the following tutorial, you’ll write and deploy a smart contract that implements the [ERC-20](https://docs.openzeppelin.com/contracts/5.x/erc20) on the Calibration testnet using Remix and MetaMask:

**Prerequisites**

Let’s take an ERC20 contract as an example to write and deploy it on the Calibration testnet using Remix & MetaMask:

* Remix.
* MetaMask.
* [MetaMask connected to the Calibration testnet](../../networks-and-tools/networks/calibration/).
* Test tokens (tFIL) [from the faucet](https://faucet.calibnet.chainsafe-fil.io/funds.html).

**Procedure**

In this procedure, you will create, deploy, mint and send an [ERC20](https://docs.openzeppelin.com/contracts/5.x/erc20) token on Calibration using Remix and MetaMask.

1. Navigate to [remix.ethereum.org](https://remix.ethereum.org/).
2. Next to **Workspaces**, click the **+** icon to create a new workspace.
3. In the **Choose a template** dropdown, select **Blank**.
4. Click **OK**.
5. In the **contracts** directory, create a file named **MyToken.sol**.
6. Paste the following contract:

```solidity
// contracts/MyToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor(address initialOwner) ERC20("Calibration Gold", "CGLD") Ownable(initialOwner) {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

7. Next, compile and deploy the contract on Filecoin.
8. At the top of the workspace, click the green play symbol to compile the contract.
9. Once the contract compiles, open the **Deploy** tab on the left.
10. Under the **Environment** dropdown, select **Injected Provider - MetaMask**.
11. In the MetaMask popup window, select **Confirmed connection**.
12. Set `initialOwner` to your wallet address, click **Deploy**, and confirm the transaction on MetaMask. Your token contract will be deployed to the Calibration testnet once the network confirms the transaction.
13. In Remix, open the **Deployed Contracts** dropdown.
14. In the `mint` method, set:
    * `to` to your wallet address.
    * `amount` to `1000000000000000000` (1 token with 18 decimals).
15. Click **Transact**.
16. In MetaMask, confirm the transaction.

Once the network processes the transaction, the token is minted and sent to your network address. Congratulations, you’ve completed the tutorial!

### Additional resources

Learn more about OpenZeppelin with the following resources:

* [OpenZeppelin Contracts website](https://www.openzeppelin.com/contracts)
* [Documentation](https://docs.openzeppelin.com/contracts/5.x/)
* [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)

## DappSys

The DappSys library provides safe, simple, and flexible Ethereum contract building blocks for common Ethereum and Solidity use cases.

* [Documentation](https://dappsys.readthedocs.io/en/latest/)
* [GitHub](https://github.com/dapphub/dappsys)

## 0x protocol

The 0x protocol library provides a set of secure smart contracts that facilitate peer-to-peer exchange of Ethereum-based assets.

* [Documentation](https://0x.org/docs/introduction/0x-cheat-sheet)
* [GitHub](https://github.com/0xProject)



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/build/developing-contracts/solidity-libraries)
