---
title: "Repository"
description: ""
lead: ""
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "repository-5976504fa6f9f2e838534e14c59cf8b8"
weight: 10
toc: true
---

# Repository

By default the Boost daemon repository is located at `~/.boost`

It contains the following files:

- `api` The local multi-address of Boost's libp2p API
- `boost.db` The sqlite database with all deal metadata
- `boost.logs.db` The sqlite database with the logs for deals
- `config.toml` The config file with all Boost's settings
- `repo.lock` A lock file created when Boost is running
- `storage.json` Deprecated (needed by legacy markets)
- `token` The token used when calling Boost's JSON RPC endpoints

It has the following directories:

- `dagstore` Contains indexes of CAR files stored with Boost
- `datastore` Contains metadata about deals for legacy markets
- `deal-staging` The directory used by legacy markets for incoming data transfers
- `incoming` The directory used by Boost for incoming data transfers
- `journal` Contains journal events (used by legacy markets)
- `keystore` Contains the secret keys used by libp2p (eg the peer ID)
- `kvlog` Used by legacy markets datastore
