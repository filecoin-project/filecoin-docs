---
title: "GraphQL API"
description: "Filecoin Boost GraphQL API"
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "graphql-api-664ecbfa51360e1e7e1646efe94f57e8"
weight: 85
toc: true
---
# GraphQL API

Boost exposes a GraphQL API that is used by the Web UI to query and update information about Boost deals. If running on localhost on the default ports, the GraphQL API query endpoint is at [http://localhost:8080/graphql/query](http://localhost:8080/graphql/query)

You can also run your own queries against the GraphQL API using CURL or a programming language that has a [GraphQL client](https://graphql.org/code/).

Boost has a built-in GraphQL explorer at [http://localhost:8080/graphql](http://localhost:8080/graphql)

You can test out queries, or explore the GraphQL API by clicking on the `< Docs` link at the top right of the page:

![GraphQL API Explorer screenshot](<Filecoin-boost-GraphQL-API-screenshot.png>)

To run a graphql query with CURL:

```
curl -X POST
-H "Content-Type: application/json"
-d '{"query":"query { deals(offset: 5, limit: 10) { deals { ID CreatedAt PieceCid } } }"}'
http://localhost:8080/graphql/query | jq
```

This 1m video shows how to use these tools to build and run a GraphQL query against Filecoin Boost:

{{< youtube "yN_H-hDrBao" >}}

### Example Queries

1\. Query failed deals

```
curl -X POST \
-H "Content-Type: application/json" \
-d '{"query":"query { deals(limit: 10, query: \"failed to get size of imported\") { deals { ID CreatedAt Message } } }"}' \
http://localhost:8080/graphql/query | jq
```

2\. Cancel a deal where `ab12345c-5678-90de-12f3-45a6b78cd9ef` is the deal ID

```
curl -X POST \
-H "Content-Type: application/json" \
-d '{"query":"mutation { dealCancel(id: \"ab12345c-5678-90de-12f3-45a6b78cd9ef\") }"}' \
http://localhost:8080/graphql/query | jq
```
