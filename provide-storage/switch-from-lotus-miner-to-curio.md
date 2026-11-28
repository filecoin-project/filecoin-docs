---
description: >-
  Move an existing lotus-miner to Curio. Keep your miner ID and sectors, and
  move your deals from Boost.
---

# Switch from lotus-miner to Curio

**Curio replaces lotus-miner, lotus-worker and Boost.** Curio's setup tool reads your lotus-miner and moves it over. You keep the same miner.

## Before you start

* Back up your owner key offline, and back up your Boost folder if you run Boost.
* Lotus keeps running. Curio uses it as its chain node.
* Curio must be built for the same network as your Lotus node.

## Step 1: Set up YugabyteDB

Curio stores its settings and tasks in YugabyteDB. If Boost already uses YugabyteDB, you can reuse it. Otherwise, set it up as in [Build a sealing cluster](build-a-sealing-cluster.md#step-4-run-yugabytedb), Step 4. In production, run three or more nodes.

## Step 2: Install Curio

Install Curio on the lotus-miner machine and on each machine that will run Curio. See [Build a sealing cluster](build-a-sealing-cluster.md#step-5-install-curio), Step 5.

## Step 3: Run the setup tool

On the lotus-miner machine:

```sh
curio guided-setup
```

Choose **Migrate from existing Lotus-Miner**, enter your YugabyteDB details, and follow the prompts.

If you didn't use the default database details, add them to `~/.bashrc` so Curio commands can reach the database:

```sh
export CURIO_DB_HOST=<host>
export CURIO_DB_PORT=<port>
export CURIO_DB_NAME=<name>
export CURIO_DB_USER=<user>
export CURIO_DB_PASSWORD=<password>
```

## Step 4: Switch to Curio

1. Stop lotus-miner and all lotus-worker processes.
2. Set up Curio as a service with the layers each machine needs, such as `gui,post,seal`. See [Build a sealing cluster](build-a-sealing-cluster.md#step-7-run-curio-as-a-service), Step 7.
3. Start Curio.

## Step 5: Check proving

Check that Curio can run a daily proof:

```sh
curio test window-post task
```

The task should be picked up by a machine running the `post` layer and finish with no errors. Then watch the next proving deadlines in the dashboard.

## Step 6: Move your deals from Boost

Boost doesn't work with current Curio. To move deals into Curio's storage market:

1. Set up Curio's storage market first. See [Build a sealing cluster](build-a-sealing-cluster.md#step-10-turn-on-the-storage-market), Step 10.
2. Stop Boost and make sure no deals are in progress. Keep `boostd-data` running.
3.  Build the `migrate-curio` tool from the Boost code (Boost v2.4.7 or later):

    ```sh
    make migrate-curio
    ```
4.  Run it:

    ```sh
    ./migrate-curio --boost-repo /path/to/boost-repo \
      --db-host "127.0.0.1" --db-name "yugabyte" \
      --db-user "yugabyte" --db-password "yugabyte" --db-port "5433" \
      migrate
    ```

Full details: [Migrating from Boost](https://docs.curiostorage.org/curio-market/migrating-from-boost).

## Next steps

* [Verify and go live](verify-and-go-live.md)
* [Monitor proofs and faults](monitor-proofs-and-faults.md)
* [Add warm storage to a sealing cluster](add-warm-storage-to-a-sealing-cluster.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/provide-storage/switch-from-lotus-miner-to-curio)
