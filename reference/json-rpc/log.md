# Log

## LogAlerts

Perms: admin

Inputs: `null`

Response:

```json
[
  {
    "Type": {
      "System": "string value",
      "Subsystem": "string value"
    },
    "Active": true,
    "LastActive": {
      "Type": "string value",
      "Message": "json raw message",
      "Time": "0001-01-01T00:00:00Z"
    },
    "LastResolved": {
      "Type": "string value",
      "Message": "json raw message",
      "Time": "0001-01-01T00:00:00Z"
    }
  }
]
```

## LogList

Perms: write

Inputs: `null`

Response:

```json
["string value"]
```

## LogSetLevel

Perms: write

Inputs:

```json
["string value", "string value"]
```

Response: `{}`



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/reference/json-rpc/log)
