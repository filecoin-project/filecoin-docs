---
title: "Send FIL to Metamask"
description: ""
lead: ""
draft: false
images: []
type: docs
menu:
  smart-contracts:
    identifier: "metamask-582f6bb878fee29349ce0adec7039227"
weight: 100
toc: true
---

## Prequisites

- Metamask is set up
- 0x address

## Steps

### Moving FIL from an exchange to FVM

#### (Fallback option) If the exchange does not support f4 withdrawals or 0x withdrawals:
- Buy FIL on an exchange
- Set up a Glif wallet
- Move it to a non-f4 address on Glif
- Lookup the equivalent f4 address to your Metamask 0x address
- Use Glif to send the funds to your Metamask address
#### (Alternate 1 option) If the exchange supports f4 withdrawals (most likely will be the case for Coinbase at launch)
- Lookup the equivalent f4 address to your Metamask 0x address
- Send to f4 address directly from exchange
#### (Alternate 2 option) If the exchange supports 0x withdrawals
- Send to 0x address directly from exchange

### Moving FIL from a Glif wallet / Ledger wallet to your Filecoin wallet

### Using a Metamask wallet (with Ledger support) for FVM directly

Note: This will require using the Ethereum app, not the Filecoin app, to sign transactions