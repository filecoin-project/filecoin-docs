---
title: Dynamic retrieval pricing
description: Lotus allows you to set different policies to calculate the quoted price of a retrieval deal. The two available policies are Default, and External. 
---

# Dynamic retrieval pricing

Lotus allows you to set different policies to calculate the quoted price of a retrieval deal. The two available policies are _Default_, and _External_:

| Policy name | Description |
| --- | --- |
| Default | Lotus is shipped with an in-built default pricing policy that offers free retrievals for verified unsealed deals. Miners can still charge clients for data transfer if they wish to by turning off free data transfer for verified deals in the Miner config. Miners can also charge clients for unsealing if they don't have an unsealed sector file to retrieve the deal payload from. |
| External | Miners can configure an external pricing script for Lotus to use instead of the default pricing policy to price retrieval deals. The script will be called with the relevant deal parameters, and the output quote will be used by Lotus to price deals. |

## Default policy

The default pricing policy uses the price configured in the `Ask Store`, set using the `lotus retrieval-deals set-ask` CLI command, to price all retrieval deals. However, it will not charge for data transfer if there exists a verified storage deal for the payload being retrieved. This behavior can be turned off by setting the `VerifiedDealsFreeTransfer` flag to `false` in the `DealMaking.RetrievalPricing` section of the config:

```toml
[Dealmaking.RetrievalPricing]
Strategy = "default"
[Dealmaking.RetrievalPricing.Default]
VerifiedDealsFreeTransfer = false
```

It will also not charge for unsealing if we already have an unsealed sector file containing the retrieval payload.

## External policy

Users can configure an external pricing script, similar to the deal filter mechanism, that takes a JSON marshaled `PricingInput` as the input and outputs a JSON marshaled `Ask`, also known as _the quote_. The `PricingInput` struct is defined as follows:

```go
type PricingInput struct {
    // PayloadCID is the cid of the payload to retrieve.
    PayloadCID cid.Cid

    // PieceCID is the cid of the Piece from which the Payload will be retrieved.
    PieceCID cid.Cid

    // PieceSize is the size of the Piece from which the payload will be retrieved.
    PieceSize abi.UnpaddedPieceSize

    // Client is the peerID of the retrieval client.
    Client peer.ID

    // VerifiedDeal is true if there exists a verified storage deal for the PayloadCID.
    VerifiedDeal bool

    // Unsealed is true if there exists an unsealed sector from which we can retrieve the given payload.
    Unsealed bool

    // CurrentAsk is the ask configured in the ask-store via the `lotus retrieval-deals set-ask` CLI command.
    CurrentAsk Ask
}
```

The output `Ask` is defined as:

```go
type Ask struct {
    PricePerByte            abi.TokenAmount
    UnsealPrice             abi.TokenAmount
    PaymentInterval         uint64
    PaymentIntervalIncrease uint64
}
```

To use this mode instead of the default above, the `DealMaking.RetrievalPricing` section of the config needs to be configured to use the `external` pricing policy and needs to be given the absolute path of the pricing script: 

```toml
[Dealmaking.RetrievalPricing]
Strategy = "external"
[Dealmaking.RetrievalPricing.External]
Path = "/var/script"
```

