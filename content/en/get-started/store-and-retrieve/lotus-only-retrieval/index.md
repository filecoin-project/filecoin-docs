---
title: "Lotus-only retrieval"
description: "Learn how to retrieve data from the Filecoin network using only your Lotus-node; no third-party websites or block-explorers required."
menu:
    getstarted:
        parent: "getstarted-store-and-retrieve"
draft: true
---

This guide assumes that you are retrieving your data from the same Lotus node that you originaly made the deal.

## Pre-setup

```shell
# Create random file.
rm -f /tmp/613-mb-file
dd if=/dev/urandom of=/tmp/613-mb-file bs=1MB count=613 

# Import file into Lotus.
lotus client import /tmp/613-mb-file
  <DATA_CID>

# Create deal for that random file.
lotus client deal
> Data CID: <DATA_CID>
> Duration: 180
> Miner: f0127896
> ... 
> <PROPOSAL CID>

# View the deal status.
lotus client inspect-deal --proposal-cid=<PROPOSAL_ID>

# Get the data back.
lotus client retrieve --miner f0127896 <DATA_CID> /tmp/retrieved_613mb_file
```

Things you need:

1. Proposal ID. Also sometimes called a Deal CID.
1. Miner ID. Also sometimes called a Provider CID.
1. Data CID.

## Proposal ID

1. It's called the `DealCid` when running `lotus client list-deal --verbose`:

    ```shell
    Created          DealCid                                                      DealId  Provider  State                          On Chain?  Slashed?  PieceCID                                                          Size      Price          Duration  TransferChannelID                                                                                                              TransferStatus  Verified  Message
Jun 21 23:00:07  bafyreig237v7gnohrn3k425v5xnavgn6pbddvhjm3whjpko5r4vqvjfdmy  0       f0127896  StorageDealCheckForAcceptance  N          N         baga6ea4seaqj24gc2ov6ixvng6rbtscwykbvexl7hmobr7zrg6l56bfsmhg7kky  1016 MiB  0.0521085 FIL  521085    12D3KooWK5tFBXQghZm3E6JBAiGkhVeM2Bo6drZLmEzQJyV7NwV5-12D3KooWQrZnhRaBecSZYKR815zH65xkg1TvfyPWUGYwehHvVEKB-1624329431588035303  Completed       false     Provider state: StorageDealWaitingForData
    ```

1. Done

## Miner ID

1. Run `lotus client get-deal <PROPOSAL ID / DEAL CID OR WHATEVER IT'S CALLED> | jq '."DealInfo: "."Provider"'`:

    ```shell
    lotus client get-deal bafyreig237v7gnohrn3k425v5xnavgn6pbddvhjm3whjpko5r4vqvjfdmy | jq '."DealInfo: "."Provider"'
    ```

    This gives you the Miner ID:

    ```
    "f0127896"
    ```

1. Done

## Data CID

1. Run `lotus client get-deal <PROPOSAL ID> | jq '."DealInfo: "."DataRef"."Root"."/"'`:

    ```shell
    lotus client get-deal bafyreig237v7gnohrn3k425v5xnavgn6pbddvhjm3whjpko5r4vqvjfdmy | jq '."DealInfo: "."DataRef"."Root"."/"'
    ```

    This gives you the Data CID:

    ```shell
    "bafykbzacecjiqho3qy2wwvtdqwhwalsklpdwrssn7jmg7jzvuya75xtuir2yg"
    ```

1. Done

## Throw it all together

1. Add all those values into a retrieve command:

    ```shell
    lotus client retrieve --miner <MINER ID> <DATA CID> outfile.tar
    ```

    So something like this:

    ```shell
    lotus client retrieve --miner f0127896 bafykbzacecjiqho3qy2wwvtdqwhwalsklpdwrssn7jmg7jzvuya75xtuir2yg ~/outfile.tar
    ```

1. Done!
