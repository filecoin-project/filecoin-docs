---
title: Filecoin compared to…
---

# Filecoin compared to…

## Filecoin vs. Bitcoin

<table class="comparison">
    <tr>
        <th></th>
        <th>Filecoin</th>
        <th>Bitcoin</th>
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
        <td>Smart contracts</td>
        <td>Flexible, actor based smart contracts</td>
        <td>Limited scripting ability</td>
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
        <td>Hard drives</td>
        <td>GPUs, FPGAs, ASICs</td>
    </tr>
    <tr>
        <td>Mining usefulness</td>
        <td>Mining results in peoples’ files being stored</td>
        <td>Mining results in heat</td>
    </tr>
    <tr>
        <td>Types of miner</td>
        <td>Storage miners, retrieval miners, repair miners</td>
        <td>All miners perform proof of work</td>
    </tr>
    <tr>
        <td>Uptime requirements</td>
        <td>Storage miners rewarded for uptime, penalized for downtime</td>
        <td>Miners can go offline without being penalized</td>
    </tr>
    <tr>
        <td>Token allocation</td>
        <td>
            <table>
                <tr><td>70%</td><td>Miners</td></tr>
                <tr><td>15%</td><td>Protocol Labs</td></tr>
                <tr><td>10%</td><td>Investors</td></tr>
                <tr><td>5%</td><td>Filecoin Foundation</td></tr>
            </table>
        </td>
        <td>
            <table>
                <tr><td>100%</td><td>Miners</td></tr>
            </table>
        </td>
    </tr>
    <tr>
        <td>Network status</td>
        <td>Currently in testnet</td>
        <td>Mainnet running since 2009</td>
    </tr>
</table>

## Filecoin vs. Amazon S3, Google Cloud Storage

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

## Filecoin vs. BitTorrent

<table class="comparison">
    <tr>
        <th></th>
        <th>Filecoin</th>
        <th>BitTorrent</th>
    </tr>
    <tr>
        <td>Main use case</td>
        <td>Reliably storing files over time</td>
        <td>Quickly distributing popular files</td>
    </tr>
    <tr>
        <td>Incentives</td>
        <td>Miners are paid to be available and send files to users</td>
        <td>Users exchange files using a tit-for-tat algorithm, some peers keep uploading after they have finished downloading out of goodwill</td>
    </tr>
    <tr>
        <td>Throttling</td>
        <td>ISPs are incentivised to run retrieval miners on their networks, improving their customer’s experience</td>
        <td>ISPs regularly block or throttle BitTorrent traffic on their networks, degrading their customer’s experience</td>
    </tr>
    <tr>
        <td>Obscure files</td>
        <td>Still available from miners which are reliably online</td>
        <td>Have few or no peers and get harder to download over time</td>
    </tr>
    <tr>
        <td>Peer locations</td>
        <td>Incentivizes high-bandwidth peers in data centres to join the network</td>
        <td>Most peers have residential internet connections</td>
    </tr>
    <tr>
        <td>Data usage</td>
        <td>File only downloaded once during retrieval</td>
        <td>File uploaded and downloaded simultaneously during retrieval, increasing the total data required to retrieve a file</td>
    </tr>
    <tr>
        <td>Retrieval price</td>
        <td>Users pay or spend prepaid tickets to retrieve files</td>
        <td>Retrieving files is free of charge</td>
    </tr>
    <tr>
        <td>File discovery</td>
        <td>A public blockchain records all of the files stored by the network</td>
        <td>Files can be shared without recording their existence on a public ledger</td>
    </tr>
    <tr>
        <td>Storage time</td>
        <td>New files must be sealed, which takes a long time</td>
        <td>New files can start being shared immediately</td>
    </tr>
</table>

