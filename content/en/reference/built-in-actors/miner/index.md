---
title: "Miner"
description: "The miner built-in actor responsible to deal with storage mining operations and collect proof."
lead: "The miner built-in actor responsible to deal with storage mining operations and collect proof."
draft: false
images: []
type: docs
menu:
  reference:
    identifier: "miner-b1aca08cd6fe01000479268b71b7830a"
weight: 100
toc: true
---

To interact with a specific storage provider, you must use their miner address to invoke the methods in the built-in miner actor. You also need to specify the method number for the method you want to invoke. Please refer to each method for its method number.

## GetPeerID

```go
func GetPeerID() GetPeerIDReturn {}
```

Return the Peer ID for the caller/miner address.

`uint` GetPeerIDMethodNum = 2812875329.

Params:

- null

Results:

- `struct` GetPeerIDReturn
  - `bytes` PeerID - the peer ID for the specified storage provider/miner.

## ChangePeerID

```go
func ChangePeerID(params ChangePeerIDParams) EmptyValue {}
```

Change the peer ID for the caller/miner address.

`uint`  ChangePeerIDMethodNum = 1236548004.

Params:

- `struct` ChangePeerIDParams
  - `bytes` NewID - the new peer ID.

Results:

- `struct` EmptyValue

## GetMultiaddrs

```go
func GetMultiaddrs() GetMultiAddrsReturn {}
```

Returns the multi-signature address for this caller/miner address.

`uint` GetMultiaddrsMethodNum = 1332909407.

Params:

- null

Results:

- `struct` GetMultiAddrsReturn
  - `byte[]` MultiAddrs - the multi-signature address.

## ChangeMultiaddrs

```go
func ChangeMultiaddrs(params ChangeMultiaddrsParams) EmptyValue {}
```

Change the multi-signature address for this caller/miner address.

`uint`  ChangeMultiaddrsMethodNum = 1063480576.

Params:

- `struct` ChangeMultiaddrsParams
  - `byte[]` NewMultiaddrs - the new multi-signature address.

Results:

- `struct` EmptyValue

## ChangeWorkerAddress

```go
func ChangeWorkerAddress(params ChangeWorkerAddressParams) EmptyValue {}
```

Change the worker address for the caller/miner address, and overwrite the existing addresses with the new control addresses passed in the params.

`uint` ChangeOwnerAddressMethodNum = 1010589339.

Params:

- `struct` ChangeWorkerAddressParams
  - `byte` NewWorker - the new worker address.
  - `byte[]` NewControlAddrs - the new controller addresses.

Results:

- `struct` EmptyValue

## ConfirmChangeWorkerAddress

```go
func ConfirmChangeWorkerAddress() EmptyValue {}
```

Confirm the worker address has been changed for the caller/miner address.

`uint` ConfirmChangeWorkerAddressMethodNum = 2354970453.

Params:

- null

Results:

- `struct` EmptyValue

## RepayDebt

```go
func RepayDebt() EmptyValue {}
```

Repay as much fee debt as possible for the caller/miner address.

`uint`  RepayDebtMethodNum = 3665352697.

Params:

- null

Results:

- `struct` EmptyValue

## GetOwner

```go
func GetOwner() GetOwnerReturn {}
```

Return the owner address of the caller/miner address.

`uint` GetOwnerMethodNum = 3275365574.

Params:

- null

Results:

- `struct` GetOwnerReturn
  - `byte` Owner - owner address.

## ChangeOwnerAddress

```go
func ChangeOwnerAddress(bytes address) {}
```

Proposes or confirms a change of owner address.

`uint` ChangeOwnerAddressMethodNum = 1010589339.

Params:

- `bytes` Address - the new owner address.

Results:

- `struct` EmptyValue

## GetBeneficiary

```go
func GetBeneficiary() GetBeneficiaryReturn {}
```

Return the currently active and proposed beneficiary information.

`uint` GetBeneficiaryMethodNum = 4158972569.

Params:

- null

Results:

- `struct` GetBeneficiaryReturn
  - `struct` ActiveBeneficiary - current active beneficiary.
    - `byte` Beneficiary - the address of the beneficiary.
    - `struct` BeneficiaryTerm
      - `int256` Quota - the quota token amount.
      - `int256` UsedQuota - the used quota token amount.
      - `uint64` Expiration - the epoch that the quota will be expired.

  - `struct` PendingBeneficiaryChange - the proposed and pending beneficiary.
    - `bytes` newBeneficiary - the new beneficiary address.
    - `int256` NewQuota - the new quota token amount.
    - `uint64` NewExpiration - the epoch that the new quota will be expired.
    - `bool` ApprovedByBeneficiary - if this proposal is approved by the beneficiary or not.
    - `bool` ApprovedByNominee -  if this proposal is approved by the nominee or not.

## ChangeBeneficiary

```go
func ChangeBeneficiary(params ChangeBeneficiaryParams) EmptyValue {}
```

Propose or confirm a change of beneficiary information.

`uint` ChangeBeneficiaryMethodNum = 1570634796.

Params:

- `struct` ChangeBeneficiaryParams
  - `bytes` newBeneficiary - the new beneficiary address.
  - `int256` NewQuota - the new quota token amount.
  - `uint64` NewExpiration - the epoch that the new quota will be expired.

Results:

- `struct` EmptyValue

## IsControllingAddress

```go
func IsControllingAddress(params IsControllingAddressParams) IsControllingAddressReturn {}
```

Returns whether the provided address is the Owner, the Worker, or any of the control addresses.

`uint` IsControllingAddressMethodNum = 348244887.

Params:

- `byte` IsControllingAddressParams - the address to be verified.

Results:

- `bool` IsControllingAddressReturn - if the specified address is the control address.

## GetSectorSize

```go
func GetSectorSize() GetSectorSizeReturn {}
```

Returns the miner's sector size.

`uint` GetSectorSizeMethodNum = 3858292296;

Params:

- null

Results:

- `struct` GetSectorSizeReturn
  - `unit64` SectorSize - the sector size of this miner.

## GetAvailableBalance

```go
func GetAvailableBalance() GetAvailableBalanceReturn {}
```

Returns the available balance of this miner.

`uint` GetAvailableBalanceMethodNum = 4026106874.

Params:

- null

Results:

- `int256` GetAvailableBalanceReturn - the available token balance amount.

## WithdrawBalance

```go
func WithdrawBalance(params WithdrawBalanceParams) WithdrawBalanceReturn {}
```

Withdraw the token balance for this miner.

Params:

- `struct` WithdrawBalanceParams
  - `int256` AmountRequested - withdraw token amount.

Results:

- `int256`  WithdrawBalanceReturn - the token amount withdrawn.

## GetVestingFunds

```go
func GetVestingFunds() GetVestingFundsReturn {}
```

Return the funds vesting in this miner as a list of (vesting_epoch, vesting_amount) tuples.

`uint` GetVestingFundsMethodNum = 1726876304.

Params:

- null

Results:

- `struct` GetVestingFundsReturn
  - `struct VestingFunds[]` Funds
    - `int64` Epoch - the epoch of funds vested.
    - `int256` Amount - the number of funds vested.
