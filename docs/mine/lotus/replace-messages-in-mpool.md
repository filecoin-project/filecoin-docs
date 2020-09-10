---
title: 'Lotus Miner: replace messages in the message pool'
description: 'This guide explain how a sender can replace a message that is pending in the message pool.'
breadcrumb: 'Replace messages in the message pool'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

A sender can replace a message that is pending in the message pool by pushing a new signed message with the same `Nonce` that has a higher `GasPremium`. The ratio of the new message's `GasPremium` to the old message's `GasPremium` must be above some minimum in order to be successfully replaced -- by default the minimum ratio is 1.25.

As an example, consider a sender who has a message with `Nonce` 25 and `GasPremium` 10. This message is pending in their message pool, and they would like to invalidate and replace it. They can do so by constructing a replacement message with `Nonce` 25 and `GasPremium` 20. The replacement message can either have the same recipient address, value, etc. as the old message, or different information. They must then sign this message locally, and push it using `MpoolPush`. This will evict the old message from the message pool. If the minimum replace ratio was 1.25 (the default), and the replacement message's `GasPremium` was only 11, however, the eviction would not succeed, and the replacement message would not enter the message pool.
