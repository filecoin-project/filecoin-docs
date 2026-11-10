---
description: >-
  An agent stores data with a session key you approve, never your wallet key.
  Approve the key, fund the account, and revoke the key when you're done.
---

# Agent wallets and funding

**An agent never holds your wallet key: it gets a session key that can store data for you but can't move your funds.** You keep the wallet and pay for storage from your deposit.

## Who does what

| You | Your agent |
| --- | --- |
| Keep the wallet, FIL, and USDFC | Holds a session key |
| Approve and revoke the agent's key | Stores, lists, and deletes files. With the right permission, it can also end a data set |
| Deposit funds | Sends you a link when it needs funds |

[Delegate access with session keys](../store-data/warm-storage/delegate-access-with-session-keys.md) lists what each permission allows.

## Approve the agent's key

1. The agent runs `filecoin login` and sends you an approval link.
2. Open the link, connect your wallet, and approve the key on the Filecoin dashboard.
3. The agent runs `filecoin login --check` to confirm. Once approved, it reports `Logged in on <network> as <your wallet> with <permissions>`.
4. If the account has no funds, the agent sends you a funding link. Open it to deposit USDFC and, the first time, approve the Warm Storage service. Each is its own wallet transaction.

A cloud agent loses its key when its session ends. Give it a key as a secret instead. See [Delegate access with session keys](../store-data/warm-storage/delegate-access-with-session-keys.md).

{% hint style="warning" %}
**Beta.** The Filecoin dashboard is a prototype. Check each transaction in your wallet before you confirm it.
{% endhint %}

## Fund the account

You make the deposit, not the agent. See [Fund storage](../store-data/warm-storage/fund-storage.md). When funds run low, `filecoin status` reports it and uploads fail with `insufficient_funds`. Both give the agent a funding link to send you. See [Monitor balance and proofs](../store-data/warm-storage/monitor-balance-and-proofs.md).

## Stop the agent

Revoke its key on the dashboard's [Session keys page](https://poc.filecoin.cloud/dashboard/session-keys). After that, the agent can't store anything. `filecoin logout` only removes the key from the agent's machine; the key stays approved until it expires or you revoke it.

## Filecoin Pay Console

Agents that use Filecoin Pin, such as the [`publish` skill](filecoin-skill/skills-catalog/publish.md), use the [Filecoin Pay Console](https://pay.filecoin.cloud/console) instead of the Filecoin dashboard. In the console, you:

* Approve the session key that `filecoin-pin login` asks for
* Approve Warm Storage and deposit USDFC in one transaction, with **Add Service**
* See your deposits, payment rails, and the services you've approved
* Revoke session keys on its [Session keys page](https://pay.filecoin.cloud/console/session-keys)

{% hint style="warning" %}
**Beta.** The Filecoin Pay Console works directly with the payment contracts. Check each transaction in your wallet before you confirm it.
{% endhint %}

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/agents/agent-wallets-and-funding)
