---
description: >-
  Fund Filecoin Cloud storage by depositing USDFC into Filecoin Pay and
  approving the Warm Storage service once; you also need a little FIL for gas.
---

# Fund storage

**Before you store data, fund your account once: deposit USDFC into Filecoin Pay and approve the Warm Storage service to spend it.** Your uploads then draw from that deposit. You also need a little FIL to pay transaction fees.

## Before you start

You need:

* A wallet. Use one you already have, such as MetaMask, or sign in to the Filecoin console with Privy to start without one.
* **FIL** for transaction fees (gas).
* **USDFC** to pay for storage. USDFC is a stablecoin worth about one US dollar.

| Token | Calibration testnet | Mainnet |
| --- | --- | --- |
| FIL | [Calibration faucet](https://faucet.calibnet.chainsafe-fil.io/funds.html) | Buy on an exchange, or bridge from another chain with [Squid Router](https://app.squidrouter.com) |
| USDFC | [tUSDFC faucet](https://forest-explorer.chainsafe.dev/faucet/calibnet_usdfc) | Swap with [Squid Router](https://app.squidrouter.com), or mint it with FIL as collateral on [usdfc.net](https://app.usdfc.net) |

Start on the Calibration testnet. Test tokens are free, and the CLI and SDK use Calibration unless you choose mainnet.

## How much to deposit

Your deposit isn't a fixed amount: it depends on how much you store. Part of it, called the lockup, is held back to guarantee providers get paid. The lockup always equals 30 days of storage for the data you have stored right now. When you store more, your monthly cost goes up, so the lockup grows and you deposit a little more. Anything above the lockup is your available balance. It decides how long your storage keeps running before you need to top up.

You don't have to work this out by hand. The CLI and SDK tell you how much to deposit for the data you plan to store. For the rates, see [Pricing](../overview/pricing.md).

## Fund your account

### Agent

Your agent never holds your wallet key, so you approve and pay yourself:

1. Ask your agent to check your Filecoin account. It runs `filecoin status`.
2. If the account needs funds, the agent gives you a funding link to the Filecoin dashboard, with the amount filled in.
3. Open the link, connect your wallet, then approve the deposit and the Warm Storage service.

### CLI

1. Check your account:

   ```sh
   filecoin status
   ```
2. If it needs funds, `filecoin status` prints a funding link. Open it, connect your wallet, and approve the deposit and the Warm Storage service.
3. Run `filecoin status` again to confirm.

### SDK

`prepare()` works out the deposit for the data you plan to store and returns one transaction that deposits and approves together:

```ts
import { Synapse } from "@filoz/synapse-sdk"
import { privateKeyToAccount } from "viem/accounts"

const synapse = Synapse.create({
  account: privateKeyToAccount(process.env.PRIVATE_KEY),
  source: "my-app",
})

const prep = await synapse.storage.prepare({
  pieceSizes: [1073741824n], // one 1 GiB file
})
console.log("Deposit needed:", prep.costs.depositNeeded)

if (prep.transaction) {
  const { hash } = await prep.transaction.execute()
  console.log("Funded and approved:", hash)
}
```

Keep your private key in an environment variable, never in your code.

## Check that it worked

* **Agent and CLI:** `filecoin status` shows your USDFC funds and that Warm Storage is approved.
* **SDK:** `synapse.payments.accountSummary()` returns your balance, your lockup, and how long your balance will last.

## Withdraw unused funds

You can withdraw funds that aren't locked. Locked funds stay in your account while you store data.

* **Dashboard:** connect your wallet and withdraw your available funds.
* **SDK:**

  ```ts
  const info = await synapse.payments.accountInfo()
  await synapse.payments.withdraw({ amount: info.availableFunds })
  ```

## Next steps

* [Upload data](upload-data.md).
* [Monitor balance and proofs](monitor-balance-and-proofs.md) so your storage doesn't run out.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data/warm-storage/fund-storage)
