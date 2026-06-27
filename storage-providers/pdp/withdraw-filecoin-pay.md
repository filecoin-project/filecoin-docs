---
description: >-
  Withdraw available USDFC from Filecoin Pay using filpay-cli or Foundry.
---

# Withdraw funds from Filecoin Pay

Storage providers paid through Filecoin Pay can withdraw the available, unlocked USDFC balance from their Filecoin Pay account. Funds that are reserved for active payment rails remain locked until settlement changes the account state.

{% hint style="warning" %}
Only withdraw funds you have confirmed are available. Keep enough FIL in the signing wallet for gas, verify contract addresses before signing, and test operational changes with small amounts first.
{% endhint %}

## Mainnet contracts

| Contract | Address |
| --- | --- |
| Filecoin Pay | `0x23b1e018F08BB982348b15a86ee926eEBf7F4DAa` |
| USDFC token | `0x80B98d3aa09ffff255c3ba4A241111Ff1262F045` |

## Use filpay-cli

`filpay-cli` is the preferred path for PDP operators because it handles common Filecoin Pay operations directly and avoids manual ABI calls.

### Prerequisites

* Node.js 18 or later.
* A wallet private key for the Filecoin Pay account owner.
* FIL in the signing wallet for gas.
* `filpay-cli` installed.

```sh
npm install -g filpay-cli
```

You can also run commands with `npx filpay-cli` if you do not want a global install.

### Check your balance

Replace `<YOUR_WALLET_ADDRESS>` with the wallet that owns the Filecoin Pay account.

```sh
filpay balance --account <YOUR_WALLET_ADDRESS>
```

For wallet and account detail, add `--detailed`.

```sh
filpay balance --account <YOUR_WALLET_ADDRESS> --detailed
```

The command reports:

| Field | Meaning |
| --- | --- |
| Current funds | Total USDFC in the Filecoin Pay account. |
| Available | Withdrawable USDFC after lockups are considered. |
| Lockup rate | Amount reserved by active payment rails. |
| Wallet balance | USDFC held directly in the wallet when using `--detailed`. |

Only the available amount can be withdrawn.

### Withdraw to your wallet

Store the private key in an environment variable so it is not copied into shell history with every command.

```sh
export FILPAY_KEY="<YOUR_PRIVATE_KEY>"
filpay withdraw <AMOUNT> --key "$FILPAY_KEY"
```

Examples:

```sh
filpay withdraw 10 --key "$FILPAY_KEY"
filpay withdraw 0.5 --key "$FILPAY_KEY"
```

To withdraw to a different recipient address:

```sh
filpay withdraw 10 --to 0xRecipientAddress --key "$FILPAY_KEY"
```

To use a specific RPC endpoint:

```sh
filpay withdraw 10 --key "$FILPAY_KEY" --rpc https://api.node.glif.io/rpc/v1
```

### Check wallet balance

```sh
filpay wallet-balance --account <YOUR_WALLET_ADDRESS>
filpay wallet-balance --key "$FILPAY_KEY"
```

### Manage rails before withdrawal

If funds are still locked, inspect and settle payment rails before withdrawing.

```sh
filpay rails list --key "$FILPAY_KEY"
filpay rails info <RAIL_ID> --key "$FILPAY_KEY"
filpay settlement-preview 0xPayerAddress --key "$FILPAY_KEY"
filpay settle 0xPayerAddress --key "$FILPAY_KEY"
filpay rails settle-all --key "$FILPAY_KEY" --yes
```

### Deposit funds

To deposit USDFC from your wallet into Filecoin Pay:

```sh
filpay deposit 100 --key "$FILPAY_KEY"
```

### Script output

Use JSON output for scripts and dashboards.

```sh
filpay balance --account <YOUR_ADDRESS> --json
```

## Use Foundry

Foundry can call the Filecoin Pay contract directly with `cast`. Use this path when you need low-level contract calls, hardware-wallet signing, or independent verification.

{% hint style="warning" %}
Prefer `filpay-cli` for routine operations on active PDP nodes. Some `cast send` workflows can hit nonce-management issues when a PDP node is also sending transactions from the same account.
{% endhint %}

### Prerequisites

* Foundry installed.
* A wallet private key or hardware wallet.
* FIL in the signing wallet for gas.
* The Filecoin Pay and USDFC contract addresses above.

### Check available funds

```sh
cast call 0x23b1e018F08BB982348b15a86ee926eEBf7F4DAa \
  "getAccountInfoIfSettled(address,address)(uint256,uint256,uint256,uint256)" \
  0x80B98d3aa09ffff255c3ba4A241111Ff1262F045 \
  <YOUR_WALLET_ADDRESS> \
  --rpc-url https://api.node.glif.io/rpc/v1
```

The return values are:

| Position | Field | Meaning |
| --- | --- | --- |
| 1 | `fundedUntilEpoch` | Epoch until which the account is funded. |
| 2 | `currentFunds` | Total funds in the Filecoin Pay account. |
| 3 | `availableFunds` | Withdrawable amount in wei. |
| 4 | `currentLockupRate` | Funds reserved by active payment rails. |

Only `availableFunds` can be withdrawn. USDFC uses 18 decimals, so divide the value by `10^18` to display whole USDFC.

To print the available amount as USDFC:

```sh
cast call 0x23b1e018F08BB982348b15a86ee926eEBf7F4DAa \
  "getAccountInfoIfSettled(address,address)(uint256,uint256,uint256,uint256)" \
  0x80B98d3aa09ffff255c3ba4A241111Ff1262F045 \
  <YOUR_WALLET_ADDRESS> \
  --rpc-url https://api.node.glif.io/rpc/v1 | \
  awk 'NR==3 {printf "Available: %.6f USDFC\n", $1/1e18}'
```

### Withdraw available funds

Replace `<AMOUNT_IN_WEI>` with the `availableFunds` value or a smaller amount.

```sh
cast send 0x23b1e018F08BB982348b15a86ee926eEBf7F4DAa \
  "withdraw(address,uint256)" \
  0x80B98d3aa09ffff255c3ba4A241111Ff1262F045 \
  <AMOUNT_IN_WEI> \
  --rpc-url https://api.node.glif.io/rpc/v1 \
  --private-key "$PRIVATE_KEY"
```

Examples:

```sh
# 10 USDFC
cast send 0x23b1e018F08BB982348b15a86ee926eEBf7F4DAa \
  "withdraw(address,uint256)" \
  0x80B98d3aa09ffff255c3ba4A241111Ff1262F045 \
  10000000000000000000 \
  --rpc-url https://api.node.glif.io/rpc/v1 \
  --private-key "$PRIVATE_KEY"

# 100 USDFC
cast send 0x23b1e018F08BB982348b15a86ee926eEBf7F4DAa \
  "withdraw(address,uint256)" \
  0x80B98d3aa09ffff255c3ba4A241111Ff1262F045 \
  100000000000000000000 \
  --rpc-url https://api.node.glif.io/rpc/v1 \
  --private-key "$PRIVATE_KEY"
```

### Use a hardware wallet

Ledger:

```sh
cast send 0x23b1e018F08BB982348b15a86ee926eEBf7F4DAa \
  "withdraw(address,uint256)" \
  0x80B98d3aa09ffff255c3ba4A241111Ff1262F045 \
  <AMOUNT_IN_WEI> \
  --rpc-url https://api.node.glif.io/rpc/v1 \
  --ledger
```

Trezor:

```sh
cast send 0x23b1e018F08BB982348b15a86ee926eEBf7F4DAa \
  "withdraw(address,uint256)" \
  0x80B98d3aa09ffff255c3ba4A241111Ff1262F045 \
  <AMOUNT_IN_WEI> \
  --rpc-url https://api.node.glif.io/rpc/v1 \
  --trezor
```

### USDFC to wei reference

| USDFC | Wei |
| --- | --- |
| 1 | `1000000000000000000` |
| 10 | `10000000000000000000` |
| 100 | `100000000000000000000` |
| 1000 | `1000000000000000000000` |

You can calculate values with:

```sh
cast to-wei 50
```

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| Insufficient funds | Recheck the available balance, not just current funds. |
| Nonce too low | Wait for pending transactions, use a different signing account, or use `filpay-cli`. |
| Transaction reverts | Confirm the wallet has FIL for gas and the amount is not above `availableFunds`. |
| Balance shows zero | Funds may still be locked in active rails or held in the wallet instead of Filecoin Pay. |
| `filpay: not found` | Install with `npm install -g filpay-cli` or use `npx filpay-cli`. |

## Resources

* [filpay-cli on npm](https://www.npmjs.com/package/filpay-cli)
* [filpay-cli repository](https://github.com/FilOzone/filpay-cli)
* [Filecoin Pay repository](https://github.com/FilOzone/filecoin-pay)
* [Filecoin Onchain Cloud docs](https://docs.filecoin.cloud/)
