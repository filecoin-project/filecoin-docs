---
title: 'Journal'
description: 'Miners can use the journal to observe the workflow of the program in detail, and simplify troubleshooting.'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## File location

The journal directory  is located at `~/.lotusminer/journal` by default. If you have configured `LOTUS_MINER_PATH`,  it should be located in `LOTUS_MINER_PATH/journal`. The latest journal file is `lotus-journal.ndjson`.

The journal file uses the json format by default, with system and event identifiers for easier filtering and processing.

## Check the journal

1. Check the sealing process and sealing status:

    ```shell with-output
    cat lotus-journal.ndjson | grep sealing_states
    ```

    ```json output
    {"System":"storage","Event":"sealing_states","Timestamp":"2021-09-22T12:51:04.144905781+08:00","Data":{"SectorNumber":67,"SectorType":5,"From":"PreCommitBatchWait","After":"WaitSeed","Error":""}}
    {"System":"storage","Event":"sealing_states","Timestamp":"2021-09-22T12:53:14.389710503+08:00","Data":{"SectorNumber":67,"SectorType":5,"From":"WaitSeed","After":"Committing","Error":""}}
    ```

1. Check for `windowpost`:

    ```shell with-output
    cat lotus-journal.ndjson | grep wdpost
    ```

    ```json output
    {"System":"wdpost","Event":"scheduler","Timestamp":"2021-09-22T12:49:33.802956998+08:00","Data":{"Deadline":{"CurrentEpoch":31436,"PeriodStart":29458,"Index":32,"Open":31378,"Close":31438,  "Challenge":31358,"FaultCutoff":31308,"WPoStPeriodDeadlines":48,"WPoStProvingPeriod":2880, "WPoStChallengeWindow":60,"WPoStChallengeLookback":20,"FaultDeclarationCutoff":70},"Height":31436, "TipSet":[{"/":"bafy2bzaceajca6lstl3f6ez2ilfsrqlhugcfvr7eybfyomvtbebt43z2xyjm2"}],"State":"started"}}  
    ```

1. Check _mined_ records:

    ```shell with-output
    cat lotus-journal.ndjson | grep block_mined
    ```

    ```json output
    {"System":"miner","Event":"block_mined","Timestamp":"2021-09-22T12:49:56.313760193+08:00","Data":{"cid":{"/":"bafy2bzaceazj2htu5d5ylny5ixj2kxp7tmcfubgbo7hotc3z37zsrleidoolu"},"epoch":31437,"nulls":0,"parents":[{"/":"bafy2bzaceajca6lstl3f6ez2ilfsrqlhugcfvr7eybfyomvtbebt43z2xyjm2"}],"timestamp":1630872025}}
    ```
