---
description: >-
  Bill your customers onchain with Filecoin Pay: they deposit and approve your service, your contract opens a payment rail, and you can take a commission.
---

# Charge your customers with Filecoin Pay

**Use Filecoin Pay to bill your customers onchain.** Your service contract becomes an **operator**: customers deposit funds and approve it, and it opens a payment **rail** from each customer to whoever delivers the service. You can take a commission on each rail.

**Using an AI agent?** Copy this prompt into it:

{% code overflow="wrap" %}
```text
Help me add Filecoin Pay billing to my service contract by following this page:
https://docs.filecoin.io/guides/charge-your-customers-with-filecoin-pay.md

1. Use the Calibration testnet until I tell you to use mainnet.
2. Don't deploy contracts or send transactions on mainnet without asking me first.
3. Run the steps in order, and check each one worked before you go on.
4. If a step fails, stop and tell me which step and what happened.
```
{% endcode %}

{% hint style="info" %}
**Requirements**

* A Solidity service contract you write and deploy
* A development setup that can deploy to Filecoin, such as Foundry or Hardhat
* Test tokens on the Calibration testnet. See [Networks and tokens](#networks-and-tokens)
{% endhint %}

## Networks and tokens

Build and test on the Calibration testnet, then deploy to mainnet. Calibration is for testing only. Don't keep anything there that you need.

| Network | FIL, for transaction fees | USDFC, for storage |
| --- | --- | --- |
| Calibration testnet | Free from the [Calibration faucet](https://faucet.calibnet.chainsafe-fil.io/funds.html) | Free from the [tUSDFC faucet](https://forest-explorer.chainsafe.dev/faucet/calibnet_usdfc) |
| Mainnet | Buy on an exchange, or bridge with [Squid Router](https://app.squidrouter.com) | Swap with [Squid Router](https://app.squidrouter.com), or mint on [usdfc.net](https://app.usdfc.net) |

## How the money moves

1. The customer deposits tokens into their Filecoin Pay account.
2. The customer approves your contract as an operator, with spending limits.
3. Your contract creates a rail from the customer to the payee.
4. Your contract sets the rail's rate. Payments stream every epoch.
5. Anyone on the rail can settle it to release what's due.

The code below is Solidity, from the [Filecoin Pay integration guide](https://github.com/FilOzone/filecoin-pay/blob/main/docs/integration.md).

## Step 1: The customer deposits

```solidity
IERC20(token).approve(paymentsAddress, amount);
payments.deposit(token, customer, amount);
```

For tokens that support EIP-2612, `depositWithPermit` does it in one transaction.

## Step 2: The customer approves your contract

```solidity
payments.setOperatorApproval(
  token,
  yourServiceContract,
  true,
  rateAllowance,    // max tokens per epoch across all your rails
  lockupAllowance,  // max fixed amount you can lock
  maxLockupPeriod   // max epochs you can lock funds for
);
```

`depositWithPermitAndApproveOperator` combines Steps 1 and 2.

## Step 3: Open a rail and take a commission

```solidity
uint256 railId = payments.createRail(
  token,
  customer,            // payer
  payee,               // who delivers the service
  validator,           // optional; address(0) for none
  commissionRateBps,   // your cut, in basis points
  serviceFeeRecipient  // where your cut goes
);
payments.modifyRailLockup(railId, lockupPeriod, fixedLockup);
```

## Step 4: Start charging

```solidity
payments.modifyRailPayment(railId, ratePerEpoch, oneTimePayment);
```

The customer's lockup grows to cover `ratePerEpoch × lockupPeriod`, plus any fixed lockup.

## Step 5: Settle and end

* The payer, payee, or operator can settle a rail to release due payments.
* To stop, terminate the rail. The payee can still be paid from the lockup until the rail's end epoch.

## Check it worked

Look up the customer's wallet in [Filecoin Pay Explorer](https://pay.filecoin.cloud) to see the rail, its rate, and each settlement.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| A rail call reverts | Check the customer approved your contract, and that the rate and lockup are within the allowances from Step 2 |
| The customer's account runs short | The customer deposits more. Payments stop when the lockup runs out |

For every function and emergency case, see the [Filecoin Pay integration guide](https://github.com/FilOzone/filecoin-pay/blob/main/docs/integration.md).

## Next steps

* [Filecoin Pay](../store-data/tools/filecoin-pay.md)
* [Build a storage service](build-a-storage-service.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/guides/charge-your-customers-with-filecoin-pay)
