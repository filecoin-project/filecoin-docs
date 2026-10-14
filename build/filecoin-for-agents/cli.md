---
description: >-
  How the filecoin CLI logs in, stores and retrieves content, resumes
  interrupted operations, and reports results and errors.
---

# CLI

`filecoin` stores a file or a folder as one copy on one storage provider and returns retrieval links. It runs on the Calibration testnet unless you choose mainnet. It needs Node.js 24 or newer:

```sh
npm install -g filecoin
```

Or run it without installing, as `npx -y filecoin`.

This page explains how `filecoin` works. The CLI describes its own commands, which always match the installed version:

* `filecoin --help` lists the commands, and `filecoin <command> --help` shows examples and flags.
* `filecoin schema <command>` prints the command's input and output as JSON Schema, and what each error code means. `filecoin schema --list` lists every command with its side effects.

## Log in

```sh
filecoin login
```

`filecoin login` makes a session key and saves it on your machine. It then opens the [Filecoin Pay console](console-and-explorer.md)'s Session keys page with the key's address and permissions filled in. The wallet owner reviews the request there and approves it with their wallet. The CLI finds the approval on chain, so there is nothing to copy back.

By default, `filecoin login` asks for the `createDataSet`, `addPieces`, and `schedulePieceRemovals` permissions. Repeat `--scopes` to ask for others.

The session key signs each request, the provider submits the transactions, and the wallet pays for storage.

In a terminal, `filecoin login` opens the browser and waits for approval. An agent, or any run without a terminal, gets a `login_pending` error instead and never waits. The error's `next` steps are the approval link for the user and `filecoin login --check` for the agent to run after the user approves. `--check` only confirms the saved key and never makes a new one.

Running `filecoin login` again never changes a saved key's request: flags you leave out keep its scopes. An interrupted login resumes with the same key, and an approved key is reused when it has the requested permissions. `filecoin login` replaces a saved key on its own only when the key has expired. If `--scopes` asks for more than a pending or valid key has, you get a `session_conflict` error and the key stays, because the owner may already have approved it. Pass `--fresh` to replace it.

For CI or a [cloud agent](connect-an-agent.md#cloud-agents), set `FILECOIN_SESSION_KEY` and `FILECOIN_ROOT_ADDRESS` instead of running `filecoin login`.

## Check the account

The session key cannot fund the account. `filecoin status` reports when each permission expires, the USDFC funds, and the Warm Storage approval. When the account needs a deposit, it also returns a prefilled funding link to the Filecoin Pay console.

`filecoin doctor` shows the network, RPC, console and API origins, and state directory that `filecoin` uses, with where each value came from.

## Store and retrieve

```sh
filecoin put ./report.pdf          # a file, stored as its exact bytes
filecoin put ./site                # a folder, packed into a UnixFS CAR
filecoin put ./site --dry-run      # size, provider, cost, and authorization; stores nothing
filecoin publish ./site            # same as put
filecoin get res_… --output ./copy # verifies the PieceCID and extracts folders
filecoin ls                        # add --all to include content pending removal
filecoin inspect res_… --check     # checks that the piece link answers
filecoin delete res_… --yes        # same as rm; schedules removal
```

`put` returns `urls.browser`, the link to share, and `urls.piece`, the exact stored bytes. [Retrieve and verify](retrieve-and-verify.md) explains what each link and `filecoin get` check.

Packing skips dotfiles and rejects symlinks. The file, or the packed folder, must be between 127 bytes and 1,065,353,216 bytes (1016 MiB).

`delete` schedules removal, and the provider then deletes the stored copy. The content's state becomes `removal_pending`. Without `--yes`, `delete` asks a person at a terminal to confirm. Everyone else, including agents, gets `confirmation_required` with a step for the user.

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

Each error has a stable `code`, and `filecoin schema <command>` lists the codes the command returns and what they mean. Errors that need a person, such as `login_pending` and `insufficient_funds`, carry a `next` step with a console link for the user.

## Configuration

| Variable | Purpose |
| --- | --- |
| `FILECOIN_NETWORK` | `mainnet` or `calibration`. `--network` wins, then `FILECOIN_NETWORK`, then the config file, then `calibration` |
| `FILECOIN_SESSION_KEY`, `FILECOIN_ROOT_ADDRESS` | Session key and wallet address, used instead of `filecoin login` |
| `FILECOIN_CONFIG_DIR` | Config directory. Default: the platform config directory for `filecoin` |
| `FILECOIN_STATE_DIR` | Local state and staged folders. Default: the platform data directory for `filecoin` |
| `FILECOIN_RPC_URL` | RPC endpoint |
| `FILECOIN_CONSOLE_URL` | Filecoin Pay console origin for approval, funding, and revoke links. Default: `https://pay.filecoin.io` |
| `FILECOIN_API_URL` | API origin for retrieval links. Default: `https://api.filecoin.io` |
| `FILECOIN_OUTPUT`, `FILECOIN_AGENT` | Override the output mode and agent detection |

The prototype saves the session key in the config file, readable only by its owner. `filecoin logout` deletes the local key. The key stays authorized on chain until it expires or you revoke it on the console's [Session keys page](https://pay.filecoin.io/console/session-keys).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/filecoin-for-agents/cli)
