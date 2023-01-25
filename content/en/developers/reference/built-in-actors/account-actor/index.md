---
title: "Account actor"
description: "The account actor is responsible for user account. If you want to call these methods in your smart  contracts, you need to specify method number of that method you want to invoke. Please refer the each method for its method number."
lead: "The account actor is responsible for user account. If you want to call these methods in your smart  contracts, you need to specify method number of that method you want to invoke. Please refer the each method for its method number."
draft: false
images: []
type: docs
menu:
  developers:
    identifier: "account-actor-54f808d644bb57c02f7c0abb9dbfc313"
weight: 100
toc: true
---

## AuthenticateMessage

```go
func AuthenticateMessage(params AuthenticateMessage) EmptyValue ()
```

Authenticates whether the provided signature is valid for the provided message.

`uint` AuthenticateMessageMethodNum = 2643134072.

Params:

- `struct` AuthenticateMessageParams
    - `bytes` AuthenticateMessageParamsSignature - it should be a raw byte of signature, NOT a serialized signature object with a signatureType.
    - ` bytes` Message -  The message which is signed by the corresponding account address.

Results:

- `struct` EmptyValue.

## UniversalReceiverHook

```go
func UniversalReceiverHook(params RawBytes) EmptyValue ()
```

Whenever the account receives transfers, this method will be invoked.

`uint`  UniversalReceiverHookMethodNum = 3726118371.

Params:

- `bytes[]` RawBytes - passes the bytes through how it is received.

Results:

- `struct` EmptyValue - always success.
