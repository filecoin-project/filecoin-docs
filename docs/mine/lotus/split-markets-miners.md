---
title: 'Lotus Miner: Splitting main miner and markets service processes'
description: ''
breadcrumb: 'Splitting main miner and markets service processes'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Pre-requisites

Before splitting the markets service process from the main miner process, you should backup your miner's metadata repository. You need to start the `lotus-miner` with the `LOTUS_BACKUP_BASE_PATH` env variable in order to do that.

```sh
export LOTUS_BACKUP_BASE_PATH=~/lotus-backup-location
lotus daemon
```

```sh
export LOTUS_BACKUP_BASE_PATH=~/lotus-backup-location
lotus-miner run
```

## Creating a backup

```sh
export LOTUS_BACKUP_BASE_PATH=~/lotus-backup-location
lotus-miner backup ~/lotus-backup-location/backupfile
```

## Copy config.toml and storage.json for the markets service

You need to generate a `config.toml` and `storage.json` for the markets service, and have them ready for the next step.

## Initialising a markets service repository

```sh
export APISEALER=`./lotus-miner auth api-info --perm=admin`
export APISECTORINDEX=`./lotus-miner auth api-info --perm=admin`
export LOTUS_MINER_PATH=~/markets-repo-location

./lotus-miner init service --enable-market \
                           --api-sealer=$APISEALER \
                           --api-sector-index=$APISECTORINDEX \
                           --config=~/.lotusmarket/config.toml \
                           --storage-config=~/.lotusmarket/storage.json \
                           ~/lotus-backup-location/backupfile
```

## Restart the main miner process without the markets service

```sh
./lotus-miner run
```

## Run the markets service process

```sh
export LOTUS_MINER_PATH=~/markets-repo-location
./lotus-miner run
```
