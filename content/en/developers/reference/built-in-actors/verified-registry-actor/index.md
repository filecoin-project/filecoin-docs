---
title: "Verified registry actor"
description: "Verified registry actor is responsible for managing verified clients."
lead: "Verified registry actor is responsible for managing verified clients."
draft: false
images: []
type: docs
menu:
  developers:
    identifier: "verified-registry-actor-0477674322e4ebcac7f2d1c6dcef8f6a"
weight: 100
toc: true
---

The ActorCode for verified registry built-in actor is `hex"0006"` which will be used to call the exported methods in verified registry built-in actor. You also need to specify method number of which method you want to invoke. Please refer the each method for its method number.

## AddVerifiedClient

```go
func AddVerifiedClient(params AddVerifiedClientParams) EmptyValue {}
```

To add a verified Client address to Filecoin Plus program.

`uint` constant AddVerifierClientMethodNum = 3916220144.

Params:

- `struct` AddVerifierClientParams
  - `bytes` Address - the verified client address
  - `int256` Allowance - approved DataCap for this verified client

Results:

- `struct` EmptyValue.

## RemoveExpiredAllocations

```go
func RemoveExpiredAllocations(params RemoveExpiredAllocationsParams) RemoveExpiredAllocationsReturn {}
```

Remove the expired DataCap allocations and reclaimed those DataCap token back to Client. If the allocation amount is not specified, all expired DataCap allocation will be removed.

`uint`  RemoveExpiredAllocationsMethodNum = 2873373899.

Params:

- `struct` RemoveExpiredAllocationsParams
  - `uint64` Client - the client address for which to expired allocations.
  - `uint64[]` AllocationIDs - List of allocation IDs to attempt to remove. If empty, will remove all eligible expired allocations.

Results:

- `struct` RemoveExpiredAllocationsReturn
  - `unit64[] `Considered - Allocation IDs are either specified by the caller or discovered to be expired.
  - `BatachReturn` Results - results for each processed allocation.
  - `int256` DataCapRecoverd - The amount of DataCap token reclaimed for the client.

## GetClaims

```go
func GetClaims(params GetClaimsParams) GetClaimsReturn {}
```

Return a list of claims corresponding to the requested claim ID for specific provider.

`uint`  GetClaimsMethodNum = 2199871187.

Params:

- `struct`GetClaimsParams
  - `uint64` Provider - the provider address.
  - `unit64[]` ClaimIDs - A list of Claim IDs for specific provider.

Results:

- `struct` GetClaimsReturn
  - `struct` BatchReturn
    - `uint32` SuccessCount - total successes in the batch.
    - `struct ` FailCode[] {`uint32` idx, `uint32` code} -  list of failure code and index for all failures in batch.

  - `struct Claim[]` Claims - list of Claims returned.
    - `uint64` Provider - The provider storing the data.
    - `uint64` Client - The client which allocated the DataCap.
    - `bytes` Data - Identifier for the data committed.
    - `uint64` Size - The size of the data.
    - `int64` TermMin - The min period after term started which the provider must commit to storing data.
    - `int64` TermMax - The max period after term started for which the provider can earn QA-power for the data.
    - `int64` TermStart - the epoch at which the piece was committed.
    - `unit64` Sector - ID of the provide's sector in which the data is committed.

## ExtendClaimTerms

```go
func ExtendClaimTerms(params ExtendClaimTermsParams) ExtendClaimTermsReturn {}
```

Extends the  maximum term of some claims up to the largest value they could have been originally allocated. This method can only be called by the claims' client.

`uint` ExtendClaimTermsMethodNum = 1752273514.

Params:

- `struct` ExtendClaimTermsParams
  - `struct ClaimTerm[]` Terms
    - `uint64 ` Provider - The provider address which storing the data.
    - `uint64 ` CliamID - Claim ID.
    - `int64` TermMax - The max chain epoch to extend.

Results:

- `struct` ExtendClaimTermsReturn
  - `struct` BatchReturn
    - `uint32` SuccessCount - total successes in the batch.
    - `struct ` FailCodes[] {`uint32` idx, `uint32` code} -  list of failure code and index for all failures in batch.

## RemoveExpiredClaims

``` go
func RemoveExpiredClaims(params: RemoveExpiredClaimsParams) RemoveExpiredClaimsReturn {}
```

To remove a claim with its maximum term has elapsed.

`uint` RemoveExpiredClaimsMethodNum = 2873373899.

Params:

- `struct` RemoveExpiredClaimsParams
  - `uint64` Provider - the provider address.
  - `unit64[]` ClaimIDs - A list of Claim IDs with expired term. If no claims are specified, all eligible claims will be removed.

Results:

- `struct` RemoveExpiredClaimsReturn
  - `uint64[]` Considered - a list of IDs of the claims that were either specified by the caller or discovered to be expired.
  - `struct` BatchReturn
    - `uint32` SuccessCount - total successes in the batch
    - `struct ` FailCodes[] {`uint32` idx, `uint32` code} -  list of failure code and index for all failures in batch.
