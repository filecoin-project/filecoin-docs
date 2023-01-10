---
title: "Deal filters"
description: "Using filters for fine-grained storage and retrieval deal acceptance"
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "deal-filters-561681d91a3fee21244988f9cbd8e156"
weight: 30
toc: true
---


Your use case might demand very precise and dynamic control over a combination of deal parameters.

Lotus provides two IPC hooks allowing you to name a command to execute for every deal before the miner accepts it:

* `Filter` for storage deals.
* `RetrievalFilter` for retrieval deals.

The executed command receives a JSON representation of the deal parameters on standard input, and upon completion, its exit code is interpreted as:

* `0`: success, proceed with the deal.
* `non-0`: failure, reject the deal.

The most trivial filter rejecting any retrieval deal would be something like: `RetrievalFilter = "/bin/false"`. `/bin/false` is binary that immediately exits with a code of `1`.

[This Perl script](https://gist.github.com/ribasushi/53b7383aeb6e6f9b030210f4d64351d5/9bd6e898f94d20b50e7c7586dc8b8f3a45dab07c#file-dealfilter-pl) lets the miner deny specific clients and only accept deals that are set to start relatively soon.

You can also use a third party content policy framework like `bitscreen` by [Murmuration Labs](https://murmuration.ai):

```shell
# grab filter program
go get -u -v github.com/Murmuration-Labs/bitscreen

# add it to both filters
Filter = "/path/to/go/bin/bitscreen"
RetrievalFilter = "/path/to/go/bin/bitscreen"
```
