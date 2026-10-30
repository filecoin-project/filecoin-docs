---
description: >-
  Each error you can recover from when storing data on Filecoin Cloud, with
  its cause and fix, for the CLI and the SDK.
---

# Errors and troubleshooting

**This page lists the errors you are most likely to hit when storing data on Filecoin Cloud, with what causes each one and how to fix it.**

## How errors look

* **CLI:** with `--json`, or when an agent runs it, every error is one JSON object with a stable `code`, a message, and often a `next` step to run. `filecoin schema <command>` lists the codes a command can return.
* **SDK:** errors are thrown as named error classes, such as `InsufficientBalanceError`.

## Funding errors

| Error | Cause | Fix |
| --- | --- | --- |
| `insufficient_funds` (CLI) | Your Filecoin Pay account doesn't have enough USDFC | Follow the funding link in the error, or see [Fund storage](../warm-storage/fund-storage.md) |
| `InsufficientBalanceError` (SDK) | Your wallet doesn't have enough tokens to deposit | Add USDFC or FIL to your wallet |
| `InsufficientAllowanceError` (SDK) | Warm Storage isn't approved to spend enough | Run `prepare()` and execute its transaction |
| Uploads fail after working before | Your balance ran out and the account is in deficit | Deposit more. See [Monitor balance and proofs](../warm-storage/monitor-balance-and-proofs.md) |

## Approval errors

| Error | Cause | Fix |
| --- | --- | --- |
| `login_pending` (CLI) | The session key hasn't been approved yet | Open the approval link and approve it from your wallet |
| Missing or expired permission | The session key's permission expired, or was never granted | Run `filecoin login` again, or approve the key again in the SDK |

## Upload errors

| Error | Cause | Fix |
| --- | --- | --- |
| `InvalidUploadSizeError` (SDK) | The file is under 127 bytes or over about 63.5 GiB | Pad small files; split large ones |
| `complete: false` (SDK) | Some copies were stored, but not all | Upload again to add the missing copies |
| `source_changed` (CLI) | The file changed while an interrupted upload was resumed | Start a new `filecoin put` |
| `interrupted` (CLI) | You stopped the upload, for example with Ctrl+C | Run the `filecoin operations resume` step in the result |
| Content-Security-Policy error (browser) | The page blocks WebAssembly, which the SDK needs | Add `'wasm-unsafe-eval'` to `script-src` |

## Retrieval errors

| Error | Cause | Fix |
| --- | --- | --- |
| 404 on a new link | The network hasn't indexed the upload yet | Wait, or check with `filecoin inspect … --check` |
| `PDPProviderUnavailableError` (SDK) | The provider didn't respond | Try again; the SDK tries your other copies too |
| Check failed on `filecoin get` | The downloaded bytes don't match the PieceCID | Nothing was saved. Try again; if it keeps failing, report it |

## Still stuck?

See [Support](support.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data/resources/errors-and-troubleshooting)
