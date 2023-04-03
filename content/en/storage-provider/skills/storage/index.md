---
title: "Storage"
description: ""
lead: ""
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-skills"
    identifier: "Storage-skills-7a9fdaa672cf6167e7e2990566ec2dbb"
weight: 230
toc: true
---
Storage skills might seem the most obvious skill requirement to run a Storage Provider. In contrast to classical storage arrays and classical storage administration however, Filecoin requires an end-to-end skillset for running a 24/7 application.

Due to the nature of [Storage Proving]({{<relref "storage-proving">}}) there is rather atypical read-behavior on the storage system. The storage administrator needs to be able to design for this behavior and to analyse the storage system.

## ZFS
Most Storage Providers use ZFS as the filesystem for their storage. Having the knowledge and skills to configure ZFS (being both the volume manager and the filesystem) is therefore required.
### RAIDZ2
ZFS comes with its own types of RAID. As a Storage Provider you need to know how to create VDEVs, how wide those ideally are, how to create storage pools with a given RAID protection (best: RAIDZ2 with double parity) and how to create datasets.
### Snapshots & replication
ZFS comes with built-in protection in the form of snapshots. You should configure a snapshot rotation schema to have your filesytem protected.

Additionally you can replicate these snapshots with ZFS to another system running ZFS.

## Performance analysis
Apart from the architectural and administration skills required around storage, it is important to know how to troubleshoot performance issues. Linux performance analytic tools like `iostat` allow to start debugging performance problems. 

Measures like implementing an NVMe write-cache might be necessary to overcome performance issues. Read-cache is typically not useful in the context of Filecoin. The sealed sectors get read very randomly and the unsealed sectors will typically not be read twice, so storing them in a read-cache is useless.
