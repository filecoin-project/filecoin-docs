---
description: >-
  The functions of the PDP Verifier contract, which checks that providers still hold the data they store.
---

# PDP Verifier contract

**The PDP Verifier keeps track of data sets and their pieces, sends random challenges, and checks the proofs providers send back.** Each data set has a **listener**: a service contract, such as FWSS, that the PDP Verifier calls when the data set changes or a proof passes.

Source: [FilOzone/pdp](https://github.com/FilOzone/pdp). Addresses: [Contract addresses](addresses.md).

## Terms

| Term | Meaning |
| --- | --- |
| Data set | A group of pieces stored and proven together by one provider |
| Piece | One stored item in a data set, such as a file |
| PieceCID | The ID of a piece, made from its content |
| Proving period | The time a provider has to answer each challenge |

## Functions a provider calls

| Function | What it does |
| --- | --- |
| `createDataSet(listenerAddr, extraData)` | Creates a data set |
| `addPieces(setId, listenerAddr, pieceData, extraData)` | Adds pieces to a data set |
| `schedulePieceDeletions(setId, pieceIds, extraData)` | Schedules pieces for removal |
| `provePossession(setId, proofs)` | Sends proofs for the current challenge |
| `nextProvingPeriod(setId, challengeEpoch, extraData)` | Starts the next proving period |
| `deleteDataSet(setId, extraData)` | Deletes a data set |

## Read functions

| Function | Returns |
| --- | --- |
| `dataSetLive(setId)` | Whether a data set exists |
| `getDataSetStorageProvider(setId)` | The provider of a data set |
| `getDataSetListener(setId)` | The listener contract of a data set |
| `getActivePieces(setId, offset, limit)` | A page of a data set's pieces |
| `getActivePieceCount(setId)` | How many pieces a data set has |
| `getPieceCid(setId, pieceId)` | A piece's PieceCID |
| `findPieceIdsByCid(setId, pieceCid, startPieceId, limit)` | Piece IDs for a PieceCID |
| `pieceLive(setId, pieceId)` | Whether a piece is stored |
| `getNextChallengeEpoch(setId)` | When the next challenge starts |
| `getDataSetLastProvenEpoch(setId)` | When the data set was last proven |
| `getScheduledRemovals(setId)` | Pieces waiting to be removed |
| `calculateProofFee(setId)` | The fee for the next proof |

## Next steps

* [Filecoin Warm Storage Service contract](fwss.md): the listener that connects proofs to payments.
* [Contract addresses](addresses.md): where the PDP Verifier is deployed.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/reference/contracts/pdp-verifier)
