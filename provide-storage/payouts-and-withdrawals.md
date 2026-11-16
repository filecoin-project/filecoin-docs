---
description: >-
  Where your earnings land for each kind of storage, and how to withdraw them.
---

# Payouts and withdrawals

**Warm and archival storage pay you in USDFC through Filecoin Pay. Block rewards for sealed storage pay you in FIL, to your miner.**

## Where your money goes

| You provide | Paid in | Lands in |
| --- | --- | --- |
| Warm storage | USDFC | Filecoin Pay, for the payee address in your provider registration |
| Archival storage | USDFC | Filecoin Pay, for the payee address you set with the PoRep Market CLI |
| Block rewards (sealed storage) | FIL | Your miner's balance |

## Warm storage

Clients' payments build up in Filecoin Pay. Curio **settles** them for you: it moves what you've earned to your payee address. It does this about once per payment period, before the client's locked funds run out. A 0.5% network fee comes off when payments settle.

To move USDFC from Filecoin Pay to your wallet, withdraw it with your payee address's key. With the Filecoin SDK, use [`withdrawSync`](https://docs.filecoin.cloud/reference/filoz/synapse-core/pay/functions/withdrawsync/):

```ts
import { withdrawSync } from '@filoz/synapse-core/pay'
import { mainnet } from '@filoz/synapse-core/chains'
import { createWalletClient, http, parseUnits } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

const client = createWalletClient({
  account: privateKeyToAccount('0x...'), // your payee address's key
  chain: mainnet,
  transport: http(),
})

await withdrawSync(client, { amount: parseUnits('100', 18) }) // 100 USDFC
```

You can only withdraw funds that aren't locked.

## Archival storage

Use the PoRep Market CLI:

```sh
python3 ./porep_tooling_cli.py sp get-filecoinpay-account
python3 ./porep_tooling_cli.py sp withdraw-from-filecoinpay --help
```

The first command shows your balance. The second shows how to withdraw it.

## Block rewards (FIL)

Block rewards go to your miner. 25% is available right away; the other 75% unlocks over about 180 days. Daily sector fees come out of your locked rewards first, then from your available balance.

Check your balance:

```sh
sptool --actor <minerID> info
```

Withdraw available FIL. Only the owner address can do this:

```sh
sptool --actor <minerID> actor withdraw <amount-in-FIL>
```

If you've set a separate beneficiary address, add `--beneficiary` to send it from that address.

**Don't withdraw everything.** Keep enough FIL in the miner for daily fees and proof messages. If fees go unpaid, they become fee debt, and you can't win blocks until you pay it:

```sh
sptool --actor <minerID> actor repay-debt <amount-in-FIL>
```

## Next steps

* [Monitor proofs and faults](monitor-proofs-and-faults.md)
* [How storage providers earn](how-storage-providers-earn.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/provide-storage/payouts-and-withdrawals)
