---
title: "Datacap"
description: "DataCap Actor is responsible for DataCap token management."
lead: "DataCap Actor is responsible for DataCap token management."
draft: false
images: []
type: docs
menu:
  protocol-api::
    identifier: "datacap-e8dfb5ee09c54a7ebf5abe8960148c63"
weight: 100
toc: true
---

The ActorCode for DataCap actor is `hex"0007"` which will be used to call DataCap actor APIs. You also need to specify the method number of which method you want to invoke. Refer to each method for its method number.

## Name

```go
func Name() String {}
```

Return the name of DataCap token which is 'DataCap'.

`Unit` NameMethodNum : 48890204.

Params:

- null

Results:

- `String` : DataCap

## Symbol

```go
func Symbol() String {}
```

Return the symbol of DataCap token which is 'DCAP'.

`unit` SymbolMethodNum: 2061153854.

Params:

- null

Results:

- `String` : DCAP

## TotalSupply

```go
func TotalSupply() TokenAmount {}
```

Return the total supply of the DataCap token.

`uint` TotalSupplyMethodNum: 114981429.

Params:

- null

Results:

- `int256` TokenAmount - Total DataCap token supply.

## Balance

```go
func Balance(params Address) TokenAmount {}
```

Return the DataCap token balance for the wallet address.

`unit` BalanceOfMethodNum: 3261979605.

Params:

- `bytes` Address - the wallet address.

Results:

- `int256` TokenAmount - the DataCap token balance for the specified wallet address.

## Transfer

```go
func Transfer(params TransferParams) TransferReturn {}
```

Transfers DataCap tokens from caller address to the to address.

`uint`  TransferMethodNum = 80475954;

Params:

- `struct` TransferParams
  - `bytes` To -  the address to receive DataCap token.
  - `int256` Amount -  A non-negative amount to transfer.
  - `bytes[]` OperatorData - Arbitrary data to pass on via the receiver hook.

Results:

- `struct` TransferReturn
  - `int256` FromBalance - the balance of from_address.
  - `int256` ToBalance - the balance of to_address.
  - `bytes` RecipientData: data returned from receive hook.

## TransferFrom

```go
func TransferFrom(params TransferFromParams) TransferFromReturn {}
```

Transfers DataCap between the from_address to the to_address.

`uint`  TransferFromMethodNum = 3621052141.

Params:

- `bytes` TransferFromParams
  - `bytes` From - the address to send DataCap Token.
  - `bytes` To - the address to receive DataCap Token.
  - `int256` Amount - A non-negative amount to transfer.
  - `bytes` OperatorData: Arbitrary data to pass on via the receiver hook.

Results:

- `struct` TransferFromReturn
  - `int256` FromBalance - the balance of from_address.
  - `int256` ToBalance -  the balance of to_address.
  - `int256` Allowance - the remaining allowance of owner address.
  - `bytes` RecipientData - data returned from receive hook.

## IncreaseAllowance

```go
func IncreaseAllowance(params IncreaseAllowanceParams) TokenAmount {}
```

Increase the DataCap token allowance that an operator can control by the requested amount.

`uint`  IncreaseAllowanceMethodNum = 1777121560.

Params:

- `struct` IncreaseAllowanceParams
  - `bytes` Operator - the  wallet address of the operator.
  - `int256` increaseAmount - increase DataCap token allowance for the operator address.

Results:

- `int256` TokenAmount - the new DataCap allowance of the operator address.

## DecreaseAllowance

```go
func DecreaseAllowance(params DecreaseAllowanceParams) TokenAmount {}
```

Decrease the DataCap token allowance that an operator controls of the owner's balance by the requested amount.

`uint` DecreaseAllowanceMethodNum = 1529376545;

Params:

- `struct` DecreaseAllowanceParams
  - `bytes` Operator - the  wallet address of the operator.
  - `int256` IncreaseAmount - the decreased DataCap token allowance of the operator address.

Results:

- `int256` TokenAmount - the new DataCap allowance of the operator address.

## RevokeAllowance

```go
func RevokeAllowance(params RevokeAllowanceParams) TokenAmount {}
```

Revoke the DataCap token allowance from the operator and set the operator's allowance in behave of owner/caller address to 0.

`uint` RevokeAllowanceMethodNum = 2765635761.

Params:

- `struct`  RevokeAllowanceParams
  - `bytes` Operator - the wallet address of the operator.

Results:

- `int256` TokenAmount - the old Allowance amount of the operator address.

## Burn

```go
func Burn(params BurnParams) TokenAmount {}
```

Burn an amount of DataCap token from the owner/caller address, decreasing total token supply.

`uint` BurnMethodNum = 1434719642.

Params:

- `struct` BurnParams
  - `int256` Amount - the amount the DataCap token to be burned.

Results:

- `int256` TokenAmount - the updated DataCap token balance of the owner/caller address.

## BurnFrom

```go
func BurnFrom(params BurnFromParams) BurnFromReturn {}
```

Burn an amount of DataCap token from the specified address (owner address), decrease the allowance of operator/caller, and decrease total token supply.

`uint` BurnFromMethodNum = 2979674018.

Params:

- `struct` BurnFromParams
  - `bytes` Owner - the wallet address of the owner.
  - `int256` Amount - the amount of DataCap token to be burned.

Results:

- `struct` BurnFromReturn
  - `bytes`  Owner - the wallet address of the owner.
  - `int256` Amount - the new balance of owner wallet.

## Allowance

```go
func Allowance(params GetAllowanceParams) TokenAmount {}
```

Return the allowance between owner and operator address.

`uint` AllowanceMethodNum = 4205072950;

Params:

- `struct` GetAllowanceParams
  - `bytes` Owner : the wallet address of the owner.
  - `bytes` Operator : the wallet address of the owner.

Results:

- `int256`  TokenAmount - the allowance that an operator can control of an owner's allowance.
