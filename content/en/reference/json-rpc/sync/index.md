---
title: "Sync"
draft: false
images: []
type: docs
menu:
  reference:
    parent: "reference-json-rpc"
    identifier: "sync-5367a4c66dfc4f3296538de90ab2e3a9"
weight: 100
toc: true
aliases:
    - "/developers/reference/json-rpc/sync/"
---

The Sync method group contains methods for interacting with and
observing the lotus sync service.

## SyncCheckBad

SyncCheckBad checks if a [block](https://docs.filecoin.io/reference/general/glossary/#block) was marked as bad, and if it was, returns
the reason.

Perms: read

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `"string value"`

## SyncCheckpoint

SyncCheckpoint marks a blocks as checkpointed, meaning that it won't ever fork away from it.

Perms: admin

Inputs:

```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `{}`

## SyncIncomingBlocks

SyncIncomingBlocks returns a channel streaming incoming, potentially not
yet synced block headers.

Perms: read

Inputs: `null`

Response:

```json
{
  "Miner": "f01234",
  "Ticket": {
    "VRFProof": "Ynl0ZSBhcnJheQ=="
  },
  "ElectionProof": {
    "WinCount": 9,
    "VRFProof": "Ynl0ZSBhcnJheQ=="
  },
  "BeaconEntries": [
    {
      "Round": 42,
      "Data": "Ynl0ZSBhcnJheQ=="
    }
  ],
  "WinPoStProof": [
    {
      "PoStProof": 8,
      "ProofBytes": "Ynl0ZSBhcnJheQ=="
    }
  ],
  "Parents": [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    }
  ],
  "ParentWeight": "0",
  "Height": 10101,
  "ParentStateRoot": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "ParentMessageReceipts": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Messages": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "BLSAggregate": {
    "Type": 2,
    "Data": "Ynl0ZSBhcnJheQ=="
  },
  "Timestamp": 42,
  "BlockSig": {
    "Type": 2,
    "Data": "Ynl0ZSBhcnJheQ=="
  },
  "ForkSignaling": 42,
  "ParentBaseFee": "0"
}
```

## SyncMarkBad

SyncMarkBad marks a blocks as bad, meaning that it won't ever by synced.
Use with extreme caution.

Perms: admin

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `{}`

## SyncState

SyncState returns the current status of the lotus sync system.

Perms: read

Inputs: `null`

Response:

```json
{
  "ActiveSyncs": [
    {
      "WorkerID": 42,
      "Base": {
        "Cids": null,
        "Blocks": null,
        "Height": 0
      },
      "Target": {
        "Cids": null,
        "Blocks": null,
        "Height": 0
      },
      "Stage": 1,
      "Height": 10101,
      "Start": "0001-01-01T00:00:00Z",
      "End": "0001-01-01T00:00:00Z",
      "Message": "string value"
    }
  ],
  "VMApplied": 42
}
```

## SyncSubmitBlock

SyncSubmitBlock can be used to submit a newly created block to the.
network through this node

Perms: write

Inputs:

```json
[
  {
    "Header": {
      "Miner": "f01234",
      "Ticket": {
        "VRFProof": "Ynl0ZSBhcnJheQ=="
      },
      "ElectionProof": {
        "WinCount": 9,
        "VRFProof": "Ynl0ZSBhcnJheQ=="
      },
      "BeaconEntries": [
        {
          "Round": 42,
          "Data": "Ynl0ZSBhcnJheQ=="
        }
      ],
      "WinPoStProof": [
        {
          "PoStProof": 8,
          "ProofBytes": "Ynl0ZSBhcnJheQ=="
        }
      ],
      "Parents": [
        {
          "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
        }
      ],
      "ParentWeight": "0",
      "Height": 10101,
      "ParentStateRoot": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "ParentMessageReceipts": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "Messages": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "BLSAggregate": {
        "Type": 2,
        "Data": "Ynl0ZSBhcnJheQ=="
      },
      "Timestamp": 42,
      "BlockSig": {
        "Type": 2,
        "Data": "Ynl0ZSBhcnJheQ=="
      },
      "ForkSignaling": 42,
      "ParentBaseFee": "0"
    },
    "BlsMessages": [
      {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      }
    ],
    "SecpkMessages": [
      {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      }
    ]
  }
]
```

Response: `{}`

## SyncUnmarkAllBad

SyncUnmarkAllBad purges bad block cache, making it possible to sync to chains previously marked as bad

Perms: admin

Inputs: `null`

Response: `{}`

## SyncUnmarkBad

SyncUnmarkBad unmarks a blocks as bad, making it possible to be validated and synced again.

Perms: admin

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `{}`

## SyncValidateTipset

SyncValidateTipset indicates whether the provided tipset is valid or not

Perms: read

Inputs:

```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    {
      "/": "bafy2bzacebp3shtrn43k7g3unredz7fxn4gj533d3o43tqn2p2ipxxhrvchve"
    }
  ]
]
```

Response: `true`
