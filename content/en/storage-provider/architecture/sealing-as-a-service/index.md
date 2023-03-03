---
title: "Sealing-as-a-Service"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "sealing-as-a-service-65969c343e79242db575a1cb8e5a69b9"
weight: 140
toc: true
---

The Filecoin network is constantly evolving and creating new opportunities for collaboration.<!--TODO STEF this is a bit marketing-y? --> We will see more providers offering specialized solutions to the network. Sealing-as-a-Service is the first of such specialized services available for Storage Providers to use.

## What is Sealing-as-a-Service?
In a traditional setup, a Storage Provider needs high-end hardware to build out a [sealing pipeline]({{<relref "sealing-pipeline">}}). That hardware is not cheap and sometimes not readily available. Sealing-as-a-Service is a service in which another provider does the sealing for you. As a Storage Provider you provide the data to the sealer, who seals the data into sectors and provides you with sealed sectors in exchange for a service cost. Other solutions are possible where the sealing partner seals CC sectors for you, which you in turn [snap up]({{<relref "snap-deals">}}) to data sectors.

<!--TODO STEF Sounds great. Who (plural) is providing this? What does it cost? What are the terms? What is the turnaround time? How risky is it? -->

## Benefits of Sealing-as-a-Service
There are multiple benefits that Sealing-as-a-Service enables for Storage Providers.

- With Sealing-as-a-Service you can fill up your available storage faster, so you can start earning maximum block rewards without investing in a complex, expensive sealing pipeline.
- You can potentially onboard bigger deals, that you might otherwise not be able to seal in time in order to meet customer expectations. Sealing-as-a-Service essentially offers a burst capability in your sealing capacity.
- You can expand your storage capacity on the Filecoin network without investing in a big(ger) sealing pipeline.
