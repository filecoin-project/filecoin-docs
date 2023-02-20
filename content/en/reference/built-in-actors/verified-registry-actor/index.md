---
title: "Verified registry actor"
description: "Verified registry actor is responsible for managing verified clients."
lead: "Verified registry actor is responsible for managing verified clients."
draft: false
images: []
type: docs
menu:
  reference:
    identifier: "verified-registry-actor-0477674322e4ebcac7f2d1c6dcef8f6a"
weight: 100
toc: true
---

The ActorCode for the verified registry built-in actor is `hex"0006"` which will be used to call the exported methods in the verified registry built-in actor. You need to specify the method number for the method you want to invoke. Please referer to each method for its method number.

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

Remove the expired DataCap allocations and reclaim those DataCap tokens back to the client. If the allocation amount is not specified, all expired DataCap allocations will be removed.

`uint`  RemoveExpiredAllocationsMethodNum = 2873373899.

Params:

- `struct` RemoveExpiredAllocationsParams
  - `uint64` Client - the client address to remove the expired tokens from.
  - `uint64[]` AllocationIDs - List of allocation IDs to attempt to remove. If empty, this method will remove all eligible expired tokens.

Results:

- `struct` RemoveExpiredAllocationsReturn
  - `unit64[] `Considered - Allocation IDs are either specified by the caller or discovered to be expired.
  - `BatachReturn` Results - results for each processed allocation.
  - `int256` DataCapRecoverd - The amount of DataCap token reclaimed for the client.

## GetClaims

```go
func GetClaims(params GetClaimsParams) GetClaimsReturn {}
```

Return a list of claims corresponding to the requested claim ID for a specific provider.

`uint`  GetClaimsMethodNum = 2199871187.

Params:

- `struct`GetClaimsParams
  - `uint64` Provider - the provider address.
  - `unit64[]` ClaimIDs - A list of Claim IDs for a specific provider.

Results:

- `struct` GetClaimsReturn
  - `struct` BatchReturn
    - `uint32` SuccessCount - total successes in the batch.
    - `struct ` FailCode[] {`uint32` idx, `uint32` code} -  list of failure code and index for all failures in batch.

  - `struct Claim[]` Claims - list of Claims returned.
    - `uint64` Provider - The provider that is storing the data.
    - `uint64` Client - The client that originally allocated the DataCap.
    - `bytes` Data - Identifier for the data committed.
    - `uint64` Size - The size of the data.
    - `int64` TermMin - The minimum period after the term starts, during which the provider must commit to storing data.
    - `int64` TermMax - The maximum period after the term starts for which the provider can earn Quality Adjusted power for the data.
    - `int64` TermStart - the epoch at which the piece was committed.
    - `unit64` Sector - ID of the provider's sector in which the data is committed.

## ExtendClaimTerms

```go
func ExtendClaimTerms(params ExtendClaimTermsParams) ExtendClaimTermsReturn {}
```

Extends the maximum term of some claims up to the largest value they could have been originally allocated. This method can only be called by the claims' client.

`uint` ExtendClaimTermsMethodNum = 1752273514.

Params:

- `struct` ExtendClaimTermsParams
  - `struct ClaimTerm[]` Terms
    - `uint64 ` Provider - The provider address which stores the data.
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
  - `unit64[]` ClaimIDs - A list of Claim IDs with an expired term. If no claims are specified, all eligible claims will be removed.

Results:

- `struct` RemoveExpiredClaimsReturn
  - `uint64[]` Considered - a list of IDs of the claims that were either specified by the caller or discovered to be expired.
  - `struct` BatchReturn
    - `uint32` SuccessCount - total successes in the batch
    - `struct` FailCodes[] {`uint32` idx, `uint32` code} -  list of failure code and index for all failures in batch.
