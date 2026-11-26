---
description: >-
  Every command and option of the filecoin-pin command-line tool.
---

# Filecoin Pin CLI

**`filecoin-pin` uploads files to Filecoin Cloud and gives you IPFS links.** It uses Mainnet by default. For a walkthrough, see [Filecoin Pin](../store-data/tools/filecoin-pin.md) in Store Data.

## Install

```sh
npm install -g filecoin-pin
filecoin-pin --help
```

## Commands

| Group | Command | What it does |
| --- | --- | --- |
| Account | `login` | Approves a session key for this machine in the Filecoin Cloud Console |
| Account | `logout` | Deletes the saved session key from this machine |
| Account | `balance` | Shows wallet and Filecoin Pay balances, storage and runway |
| Account | `dashboard` | Opens the Console billing page |
| Upload | `add <path>` | Uploads a file or folder |
| Upload | `import <file>` | Uploads a CAR file you already have |
| Upload | `get [cid] [output-dir]` | Downloads an upload by its root CID, checks it, and decrypts it if needed |
| Upload | `get-share-link <cid>` | Creates a Share link for an encrypted upload |
| Upload | `decrypt <file> <output-dir>` | Decrypts an upload made with `add --encrypt` |
| Payments | `payments setup` | Sets up payment approvals. Needed before your first upload |
| Payments | `payments fund` | Sets your deposit to an exact runway (`--days`) or amount (`--amount`) |
| Payments | `payments deposit` | Adds USDFC to Filecoin Pay |
| Payments | `payments withdraw` | Moves funds from Filecoin Pay to your wallet |
| Payments | `payments status` | Shows your payment setup |
| Data sets | `data-set ls` | Lists your data sets |
| Data sets | `data-set show <id>` | Shows one data set |
| Data sets | `data-set piece-status <id> [pieceCid]` | Shows the status of a data set's pieces |
| Data sets | `data-set terminate <id>` | Ends a data set and its payments |
| Data sets | `remove` (`rm`) | Removes pieces from a data set |
| Providers | `provider ls`, `show <id>`, `ping [id]` | Lists, shows or pings providers |
| Advanced | `session create`, `authorize`, `revoke`, `generate` | Manages session keys with the wallet private key, without a browser |
| Advanced | `server` | Runs a local IPFS Pinning Service API server |

## Sign-in options

`filecoin-pin` looks for credentials in this order: flags, then environment variables, then `--credentials-file`, then the key saved by `login`.

| Option | Environment variable | What it does |
| --- | --- | --- |
| `--private-key` | `PRIVATE_KEY` | Signs with the wallet's private key |
| `--wallet-address`, `--session-key` | `WALLET_ADDRESS`, `SESSION_KEY` | Signs with a session key for that wallet |
| `--credentials-file <path>` | | Loads credentials from a file, such as one downloaded from the Console |
| `--view-address <address>` | `VIEW_ADDRESS` | Read-only mode |
| `--network <name>` | | `mainnet` (default), `calibration` or `devnet` |
| `--rpc-url <url>` | `RPC_URL` | RPC endpoint |

## Options for `add` and `import`

| Option | What it does |
| --- | --- |
| `--copies <n>` | Number of copies. Default: 2 |
| `--provider-id <id>` | Stores with this provider. Repeat for more |
| `--data-set-id <id>` | Adds to this data set. Repeat for more |
| `--dry-run` | Shows the cost and the deposit needed, and uploads nothing |
| `--auto-fund` | Deposits USDFC first to keep 30 days of runway |
| `--min-runway-days <n>` | Runway to keep with `--auto-fund` |
| `--max-balance <usdfc>` | Highest Filecoin Pay balance after a deposit, with `--auto-fund` |
| `--egress-provider <beam\|none>` | `beam` serves downloads through the FilBeam CDN. Default: `none` |
| `--metadata <key=value>` | Adds piece metadata. Repeatable |
| `--data-set-metadata <key=value>` | Adds data set metadata. Repeatable |
| `--no-ipfs` | Skips IPFS indexing |
| `--skip-ipni-verification` | Doesn't wait to check the IPNI announcement |
| `--erc8004-type`, `--erc8004-agent` | Tags the upload as an ERC-8004 agent file |

`add` only:

| Option | What it does |
| --- | --- |
| `--include-hidden` | Includes dotfiles |
| `--encrypt` | Encrypts before upload. The owner wallet, a session key with the group key Grant, or anyone with a Share link and Access key can read it. Same size limit as any upload: 63.5 GiB |
| `--get-share-link` | With `--encrypt`: prints a Share link |
| `--get-share-link-restricted` | With `--encrypt`: prints a Share link and its Access key separately |

## Options for other commands

| Command | Option | What it does |
| --- | --- | --- |
| `login` | `--scopes <ids>` | Permissions to request. Default: `createDataSet,addPieces`. Add `encrypt` to get a group key Grant for encrypted uploads |
| `login` | `--grant <grant>` | Imports the group key Grant the Console showed |
| `login` | `--fresh` | Creates a new session key |
| `login` | `--no-browser`, `--no-wait`, `--timeout` | Prints the link instead of opening it, exits instead of waiting, or sets the wait (default 300 seconds) |
| `get` | `--share <link>`, `--access-key <key>` | Downloads and decrypts from a Share link |
| `get-share-link` | `--restricted` | Keeps the Access key out of the link |
| `payments fund` | `--days`, `--amount`, `--mode` | Target runway, target amount, and mode (`exact` by default) |
| `remove` | `--piece <cid>`, `--all`, `--force`, `--wait` | Piece to remove, remove all, skip the prompt, wait for confirmation |

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Success |
| `1` | Error |
| `2` | Not finished: a confirmation was declined or a wait timed out |

## Next steps

* [Filecoin Pin](../store-data/tools/filecoin-pin.md): a walkthrough of uploading with Filecoin Pin.
* [Filecoin CLI](filecoin-cli.md): the command-line tool for Filecoin Cloud storage.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/reference/filecoin-pin-cli)
