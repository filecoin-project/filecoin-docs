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

* [Tableland](https://tableland.xyz/)
* [RaaS Starter Kit](https://github.com/filecoin-project/raas-starter-kit)
* [Openzeppelin](https://docs.openzeppelin.com/contracts/5.x/)

#### **Instructions**

Let's take storage deal aggregator/RaaS as an example to demonstrate how to integrate it with Tableland.

When uploading data via aggregator/RaaS providers to the Filecoin network, you can choose to store its metadata in Tableland tables instead of storing it in the chain state. This metadata can then be easily accessed from the Tableland database and utilized directly within your application.

If you require sample datasets to use, you can use the [Filecoin Dataset Explorer](https://dataset-explorer.vercel.app/).

As an example, let's design the deal aggregator table as follows. However, you can certainly add more columns to this table to include additional information, such as RaaS registration.

| column    | data Type    |
| --------- | ------------ |
| ID        | int          |
| CID       | bytes/string |
| deal\_ID  | int          |
| miner\_ID | int          |
| status    | string       |

1. **Create aggregator table**

To track all the deal aggregation/RaaS requests submitted to the smart contract, we need to create a database table. You can add the following code to create an aggregator table within the `constructor()` function of the aggregator contract. This way, when the aggregator/RaaS contract is deployed, an aggregator table will be created to store the metadata of the aggregation requests.

```solidity
uint256 private tableId;
string private constant _TABLE_PREFIX = "aggregaor_table"; // Custom table prefix

// Constructor that creates a table, sets the controller, and inserts data
constructor() {
        // Create a table
        tableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "id int, cid string, deal_id string, miner_id string, status string",
                _TABLE_PREFIX
            )
        );
    }C
```

2. We will create an `insert` function within the smart contract to add a record whenever an aggregation request is made.

```solidity
function insertRecord(uint256 id, string memory val, string memory status) external {
 
    TablelandDeployments.get().mutate(
        address(this), // Table owner, i.e., this contract
        _tableId,
        SQLHelpers.toInsert(
            _TABLE_PREFIX,
            _tableId,
            "id,cid,status",
            string.concat(
                Strings.toString(id), // Convert to a string
                ",",
                SQLHelpers.quote(val) // Wrap strings in single quotes with the `quote` method
            )
        ));}
```

Whenever the `submit` or `submitRaaS` function is called, a record will be inserted into the aggregator table instead of being stored in the blockchain's state.

<pre class="language-solidity"><code class="lang-solidity"><strong>function submit(bytes memory _cid) external returns (uint256) {
</strong>        // Increment the transaction ID
        transactionId++;

        // Save _cid record to aggregator_table
        insertRecord(transactionId, _cid, "PROPOSED");

        // Emit the event
        emit SubmitAggregatorRequest(transactionId, _cid);
        return transactionId;
    }
</code></pre>

3. we create an `updateRecord` function to modify an aggregator record once the `complete` function is called after the storage deal has been made on the Filecoin network.

```solidity
// Update aggregation record in the table
    function updateRecord(uint256 id, uint256 memory dealId, uint256 memory minerId, string memory status) external {
        // Set the values to update
        string memory setters = string.concat("deal_id=", Strings.toString(dealId),
                                              "miner_id=", Strings.toString(minerId),
                                              "status=", SQLHelpers.quote(status));
        // Specify filters for which row to update
        string memory filters = string.concat("id=",Strings.toString(id));
        // Mutate a row at `id` with deal_id, miner_id, status
        TablelandDeployments.get().mutate(
            address(this),
            _tableId,
            SQLHelpers.toUpdate(_TABLE_PREFIX, _tableId, setters, filters)
        );
    }
```

After SP finishes publishing the storage deal on-chain to include an aggregation request, a callback function `complete` will be called to notify the contract that a CID is packed into a storage deal. Then we can call `updateRecord` to update the details for this CID record in the Tableland database.

```solidity
function complete(
        uint256 _id,
        uint64 _dealId,
        uint64 _minerId,
        InclusionProof memory _proof,
        InclusionVerifierData memory _verifierData
    ) external returns (InclusionAuxData memory) {
// other code
	updateTable(_id, _dealId, _minerId, "FINISHED");
}
```

4. **Query aggregation records**&#x20;

By using the Tableland SDK, you can easily query the aggregation or RaaS status of all the data stored with the aggregator using SQL statements. For instance, you can retrieve all records associated with a specific CID by executing a SELECT statement.

```jsx
const db = new Database();

const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE cid = ?`)
														.bind(cid);
console.log(results);
```

To learn how to write different select statements using Tableland SDK, you can refer to [here](https://docs.tableland.xyz/sdk/database/prepared-statements).
