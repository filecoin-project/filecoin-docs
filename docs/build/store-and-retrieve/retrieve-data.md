---
title: Retrieve data
description: Lorem ipsum
---

<!-- TODO: Create a description and intro for this page. -->

# Retrieve data

Retrieving data from the Filecoin network isn't particularly difficult, it's just a single command. The hardest bit if collecting the information you need to put into the command.

You need two piece of information to create a retrieval request:

- The CID of the data you want.
- The ID of the miner that is storing your data.

Getting this information will vary in difficutly depending on where you're making the request from. If you're requesting the data from the same node that created the deal, then things are fairly simple.

<!-- TODO: 
### Data CID

How to get the CID of the data that you need. 

### Miner ID

Find the miner or miners that are holding that specific CID.

--> 

## Send a retrieval request

```shell
lotus client retrieve --miner <MINER ID> <DATA CID> ~/output-file
```

```shell
lotus client retrieve --miner f071624 bafyaa6asgafcmalqudsaeihulnwwprgo2nji3xt27abm6s6bse2yx4avwrykncjqefsnxhu3pyjaagelucbyabasf4fcmalqudsaeidj3qs3xbcfyymp7kwu7355decs3ix4srn5cb5sxblqu6vjt3wwqyjaaghyv6xxmcqtbabbrswpv33aiieaqcaiabbazlh245q ~/output-file.tar
```

