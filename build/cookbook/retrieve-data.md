---
description: >-
  Reference-only guide to official retrieval resources for accessing data stored
  on Filecoin.
---

# Retrieve Data

### <mark style="color:blue;">Retrieve data using retrieval clients</mark>

To retrieve data stored on the Filecoin network, the basic process involves making retrieval requests to storage providers or IPFS peers using the root Content ID (CID) for the data.

Filecoin retrieval clients handle provider discovery and transport selection behind the scenes. Provide the root CID, and the client returns the data through a command-line interface or a library integration.

#### **Ingredients**

With a given CID, you can use the following maintained retrieval tooling:

* [Lassie](https://github.com/filecoin-project/lassie): retrieves IPFS and Filecoin content over the best available protocols.
* [go-car](https://github.com/ipld/go-car): reads, lists, and extracts content-addressed archive (CAR) files.

#### **Instructions**

**Retrieving content with Lassie**

Install the current Lassie and go-car command-line tools. Make sure [Go](https://go.dev/doc/install) is installed and that your Go binary directory is on your `PATH`, or download the latest binaries from the [Lassie releases](https://github.com/filecoin-project/lassie/releases/latest) and [go-car releases](https://github.com/ipld/go-car/releases/latest):

```sh
go install github.com/filecoin-project/lassie/cmd/lassie@latest
go install github.com/ipld/go-car/cmd/car@latest
```

Lassie fetches content in CAR form. Stream the CAR to go-car when you want to extract the UnixFS files immediately:

```sh
lassie fetch -o - <CID> | car extract -
```

To save the CAR for later inspection or extraction:

```sh
lassie fetch -p -o <CID>.car <CID>
car ls -f <CID>.car
car extract -f <CID>.car
```

For example:

```sh
lassie fetch -o - bafybeic56z3yccnla3cutmvqsn5zy3g24muupcsjtoyp3pu5pm5amurjx4 | car extract -
```

For library integrations, use the current [Lassie Go library documentation](https://github.com/filecoin-project/lassie?tab=readme-ov-file#golang-library) instead of copying an example from this reference page.

For quick retrieval of existing datasets with the methods above, check out the [Filecoin Dataset Explorer](https://datasets.filecoin.io/).

* [Filecoin Dataset Explorer](https://datasets.filecoin.io/)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/cookbook/retrieve-data)
