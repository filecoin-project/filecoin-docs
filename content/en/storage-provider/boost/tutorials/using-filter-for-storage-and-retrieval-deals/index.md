---
title: "Using filter for storage and retrieval deals"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "using-filter-for-storage-and-retrieval-deals-c309bf80ea16d1c3a35a90823cefa092"
weight: 20
toc: true
---

Storage providers might demand very precise and dynamic control over a combination of deal parameters.

Boost, similarly to Lotus, provides two IPC hooks allowing you to name a command to execute for every deal before the storage provider accepts it:

* `Filter` for storage deals.
* `RetrievalFilter` for retrieval deals.

The executed command receives a JSON representation of the deal parameters, as well as the current state of the sealing pipeline, on standard input, and upon completion, its exit code is interpreted as:

* `0`: success, proceed with the deal.
* `non-0`: failure, reject the deal.

The most trivial filter rejecting any retrieval deal would be something like:\
\
`RetrievalFilter = "/bin/false"`.\
\
`/bin/false` is binary that immediately exits with a code of `1`.

[This Perl script](https://gist.github.com/ribasushi/53b7383aeb6e6f9b030210f4d64351d5/9bd6e898f94d20b50e7c7586dc8b8f3a45dab07c#file-dealfilter-pl) lets the miner deny specific clients and only accept deals that are set to start relatively soon.

You can also use a third party content policy framework like `bitscreen` by Murmuration Labs, or [CID gravity](https://cidgravity.com/):

```shell
# grab filter program
go get -u -v github.com/Murmuration-Labs/bitscreen

# add it to both filters
Filter = "/path/to/go/bin/bitscreen"
RetrievalFilter = "/path/to/go/bin/bitscreen"
```

Here is a sample JSON representation of the input sent to the deal filter:

```json
{
  "DealParams": {
    "DealUUID": "48c31c8c-dcc8-4372-a0ac-b5468eea555b",
    "IsOffline": false,
    "ClientDealProposal": {
      "Proposal": {
        "PieceCID": {
          "/": "baga6ea4seaqh5prrl6ykov4t64k6m6giijsc44dcxtdnzsp4izjakqhs7twauiq"
        },
        "PieceSize": 2147483648,
        "VerifiedDeal": false,
        "Client": "f1sw5zjcyo4mff5cbvgsgmm7uoko6gcr4tptvtkhy",
        "Provider": "f0127896",
        "Label": "bafyaa7qsgafcmalqudsaeidrunclaep6mdbipm2gjfvuosjfd6cbqd6th7bshy5hi5npxe727yjaagelucbyabasgafcmalqudsaeieapsxspo2i36no36n7yitswsxdazvziwvgj4vbp2scuxasrc6n4ejaage3r7m3saykcqeaegeavdllsbzaqcaibaaeecakrvvzam",
        "StartEpoch": 1717840,
        "EndEpoch": 2236240,
        "StoragePricePerEpoch": "1",
        "ProviderCollateral": "363196619502649",
        "ClientCollateral": "0"
      },
      "ClientSignature": {
        "Type": 1,
        "Data": "SmgcBnQE+0ZIb4zAXw7TpxLliSaliShEvX9P4+uwvxBhRDlJD+F6N3NFoNrA2y5bTeWF5aWWuL93w+SSmXFkoAA="
      }
    },
    "DealDataRoot": {
      "/": "bafyaa7qsgafcmalqudsaeidrunclaep6mdbipm2gjfvuosjfd6cbqd6th7bshy5hi5npxe727yjaagelucbyabasgafcmalqudsaeieapsxspo2i36no36n7yitswsxdazvziwvgj4vbp2scuxasrc6n4ejaage3r7m3saykcqeaegeavdllsbzaqcaibaaeecakrvvzam"
    },
    "Transfer": {
      "Type": "http",
      "ClientID": "",
      "Params": "eyJVUkwiOiJodHRwczovL2FudG8uLXB1YmxpYy1idWNrZXQtYm9vc3QuczMuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb20vcmFuZGZpbGVfMkdCXzAuY2FyIiwiSGVhZGVycyI6bnVsbH0=",
      "Size": 2000177948
    }
  },
  "SealingPipelineState": {
    "SectorStates": {
      "Available": 684,
      "Proving": 307,
      "Removed": 82,
      "TerminateFailed": 1,
      "TerminateWait": 5
    },
    "Workers": null
  }
}
```
