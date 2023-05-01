---
title: "Chainstack"
description: ""
lead: "Instead of manually managing and running a node, developers can use third-party node providers like Chainstack to execute transactions."
draft: false
images: []
type: docs
menu:
  nodes:
    parent: "nodes-node-providers"
    identifier: "chainstack-9dd0faa64549ac31b4f37028c6f7fda6"
weight: 100
toc: true
---

The ChainStack RPC API, maintained by [Chainstack Labs](https://chainstack.com/), provides high-performance Hyperspace testnet nodes for Filecoin builders, especially for applications built on the Filecoin Virtual Machine. The ChainStack RPC API provides both a standard endpoint and a WebSocket endpoint. For further information, see the [official page](https://chainstack.com/labs/#filecoin)

## HTTP endpoints

```plaintext
https://filecoin-hyperspace.chainstacklabs.com/rpc/v0
```

## Web socket endpoints

```plaintext
wss://ws-filecoin-hyperspace.chainstacklabs.com/rpc/v0
```

## Curl example

```shell
curl -X POST 'https://filecoin-hyperspace.chainstacklabs.com/rpc/v0' \
    -H 'Content-Type: application/json' \
    --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.ChainHead","params":[]}'
```

```plaintext
{"jsonrpc":"2.0","result":{"Cids":[{"/":"bafy2bzaceb564gpoyebphhe3pqonepowqwollggiq5gs475xmgdzlcrjkh4dg"}],"Blocks":[{"Miner":"t013231","Ticket":{"VRFProof":"gsQRyOpLSA//cUz53+5tsyIi/RSWMmQFdjqKWBzuay2h6gDLk/Inpa4RLcS7i9zqEClcQDdr2PFDsXy08Som7jy6RceHqxBg25lfYYADjQqDjxqFcYVTPic2ew+XU7yK"},"ElectionProof":{"WinCount":1,"VRFProof":"iRU3ilpKHvxkFneb59r9ucp8dHCEEVG0lzn9gFXdL1MAZ9hdLWgz2qFKSNAQtolnBUT47ZPTQ2lQy2hXY/qlrOGwSCpv4HyfUhyuOrIg2iMH5YZSmtzNT3nlKq21UtP5"},"BeaconEntries":[{"Round":2742077,"Data":"pp/mXW2iy60GkiGjDLdw7qAPQv96PiM4VCC6OEd4Fv0u/j//Euvy5YDakin1b+kVEQs2W+vOsam69r8Ba/h8DliLF1ak8Iv37OIBj2vYe8awhYdIIcEZXdQ1UP9sWWZu"}],"WinPoStProof":[{"PoStProof":2,"ProofBytes":"kyL8CeJCuZHJVc804Pzk48OtnfgsI4QdiO8cxNFKsV+qXxjnfDhCSZLfi9EwhEwFq0KgUYguGkofYARINsNPDZOXDhkaUpPrbfvzTYKZV0lybnk+7fjSpCmMY1C3cJWACadaJPsBEPHIuY7FauaNHQSwz6MFF5dL4ZgjT/UREeWZwfI1nyt1KbHFBGwRP5fppkkPLAG66p4K8XvPsy3XWiGfVPWDxLtRVq3is/ylfJD4aSot1xWL6YdUix6F9RDf"}],"Parents":[{"/":"bafy2bzacedl4j5jmr2bnsq4ne2zupdoeqbyw7h4sjsrgl7ctzg55ibkwrhfli"}],"ParentWeight":"2054289234","Height":128152,"ParentStateRoot":{"/":"bafy2bzacedajemhol7s5ggun736npjho4ftaam2opjpunshthlwmwfw7ft4po"},"ParentMessageReceipts":{"/":"bafy2bzacedswlcz5ddgqnyo3sak3jmhmkxashisnlpq6ujgyhe4mlobzpnhs6"},"Messages":{"/":"bafy2bzacecmda75ovposbdateg7eyhwij65zklgyijgcjwynlklmqazpwlhba"},"BLSAggregate":{"Type":2,"Data":"wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"},"Timestamp":1677693360,"BlockSig":{"Type":2,"Data":"jd5DkcNnf8UoafY3XAl3sEvjhVeMzFYv9746i6X8ENTrPP/VSLcyJdZFGQ79WsDCFr9dpH81A/CTocGe4mcHbU8+pVfeQckBDCo9Mo75OGMpzRx2K+rLryrOUqPWHbOb"},"ForkSignaling":0,"ParentBaseFee":"100"}],"Height":128152},"id":1}
```
