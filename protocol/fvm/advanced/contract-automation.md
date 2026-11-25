---
description: >-
  Trigger smart contracts on a schedule or onchain event with Gelato Web3
  Functions on Filecoin, using TypeScript or Solidity functions.
---

# Contract automation

**A smart contract can't run on its own. It only runs when someone sends it a transaction. An automation service watches for a condition, such as a time or an event, and sends the transaction for you.**

It describes a third-party service, Gelato. Check the Gelato documentation for the networks it currently supports.

Automation also lets a contract act on offchain data. The contract stays deterministic (every node computes the same result), and the service reads the outside data and passes the result on.

## Gelato Web3 Functions

[Gelato](https://gelato.network/) Web3 Functions let you set up, run and monitor automated contract tasks. A task has a trigger that says when to run, and a function that says what to run.

### Triggers

* **Time interval.** Run every fixed period, such as every 10 minutes or every 24 hours.
* **Cron expression.** Run at specific times, such as every Tuesday at 15:00 or on the first of each month.
* **Onchain event.** Run whenever a given event is emitted.
* **Every block.** Run once for each new block.

### What to run

* **TypeScript functions.** Cloud functions, like AWS Lambda, that can send transactions based on any offchain data or computation, such as an API or a subgraph. You write them in TypeScript. They are stored on IPFS and run by Gelato. Use one when the task needs offchain data.
* **Solidity functions.** Onchain "if this condition, then call that function" rules. Use one when everything the task needs can be checked onchain.
* **Automated transactions.** Gelato calls a function on your contract with fixed arguments that you define in advance.

For security, each task gets a `dedicatedMsgSender`, a proxy contract deployed by Gelato. Every execution for your contract comes from this address, so your contract can check where a call came from.

## Write and deploy a TypeScript function

1. Clone Gelato's template:

   ```shell
   git clone https://github.com/gelatodigital/web3-functions-template.git
   ```

2. Install the dependencies:

   ```shell
   cd web3-functions-template && yarn install
   ```

3. Edit the `index.ts` of one of the examples. This skeleton checks whether an oracle needs an update and returns the call data. Replace the ABI, the arguments and the data lookup with your own logic:

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

4. Test the function, then deploy it to IPFS. Deploying prints a CID:

   ```shell
   npx w3f test web3-functions/YOUR-FUNCTION/index.ts --logs
   npx w3f deploy web3-functions/YOUR-FUNCTION/index.ts
   ```

5. In the [Gelato app](https://app.gelato.cloud), create a task, choose a trigger and enter the CID.

More: the [Gelato TypeScript functions guide](https://docs.gelato.cloud/web3-functions/how-to-guides/write-typescript-functions/getting-started), the [template](https://github.com/gelatodigital/web3-functions-template) and the [trigger examples](https://github.com/gelatodigital/how-tos-3-w3f-triggers).

## Related pages

* [Relay](relay.md): let users transact without holding FIL.
* [FVM advanced](README.md): tools and services for FVM developers.
* [Gas](../gas.md): how gas is charged and estimated.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/fvm/advanced/contract-automation)
