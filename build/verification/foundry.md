---
description: >-
  Learn how to verify smart contracts on the Filecoin network using Foundry
  with various verification services including Blockscout, Sourcify, and Filfox.
---

# Contract Verification with Foundry

This guide shows you how to verify your smart contracts using Foundry on the Filecoin network.

## Prerequisites

- A Foundry project set up for Filecoin development. If you don't have one, start with the [FEVM Foundry Kit](../development-frameworks/foundry.md).
- Foundry installed with `forge` and `cast` available in your `PATH`.
- A deployed contract address on Filecoin mainnet or Calibration testnet.
- The same source tree, compiler version, optimizer settings, and `foundry.toml` settings that were used for deployment.
- Contract constructor arguments, if the contract was deployed with any.
- A Filecoin RPC URL for the target network. Filecoin mainnet uses chain ID `314`; Calibration testnet uses chain ID `314159`.

## Verification Methods

Set RPC URLs in your shell before running the examples:

```bash
export FILECOIN_RPC_URL=https://api.node.glif.io/rpc/v1
export CALIBRATION_RPC_URL=https://api.calibration.node.glif.io/rpc/v1
```

### Blockscout Verification

Blockscout is a popular blockchain explorer that supports contract verification.

**Verify on Calibration testnet:**

```bash
forge verify-contract \
  --rpc-url "$CALIBRATION_RPC_URL" \
  --chain 314159 \
  --verifier blockscout \
  --verifier-url "https://filecoin-testnet.blockscout.com/api/" \
  0xYourContractAddress \
  src/MyContract.sol:MyContract
```

**Verify on Filecoin mainnet:**

```bash
forge verify-contract \
  --rpc-url "$FILECOIN_RPC_URL" \
  --chain 314 \
  --verifier blockscout \
  --verifier-url "https://filecoin.blockscout.com/api/" \
  0xYourContractAddress \
  src/MyContract.sol:MyContract
```

For constructors, pass ABI-encoded constructor arguments. The constructor signature and values must match the deployment:

```bash
CONSTRUCTOR_ARGS=$(cast abi-encode "constructor(string,string)" "MyToken" "MYT")

forge verify-contract \
  --rpc-url "$CALIBRATION_RPC_URL" \
  --chain 314159 \
  --verifier blockscout \
  --verifier-url "https://filecoin-testnet.blockscout.com/api/" \
  --constructor-args "$CONSTRUCTOR_ARGS" \
  0xYourContractAddress \
  src/MyToken.sol:MyToken
```

If Blockscout reports that the contract is already verified while you are retrying the same address, add `--force --skip-is-verified-check`.

### Sourcify Verification

Sourcify provides decentralized contract verification.

**Verify on Filecoin mainnet:**

```bash
forge verify-contract \
  --rpc-url "$FILECOIN_RPC_URL" \
  --chain 314 \
  --verifier sourcify \
  --verifier-url https://sourcify.dev/server/ \
  --guess-constructor-args \
  0xYourContractAddress \
  src/MyToken.sol:MyToken
```

**Verify on Calibration testnet:**

```bash
forge verify-contract \
  --rpc-url "$CALIBRATION_RPC_URL" \
  --chain 314159 \
  --verifier sourcify \
  --verifier-url https://sourcify.dev/server/ \
  --guess-constructor-args \
  0xYourContractAddress \
  src/MyToken.sol:MyToken
```

For more information, see the [Sourcify documentation](https://docs.sourcify.dev/docs/how-to-verify/).

### Filfox Verification

Filfox is the native Filecoin explorer with dedicated verification support.

**Installation:**

```bash
npm install --save-dev @fil-b/filfox-verifier
```

**Usage:**

```bash
npx filfox-verifier forge <address> <contract-path> --chain <chainId>
```

**Examples:**

```bash
# Verify on Filecoin mainnet
npx filfox-verifier forge 0xYourContractAddress src/MyContract.sol:MyContract --chain 314

# Verify on Calibration testnet
npx filfox-verifier forge 0xYourContractAddress src/MyContract.sol:MyContract --chain 314159
```

The Filfox verifier requires Node.js 20 or later and a Foundry project with `foundry.toml`. It runs `forge build` and extracts the metadata needed for the Filfox verification request.

For detailed information, see the [@fil-b/filfox-verifier documentation](https://www.npmjs.com/package/@fil-b/filfox-verifier).
