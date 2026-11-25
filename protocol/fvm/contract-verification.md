---
description: >-
  Verify a smart contract on Filecoin with Hardhat, Foundry, Blockscout or
  Filfox so anyone can read and trust your source code.
---

# Contract verification

**Verifying a contract publishes its source code on a block explorer, so users can read it and confirm that it matches what is deployed. You can verify with Hardhat, with Foundry, or through an explorer's web form.**

## Before you start

Whichever method you use, you need:

* The address of a contract deployed on Mainnet (chain ID `314`) or Calibration (chain ID `314159`).
* The same source files, Solidity version, optimizer settings, EVM version and `viaIR` setting that you used to deploy. If any differ, verification fails.
* The constructor arguments, if the contract had any.
* A Filecoin RPC URL for the network. See [Mainnet](../networks/mainnet.md#rpc-endpoints) and [Calibration](../networks/calibration.md#public-rpc-endpoints).

| Method | Verifies on | Best for |
| --- | --- | --- |
| [Hardhat](#hardhat) | Blockscout, Sourcify, Filfox | Hardhat projects |
| [Foundry](#foundry) | Blockscout, Sourcify, Filfox | Foundry projects |
| [Web form](#web-forms) | Blockscout or Filfox | A single, flattened file, with no project setup |

## Hardhat

You need a Hardhat project set up for Filecoin, with the `@nomicfoundation/hardhat-verify` plugin.

### Blockscout

Add the Filecoin networks and the Blockscout verifier to `hardhat.config.ts`:

```typescript
import "@nomicfoundation/hardhat-verify";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.23",
    settings: { optimizer: { enabled: true, runs: 1000 } },
  },
  networks: {
    filecoin: {
      url: process.env.FILECOIN_RPC_URL ?? "https://api.node.glif.io/rpc/v1",
      chainId: 314,
    },
    calibration: {
      url: process.env.CALIBRATION_RPC_URL ?? "https://api.calibration.node.glif.io/rpc/v1",
      chainId: 314159,
    },
  },
  etherscan: {
    apiKey: { filecoin: "empty", calibration: "empty" },
    customChains: [
      {
        network: "filecoin",
        chainId: 314,
        urls: {
          apiURL: "https://filecoin.blockscout.com/api",
          browserURL: "https://filecoin.blockscout.com",
        },
      },
      {
        network: "calibration",
        chainId: 314159,
        urls: {
          apiURL: "https://filecoin-testnet.blockscout.com/api",
          browserURL: "https://filecoin-testnet.blockscout.com",
        },
      },
    ],
  },
};

export default config;
```

Compile with the settings you deployed with, then verify. Put the constructor arguments after the address, and leave them out if there were none:

```shell
npx hardhat compile
npx hardhat verify --network calibration 0xYourContractAddress "constructor arg 1"
```

Use `--network filecoin` for Mainnet. If Hardhat can't tell which local contract matches the deployed bytecode, name it with `--contract contracts/MyContract.sol:MyContract`.

### Sourcify

[Sourcify](https://docs.sourcify.dev/docs/how-to-verify/) is a decentralized verification service. With the Blockscout configuration above, add:

```typescript
sourcify: {
  enabled: true,
  apiUrl: "https://sourcify.dev/server",
  browserUrl: "https://repo.sourcify.dev",
},
```

`npx hardhat verify` then verifies on both Sourcify and Blockscout.

### Filfox

Install the verifier and import its plugin:

```shell
npm install --save-dev @fil-b/filfox-verifier
```

```typescript
// hardhat.config.ts
import "@fil-b/filfox-verifier/hardhat";
```

Then run its task:

```shell
npx hardhat verifyfilfox --address 0xYourContractAddress --network calibration
```

It needs Node.js 20 or later and a compiled project. See the [`@fil-b/filfox-verifier` documentation](https://www.npmjs.com/package/@fil-b/filfox-verifier).

## Foundry

You need Foundry installed, and a Foundry project with the same `foundry.toml` settings that you deployed with. Set your RPC URLs:

```shell
export FILECOIN_RPC_URL=https://api.node.glif.io/rpc/v1
export CALIBRATION_RPC_URL=https://api.calibration.node.glif.io/rpc/v1
```

### Blockscout

```shell
forge verify-contract \
  --rpc-url "$CALIBRATION_RPC_URL" \
  --chain 314159 \
  --verifier blockscout \
  --verifier-url "https://filecoin-testnet.blockscout.com/api/" \
  0xYourContractAddress \
  src/MyContract.sol:MyContract
```

For Mainnet, use `--chain 314` and `--verifier-url "https://filecoin.blockscout.com/api/"`.

For a constructor, pass its ABI-encoded arguments. The signature and values must match the deployment:

```shell
CONSTRUCTOR_ARGS=$(cast abi-encode "constructor(string,string)" "MyToken" "MYT")
forge verify-contract ... --constructor-args "$CONSTRUCTOR_ARGS" 0xYourContractAddress src/MyToken.sol:MyToken
```

If Blockscout says the contract is already verified while you retry the same address, add `--force --skip-is-verified-check`.

### Sourcify

```shell
forge verify-contract \
  --rpc-url "$CALIBRATION_RPC_URL" \
  --chain 314159 \
  --verifier sourcify \
  --verifier-url https://sourcify.dev/server/ \
  --guess-constructor-args \
  0xYourContractAddress \
  src/MyToken.sol:MyToken
```

### Filfox

```shell
npm install --save-dev @fil-b/filfox-verifier
npx filfox-verifier forge 0xYourContractAddress src/MyContract.sol:MyContract --chain 314159
```

It needs Node.js 20 or later and a project with `foundry.toml`. It runs `forge build` for you. Use `--chain 314` for Mainnet.

## Web forms

Both explorers accept a single flattened file.

1. **Flatten your contract.** In Remix, right-click the contract under **contracts**, select **Flatten**, check that the license and Solidity version match, save, then download `<contract-name>_flattened.sol`.
2. **Gather the details:** the address, license, compiler version, optimizer setting and runs, EVM version, `viaIR` if you changed it, and the ABI-encoded constructor arguments.
3. **Open the verification page** for your network:

   | Explorer | Mainnet | Calibration |
   | --- | --- | --- |
   | Blockscout | [filecoin.blockscout.com/contract-verification](https://filecoin.blockscout.com/contract-verification) | [filecoin-testnet.blockscout.com/contract-verification](https://filecoin-testnet.blockscout.com/contract-verification) |
   | Filfox | [filfox.info/en/contract](https://filfox.info/en/contract) | [calibration.filfox.info/en/contract](https://calibration.filfox.info/en/contract) |
4. **Fill in the form.** Enter the address, license and compiler version, and match any prompted compiler and constructor settings to your deployment.
   * On Blockscout, choose **Solidity (Single file)**, paste the flattened source, match **Optimization enabled** and the runs, and click **Verify & Publish**.
   * On Filfox, click **Continue**, then **Select .sol files**, choose the flattened file, and click **Verify and Publish**.
5. **Check the result.** On Blockscout you land on the verified contract page. On Filfox, search for the contract's address, open the **Contract** tab, and look for the **Contract Source Code Verified** banner. Your source code and ABI are then public.

## Next steps

* [Filfox verified contracts](https://filfox.info/en/fevm/verified-contracts): browse examples.
* [ERC-20 quickstart](erc-20-quickstart.md): deploy a contract to verify.
* [Filecoin EVM runtime](filecoin-evm-runtime.md): what Ethereum compatibility covers on Filecoin.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/fvm/contract-verification)
