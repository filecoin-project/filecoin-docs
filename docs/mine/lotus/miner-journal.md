---
title: 'Lotus Miner: journal'
description: 'This page is about lotus miner journal,The events from journal allow you to observe the workflow of the program in detail and makes troubleshooting easier.'
breadcrumb: 'Miner-journal'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## File location 
The journal directory  is located at ~/.lotusminer/journal by default.If you have configured LOTUS_MINER_PATH, it should be located in LOTUS_MINER_PATH/journal,and the latest journal file is: lotus-journal.ndjson.

## The difference with log
Journal is json format by default with system and event identifiers for easier filtering and processing

## Check the journal
You can filter the information if you want

Check the sealing process and sealing status

```shell 
    cat lotus-journal.ndjson | grep sealing_states
```
You may see someting like this by adding more filter options. And you can clearly see what's happening when sealing a sector.
>{"System":"storage","Event":"sealing_states","Timestamp":"2021-09-17T14:12:51.45634321+08:00","Data":{"SectorNumber":0,"SectorType":0,"From":"","After":"Packing","Error":""}}
>...  
 {"System":"storage","Event":"sealing_states","Timestamp":"2021-09-17T14:22:02.53735624+08:00","Data":{"SectorNumber":56,"SectorType":5,"From":"FinalizeSector","After":"Proving","Error":""}}

Check windowpost 

```shell 
    cat lotus-journal.ndjson | grep wdpost
```
You may see something like this. it will be very useful when you get windowpost problem. 
>{"System":"wdpost","Event":"scheduler","Timestamp":"2021-09-17T14:09:57.281960293+08:00",  
>"Data":{"Deadline":{"CurrentEpoch":28687,"PeriodStart":26578,"Index":35,"Open":28678,  
>"Close":28738,"Challenge":28658,"FaultCutoff":28608,"WPoStPeriodDeadlines":48,  
>"WPoStProvingPeriod":2880,"WPoStChallengeWindow":60,"WPoStChallengeLookback":20,  
>"FaultDeclarationCutoff":70},"Height":28687,"TipSet":...    
 {"System":"wdpost","Event":"recoveries_processed","Timestamp":"2021-09-17T14:09:57.283986234+08:00",  
>"Data":{"Deadline":{"CurrentEpoch":28687,"PeriodStart":26578,"Index":35,"Open":28678,"Close":28738,  
>"Challenge":28658,"FaultCutoff":28608,"WPoStPeriodDeadlines":48,"WPoStProvingPeriod":2880,  
>"WPoStChallengeWindow":60,"WPoStChallengeLookback":20,"FaultDeclarationCutoff":70},"Height":28687,"TipSet":...  

Check mined record
```shell 
    cat lotus-journal.ndjson | grep block_mined
```
You will get something like this.
>{"System":"miner","Event":"block_mined","Timestamp":"2021-09-17T15:42:32.132794312+08:00","Data":{"cid":{"/":"bafy2bzacecec3unxeft6mc2df2yqq2mg6e2jnsf4koh4lc7u5ebrclyp6m74m"},"epoch":29209,"nulls":0,"parents":[{"/":"bafy2bzacecg45xpyz5yg74nlksxlq6grs4sixqpkom73blegcuwnu45pdrkhg"}],"timestamp":1630863113}}  
 {"System":"miner","Event":"block_mined","Timestamp":"2021-09-17T15:42:42.337731714+08:00","Data":{"cid":{"/":"bafy2bzacec2h7ltyyxuhtkyu6jzi6ozjw27evm3ht64s747t7dqpjt6f3cwww"},"epoch":29210,"nulls":0,"parents":[{"/":"bafy2bzacecec3unxeft6mc2df2yqq2mg6e2jnsf4koh4lc7u5ebrclyp6m74m"}],"timestamp":1630863117}}  
