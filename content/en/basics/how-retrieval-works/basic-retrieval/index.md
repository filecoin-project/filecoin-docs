---
title: "Basic retrieval"
description: "There are multiple ways to fetch data from a storage provider. This pages covers some of the most popular methods."
lead: "There are multiple ways to fetch data from a storage provider. This pages covers some of the most popular methods."
draft: false
images: []
type: docs
menu:
  basics:
    parent: "basics-how-retrieval-works"
    identifier: "basic-retrieval-76fb85b69ed8bd7589dbb01a8e291904"
weight: 100
toc: true
aliases:
    - "/developers/storage-helpers/how-tos/retrieve-data/"
---

## Lassie

Lassie is a simple retrieval client for IPFS and Filecoin. It finds and fetches your data over the best retrieval protocols available. Lassie makes Filecoin retrieval easy. While Lassie is powerful, the core functionality is expressed in a single CLI command:

```shell
lassie fetch <CID>
```

Lassie fetches content in content-addressed archive (CAR) form, so in most cases you will need additional tooling to deal with CAR files.
Lassie can also be used as a library to fetch data from Filecoin from within your application. Due to the diversity of data transport protocols in the IPFS ecosystem Lassie is able to use the Graphsync or Bitswap protocols, depending on how to the requested data is available to be fetched. One of the most prominent use case of Lassie library is **Saturn Network** nodes fetching the content from Filecoin and IPFS to serve the retrievals. 

![Lassie Architecture](Lassie_architecture.jpg "Lassie Architecture")

### Retrieve using Lassie

Make sure that you have [Go](https://go.dev/) installed and that your `GOPATH` is set up. By default, your `GOPATH` will be set to `~/go`.

#### Install Lassie

1. Download and install Lassie using the Go package manager:

    ```shell
    go install github.com/filecoin-project/lassie/cmd/lassie@latest
    ```

    ```plaintext
    go: downloading github.com/filecoin-project/lassie v0.3.1
    go: downloading github.com/libp2p/go-libp2p v0.23.2
    go: downloading github.com/filecoin-project/go-state-types v0.9.9

    ...
    ```

2. Install the [go-car](https://github.com/ipld/go-car) package using the Go package manager:

    ```shell
    go install github.com/ipld/go-car/cmd/car@latest
    ```

    ```plaintext
    go: downloading github.com/ipld/go-car v0.6.0
    go: downloading github.com/ipld/go-car/cmd v0.0.0-20230215023242-a2a8d2f9f60f
    go: downloading github.com/ipld/go-codec-dagpb v1.6.0 

    ...
    ```

   The go-car package makes it easier to work with content-addressed archive (CAR) files.

You now have everything you need to retrieve a file with Lassie and extract the contents with `go-car`.

#### Retrieve

To retrieve data from Filecoin using Lassie, all you need is the CID of the content you want to download.

Below video demonstrate how Lassie can be used to render content directly from Filecoin/IPFS.
<iframe width="560" height="315" src="https://www.youtube.com/embed/h_zCd7ssKCQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Lassie and go-car can work together to retrieve and extract data from Filecoin, all you need is the CID of the content to download.

```shell
lassie fetch -o - <CID> | car extract
```

This command uses a `|` to chain two commands together, this will work on Linux or a macOS. Windows users may need to use PowerShell to use this form. Alternatively, you can use the commands separately as explained later in this page.

An example of fetching and extracting a single file, identified by its CID:

```shell
lassie fetch -o - bafykbzaceatihez66rzmzuvfx5nqqik73hlphem3dvagmixmay3arvqd66ng6 | car extract - > lidar-data.tar
```

Will output basic progress information:

```plaintext
Fetching bafykbzaceatihez66rzmzuvfx5nqqik73hlphem3dvagmixmay3arvqd66ng6................................................................................................................................................
Fetched [bafykbzaceatihez66rzmzuvfx5nqqik73hlphem3dvagmixmay3arvqd66ng6] from [12D3KooWPNbkEgjdBNeaCGpsgCrPRETe4uBZf1ShFXStobdN18ys]:
        Duration: 42.259908785s
          Blocks: 144
           Bytes: 143 MiB
extracted 1 file(s)
```

The resulting file is a tar archive:

```shell
ls -l
```

```shell
total 143M
-rw-rw-r-- 1 user user 143M Feb 16 11:21 lidar-data.tar
```

##### Lassie CLI usage

Lassie usage for retrieving data is:

```shell
lassie fetch -p -o <OUTFILE_FILE_NAME> <CID>/path/to/content
```

* `-p` is an optional flag that tells Lassie that you would like to see detailed progress information as it fetches your data.

  For example:

    ```plaintext
    Fetching bafykbzaceatihez66rzmzuvfx5nqqik73hlphem3dvagmixmay3arvqd66ng6
    Querying indexer for bafykbzaceatihez66rzmzuvfx5nqqik73hlphem3dvagmixmay3arvqd66ng6...
    Found 4 storage providers candidates from the indexer, querying all of them:
            12D3KooWPNbkEgjdBNeaCGpsgCrPRETe4uBZf1ShFXStobdN18ys
            12D3KooWNHwmwNRkMEP6VqDCpjSZkqripoJgN7eWruvXXqC2kG9f
            12D3KooWKGCcFVSAUXxe7YP62wiwsBvpCmMomnNauJCA67XbmHYj
            12D3KooWLDf6KCzeMv16qPRaJsTLKJ5fR523h65iaYSRNfrQy7eU
    Querying [12D3KooWLDf6KCzeMv16qPRaJsTLKJ5fR523h65iaYSRNfrQy7eU] (started)...
    Querying [12D3KooWKGCcFVSAUXxe7YP62wiwsBvpCmMomnNauJCA67XbmHYj] (started)...

    ...
    ```

* `-o` is an optional flag that tells Lassie where to write the output to. If you don't specify a file, it will append `.car` to your CID and use that as the output file name.

  If you specify `-`, as in our above example, the output will be written to stdout so it can be piped to another command, such as go-car, or redirected to a file.

* `<CID>/path/to/content` is the CID of the content you want to retrieve, and an optional path to a specific file within that content.

  A CID is always necessary and if you don't specify a path, Lassie will attempt to download the entire content. If you specify a path, Lassie will only download that specific file, or if it is a directory, the entire directory and its contents.

##### go-car CLI usage

The `car extract` command can be used to extract files and directories from a CAR:

```shell
car extract -f <INPUT_FILE>[/path/to/file/or/directory] [<OUTPUT_DIR>]
```

* `-f` is an optional flag that tells go-car where to read the input from. If omitted, it will read from stdin, as in our example above where we piped `lassie fetch -o -` output to `car extract`.

* `/path/to/file/or/directory` is an optional path to a specific file or directory within the CAR. If omitted, it will attempt to extract the entire CAR.

* `<OUTPUT_DIR>` is an optional argument that tells go-car where to write the output to. If omitted, it will write to the current directory.

  If you supply `-`, as in the above example, it will attempt to extract the content directly to stdout. This will only work if we are extracting a single file.

  In our above example, we used the `>` operator to redirect the output of `car extract` to a named file, this is because the content we fetched was raw file data, that did not have a name encoded. In this case, if we didn't use `-` and `> filename`, go-car would write to a file named `unknown`.

`go-car` has some other useful commands, such as `car ls` which can be used to list the contents of a CAR, and `car inspect` which can be used to inspect the contents of the CAR, and optionally verify the integrity of a CAR.

And there we have it! Downloading and managing data from Filecoin is super simple when you use Lassie and Go-car!

### Lassie HTTP daemon

The Lassie HTTP daemon is an HTTP interface for retrieving IPLD data from IPFS and Filecoin peers. It fetches content from peers known to have it, and provides the resulting data in CAR format.

```shell
GET /ipfs/{cid}[/path][?params]
```

`GET` query against a Lassie HTTP daemon allows retrieval from peers that have the content identified by the given root CID, streaming the DAG in the response in [CAR (v1)](https://ipld.io/specs/transport/car/carv1/) format.
You can read more about the HTTP request and response to the daemon in [Lassie's HTTP spec](https://github.com/filecoin-project/lassie/blob/main/docs/HTTP_SPEC.md).
Lassie's HTTP interface can be a very powerful tool for web applications which require fetching data from Filecoin and IPFS. 

### Lassie's CAR format

Under normal operation, Lassie only returns IPLD data in CAR format. Specifically, the [CARv1](https://ipld.io/specs/transport/car/carv1/) format. [Lassie's car spec](https://github.com/filecoin-project/lassie/blob/main/docs/CAR.md) describes the nature of the CAR data returned by Lassie and the various options available to the client for varying the data included.


<!-- TODO: Complete Lotus node retrieval method. -->
<!-- ## Lotus node -->

<!-- It is possible to download data from the Filecoin network using a Lotus node. -->