---
title: "Wrapped Filecoin"
description: "Wrapped tokens allow tokens from one blockchain to be used natively on another chain."
menu:
    about:
        parent: "about-filecoin-assets"
weight: 70
---

Wrapped tokens allow tokens from one blockchain to be used natively on another chain. The wrapping process usually involves locking the original tokens in a smart contract, which then mints an equivalent amount of wrapped tokens on another blockchain.

Users can transact confidently because the wrapped token value is preserved by a smart contract that backs each token one-to-one with the underlying assets. This gives users greater flexibility — such as the ability to write smart contracts with assets across multiple networks without waiting for both chains to update, to create greater liquidity for decentralized finance, or to optimize block confirmation times or gas fees by choosing different networks.

Although Filecoin tokens (FIL) cannot be directly used on Ethereum (ETH) or other networks due to different standards, **wrapped FIL** offer the ability to use FIL tokens 1:1 within other blockchain networks including Ethereum, Polygon, Solana, Celo, and more.

## Where to use wrapped FIL

Wrapped FIL is available in the following networks:

- Ethereum (renFIL, wFIL)
- Binance Smart Chain (renFIL, BFIL)
- Fantom (renFIL)
- Polygon (renFIL)
- Avalanche (renFIL)
- Solana (renFIL)
- Arbitrum (renFIL)
- Celo (wFIL)
- STACKS (coming soon wFIL)
- KADENA (coming soon wFIL)

## Custodial or non-custodial wrapping solution

- **Non-custodial designs** (renFIL, vFIL) are governed only by on-chain, immutable smart contracts. No single or collective entity has a master key that could force trades, transactions, or other operations to follow one direction or the other.
- **Custodial designs** (wFIL, BFIL, eFIL, HFIL) are managed by a single third party. Centralized services always have a counter-party risk from their operator but could provide other advantages like insurance, guaranteed backing and support.

## How to wrap FIL

There are several web-based applications for token wrapping. Here is an overview of the steps:

1. **Choose your wrapped FIL type.** Depending on the chain where you want to use your wrapped FIL, different types are available.
2. **Open the web app and connect your wallet.** Most apps require a web or mobile wallet.
3. **Choose the amount.** Double-check the fee structure, which may vary by network and application.
4. **Click to mint.** You may need to wait several minutes for the target network to confirm the transaction.

Here’s how it works in RenBridge, a decentralized application (dApp) that allows users to mint real FIL into renFIL on Ethereum and other networks.

Asset selection process:

![renBridge asset selection window](select-asset.png)

Fees and confirmation:

![renBridge fees and confitmation window](fees-and-confirm.png)

## Wrapping solutions comparison table

| **Name** | **Project** | **Infrastructure** | **Custodian** | **Main Blockchain**              | **Link**                            |
|----------|-------------|--------------------|---------------|----------------------------------|-------------------------------------|
| renFIL   | renBridge   | Decentralized      | Decentralized | Etherium, Binance, Polygon       | https://bridge\.renproject\.io/mint |
| wFIL     | WRAPPED     | Centralized        | Anchorage     | Etherium                         | https://www\.wrapped\.com/          |
| BFIL     | Binance     | Centralized        | Binance       | Etherium via Binance Token Canal | https://www\.binance\.com/          |
| vFIL     | Venus       | Decentralized      | Decentralized | Binance Smart Chain              | https://www\.venus\.io/             |
| eFIL     | Gemini      | Decentralized      | Gemini        | Etherium                         | https://www\.gemini\.com/           |
| HFIL     | Huobi       | Decentralized      | Huobi         | Etherium                         | https://www\.huobi\.com             |
