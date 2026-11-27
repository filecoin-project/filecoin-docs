---
description: >-
  How the filecoin CLI logs in, stores and retrieves content, resumes
  interrupted operations, and reports results and errors.
---

# CLI

`filecoin` stores a file or a folder as two copies on two storage providers and returns retrieval links. It runs on the Calibration testnet unless you choose mainnet. It needs Node.js 24 or newer. Install the [`filecoin` package from npm](https://www.npmjs.com/package/filecoin):

```sh
npm install -g filecoin
```

Or run it without installing, as `npx -y filecoin`.

The CLI describes its own commands, which always match the installed version:

* `filecoin --help` lists the commands, and `filecoin <command> --help` shows examples and flags.
* `filecoin schema <command>` prints the command's input and output as JSON Schema, and what each error code means. `filecoin schema --list` lists every command with its side effects.

## Log in

```sh
filecoin login
```

`filecoin login` makes a session key and saves it on your machine. It then opens the [Filecoin Pay console](https://pay.filecoin.cloud/console)'s setup page with the key's address. The wallet owner reviews the request there and approves it with their wallet. The CLI finds the approval on chain, so there is nothing to copy back.

By default, `filecoin login` asks for the `createDataSet`, `addPieces`, and `schedulePieceRemovals` permissions for 30 days, under the name `filecoin-cli`. Repeat `--scopes` to ask for others. `--name` sets the name the owner sees, which is recorded on chain, and `--days` sets the expiry. The owner can change all three on the page before they approve the key.

The session key signs each request, the provider submits the transactions, and the wallet pays for storage.

In a terminal, `filecoin login` opens the browser and waits for approval. An agent, or any run without a terminal, gets a `login_pending` error instead and never waits. The error's `next` steps are the approval link for the user and `filecoin login --check` for the agent to run after the user approves. `--check` only confirms the saved key and never makes a new one.

Running `filecoin login` again never changes a saved key's request. Flags you leave out keep the key's scopes, name, and expiry. An interrupted login resumes with the same key. `filecoin login` reuses an approved key that has the requested permissions. `filecoin login` replaces a saved key on its own only when the key has expired. If `--scopes` asks for more than a pending or valid key has, you get a `session_conflict` error. The key stays, because the owner may already have approved it. Pass `--fresh` to replace it.

For CI or a [cloud agent](README.md#cloud-agents), set `FILECOIN_SESSION_KEY` and `FILECOIN_ROOT_ADDRESS` instead of running `filecoin login`.

## Check the account

The session key cannot fund the account. `filecoin status` reports:

* when each permission expires, and the Warm Storage approval
* the FIL and USDFC in the wallet
* the Filecoin Pay funds, and how they are locked
* the monthly spend, and how many days the funds last
* the bytes stored

When the account needs a deposit or the Warm Storage approval, `filecoin status` also returns a funding link. The link opens the console's setup page, which asks for both. The output always includes a link to the console home, where you manage funds, services, and approvals.

`filecoin doctor` shows the network, RPC, Filecoin Pay console, and API origins, and the folder that `filecoin` uses, with where each value came from.

## Store and retrieve

```sh
filecoin put ./report.pdf          # a file, packed into a UnixFS CAR with an IPFS root CID
filecoin put ./report.pdf --raw    # a file, stored as its exact bytes
filecoin put ./site                # a folder, packed into a UnixFS CAR
filecoin put ./site --dry-run      # size, provider, cost, and authorization; stores nothing
filecoin get res_… --output ./copy # extracts a CAR, checking each block
filecoin ls                        # every piece the wallet pays for; add --all to include removed ones
filecoin inspect res_… --check     # checks that the piece link answers
filecoin inspect 39723/0           # a piece from ls, or a PieceCID or root CID
filecoin delete res_… --yes        # schedules removal of every copy
filecoin delete 39723/0 --dry-run  # lists the copies a target names; signs nothing
```

`put` returns `urls.browser`, the link to share, and `urls.piece`, the exact stored bytes. A new link can return `404` for a few minutes, until the provider indexes the piece.

`delete` takes a ref, a PieceCID, a root CID, or a `<dataSetId>/<pieceId>` from `ls`, and schedules removal of the copies it names. The providers then delete them. A ref or a CID removes every copy that the wallet pays for, including copies stored from another machine or by another tool. A `<dataSetId>/<pieceId>` removes one copy. With `--provider <id>`, `delete` removes only the copies on that provider. `--dry-run` lists the copies without signing. Without `--yes`, `delete` asks a person at a terminal to confirm. Everyone else, including agents, gets `confirmation_required` with a step for the user.

## Resume an interrupted put or delete

```sh
filecoin operations ls --incomplete
filecoin operations inspect op_…
filecoin operations resume op_…
```

Each `put` and `delete` saves an operation before it changes anything, and prints its ID to stderr at once. An error from a put or a delete carries a `filecoin operations resume <id>` step. Run that step instead of the original command, which would start a new paid operation.

A resumed put never stores or pays twice:

* It skips the upload when the provider already has the piece.
* It checks on chain whether the commit landed before it sends it again.
* It fails with `source_changed` when the source file changed.
* It returns the saved result of an operation that already completed.

Ctrl+C stops the work at the next step and returns an `interrupted` result with the resume step.

## Output and errors

When an agent runs `filecoin`, or when you pass `--json` or redirect stdout, `filecoin` writes one JSON object to stdout: `data` on success or `error` on failure, then optional `next` steps. The exit code is `0` with `data` and `1` with `error`. Progress goes to stderr.

Each error has a stable `code`, and `filecoin schema <command>` lists the codes the command returns and what they mean. Errors that need a person, such as `login_pending` and `insufficient_funds`, carry a `next` step with a Filecoin Pay console link for the user.

## Configuration

| Variable | Purpose |
| --- | --- |
| `FILECOIN_NETWORK` | `mainnet` or `calibration`. `--network` overrides `FILECOIN_NETWORK`, which overrides the config file. The default is `calibration` |
| `FILECOIN_SESSION_KEY`, `FILECOIN_ROOT_ADDRESS` | Session key and wallet address, used instead of `filecoin login` |
| `FILECOIN_CONFIG_DIR` | Absolute path of the folder that holds `config.json` and `state.db`. Default: `~/Library/Application Support/filecoin` on macOS, `%LOCALAPPDATA%\filecoin` on Windows, and `$XDG_DATA_HOME/filecoin` elsewhere, which is `~/.local/share/filecoin` when `XDG_DATA_HOME` is not set |
| `FILECOIN_RPC_URL` | RPC endpoint |
| `FILECOIN_CONSOLE_URL` | Filecoin Pay console origin for approval, funding, and revoke links. Default: `https://pay.filecoin.cloud` |
| `FILECOIN_API_URL` | [API](api.md) origin for retrieval links. Default: `https://api.filecoin.io` |
| `DO_NOT_TRACK`, `FILECOIN_TELEMETRY` | `DO_NOT_TRACK=1` or `FILECOIN_TELEMETRY=0` drops the `utm_*` tags from console links. The tags tell the console's analytics that the visit came from the `filecoin` CLI, which flow printed the link, and which agent ran it, if any |
| `FILECOIN_OUTPUT`, `FILECOIN_AGENT` | Override the output mode and agent detection |

`filecoin` saves the session key in `config.json` in that folder, readable only by its owner. `filecoin logout` deletes the local key. The key stays authorized on chain until it expires or you revoke it on the console's [session keys page](https://pay.filecoin.cloud/console/session-keys). `filecoin logout` returns a link that opens the revocation for an approved key.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/agents/cli)
