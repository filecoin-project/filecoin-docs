---
title: 'Lotus: API client libraries'
description: 'This page gathers a list of API client libraries for Lotus that can be used to facilitate integrations against nodes and miners.'
breadcrumb: 'API client libraries'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

::: callout
**Have you written API bindings for any Filecoin implementation or product?** Please edit this page (see bottom) and add them here!
:::

API clients take care of the low-level details of making requests and handling responses and let you focus on writing code specific to your project. They can also translate between different programming languages. These Filecoin API clients are currently available:

- [js-lotus-client](https://github.com/filecoin-shipyard/js-lotus-client) (Javascript, RPC, compatible with lotus)
- [filecoin-ruby](https://github.com/subvisual/filecoin-ruby) (Ruby, RPC, compatible with lotus)
- [js-filecoin-api-client](https://github.com/filecoin-shipyard/js-filecoin-api-client) (Javascript, compatible with go-filecoin)
- [starling-api](https://github.com/smalldata-industries/starling-api) (Javascript, REST, compatible with go-filecoin)
- For Go, see the guide on [using Go and JSON-RPC APIs](go-json-rpc.md).
