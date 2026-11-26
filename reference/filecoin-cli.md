---
description: >-
  Every command, option and error code of the filecoin command-line tool.
---

# Filecoin CLI

**`filecoin` stores files and folders on Filecoin Cloud and gives you links to get them back.** It uses the Calibration Testnet unless you choose Mainnet. For a walkthrough, see [Filecoin CLI](../store-data/tools/filecoin-cli.md) in Store Data.

## Install

Needs Node.js 24 or newer.

```sh
npm install --global filecoin
filecoin --help
```

Or run it without installing: `npx -y filecoin`.

## Commands

| Command | What it does |
| --- | --- |
| `filecoin login` | Creates a session key and opens the Filecoin Pay Console so you can approve it |
| `filecoin logout` | Deletes the local session key. It stays approved onchain until it expires or you revoke it in the Console. |
| `filecoin status` | Shows the session, balances, runway and storage, plus a funding link if you need one |
| `filecoin doctor` | Shows the settings in use and checks the local database and the RPC |
| `filecoin put <path>` | Stores a file or folder as two copies |
| `filecoin get <target>` | Downloads a file, folder or piece and checks it |
| `filecoin ls` | Lists your stored pieces, newest first |
| `filecoin inspect <target>` | Shows a stored item and its copies |
| `filecoin delete <target>` | Schedules removal of stored copies |
| `filecoin datasets ls` | Lists your data sets |
| `filecoin datasets inspect <id>` | Shows a data set, its provider and its pieces |
| `filecoin operations ls` | Lists put and delete operations |
| `filecoin operations inspect <id>` | Shows one operation |
| `filecoin operations resume <id>` | Continues an unfinished put or delete |
| `filecoin skills install`, `status`, `uninstall` | Manages the bundled agent skill |
| `filecoin schema [command]` | Prints a command's input and output as JSON Schema |
| `filecoin completion <shell>` | Prints a completion script for bash, zsh or fish |

A **target** is a ref (`res_…`), a PieceCID, a root CID, or the `<dataSetId>/<pieceId>` that `ls` prints.

## Options for most commands

| Option | What it does |
| --- | --- |
| `--network <mainnet\|calibration>` | Network to use. Default: `FILECOIN_NETWORK`, then the config file, then the Calibration Testnet |
| `--root-address <address>` | The wallet that approved `FILECOIN_SESSION_KEY` |
| `--input <file\|->` | Reads the command's input from a JSON object |
| `--json` | Prints one JSON object |

## Options by command

| Command | Option | What it does |
| --- | --- | --- |
| `login` | `--scopes` | Permissions to request: `createDataSet`, `addPieces`, `schedulePieceRemovals`, `terminateService`. Default: the first three |
| `login` | `--name` | Key name the wallet owner sees. Default: `filecoin-cli` |
| `login` | `--days` | Days until the approval expires. Default: 30 |
| `login` | `--wait`, `--timeout` | Waits for approval, up to 600 seconds by default |
| `login` | `--fresh` | Creates a new key and replaces the saved one |
| `login` | `--check` | Only checks the saved key |
| `put` | `--name` | Display name. Default: the file or folder name |
| `put` | `--provider <id>` | Provider for the first copy |
| `put` | `--raw` | Stores the exact bytes of a file, with no IPFS indexing |
| `put`, `delete` | `--dry-run` | Shows what would happen and changes nothing |
| `get` | `--output <path>` | Where to save. `--force` overwrites |
| `ls` | `--limit`, `--cursor` | Page size (default 20) and next page |
| `ls`, `delete` | `--provider <id>` | Only copies on this provider |
| `ls` | `--all` | Includes removed pieces |
| `inspect` | `--check` | Checks that the piece link answers |
| `delete` | `--yes` | Confirms without a prompt |

## Limits

Each upload is 127 bytes to 63.5 GiB. Folders skip dotfiles, and symlinks are rejected.

## Environment variables

| Variable | What it does |
| --- | --- |
| `FILECOIN_NETWORK` | `mainnet` or `calibration` |
| `FILECOIN_SESSION_KEY`, `FILECOIN_ROOT_ADDRESS` | Session key and wallet address, for CI instead of `login` |
| `FILECOIN_CONFIG_DIR` | Folder for settings and local state |
| `FILECOIN_RPC_URL` | RPC endpoint |
| `FILECOIN_CONSOLE_URL` | Filecoin Pay Console address. Default: `https://pay.filecoin.cloud` |
| `FILECOIN_API_URL` | API used for links and data set lists. Default: `https://api.filecoin.io` |
| `FILECOIN_OUTPUT` | `json` or `human` |
| `FILECOIN_AGENT` | Turns agent mode on or off |
| `DO_NOT_TRACK`, `FILECOIN_TELEMETRY` | `DO_NOT_TRACK=1` or `FILECOIN_TELEMETRY=0` removes tracking tags from Console links |

## Output

With `--json`, when an agent runs it, or when output isn't a terminal, `filecoin` prints one JSON object: `data` on success or `error` on failure, then optional `next` steps. Exit code `0` means success and `1` means an error. Progress goes to stderr.

## Error codes

| Code | Meaning |
| --- | --- |
| `auth_required`, `login_pending`, `session_expired`, `permission_denied` | Log in or approve the key |
| `session_conflict` | A new `login --scopes` would replace your key. Keep it with `--check` or replace it with `--fresh` |
| `insufficient_funds` | Add funds or approve Warm Storage at the Console link |
| `not_found` | Nothing has that name |
| `output_exists` | The `get` output path exists. Add `--force` |
| `operation_failed`, `commit_rejected`, `removal_reverted`, `source_changed`, `staging_missing`, `operation_running` | A put or delete stopped. Follow the `next` steps |
| `verification_failed` | Downloaded data doesn't match its CID |
| `unsafe_path` | A download tried to write outside the output folder |
| `rate_limited`, `service_unavailable`, `timeout` | Try again later |

## Next steps

* [Filecoin CLI](../store-data/tools/filecoin-cli.md): a walkthrough of storing and retrieving data.
* [Filecoin Pin CLI](filecoin-pin-cli.md): the command-line tool for IPFS uploads.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/reference/filecoin-cli)
