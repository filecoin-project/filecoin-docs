---
description: >-
  The functions of the Filecoin Pay contract: deposits, operator approvals, payment rails and settlement.
---

# Filecoin Pay contract

**Filecoin Pay holds payers' funds and pays providers through payment rails.** For how payments work, see [Filecoin Pay](../../store-data/tools/filecoin-pay.md) in Store Data.

Source: [FilOzone/filecoin-pay](https://github.com/FilOzone/filecoin-pay). Addresses: [Contract addresses](addresses.md).

## Terms

| Term | Meaning |
| --- | --- |
| Account | A wallet's funds in Filecoin Pay, per token |
| Payment rail | A payment stream from a payer to a payee at a set rate per epoch |
| Operator | A contract the payer approves to manage rails for them, such as FWSS |
| Validator | A contract that can adjust payments when a rail settles |
| Lockup | Funds held back so the provider is still paid for a period after a rail ends |
| Settle | Move earned funds along a rail, from payer to payee |

## Deposit and withdraw

| Function | What it does |
| --- | --- |
| `deposit(token, to, amount)` | Adds funds to an account |
| `depositWithPermit(...)`, `depositWithAuthorization(...)` | Adds funds with a signed token permit, in one transaction |
| `withdraw(token, amount)` | Moves available funds to your wallet |
| `withdrawTo(token, to, amount)` | Moves available funds to another address |

Only funds that aren't locked can be withdrawn.

## Approve an operator

| Function | What it does |
| --- | --- |
| `setOperatorApproval(token, operator, approved, rateAllowance, lockupAllowance, maxLockupPeriod)` | Approves an operator with spending limits |
| `increaseOperatorApproval(token, operator, rateAllowanceIncrease, lockupAllowanceIncrease)` | Raises an operator's limits |
| `depositWithPermitAndApproveOperator(...)` | Deposits and approves an operator in one transaction |

## Payment rails

| Function | Who calls it | What it does |
| --- | --- | --- |
| `createRail(token, from, to, validator, commissionRateBps, serviceFeeRecipient)` | Operator | Opens a rail |
| `modifyRailPayment(railId, newRate, oneTimePayment)` | Operator | Changes the rate or makes a one-time payment |
| `modifyRailLockup(railId, period, lockupFixed)` | Operator | Changes the lockup |
| `terminateRail(railId)` | Operator, or a fully funded payer | Ends a rail |
| `settleRail(railId, untilEpoch)` | Anyone | Pays out what the rail has earned up to an epoch |
| `settleTerminatedRailWithoutValidation(railId)` | Payer | Pays an ended rail in full if its validator fails |

## Read functions

| Function | Returns |
| --- | --- |
| `accounts(token, owner)` | An account's funds and lockup |
| `getAccountInfoIfSettled(token, owner)` | An account's funds as if all rails were settled now |
| `operatorApprovals(token, client, operator)` | An operator's approval and limits |
| `getRail(railId)` | A rail's details |
| `getRailsForPayerAndToken(payer, token, offset, limit)` | A payer's rails |
| `getRailsForPayeeAndToken(payee, token, offset, limit)` | A payee's rails |

## Next steps

* [Filecoin Warm Storage Service contract](fwss.md): the operator that manages rails for each data set.
* [Contract addresses](addresses.md): where Filecoin Pay is deployed.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/reference/contracts/filecoin-pay)
