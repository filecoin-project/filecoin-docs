---
description: >-
  `filecoin` is a command-line tool for people and agents that stores files
  and folders on Filecoin Cloud, returns shareable links, and writes one JSON
  result per command.
---

# Filecoin CLI

**The Filecoin CLI, `filecoin`, stores files and folders on Filecoin Cloud and gives you links to share.** People run it in a terminal, and AI agents run it in a shell. It uses the Calibration testnet unless you choose mainnet.

> **Beta.** The Filecoin CLI is a prototype. Its commands and services may change.

## Install

You need Node.js 24 or newer.

```sh
npm install -g filecoin
```

Or run it without installing: `npx -y filecoin`.

## How it works

* **Your wallet stays with you.** `filecoin login` makes a session key on your machine. You approve it in the Filecoin dashboard from your wallet.
* **The key can't move funds.** It can store and delete data. You fund storage yourself, from your wallet.
* **One copy, one provider.** Each `put` stores one copy with one storage provider.

## What you can do

| Command | What it does | Guide |
| --- | --- | --- |
| `filecoin login` | Make and approve a session key | [Delegate access with session keys](../warm-storage/delegate-access-with-session-keys.md) |
| `filecoin status` | Show your funds, approvals and a funding link | [Fund storage](../warm-storage/fund-storage.md) |
| `filecoin put` | Store a file or folder | [Upload data](../warm-storage/upload-data.md) |
| `filecoin get` | Download and check a file | [Retrieve data](../warm-storage/retrieve-data.md) |
| `filecoin ls`, `filecoin inspect` | List and inspect what you stored | [Manage data sets](../warm-storage/manage-data-sets.md) |
| `filecoin delete` | Delete a file | [Manage data sets](../warm-storage/manage-data-sets.md) |
| `filecoin operations resume` | Finish an interrupted `put` or `delete` | [Upload data](../warm-storage/upload-data.md) |

## Built for agents

* Every command writes one JSON result: `data` on success, or `error` with a stable `code`, plus `next` steps.
* `filecoin --help` lists commands, and `filecoin <command> --help` shows examples.
* `filecoin schema <command>` prints a command's inputs, outputs and error codes as JSON Schema.

See Agents to connect an agent.

## Settings

| Setting | What it does |
| --- | --- |
| `--network` or `FILECOIN_NETWORK` | `mainnet` or `calibration` (default) |
| `FILECOIN_SESSION_KEY`, `FILECOIN_ROOT_ADDRESS` | Use a session key and wallet address instead of `filecoin login`, for CI and cloud agents |
| `FILECOIN_RPC_URL` | Use your own RPC endpoint |

`filecoin doctor` shows which settings are in use and where each one came from.

## Reference

* Filecoin CLI reference: every command and setting.
* [Source on GitHub](https://github.com/filecoin-project/agents).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data/tools/filecoin-cli)
