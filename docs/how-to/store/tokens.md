---
title: Token payments
description: Learn how to use Filecoin tokens to pay for storage.
---

# Token payments

You’ll need Filecoin tokens (FIL) to pay for storage. Tokens are stored in digital wallets. Access to your tokens is governed by private cryptographic keys (basically, long random alphanumeric values). Digital wallets store these private keys for you, using a combination of software and/or hardware.

If you are using a core protocol implementation such as lotus or go-filecoin, each node automatically provisions a new Filecoin wallet with a balance of 0 FIL.

If you are using a different application, follow their instructions.

For Testnet usage, you can obtain mock FIL for free from the Filecoin faucet. Once Mainnet is live, you will be able to buy FIL on many exchanges, and transfer them to your digital wallet(s) as needed.

# Replacing a message in the message pool (Lotus)

A sender can replace a message that is pending in the message pool by pushing a new signed message with the same `Nonce` that has a higher `GasPremium`. The ratio of the new message's `GasPremium` to the old message's `GasPremium` must be above some minimum in order to be successfully replaced -- by default the minimum ratio is 1.25.

As an example, consider a sender who has a message with `Nonce` 25 and `GasPremium` 10. This message is pending in their message pool, and they would like to invalidate and replace it. They can do so by constructing a replacement message with `Nonce` 25 and `GasPremium` 20. The replacement message can either have the same recipient address, value, etc. as the old message, or different information. They must then sign this message locally, and push it using `MpoolPush`. This will evict the old message from the message pool. If the minimum replace ratio was 1.25 (the default), and the replacement message's `GasPremium` was only 11, however, the eviction would not succeed, and the replacement message would not enter the message pool.
