---
description: >-
  When an agent runs the Filecoin CLI, every command returns one JSON result
  with a stable error code and the next step to take.
---

# Filecoin CLI agent mode

**When an agent runs `filecoin`, every command returns one JSON result, with a stable error code and the next step to take.** The CLI never stops to wait for a person. For what the CLI does, see [Filecoin CLI](../../store-data/tools/filecoin-cli.md).

## When it turns on

The CLI returns JSON when it detects an agent, when you pass `--json`, or when its output goes to a file or another program. To force it on or off, set `FIL_AGENT` to `1` or `0`. To force the output format, set `FIL_OUTPUT` to `json` or `human`.

## What a result looks like

* `data` on success, or `error` on failure.
* Optional `next` steps, each marked for the agent to run or for the user to do.

For example, a successful `filecoin put ./report.pdf` returns, trimmed:

```json
{
  "data": {
    "dryRun": false,
    "operationId": "op_…",
    "state": "ready",
    "urls": {
      "piece": "https://…",
      "browser": "https://…"
    }
  }
}
```

The exit code is `0` on success and `1` on failure. Progress messages go to stderr, so they never mix with the result.

## Common errors

| Code | Meaning | What the agent does |
| --- | --- | --- |
| `auth_required` | There's no session key yet | Run `filecoin login` |
| `login_pending` | The user hasn't approved the agent's key yet | Send the user the approval link, then run `filecoin login --check` |
| `insufficient_funds` | The account needs a deposit | Send the user the funding link |
| `session_expired` | The key's permissions have expired | Send the user the step in `next` |
| `confirmation_required` | `delete` ran without `--yes` | Ask the user, then run it again with `--yes` |
| `session_conflict` | `--scopes` asked for more than the saved key allows | Keep the key, or pass `--fresh` to replace it |
| `source_changed` | The file changed before an interrupted `put` resumed | Run a new `put` |

Branch on `error.code`, never on progress text. `filecoin schema <command>` lists every error a command can return.

## Log in

`filecoin login --check` only confirms the saved key. It never makes a new one, so it can't replace a key the user already approved.

For a cloud agent or CI, set `FILECOIN_SESSION_KEY` and `FILECOIN_ROOT_ADDRESS` instead of running `filecoin login`. See [Delegate access with session keys](../../store-data/warm-storage/delegate-access-with-session-keys.md).

## Interrupted uploads and deletes

If a `put` or `delete` stops partway, the result includes a `filecoin operations resume <id>` step. Run that step instead of the original command, so nothing is stored or paid for twice. See [Upload data](../../store-data/warm-storage/upload-data.md#if-an-upload-is-interrupted).

## Find commands

The CLI describes itself, so its help always matches the installed version:

```sh
filecoin --help              # list commands
filecoin <command> --help    # examples and flags
filecoin schema <command>    # inputs, outputs, and errors as JSON Schema
filecoin schema --list       # every command and its side effects
```

The [Filecoin CLI README](https://github.com/filecoin-project/agents/tree/main/packages/filecoin-cli) covers every command.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/agents/filecoin-skill/filecoin-cli-agent-mode)
