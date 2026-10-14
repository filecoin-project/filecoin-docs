---
description: >-
  The explorer, wallet dashboard, and setup page where wallet owners approve
  agent session keys and fund Filecoin storage.
---

# Web app

The web app, at `https://DASHBOARD-HOST-TODO`, has three parts:

* **Explorer** (`/mainnet`, `/calibration`): public pages for data sets, pieces, storage providers, Filecoin Pay rails and settlements, session keys, and each address. Search with `/` or ⌘K from any page.
* **Dashboard** (`/dashboard`): connect a wallet to manage your Filecoin Pay account, the Warm Storage approval, data sets, uploads, rails, and session keys.
* **Setup page** (`/dashboard/setup`): review and approve a request from `filecoin` or an agent.

## Session keys

A session key lets a tool sign storage requests for your wallet. It can create data sets, add pieces, schedule piece removals, and end service, but it can never move funds. Keys you make in the dashboard stay in that browser. Keys made by `filecoin login` stay on the agent's machine, and the dashboard only approves them.

The session keys page lists every key your wallet approved, with when each permission expires. Revoke a key there to stop the tool that holds it.

## Setup links

`filecoin login`, `filecoin status`, and the `put` funding check send the wallet owner to `/dashboard/setup`. The page fills in the request from the link, and you review it, change what you need, and approve each step with your wallet. Each step is its own transaction, so nothing is signed until you click.

| Parameter | Meaning |
| --- | --- |
| `network` | `mainnet` or `calibration`. The page asks to switch the wallet when it is on the other network |
| `signer` | Session key address to approve. The private key stays with the tool that made it |
| `name` | Session key name, up to 64 characters, recorded on chain. Default: `filecoin-app` |
| `scopes` | Comma-separated permissions: `createDataSet`, `addPieces`, `schedulePieceRemovals`, `terminateService`. Default: the first three |
| `days` | Days until the approval expires, from 1 to 365. Default: 30 |
| `deposit` | USDFC to deposit, as a decimal amount |

Every parameter is optional, and the page drops an invalid value instead of failing. The Warm Storage step appears whenever the wallet has not approved it.

## WebMCP tools

The web app registers [WebMCP](https://webmachinelearning.github.io/webmcp/) tools, so a browser agent can prepare a setup request and read the account and its storage:

| Tool | Where | What it does |
| --- | --- | --- |
| `prepare_setup_request` | Every page | Checks a request with the parameters above and opens the prefilled setup page. It never signs anything |
| `get_setup_status` | `/dashboard/setup` | Reports whether a wallet is connected and on Filecoin, and which requested permissions are approved |
| `get_account_summary` | Every page | Reports a wallet's Filecoin Pay funds, monthly spend, runway, and Warm Storage approval |
| `list_data_sets` | Every page | Lists a wallet's data sets |
| `list_pieces` | Every page | Lists a data set's pieces, each with a retrieval link |
| `lookup_piece` | Every page | Finds the data sets that hold a PieceCID v2 |
| `list_session_keys` | Every page | Lists the session keys a wallet approved |

The read tools default to the connected wallet and the network in the page address. WebMCP is an early preview. It works in Chrome 149 and later, and in the ChatGPT desktop app's browser, where the tools are called site tools. Other browsers ignore the tools, and agents use setup links instead.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/filecoin-for-agents/web-app)
