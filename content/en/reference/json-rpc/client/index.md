---
title: "Client"
draft: false
images: []
type: docs
menu:
  reference:
    parent: "reference-json-rpc"
    identifier: "client-82be9c5d2a64e925d69caf7d86100586"
weight: 100
toc: true
aliases:
    - "/developers/reference/json-rpc/client/"
---

The Client methods all have to do with interacting with the storage and
retrieval markets as a client

## ClientCalcCommP

ClientCalcCommP calculates the CommP for a specified file

Perms: write

Inputs:

```json
[
  "string value"
]
```

Response:

```json
{
  "Root": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Size": 1024
}
```

## ClientCancelDataTransfer

ClientCancelDataTransfer cancels a data transfer with the given transfer ID and other peer

Perms: write

Inputs:

```json
[
  3,
  "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
  true
]
```

Response: `{}`

## ClientCancelRetrievalDeal

ClientCancelRetrievalDeal cancels an ongoing retrieval deal based on DealID

Perms: write

Inputs:

```json
[
  5
]
```

Response: `{}`

## ClientDataTransferUpdates

Perms: write

Inputs: `null`

Response:

```json
{
  "TransferID": 3,
  "Status": 1,
  "BaseCID": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "IsInitiator": true,
  "IsSender": true,
  "Voucher": "string value",
  "Message": "string value",
  "OtherPeer": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
  "Transferred": 42,
  "Stages": {
    "Stages": [
      {
        "Name": "string value",
        "Description": "string value",
        "CreatedTime": "0001-01-01T00:00:00Z",
        "UpdatedTime": "0001-01-01T00:00:00Z",
        "Logs": [
          {
            "Log": "string value",
            "UpdatedTime": "0001-01-01T00:00:00Z"
          }
        ]
      }
    ]
  }
}
```

## ClientDealPieceCID

ClientCalcCommP calculates the CommP and data size of the specified CID

Perms: read

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:

```json
{
  "PayloadSize": 9,
  "PieceSize": 1032,
  "PieceCID": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
}
```

## ClientDealSize

ClientDealSize calculates real deal data size

Perms: read

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:

```json
{
  "PayloadSize": 9,
  "PieceSize": 1032
}
```

## ClientFindData

ClientFindData identifies peers that have a certain file, and returns QueryOffers (one per peer).

Perms: read

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  null
]
```

Response:

```json
[
  {
    "Err": "string value",
    "Root": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "Piece": null,
    "Size": 42,
    "MinPrice": "0",
    "UnsealPrice": "0",
    "PricePerByte": "0",
    "PaymentInterval": 42,
    "PaymentIntervalIncrease": 42,
    "Miner": "f01234",
    "MinerPeer": {
      "Address": "f01234",
      "ID": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
      "PieceCID": null
    }
  }
]
```

## ClientGenCar

ClientGenCar generates a CAR file for the specified file.

Perms: write

Inputs:

```json
[
  {
    "Path": "string value",
    "IsCAR": true
  },
  "string value"
]
```

Response: `{}`

## ClientGetDealInfo

ClientGetDealInfo returns the latest information about a given deal.

Perms: read

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:

```json
{
  "ProposalCid": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "State": 42,
  "Message": "string value",
  "DealStages": {
    "Stages": [
      {
        "Name": "string value",
        "Description": "string value",
        "ExpectedDuration": "string value",
        "CreatedTime": "0001-01-01T00:00:00Z",
        "UpdatedTime": "0001-01-01T00:00:00Z",
        "Logs": [
          {
            "Log": "string value",
            "UpdatedTime": "0001-01-01T00:00:00Z"
          }
        ]
      }
    ]
  },
  "Provider": "f01234",
  "DataRef": {
    "TransferType": "string value",
    "Root": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "PieceCid": null,
    "PieceSize": 1024,
    "RawBlockSize": 42
  },
  "PieceCID": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Size": 42,
  "PricePerEpoch": "0",
  "Duration": 42,
  "DealID": 5432,
  "CreationTime": "0001-01-01T00:00:00Z",
  "Verified": true,
  "TransferChannelID": {
    "Initiator": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "Responder": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "ID": 3
  },
  "DataTransfer": {
    "TransferID": 3,
    "Status": 1,
    "BaseCID": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "IsInitiator": true,
    "IsSender": true,
    "Voucher": "string value",
    "Message": "string value",
    "OtherPeer": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "Transferred": 42,
    "Stages": {
      "Stages": [
        {
          "Name": "string value",
          "Description": "string value",
          "CreatedTime": "0001-01-01T00:00:00Z",
          "UpdatedTime": "0001-01-01T00:00:00Z",
          "Logs": [
            {
              "Log": "string value",
              "UpdatedTime": "0001-01-01T00:00:00Z"
            }
          ]
        }
      ]
    }
  }
}
```

## ClientGetDealStatus

ClientGetDealStatus returns status given a code

Perms: read

Inputs:

```json
[
  42
]
```

Response: `"string value"`

## ClientGetDealUpdates

ClientGetDealUpdates returns the status of updated deals

Perms: write

Inputs: `null`

Response:

```json
{
  "ProposalCid": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "State": 42,
  "Message": "string value",
  "DealStages": {
    "Stages": [
      {
        "Name": "string value",
        "Description": "string value",
        "ExpectedDuration": "string value",
        "CreatedTime": "0001-01-01T00:00:00Z",
        "UpdatedTime": "0001-01-01T00:00:00Z",
        "Logs": [
          {
            "Log": "string value",
            "UpdatedTime": "0001-01-01T00:00:00Z"
          }
        ]
      }
    ]
  },
  "Provider": "f01234",
  "DataRef": {
    "TransferType": "string value",
    "Root": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "PieceCid": null,
    "PieceSize": 1024,
    "RawBlockSize": 42
  },
  "PieceCID": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Size": 42,
  "PricePerEpoch": "0",
  "Duration": 42,
  "DealID": 5432,
  "CreationTime": "0001-01-01T00:00:00Z",
  "Verified": true,
  "TransferChannelID": {
    "Initiator": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "Responder": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "ID": 3
  },
  "DataTransfer": {
    "TransferID": 3,
    "Status": 1,
    "BaseCID": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "IsInitiator": true,
    "IsSender": true,
    "Voucher": "string value",
    "Message": "string value",
    "OtherPeer": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "Transferred": 42,
    "Stages": {
      "Stages": [
        {
          "Name": "string value",
          "Description": "string value",
          "CreatedTime": "0001-01-01T00:00:00Z",
          "UpdatedTime": "0001-01-01T00:00:00Z",
          "Logs": [
            {
              "Log": "string value",
              "UpdatedTime": "0001-01-01T00:00:00Z"
            }
          ]
        }
      ]
    }
  }
}
```

## ClientGetRetrievalUpdates

ClientGetRetrievalUpdates returns status of updated retrieval deals

Perms: write

Inputs: `null`

Response:

```json
{
  "PayloadCID": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "ID": 5,
  "PieceCID": null,
  "PricePerByte": "0",
  "UnsealPrice": "0",
  "Status": 0,
  "Message": "string value",
  "Provider": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
  "BytesReceived": 42,
  "BytesPaidFor": 42,
  "TotalPaid": "0",
  "TransferChannelID": {
    "Initiator": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "Responder": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "ID": 3
  },
  "DataTransfer": {
    "TransferID": 3,
    "Status": 1,
    "BaseCID": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "IsInitiator": true,
    "IsSender": true,
    "Voucher": "string value",
    "Message": "string value",
    "OtherPeer": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "Transferred": 42,
    "Stages": {
      "Stages": [
        {
          "Name": "string value",
          "Description": "string value",
          "CreatedTime": "0001-01-01T00:00:00Z",
          "UpdatedTime": "0001-01-01T00:00:00Z",
          "Logs": [
            {
              "Log": "string value",
              "UpdatedTime": "0001-01-01T00:00:00Z"
            }
          ]
        }
      ]
    }
  },
  "Event": 5
}
```

## ClientHasLocal

ClientHasLocal indicates whether a certain CID is locally stored.

Perms: write

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `true`

## ClientImport

ClientImport imports file under the specified path into filestore.

Perms: admin

Inputs:

```json
[
  {
    "Path": "string value",
    "IsCAR": true
  }
]
```

Response:

```json
{
  "Root": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "ImportID": 50
}
```

## ClientListDataTransfers

ClientListTransfers returns the status of all ongoing transfers of data

Perms: write

Inputs: `null`

Response:

```json
[
  {
    "TransferID": 3,
    "Status": 1,
    "BaseCID": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "IsInitiator": true,
    "IsSender": true,
    "Voucher": "string value",
    "Message": "string value",
    "OtherPeer": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "Transferred": 42,
    "Stages": {
      "Stages": [
        {
          "Name": "string value",
          "Description": "string value",
          "CreatedTime": "0001-01-01T00:00:00Z",
          "UpdatedTime": "0001-01-01T00:00:00Z",
          "Logs": [
            {
              "Log": "string value",
              "UpdatedTime": "0001-01-01T00:00:00Z"
            }
          ]
        }
      ]
    }
  }
]
```

## ClientListDeals

ClientListDeals returns information about the deals made by the local client.

Perms: write

Inputs: `null`

Response:

```json
[
  {
    "ProposalCid": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "State": 42,
    "Message": "string value",
    "DealStages": {
      "Stages": [
        {
          "Name": "string value",
          "Description": "string value",
          "ExpectedDuration": "string value",
          "CreatedTime": "0001-01-01T00:00:00Z",
          "UpdatedTime": "0001-01-01T00:00:00Z",
          "Logs": [
            {
              "Log": "string value",
              "UpdatedTime": "0001-01-01T00:00:00Z"
            }
          ]
        }
      ]
    },
    "Provider": "f01234",
    "DataRef": {
      "TransferType": "string value",
      "Root": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "PieceCid": null,
      "PieceSize": 1024,
      "RawBlockSize": 42
    },
    "PieceCID": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "Size": 42,
    "PricePerEpoch": "0",
    "Duration": 42,
    "DealID": 5432,
    "CreationTime": "0001-01-01T00:00:00Z",
    "Verified": true,
    "TransferChannelID": {
      "Initiator": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
      "Responder": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
      "ID": 3
    },
    "DataTransfer": {
      "TransferID": 3,
      "Status": 1,
      "BaseCID": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "IsInitiator": true,
      "IsSender": true,
      "Voucher": "string value",
      "Message": "string value",
      "OtherPeer": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
      "Transferred": 42,
      "Stages": {
        "Stages": [
          {
            "Name": "string value",
            "Description": "string value",
            "CreatedTime": "0001-01-01T00:00:00Z",
            "UpdatedTime": "0001-01-01T00:00:00Z",
            "Logs": [
              {
                "Log": "string value",
                "UpdatedTime": "0001-01-01T00:00:00Z"
              }
            ]
          }
        ]
      }
    }
  }
]
```

## ClientListImports

ClientListImports lists imported files and their root CIDs

Perms: write

Inputs: `null`

Response:

```json
[
  {
    "Key": 50,
    "Err": "string value",
    "Root": null,
    "Source": "string value",
    "FilePath": "string value",
    "CARPath": "string value"
  }
]
```

## ClientListRetrievals

ClientQueryAsk returns a signed StorageAsk from the specified miner.
ClientListRetrievals returns information about retrievals made by the local client

Perms: write

Inputs: `null`

Response:

```json
[
  {
    "PayloadCID": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "ID": 5,
    "PieceCID": null,
    "PricePerByte": "0",
    "UnsealPrice": "0",
    "Status": 0,
    "Message": "string value",
    "Provider": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "BytesReceived": 42,
    "BytesPaidFor": 42,
    "TotalPaid": "0",
    "TransferChannelID": {
      "Initiator": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
      "Responder": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
      "ID": 3
    },
    "DataTransfer": {
      "TransferID": 3,
      "Status": 1,
      "BaseCID": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "IsInitiator": true,
      "IsSender": true,
      "Voucher": "string value",
      "Message": "string value",
      "OtherPeer": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
      "Transferred": 42,
      "Stages": {
        "Stages": [
          {
            "Name": "string value",
            "Description": "string value",
            "CreatedTime": "0001-01-01T00:00:00Z",
            "UpdatedTime": "0001-01-01T00:00:00Z",
            "Logs": [
              {
                "Log": "string value",
                "UpdatedTime": "0001-01-01T00:00:00Z"
              }
            ]
          }
        ]
      }
    },
    "Event": 5
  }
]
```

## ClientMinerQueryOffer

ClientMinerQueryOffer returns a QueryOffer for the specific miner and file.

Perms: read

Inputs:

```json
[
  "f01234",
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  null
]
```

Response:

```json
{
  "Err": "string value",
  "Root": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Piece": null,
  "Size": 42,
  "MinPrice": "0",
  "UnsealPrice": "0",
  "PricePerByte": "0",
  "PaymentInterval": 42,
  "PaymentIntervalIncrease": 42,
  "Miner": "f01234",
  "MinerPeer": {
    "Address": "f01234",
    "ID": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "PieceCID": null
  }
}
```

## ClientQueryAsk

Perms: read

Inputs:

```json
[
  "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
  "f01234"
]
```

Response:

```json
{
  "Price": "0",
  "VerifiedPrice": "0",
  "MinPieceSize": 1032,
  "MaxPieceSize": 1032,
  "Miner": "f01234",
  "Timestamp": 10101,
  "Expiry": 10101,
  "SeqNo": 42
}
```

## ClientRemoveImport

ClientRemoveImport removes file import

Perms: admin

Inputs:

```json
[
  50
]
```

Response: `{}`

## ClientRestartDataTransfer

ClientRestartDataTransfer attempts to restart a data transfer with the given transfer ID and other peer

Perms: write

Inputs:

```json
[
  3,
  "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
  true
]
```

Response: `{}`

## ClientRetrieve

ClientRetrieve initiates the retrieval of a file, as specified in the order.

Perms: admin

Inputs:

```json
[
  {
    "Root": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "Piece": null,
    "DatamodelPathSelector": "Links/21/Hash/Links/42/Hash",
    "Size": 42,
    "FromLocalCAR": "string value",
    "Total": "0",
    "UnsealPrice": "0",
    "PaymentInterval": 42,
    "PaymentIntervalIncrease": 42,
    "Client": "f01234",
    "Miner": "f01234",
    "MinerPeer": {
      "Address": "f01234",
      "ID": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
      "PieceCID": null
    }
  },
  {
    "Path": "string value",
    "IsCAR": true
  }
]
```

Response: `{}`

## ClientRetrieveTryRestartInsufficientFunds

ClientRetrieveTryRestartInsufficientFunds attempts to restart stalled retrievals on a given payment channel
which are stuck due to insufficient funds

Perms: write

Inputs:

```json
[
  "f01234"
]
```

Response: `{}`

## ClientRetrieveWithEvents

ClientRetrieveWithEvents initiates the retrieval of a file, as specified in the order, and provides a channel
of status updates.

Perms: admin

Inputs:

```json
[
  {
    "Root": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "Piece": null,
    "DatamodelPathSelector": "Links/21/Hash/Links/42/Hash",
    "Size": 42,
    "FromLocalCAR": "string value",
    "Total": "0",
    "UnsealPrice": "0",
    "PaymentInterval": 42,
    "PaymentIntervalIncrease": 42,
    "Client": "f01234",
    "Miner": "f01234",
    "MinerPeer": {
      "Address": "f01234",
      "ID": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
      "PieceCID": null
    }
  },
  {
    "Path": "string value",
    "IsCAR": true
  }
]
```

Response:

```json
{
  "Event": 5,
  "Status": 0,
  "BytesReceived": 42,
  "FundsSpent": "0",
  "Err": "string value"
}
```

## ClientStartDeal

ClientStartDeal proposes a deal with a miner.

Perms: admin

Inputs:

```json
[
  {
    "Data": {
      "TransferType": "string value",
      "Root": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "PieceCid": null,
      "PieceSize": 1024,
      "RawBlockSize": 42
    },
    "Wallet": "f01234",
    "Miner": "f01234",
    "EpochPrice": "0",
    "MinBlocksDuration": 42,
    "ProviderCollateral": "0",
    "DealStartEpoch": 10101,
    "FastRetrieval": true,
    "VerifiedDeal": true
  }
]
```

Response: `null`

## ClientStatelessDeal

ClientStatelessDeal fire-and-forget-proposes an offline deal to a miner without subsequent tracking.

Perms: write

Inputs:

```json
[
  {
    "Data": {
      "TransferType": "string value",
      "Root": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "PieceCid": null,
      "PieceSize": 1024,
      "RawBlockSize": 42
    },
    "Wallet": "f01234",
    "Miner": "f01234",
    "EpochPrice": "0",
    "MinBlocksDuration": 42,
    "ProviderCollateral": "0",
    "DealStartEpoch": 10101,
    "FastRetrieval": true,
    "VerifiedDeal": true
  }
]
```

Response: `null`
