---
title: "Frequently Asked Questions"
description: "Frequently asked questions about Filecoin Boost"
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "faq-6f5e5af5d372d6c2f42d127371dec593"
weight: 90
toc: true
---

#### Is there a way to stop the `boostd` daemon?
You can use the regular Unix OS signals and commands.

#### Is Boost compatible with the Lotus client? Can a user use `lotus client deal` to send a deal to Boost storage providers or do they have to use the boost client?
Yes, boost should work with any client, provided that client supports the storage market protocols of the Filecoin network.

#### Does Boost provide retrieval functionality or a client still need to use the Lotus client for retrievals?
Boost doesn't change anything about retrievals so far. We are working on new retrievals options.

#### Can Boost make verified deals?
Yes, payments for deals can be made either from a regular wallet, or from DataCap. Deals that are paid for with DataCap are called `verified` deals.

#### Can I run both Boost and markets at the same time?
No, Filecoin Boost replaces the legacy markets process. See [Migrate a Lotus Markets service to Boost]({{< relref "migrate-a-lotus-markets-service-process-to-boost" >}} )
