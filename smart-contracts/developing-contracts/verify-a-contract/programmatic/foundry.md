---
description: >-
  Learn how to verify smart contracts on the Filecoin network using Foundry
  with various verification services including Blockscout, Sourcify, and Filfox.
---

# Contract Verification with Foundry

This guide shows you how to verify your smart contracts using Foundry on the Filecoin network.

## Prerequisites

- A Foundry project set up for Filecoin development
- If you don't have a Foundry project, check out the [FEVM Foundry Kit](/smart-contracts/developing-contracts/foundry.md)
- A deployed contract address
- Contract constructor arguments (if any)

## Verification Methods

### Blockscout Verification

Blockscout is a popular blockchain explorer that supports contract verification.

**Verify on Calibration Testnet:**

```bash
forge verify-contract \
  --verifier blockscout \
  --verifier-url 'https://filecoin-testnet.blockscout.com/api/' \
  --force \
  --skip-is-verified-check \
  0xYourContractAddress \
  src/MyContract.sol:MyContract
```

**Verify on Filecoin Mainnet:**

```bash
forge verify-contract \
  --verifier blockscout \
  --verifier-url 'https://filecoin.blockscout.com/api/' \
  --force \
  --skip-is-verified-check \
  0xYourContractAddress \
  src/MyContract.sol:MyContract
```

### Sourcify Verification

Sourceify provides decentralized contract verification.

**Verify on Filecoin Mainnet:**

```bash
forge verify-contract 0xYourContractAddress \
  src/MyToken.sol:MyToken \
  --chain-id 314 \
  --verifier sourcify \
  --verifier-url https://sourcify.dev/server/ \
  --guess-constructor-args
```

**Verify on Calibration Testnet:**

```bash
forge verify-contract 0xYourContractAddress \
  src/MyToken.sol:MyToken \
  --chain-id 314159 \
  --verifier sourcify \
  --verifier-url https://sourcify.dev/server/ \
  --guess-constructor-args
```

For more information, see the [Sourcify documentation](https://docs.sourcify.dev/docs/how-to-verify/).

### Filfox Verification

Filfox is the native Filecoin explorer with dedicated verification support.

**Installation:**

```bash
npm install -g @fil-b/filfox-verifier
```

**Usage:**

```bash
filfox-verifier forge <address> <contract-path> --chain <chainId>
```

**Examples:**

```bash
# Verify on Filecoin Mainnet
filfox-verifier forge 0xYourContractAddress src/MyContract.sol:MyContract --chain 314

# Verify on Calibration Testnet
filfox-verifier forge 0xYourContractAddress src/MyContract.sol:MyContract --chain 314159
```

For detailed information, see the [@fil-b/filfox-verifier documentation](https://www.npmjs.com/package/@fil-b/filfox-verifier).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/smart-contracts/developing-contracts/verify-a-contract/programmatic/foundry)
