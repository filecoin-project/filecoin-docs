---
title: 'Lotus: Hosted Nodes'
description: 'Glif Nodes runs a limited number of dedicated, up-to-date nodes on the Filecoin testnet and will run these on mainnet.'
breadcrumb: 'Hosted nodes'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

These are hosted Lotus JSON RPC API endpoints intended to jump-start development instead of waiting for your own node to sync. (To request a hosted [Powergate](https://docs.filecoin.io/build/powergate/#how-to-use-powergate) endpoint, see [Textile's related blog post](https://blog.textile.io/prepare-to-launch-expanding-free-access-to-filecoin-through-hosted-powergates/)).

- If your app is in active development, try a [**local Lotus Devnet**](https://docs.filecoin.io/build/local-devnet/) or [**shared Devnet**](https://docs.filecoin.io/networks/#devnets) for faster testing and development first.

- Let us know if you only require recent chain state (good for most applications) or full chain history from genesis (for deeper analysis).
- The Lotus JSON RPC API has [variable permissions](https://docs.filecoin.io/build/lotus/api-token-generation/#permissions). Read calls and [`MPoolPush()`](https://github.com/filecoin-project/lotus/blob/master/api/api_full.go#L192) are supported. (Some transaction types can be signed apart from a node using the [Filecoin Signing Tools library](https://github.com/Zondax/filecoin-signing-tools) and `MPoolPush()`).
- Remote storage deals via API signed apart from a node are not yet fully supported in Lotus: the node's keys are currently required for storage deals. We recommend using Powergate and IPFS for this. (Lotus supports interactions with IPFS nodes, see the [IPFS config](https://github.com/filecoin-project/lotus/blob/master/node/config/def.go#L106) settings and [PR 1843](https://github.com/filecoin-project/lotus/pull/1843).)

To request access to a Glif Hosted Lotus Node endpoint, please complete [this request form](https://forms.gle/rfXx2yKbhgrwUv837).
