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

The Filecoin network is constantly evolving and creating new opportunities for collaboration. We will see more providers offering specialized solutions to the network. Sealing-as-a-Service is the first of such specialized services available for Storage Providers to use.

## What is it?
In a traditional setup a Storage Provider needs high-end hardware to build out a [sealing pipeline]({{<relref "sealing-pipeline">}}). That hardware is no cheap and not always readily available. Sealing-as-a-Service is a service in which another provider does the sealing for you. As a Storage Provider you provide the data to the sealer, who seals the data into sectors and provides you sealed sectors back for a service cost. Other solutions are possible where the sealing partner seals CC sectors for you which you in turn [snap up]({{<relref "snap-deals">}}) to data sectors.

## Benefits
There are multiple benefits that Sealing-as-a-Service can offer to Storage Providers.
- With Sealing-as-a-Service you can fill up your available storage faster to start earning maximum block rewards without investing in a huge sealing pipeline.
- You can onboard bigger deals you would not be able to seal in time to meet customer expactations. Sealing-as-a-Service essentially offers a burst in your sealing capacity.
- You can expand your storage capacity on the Filecoin network without investing in a big(ger) sealing pipeline.
