---
title: "Filecoin compared to..."
description: "While Filecoin shares some similarities to other file storage solutions, the protocol has significant differences that one should consider."
menu:
    about:
        parent: "about-filecoin-basics"
weight: 50
---

Filecoin combines many elements of other file storage and distribution systems. What makes Filecoin unique is that it runs on an open, peer-to-peer network while still providing economic incentives and proofs to ensure files are being stored correctly. This page compares Filecoin against other technologies that share some of the same properties.

- [Filecoin vs. Amazon S3, Google Cloud Storage](#filecoin-vs-amazon-s3-google-cloud-storage)
- [Filecoin vs. Bitcoin](#filecoin-vs-bitcoin)

### Filecoin vs. Amazon S3, Google Cloud Storage

<table class="comparison">
    <tr>
        <th></th>
        <th>Filecoin</th>
        <th>Amazon S3, Google Cloud Storage</th>
    </tr>
    <tr>
        <td>Main use case</td>
        <td>Storing files at hypercompetitive prices</td>
        <td>Storing files using a familiar, widely-supported service</td>
    </tr>
    <tr>
        <td>Pricing</td>
        <td>Determined by a hypercompetitive open market</td>
        <td>Set by corporate pricing departments</td>
    </tr>
    <tr>
        <td>Centralization</td>
        <td>Many small, independent storage providers</td>
        <td>A handful of large companies</td>
    </tr>
    <tr>
        <td>Reliability stats</td>
        <td>Independently checked by the network and publicly verifiable</td>
        <td>Companies self-report their own stats</td>
    </tr>
    <tr>
        <td>API</td>
        <td>Applications can access all storage providers using the Filecoin protocol</td>
        <td>Applications must implement a different API for each storage provider</td>
    </tr>
    <tr>
        <td>Retrieval</td>
        <td>Competitive market for retrieving files</td>
        <td>Typically more expensive than storing files to lock users in</td>
    </tr>
    <tr>
        <td>Fault handling</td>
        <td>If a file is lost, the user is refunded automatically by the network</td>
        <td>Companies can offer users credit if files are lost or unavailable</td>
    </tr>
    <tr>
        <td>Support</td>
        <td>If something goes wrong, the Filecoin protocol determines what happens without human intervention</td>
        <td>If something goes wrong, users contact the support help desk to seek resolution</td>
    </tr>
    <tr>
        <td>Physical location</td>
        <td>Miners located anywhere in the world</td>
        <td>Limited to where provider’s data centres are located</td>
    </tr>
    <tr>
        <td>Becoming a storage provider</td>
        <td>Low barrier to entry for storage providers (computer, hard drive, internet connection)</td>
        <td>High barrier to entry for storage providers (legal agreements, marketing, support staff)</td>
    </tr>
</table>

### Filecoin tokens (FIL) vs. Bitcoin tokens (BTC)

<table class="comparison">
    <tr>
        <th></th>
        <th>FIL</th>
        <th>BTC</th>
    </tr>
    <tr>
        <td>Main use case</td>
        <td>File storage</td>
        <td>Payment network</td>
    </tr>
    <tr>
        <td>Data storage</td>
        <td>Good at storing large amounts of data inexpensively</td>
        <td>Small amounts of data can be stored on blockchain at significant cost</td>
    </tr>
    <tr>
        <td>Proof</td>
        <td>Blockchain secured using proof of replication and proof of spacetime</td>
        <td>Blockchain secured using proof of work</td>
    </tr>
    <tr>
        <td>Consensus power</td>
        <td>Miners with the most storage have the most power</td>
        <td>Miners with the most computational speed have the most power</td>
    </tr>
    <tr>
        <td>Mining hardware</td>
        <td>Hard drives, GPUs, and CPUs</td>
        <td>ASICs</td>
    </tr>
    <tr>
        <td>Mining usefulness</td>
        <td>Mining results in peoples’ files being stored</td>
        <td>Mining results in heat</td>
    </tr>
    <tr>
        <td>Types of provider</td>
        <td>Storage provider, retrieval provider, repair provider</td>
        <td>All providers perform proof of work</td>
    </tr>
    <tr>
        <td>Uptime requirements</td>
        <td>Storage providers rewarded for uptime, penalized for downtime</td>
        <td>Miners can go offline without being penalized</td>
    </tr>
    <tr>
        <td>Network status</td>
        <td>Mainnet running since 2020</td>
        <td>Mainnet running since 2009</td>
    </tr>
</table>
