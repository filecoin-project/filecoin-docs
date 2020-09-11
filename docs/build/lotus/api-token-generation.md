---
title: 'Lotus: API token generation'
description: 'This guide explains how to generate new tokens for the Lotus APIs and what permissions can be attached to each of them.'
breadcrumb: 'API token generation'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

[[TOC]]

## Generating new tokens

Any client wishing to talk to the API endpoints (exposed by either the Lotus Node or the Lotus Miner), will need a token. Tokens can be generated as follows.

For the Lotus Node:

```sh
lotus auth create-token --perm <read,write,sign,admin>
```

For the Lotus Miner:

```sh
lotus-miner auth create-token --perm <read,write,sign,admin>
```

Note that the Lotus daemon and/or the Lotus Miner need to be running in the background!

## Permissions

There are different permissions to choose from:

- `read` - Read node state, no private data.
- `write` - Write to local store / chain, and `read` permissions.
- `sign` - Use private keys stored in wallet for signing, `read` and `write` permissions.
- `admin` - Manage permissions, `read`, `write`, and `sign` permissions.

## Default tokens

Notice how running `lotus auth create-token` is actually triggering a request to the API exposed by the Lotus daemon running in the background. This request is no different but the Lotus application (as client) is using a default pre-generated API token that is available locally and located in `~/.lotus/token`.

The same applies for `lotus-miner`.
