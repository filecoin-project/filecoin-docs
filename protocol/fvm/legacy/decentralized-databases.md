---
description: >-
  Keep storage-deal metadata in Tableland SQL tables instead of contract state,
  and write to them from a smart contract on Filecoin.
---

# Decentralized databases

**Tableland is a decentralized database built on SQLite. Each table is an ERC-721 token onchain, and your contract changes it by sending SQL statements. Use it to keep application data out of contract state, where storage is expensive.**

It describes a third-party service. Check the [Tableland documentation](https://docs.tableland.xyz/) for the networks it currently supports.

The example stores the metadata of storage-deal aggregation requests in a table. When data is uploaded through an aggregation provider, you can record its status in a Tableland table and read it back with SQL in your app. For sample datasets, see the [Filecoin Dataset Explorer](https://datasets.filecoin.io/).

## What you need

* [Tableland](https://tableland.xyz/)
* [`@tableland/evm`](https://www.npmjs.com/package/@tableland/evm)
* [`@tableland/sdk`](https://www.npmjs.com/package/@tableland/sdk)
* [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)

## The table

The example uses one table. Add columns for any other aggregation metadata you need.

| Column | Type |
| --- | --- |
| `id` | integer |
| `cid` | text |
| `deal_id` | integer |
| `miner_id` | integer |
| `status` | text |

## Steps

The Solidity below is excerpted from a larger aggregator contract. Keep your own proof verification and return-data logic around it.

### 1. Create the table

Create the table in the contract constructor, so the deployed contract owns it. The excerpt assumes the contract imports `SQLHelpers`, `TablelandDeployments` and OpenZeppelin's `Strings`:

```solidity
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";
import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";

uint256 private _tableId;
string private constant _TABLE_PREFIX = "aggregator_table";

constructor() {
    _tableId = TablelandDeployments.get().create(
        address(this),
        SQLHelpers.toCreateFromSchema(
            "id integer primary key, cid text, deal_id integer, miner_id integer, status text",
            _TABLE_PREFIX
        )
    );
}
```

### 2. Insert a record for each request

Add a function that writes a row whenever an aggregation request is made:

```solidity
function insertRecord(uint256 id, string memory cid, string memory status) internal {
    TablelandDeployments.get().mutate(
        address(this), // Table owner, i.e., this contract
        _tableId,
        SQLHelpers.toInsert(
            _TABLE_PREFIX,
            _tableId,
            "id,cid,status",
            string.concat(
                Strings.toString(id),
                ",",
                SQLHelpers.quote(cid),
                ",",
                SQLHelpers.quote(status)
            )
        )
    );
}
```

Call it from `submit`, so the record goes into the table instead of contract state:

```solidity
function submit(string calldata cid) external returns (uint256) {
    // Increment the transaction ID
    transactionId++;

    // Save the CID record to the aggregator table
    insertRecord(transactionId, cid, "PROPOSED");

    emit SubmitAggregatorRequest(transactionId, cid);
    return transactionId;
}
```

### 3. Update the record when the deal is made

Add a function that updates the row once the storage deal exists:

```solidity
function updateRecord(
    uint256 id,
    uint256 dealId,
    uint256 minerId,
    string memory status
) internal {
    string memory setters = string.concat(
        "deal_id=",
        Strings.toString(dealId),
        ",miner_id=",
        Strings.toString(minerId),
        ",status=",
        SQLHelpers.quote(status)
    );
    string memory filters = string.concat("id=", Strings.toString(id));

    TablelandDeployments.get().mutate(
        address(this),
        _tableId,
        SQLHelpers.toUpdate(_TABLE_PREFIX, _tableId, setters, filters)
    );
}
```

When the storage provider has published the deal onchain, the `complete` callback tells the contract that the CID is packed into a deal. It then calls `updateRecord`:

```solidity
function complete(
    uint256 id,
    uint64 dealId,
    uint64 minerId,
    InclusionProof memory proof,
    InclusionVerifierData memory verifierData
) external returns (InclusionAuxData memory) {
    // Verify the proof and update the storage-deal state.
    InclusionAuxData memory auxData;
    updateRecord(id, dealId, minerId, "FINISHED");

    // Return the verifier data required by the full aggregator contract.
    return auxData;
}
```

### 4. Query the records

Read the table with SQL through the Tableland SDK. This returns every record for one CID:

```typescript
import { Database } from "@tableland/sdk";

const db = new Database();
const tableName = "aggregator_314159_123";
const cid = "bafy...";

const { results } = await db
  .prepare(`SELECT * FROM ${tableName} WHERE cid = ?1`)
  .bind(cid)
  .all();

console.log(results);
```

See the [Tableland prepared statements guide](https://docs.tableland.xyz/sdk/database/prepared-statements) and the [SQL helpers library](https://docs.tableland.xyz/smart-contracts/sql-helpers) for the current function signatures.

## Related pages

* [Manual storage deals](../../manual-storage-deals.md): negotiate and record a deal directly with a provider.
* [Filecoin.sol](../filecoin.sol.md): call built-in actors from Solidity.
* [FVM advanced](README.md): tools and services for FVM developers.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/fvm/legacy/decentralized-databases)
