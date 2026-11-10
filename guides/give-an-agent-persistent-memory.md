---
description: >-
  Save an agent's memory files to Filecoin at the end of a session and load them at the start of the next, with the Filecoin Pin CLI.
---

# Give an agent persistent memory

**Keep an agent's memory in a folder, save it to Filecoin when a session ends, and load it back when the next one starts.** The memory then survives restarts, machine changes, and switching agents.

**Using an AI agent?** Copy this prompt into it:

{% code overflow="wrap" %}
```text
Help me give my agent persistent memory on Filecoin by following this page:
https://docs.filecoin.io/guides/give-an-agent-persistent-memory.md

1. Use the Calibration testnet until I tell you to use mainnet.
2. Send me any approval or funding link, then wait for me. Never ask me for a private key or seed phrase.
3. Run the steps in order, and check each one worked before you go on.
4. If a step fails, stop and tell me which step and what happened.
```
{% endcode %}

{% hint style="info" %}
**Requirements**

* Node.js 24 or newer
* A wallet with FIL for transaction fees and USDFC for storage. See [Networks and tokens](#networks-and-tokens)
* An agent that reads an instructions file, such as `AGENTS.md` or `CLAUDE.md`
{% endhint %}

## Networks and tokens

Filecoin Pin uses mainnet by default. To test, add `--network calibration` to `filecoin-pin login`; later commands use the same network. Calibration is for testing only. Don't keep anything there that you need.

| Network | FIL, for transaction fees | USDFC, for storage |
| --- | --- | --- |
| Calibration testnet | Free from the [Calibration faucet](https://faucet.calibnet.chainsafe-fil.io/funds.html) | Free from the [tUSDFC faucet](https://forest-explorer.chainsafe.dev/faucet/calibnet_usdfc) |
| Mainnet | Buy on an exchange, or bridge with [Squid Router](https://app.squidrouter.com) | Swap with [Squid Router](https://app.squidrouter.com), or mint on [usdfc.net](https://app.usdfc.net) |

## Install and log in

```sh
npm install -g filecoin-pin
filecoin-pin login --scopes createDataSet,addPieces,encrypt
```

`login` prints a link. Open it, connect your wallet, and approve the session key. The `encrypt` scope lets the key encrypt uploads. The key can store data but can't move your funds.

## Fund your account

Storage is paid from a USDFC deposit in Filecoin Pay. About 5 USDFC is enough to start.

In the [Filecoin Pay Console](https://pay.filecoin.cloud/console), use **Add Service** to approve Warm Storage and deposit USDFC in one transaction. Check your balance at any time:

```sh
filecoin-pin payments status
```

If an upload costs more than your balance, it stops and shows a link to add funds. See [Fund storage](../store-data/warm-storage/fund-storage.md).

## Step 1: Keep memory in one folder

For example `./memory`, with files such as `notes.md` and `decisions.md`. An encrypted upload holds up to about 1 GiB.

## Step 2: Save at the end of a session

```sh
filecoin-pin add ./memory --encrypt
```

The output includes a **Root CID**. Write it where the next session will find it:

```sh
echo <root-cid> > .memory-cid
```

Every save creates a new Root CID. The old ones stay stored, so you keep a history.

## Step 3: Load at the start of a session

```sh
filecoin-pin get $(cat .memory-cid) ./restored
```

`get` downloads the upload, checks every block against the CID, and decrypts it with your key.

## Step 4: Tell the agent to do it

Add two rules to your agent's instructions file, such as `AGENTS.md` or `CLAUDE.md`:

```markdown
- At the start of a session, run `filecoin-pin get $(cat .memory-cid) ./restored` and read the memory.
- At the end of a session, run `filecoin-pin add ./memory --encrypt` and write the new Root CID to `.memory-cid`.
```

## Good to know

* **Encryption.** `--encrypt` encrypts the folder on your machine before it uploads, so only encrypted bytes leave it. Only your wallet, and session keys you grant, can decrypt it. Without `--encrypt`, anyone with the Root CID can read the memory. See [Security, privacy and data location](../store-data/overview/security-privacy-and-data-location.md).
* **Keep it funded.** Memory stays stored while your balance pays for it. See [Monitor balance and proofs](../store-data/warm-storage/monitor-balance-and-proofs.md).

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Not enough USDFC | The upload stops and shows how to add funds. Deposit, then run the command again. See [Fund storage](../store-data/warm-storage/fund-storage.md) |
| A new link returns 404 | Wait a few minutes, then try again |
| No proofs yet | The first proof can take up to 24 hours |

For other errors, see [Errors and troubleshooting](../store-data/resources/errors-and-troubleshooting.md).

## Next steps

* [Keep verifiable agent records](keep-verifiable-agent-records.md)
* [Filecoin Skill](../agents/filecoin-skill/README.md)
* [Monitor balance and proofs](../store-data/warm-storage/monitor-balance-and-proofs.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/guides/give-an-agent-persistent-memory)
