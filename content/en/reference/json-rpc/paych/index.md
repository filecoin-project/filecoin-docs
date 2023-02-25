---
title: "Paych"
draft: false
images: []
type: docs
menu:
  reference:
    parent: "lorem"
    identifier: "paych-1d701d7dcd1480c00e6d8e5d0b9e14dd"
weight: 100
toc: true
aliases:
    - "/developers/reference/json-rpc/paych/"
---

The Paych methods are for interacting with and managing payment channels

## PaychAllocateLane

Perms: sign

Inputs:

```json
[
  "f01234"
]
```

Response: `42`

## PaychAvailableFunds

Perms: sign

Inputs:

```json
[
  "f01234"
]
```

Response:

```json
{
  "Channel": "\u003cempty\u003e",
  "From": "f01234",
  "To": "f01234",
  "ConfirmedAmt": "0",
  "PendingAmt": "0",
  "NonReservedAmt": "0",
  "PendingAvailableAmt": "0",
  "PendingWaitSentinel": null,
  "QueuedAmt": "0",
  "VoucherReedeemedAmt": "0"
}
```

## PaychAvailableFundsByFromTo

Perms: sign

Inputs:

```json
[
  "f01234",
  "f01234"
]
```

Response:

```json
{
  "Channel": "\u003cempty\u003e",
  "From": "f01234",
  "To": "f01234",
  "ConfirmedAmt": "0",
  "PendingAmt": "0",
  "NonReservedAmt": "0",
  "PendingAvailableAmt": "0",
  "PendingWaitSentinel": null,
  "QueuedAmt": "0",
  "VoucherReedeemedAmt": "0"
}
```

## PaychCollect

Perms: sign

Inputs:

```json
[
  "f01234"
]
```

Response:

```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

## PaychGet

There are not yet any comments for this method.

Perms: sign

Inputs:

```json
[
  "f01234",
  "f01234",
  "0"
]
```

Response:

```json
{
  "Channel": "f01234",
  "WaitSentinel": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
}
```

## PaychGetWaitReady

Perms: sign

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `"f01234"`

## PaychList

Perms: read

Inputs: `null`

Response:

```json
[
  "f01234"
]
```

## PaychNewPayment

Perms: sign

Inputs:

```json
[
  "f01234",
  "f01234",
  [
    {
      "Amount": "0",
      "TimeLockMin": 10101,
      "TimeLockMax": 10101,
      "MinSettle": 10101,
      "Extra": {
        "Actor": "f01234",
        "Method": 1,
        "Data": "Ynl0ZSBhcnJheQ=="
      }
    }
  ]
]
```

Response:

```json
{
  "Channel": "f01234",
  "WaitSentinel": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "Vouchers": [
    {
      "ChannelAddr": "f01234",
      "TimeLockMin": 10101,
      "TimeLockMax": 10101,
      "SecretPreimage": "Ynl0ZSBhcnJheQ==",
      "Extra": {
        "Actor": "f01234",
        "Method": 1,
        "Data": "Ynl0ZSBhcnJheQ=="
      },
      "Lane": 42,
      "Nonce": 42,
      "Amount": "0",
      "MinSettleHeight": 10101,
      "Merges": [
        {
          "Lane": 42,
          "Nonce": 42
        }
      ],
      "Signature": {
        "Type": 2,
        "Data": "Ynl0ZSBhcnJheQ=="
      }
    }
  ]
}
```

## PaychSettle

Perms: sign

Inputs:

```json
[
  "f01234"
]
```

Response:

```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

## PaychStatus

Perms: read

Inputs:

```json
[
  "f01234"
]
```

Response:

```json
{
  "ControlAddr": "f01234",
  "Direction": 1
}
```

## PaychVoucherAdd

Perms: write

Inputs:

```json
[
  "f01234",
  {
    "ChannelAddr": "f01234",
    "TimeLockMin": 10101,
    "TimeLockMax": 10101,
    "SecretPreimage": "Ynl0ZSBhcnJheQ==",
    "Extra": {
      "Actor": "f01234",
      "Method": 1,
      "Data": "Ynl0ZSBhcnJheQ=="
    },
    "Lane": 42,
    "Nonce": 42,
    "Amount": "0",
    "MinSettleHeight": 10101,
    "Merges": [
      {
        "Lane": 42,
        "Nonce": 42
      }
    ],
    "Signature": {
      "Type": 2,
      "Data": "Ynl0ZSBhcnJheQ=="
    }
  },
  "Ynl0ZSBhcnJheQ==",
  "0"
]
```

Response: `"0"`

## PaychVoucherCheckSpendable

Perms: read

Inputs:

```json
[
  "f01234",
  {
    "ChannelAddr": "f01234",
    "TimeLockMin": 10101,
    "TimeLockMax": 10101,
    "SecretPreimage": "Ynl0ZSBhcnJheQ==",
    "Extra": {
      "Actor": "f01234",
      "Method": 1,
      "Data": "Ynl0ZSBhcnJheQ=="
    },
    "Lane": 42,
    "Nonce": 42,
    "Amount": "0",
    "MinSettleHeight": 10101,
    "Merges": [
      {
        "Lane": 42,
        "Nonce": 42
      }
    ],
    "Signature": {
      "Type": 2,
      "Data": "Ynl0ZSBhcnJheQ=="
    }
  },
  "Ynl0ZSBhcnJheQ==",
  "Ynl0ZSBhcnJheQ=="
]
```

Response: `true`

## PaychVoucherCheckValid

Perms: read

Inputs:

```json
[
  "f01234",
  {
    "ChannelAddr": "f01234",
    "TimeLockMin": 10101,
    "TimeLockMax": 10101,
    "SecretPreimage": "Ynl0ZSBhcnJheQ==",
    "Extra": {
      "Actor": "f01234",
      "Method": 1,
      "Data": "Ynl0ZSBhcnJheQ=="
    },
    "Lane": 42,
    "Nonce": 42,
    "Amount": "0",
    "MinSettleHeight": 10101,
    "Merges": [
      {
        "Lane": 42,
        "Nonce": 42
      }
    ],
    "Signature": {
      "Type": 2,
      "Data": "Ynl0ZSBhcnJheQ=="
    }
  }
]
```

Response: `{}`

## PaychVoucherCreate

Perms: sign

Inputs:

```json
[
  "f01234",
  "0",
  42
]
```

Response:

```json
{
  "Voucher": {
    "ChannelAddr": "f01234",
    "TimeLockMin": 10101,
    "TimeLockMax": 10101,
    "SecretPreimage": "Ynl0ZSBhcnJheQ==",
    "Extra": {
      "Actor": "f01234",
      "Method": 1,
      "Data": "Ynl0ZSBhcnJheQ=="
    },
    "Lane": 42,
    "Nonce": 42,
    "Amount": "0",
    "MinSettleHeight": 10101,
    "Merges": [
      {
        "Lane": 42,
        "Nonce": 42
      }
    ],
    "Signature": {
      "Type": 2,
      "Data": "Ynl0ZSBhcnJheQ=="
    }
  },
  "Shortfall": "0"
}
```

## PaychVoucherList

Perms: write

Inputs:

```json
[
  "f01234"
]
```

Response:

```json
[
  {
    "ChannelAddr": "f01234",
    "TimeLockMin": 10101,
    "TimeLockMax": 10101,
    "SecretPreimage": "Ynl0ZSBhcnJheQ==",
    "Extra": {
      "Actor": "f01234",
      "Method": 1,
      "Data": "Ynl0ZSBhcnJheQ=="
    },
    "Lane": 42,
    "Nonce": 42,
    "Amount": "0",
    "MinSettleHeight": 10101,
    "Merges": [
      {
        "Lane": 42,
        "Nonce": 42
      }
    ],
    "Signature": {
      "Type": 2,
      "Data": "Ynl0ZSBhcnJheQ=="
    }
  }
]
```

## PaychVoucherSubmit

Perms: sign

Inputs:

```json
[
  "f01234",
  {
    "ChannelAddr": "f01234",
    "TimeLockMin": 10101,
    "TimeLockMax": 10101,
    "SecretPreimage": "Ynl0ZSBhcnJheQ==",
    "Extra": {
      "Actor": "f01234",
      "Method": 1,
      "Data": "Ynl0ZSBhcnJheQ=="
    },
    "Lane": 42,
    "Nonce": 42,
    "Amount": "0",
    "MinSettleHeight": 10101,
    "Merges": [
      {
        "Lane": 42,
        "Nonce": 42
      }
    ],
    "Signature": {
      "Type": 2,
      "Data": "Ynl0ZSBhcnJheQ=="
    }
  },
  "Ynl0ZSBhcnJheQ==",
  "Ynl0ZSBhcnJheQ=="
]
```

Response:

```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```
