---
description: >-
  Smart contract automation enables decentralized applications (dapps) to
  interact with both on-chain and off-chain data in an automated and trustless
  manner. Automation tools allow developers to build
---

# Contract automation

In the Filecoin network, smart contracts benefit from a secure, deterministic environment. While this ensures reliability, it also limits direct access to external data sources. However, developers can leverage automation services to seamlessly connect off-chain data with on-chain smart contracts. This unlocks advanced capabilities such as price feeds, data verification, and much more, empowering Filecoin dapps with dynamic, real-world functionality by integrating external data into on-chain logic.

## Available automation services

### [Gelato](https://gelato.network/)

Gelato's Web3 Functions is a powerful automation system designed to streamline and enhance Web3 operations. Web3 Functions serve as a comprehensive tool, enabling developers to effortlessly set up, manage, and automate their smart contract tasks.

#### **How Gelato Web3 functions work?**

Web3 Functions can be triggered by various events and allow developers to write both off-chain logic (TypeScript) and on-chain logic (Solidity). Once deployed, they handle automated smart contract interactions, providing real-time monitoring and flexibility.

**Off-chain Data or Computation?** Sometimes, automation tasks require data that isn't readily available on the blockchain, or they might need computations that are better performed off-chain. In such cases, Typescript Functions should be the choice.

**All Checks On-chain?** If all the conditions necessary for your automation task can be directly verified on the blockchain, you have the option to select between Typescript Functions, Solidity Functions & Automated Transactions

## Triggers

1. Time Interval Use this trigger to execute tasks at regular intervals, e.g., every 10 minutes or once every 24 hours. It's like setting a straightforward, recurring alarm.
2. Cron Expressions This offers a more refined control compared to the Time Interval. With cron expressions, you can set tasks to run at specific moments, such as "every Tuesday at 3 PM" or "on the 1st of every month". It gives you precision in task scheduling.
3. On-Chain Event Ideal for those wanting their tasks to respond dynamically to blockchain activities. Whenever a specified event occurs on the blockchain, this trigger springs your task into action. It's like a vigilant watcher, always ready to act.
4. Every Block This function operates with the rhythm of the blockchain itself, executing your chosen function each time a new block is created.

## What to Execute?

### Typescript Functions

Typescript Functions are decentralized cloud functions that work similarly to AWS Lambda or Google Cloud, just for web3. They enable developers to execute on-chain transactions based on arbitrary off-chain data (APIs / subgraphs, etc) & computation. These functions are written in Typescript, stored on IPFS and run by Gelato.

### Solidity Functions

Solidity Functions are crucial for making on-chain tasks automatic and more efficient. They connect set conditions with specific actions in a smart contract, providing a straightforward method to turn user needs into automated processes. Consider them as a set of "if-then" rules: If certain conditions are met on the blockchain, then a specific function gets executed. This level of automation ensures that the decentralized application can operate with minimal manual intervention, providing a seamless user experience.

### Automated Transaction

Automated Transaction ensures that a specific function on the target smart contract gets reliably triggered. When you pre-define the inputs, it means that every time Gelato initiates the function call, it uses consistent, predetermined arguments.

#### **What is dedicatedMsgSender?**

For security reasons, during task creation, you will see an address that acts as the msg.sender for your task executions. This address is a proxy contract deployed by Gelato. It ensures that every task execution on behalf of your contract uses this dedicated msg.sender address, which is essential for validating the origin of the task.

## Quick Start

### Writing and deploying TypeScript functions

1. Clone Gelato's maintained Web3 Functions template:

```bash
git clone https://github.com/gelatodigital/web3-functions-template.git
```

2. Change into the template directory and install dependencies:

```bash
cd web3-functions-template && yarn install
```

3. Update `index.ts` in one of the examples.

The following TypeScript block is a skeleton only. It shows the shape of a Gelato Web3 Function that checks whether an oracle should be updated, then returns encoded call data. Replace the oracle ABI, input arguments, and off-chain data lookup with your application's logic. For maintained end-to-end examples, use the [Gelato Web3 Functions template](https://github.com/gelatodigital/web3-functions-template) and the [Gelato TypeScript Functions guide](https://docs.gelato.cloud/web3-functions/how-to-guides/write-typescript-functions/getting-started).

```typescript
import { Web3Function, Web3FunctionContext } from "@gelatonetwork/web3-functions-sdk";
import { Contract } from "@ethersproject/contracts";

const ORACLE_ABI = [
  "function lastUpdated() external view returns (uint256)",
  "function updatePrice(uint256)",
];

Web3Function.onRun(async (context: Web3FunctionContext) => {
  const { userArgs, multiChainProvider } = context;
  const provider = multiChainProvider.default();

  const oracleAddress =
    (userArgs.oracle as string) ?? "0x71B9B0F6C999CBbB0FeF9c92B80D54e4973214da";
  const oracle = new Contract(oracleAddress, ORACLE_ABI, provider);

  const lastUpdated = Number(await oracle.lastUpdated());
  const latestBlock = await provider.getBlock("latest");
  const nextUpdateTime = lastUpdated + 300;

  if (!latestBlock || latestBlock.timestamp < nextUpdateTime) {
    return { canExec: false, message: "Time not elapsed" };
  }

  const price = Number(userArgs.price ?? 0);
  if (!Number.isFinite(price) || price <= 0) {
    return { canExec: false, message: "No valid price supplied" };
  }

  return {
    canExec: true,
    callData: [
      {
        to: oracleAddress,
        data: oracle.interface.encodeFunctionData("updatePrice", [price]),
      },
    ],
  };
});
```

4. Test and deploy the Web3 Function to IPFS:

```bash
npx w3f test web3-functions/YOUR-FUNCTION/index.ts --logs
npx w3f deploy web3-functions/YOUR-FUNCTION/index.ts
```

Example output:

```text
✓ Web3Function deployed to IPFS.
✓ CID: <ipfs-cid>
```

Finally, go to the [Gelato App](https://app.gelato.cloud), create a new task, decide on the trigger, and input the CID.

For a detailed guide on creating and deploying Web3 Functions, including setting up your development environment, triggers, and security configurations, see the [Gelato Web3 Functions docs](https://docs.gelato.cloud/web3-functions/how-to-guides/write-typescript-functions/getting-started).

#### **Further Resources**

* [Gelato Web3 Functions Docs](https://docs.gelato.cloud/web3-functions/how-to-guides/write-typescript-functions/getting-started)
* [Gelato Web3 Functions template](https://github.com/gelatodigital/web3-functions-template)
* [Gelato Web3 Functions examples](https://github.com/gelatodigital/how-tos-3-w3f-triggers)
* [YouTube - How to write Event driven Web3 Functions](https://www.youtube.com/watch?v=7UpqGsANsBQ\&ab_channel=JavierDonoso)
