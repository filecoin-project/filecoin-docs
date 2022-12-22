---
title: "Database"
description: "Boost stores metadata about deals in a sqlite database in the root directory of the Boost repo."
lead: "Boost stores metadata about deals in a sqlite database in the root directory of the Boost repo."
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "database-e2eb1150f23d398c83038ae66daf26dc"
weight: 20
toc: true
---

To open the database use a sqlite client:

`sqlite3 boost.db`

The database tables are

* `Deals` metadata about Boost storage deals (eg deal proposal) and their current state (eg checkpoint)
* `FundsLogs` log of each change in funds reserved for a deal
* `FundsTagged` how much FIL is tagged for deal collateral and publish message for a deal
* `StorageLogs` log of each change in storage reserved for a deal
* `StorageTagged` how much storage is tagged for a deal

Boost keeps a separate database just for deal logs, so as to make it easier to manage log data separately from deal metadata. The logs database is named `boost.logs.db` and it has a single table `DealLogs` that stores logs for each deal, indexed by uuid.

### Migrations

Boost uses `goose` ([https://pressly.github.io/goose/](https://pressly.github.io/goose/)) tool and library for handling sqlite3 migrations.

`goose` can be installed following the instructions at [https://pressly.github.io/goose/installation/](https://pressly.github.io/goose/installation/)

Migrations in Boost are stored in the `/db/migrations` directory.

Boost handles database migrations on start-up. If a user is running an older version of Boost, migrations up to the latest version are automatically applied on start-up.

Developers can use `goose` to inspect and apply migrations using the CLI:

```plaintext
➜  ~ goose

Usage: goose [OPTIONS] DRIVER DBSTRING COMMAND
...
Commands:
    up                   Migrate the DB to the most recent version available
    up-by-one            Migrate the DB up by 1
    up-to VERSION        Migrate the DB to a specific VERSION
    down                 Roll back the version by 1
    down-to VERSION      Roll back to a specific VERSION
    redo                 Re-run the latest migration
    reset                Roll back all migrations
    status               Dump the migration status for the current DB
    version              Print the current version of the database
    create NAME [sql|go] Creates new migration file with the current timestamp
    fix                  Apply sequential ordering to migrations
```
