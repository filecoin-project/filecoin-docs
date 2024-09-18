## What is deterministic deployment?

Deterministic deployment refers to the ability to deploy smart contracts to the same address across different blockchain networks. This consistency can be particularly useful when deploying the same contract on multiple chains to streamline interactions or ensure interoperability. There are two primary methods to achieve deterministic deployment:

- **Building your own factory contract** to deploy your contracts deterministically.
    - The factory usually uses the `CREATE2` opcode to deploy your contracts, precomputing the deployment address and ensuring consistency across all chains.
- **Using supported pre-built tools** to deploy your contracts deterministically.

## **Deploying a factory contract to Filecoin**

Other people may have already deployed the factory contract onto Filecoin, in which case you won't need to redeploy it. You can just use the factory to deploy your contracts. So first check the expected address on a blockchain explorer to see if a factory contract already exists there.

If there isn't one yet then you'll need to deploy the factory contract. The factory contract will then have the same address as on other blockchains (as long as the transaction bytecode stays the same).

### Creating a deterministic deployment factory contract

Contract address get precomputed by the factory contract, before the contract is deployed, typically using the create2 opcode.

#### **`CREATE2`**

`CREATE2` is used to deploy contracts to the same address across different blockchain networks in factory contract implementations. Contract addresses are precomputed using the:

- Address of the factory contract (that calls `CREATE2` opcode) itself;
- Bytecode of the contract;
- Salt (a chosen value).

See this [code snippet](https://solidity-by-example.org/app/create2/) for an example of how to call `CREATE2` from a factory contract. Alternatively, you can base your own on [this popular proxy](https://github.com/Arachnid/deterministic-deployment-proxy).

## **Supported Tools on Filecoin**

There exists popular tools that have already deployed factory contracts on Filecoin. You can use these tools to deploy your contracts deterministically instead of writing your own factory contract.

### **Safe Singleton Factory**
- **Address:** `0x914d7Fec6aaC8cd542e72Bca78B30650d45643d7`
- **How-to:**
    - Import the Safe Singleton Factory information via. the [library](https://github.com/safe-global/safe-singleton-factory). 
    - Use the `getSingletonFactoryInfo` function in hardhat config to get the factory address, deployer address, and signed transaction.

```ts
import { getSingletonFactoryInfo } from '@safe-global/safe-singleton-factory'

...

function deterministicDeployment(network: string): DeterministicDeploymentInfo {
  const info = getSingletonFactoryInfo(parseInt(network))

  ... 
  return {
    factory: info.address,
    deployer: info.signerAddress,
    funding: String(gasLimit * gasPrice),
    signedTx: info.transaction,
  }
}
```

### **CreateX / xdeployer by pcaversaccio**
- **Address:** `0xba5Ed099633D3B313e4D5F7bdc1305d3c28ba5Ed`
- **How-to:**
    - CreateX is meant to be a wrapper around the create opcodes that you can integrate into your own factory contract. Details can be found in the [CreateX Repository](https://github.com/pcaversaccio/createx).
    - [xdeployer](https://github.com/pcaversaccio/xdeployer) is a hardhat plugin that allows you to deploy your smart contracts across multiple EVM chains with the same deterministic address. You can import and configure in your hardhat configuration file like so:

```ts
import "xdeployer";

const config: HardhatUserConfig = {
  networks: {
    mainnet: { ... }
  },
  xdeploy: {
    contract: "YOUR_CONTRACT_NAME_TO_BE_DEPLOYED",
    constructorArgsPath: "PATH_TO_CONSTRUCTOR_ARGS", // optional; default value is `undefined`
    salt: "YOUR_SALT_MESSAGE",
    signer: "SIGNER_PRIVATE_KEY",
    networks: ["LIST_OF_NETWORKS"],
    rpcUrls: ["LIST_OF_RPCURLS"],
    gasLimit: 1_500_000, // optional; default value is `1.5e6`
  },
};
```

or in the case of solidity files:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import { CreateX } from "xdeployer/src/contracts/CreateX.sol";

contract Create2DeployerLocal is CreateX {}
```

### **OpenZeppelin Defender**
- **Address:** N/A
- **How-to:**
    - Follow the tutorial to use OpenZeppelin Defender for deterministic deployments.
    - [How to tutorial](https://blog.openzeppelin.com/evm-deterministic-deployments-made-easy-with-openzeppelin-defender)
