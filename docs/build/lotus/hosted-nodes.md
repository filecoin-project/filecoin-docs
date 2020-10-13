---
title: 'Lotus: Hosted Nodes'
description: '"Glif Nodes" provides a limited number of dedicated, up-to-date nodes on the Filecoin testnets and mainnet.'
breadcrumb: 'Hosted nodes'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

To request access to a Glif Hosted Lotus Node endpoint, please complete [**this request form**](https://forms.gle/rfXx2yKbhgrwUv837).

Developers can interact directly with these nodes using the [JSON RPC API endpoint](../../reference/lotus-api), but unlike bare Lotus, the endpoint provided is hardened and limited: by default read calls and `MPoolPush()` are supported, although each node can be customized depending on user needs, including, for example, [Powergate](../powergate.md) or advanced permissions. The [Filecoin signing tools](../signing-libraries.md) can be used to sign messages before submission.

::: tip
If you wish to play with the Lotus APIs you can deploy a [local devnet](../local-devnet.md) on your computer.
:::

For support, questions and current status, visit the [#fil-glif-node-hosting](https://filecoinproject.slack.com/archives/C017HM9BJ8Z) channel in [Filecoin Community Slack](https://filecoin.io/slack).
