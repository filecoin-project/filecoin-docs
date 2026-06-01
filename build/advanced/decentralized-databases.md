---
description: >-
  Learn how to store the application data with a decentralized database on
  Filecoin.
---

# Decentralized Database

### <mark style="color:blue;">Store data with Tableland</mark>

Tableland is a **decentralized database** built on the SQLite engine, which offers developers a web3-native, relational database that seamlessly integrates into their EVM-compatible stacks. Under the hood, Tableland records database tables as ERC721 tokens on-chain and enables the execution of SQL statements in a completely decentralized manner through on-chain smart contracts.

To learn more about what is tableland and how to use it, you can visit [https://tableland.xyz/](https://tableland.xyz/).

#### **Ingredients**

Ensure that you install and import the necessary dependencies in your projects.

- [Tableland](https://tableland.xyz/)
- [`@tableland/evm`](https://www.npmjs.com/package/@tableland/evm)
- [`@tableland/sdk`](https://www.npmjs.com/package/@tableland/sdk)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)

#### **Instructions**

Let's take storage deal aggregation as an example to demonstrate how to integrate it with Tableland.

When uploading data via storage aggregation providers to the Filecoin network, you can choose to store its metadata in Tableland tables instead of storing it in the chain state. This metadata can then be easily accessed from the Tableland database and utilized directly within your application.

If you require sample datasets to use, you can use the [Filecoin Dataset Explorer](https://datasets.filecoin.io/).

As an example, let's design the deal aggregator table as follows. You can add more columns to this table to include additional aggregation metadata.

| column   | data Type    |
| -------- | ------------ |
| ID       | int          |
| CID      | bytes/string |
| deal_ID  | int          |
| miner_ID | int          |
| status   | string       |

1. **Create aggregator table**

To track all deal aggregation requests submitted to the smart contract, we need to create a database table. The following Solidity excerpt assumes the contract imports `SQLHelpers`, `TablelandDeployments`, and OpenZeppelin's `Strings` utility. It creates an aggregator table in the contract constructor so the deployed contract owns the table.

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

2. We will create an `insert` function within the smart contract to add a record whenever an aggregation request is made.

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

Whenever the `submit` function is called, a record will be inserted into the aggregator table instead of being stored in the blockchain's state.

```solidity
function submit(string calldata cid) external returns (uint256) {
    // Increment the transaction ID
    transactionId++;

    // Save the CID record to aggregator_table
    insertRecord(transactionId, cid, "PROPOSED");

    // Emit the event
    emit SubmitAggregatorRequest(transactionId, cid);
    return transactionId;
}
```

3. we create an `updateRecord` function to modify an aggregator record once the `complete` function is called after the storage deal has been made on the Filecoin network.

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

After SP finishes publishing the storage deal on-chain to include an aggregation request, a callback function `complete` will be called to notify the contract that a CID is packed into a storage deal. Then we can call `updateRecord` to update the details for this CID record in the Tableland database. This is an excerpt from the broader aggregator contract; keep your existing proof verification and return-data logic around the table update.

```solidity
function complete(
    uint256 id,
    uint64 dealId,
    uint64 minerId,
    InclusionProof memory proof,
    InclusionVerifierData memory verifierData
) external returns (InclusionAuxData memory) {
    // Verify proof and update the storage-deal state.
    InclusionAuxData memory auxData;
    updateRecord(id, dealId, minerId, "FINISHED");

    // Return the verifier data required by the full aggregator contract.
    return auxData;
}
```

4. **Query aggregation records**

By using the Tableland SDK, you can query the aggregation status of all data stored with the aggregator using SQL statements. For instance, you can retrieve all records associated with a specific CID by executing a SELECT statement.

```typescript
import { Database } from "@tableland/sdk";

const db = new Database();

const { results } = await db
  .prepare(`SELECT * FROM ${tableName} WHERE cid = ?1`)
  .bind(cid)
  .all();

console.log(results);
```

To learn how to write different select statements using Tableland SDK, see the [Tableland prepared statements guide](https://docs.tableland.xyz/sdk/database/prepared-statements). For current Solidity helper signatures, use the [Tableland SQL helpers library](https://docs.tableland.xyz/smart-contracts/sql-helpers).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/advanced/decentralized-databases)
