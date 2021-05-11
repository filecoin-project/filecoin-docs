---
title: "Manage addresses"
description: "Use Lotus to create, export, and import a Filecoin addresses."
---

# Manage addresses 

Explain how addresses are organized: public versus private parts.

This page uses the term _Lotus node_, a lot. For the purposes of this page, both Lotus full-nodes and Lotus lite-nodes are _Lotus nodes_. 

## Create a wallet

1. Create a new address with the `lotus wallet new` command:

    ```shell
    lotus wallet new

    > f1nau67e6k6ggdwluatfz4waexetjfrqmx6fil3nq
    ```

    :::tip Public and private addresses
    This string of text is the _public_ part of your new Filecoin address `f1nau...`, also known as your _public address_. Users with your public address can send FIL to you, and view and transactions you have made. Without the _private_ part of your address, other users cannot use your public address to steal your FIL. 
    :::

1. List the addresses associated with your Lotus node:

    ```shell
    lotus wallet list

    > Address                                    Balance  Nonce  Default  
    > f1nau67e6k6ggdwluatfz4waexetjfrqmx6fil3nq  0 FIL    0      X  
    ```

## Export a wallet

It is incredibly important that you backup and addresses that you use with your Lotus node. Storing a copy of your addresses on another device is a great way to ensure you have a backup in case you lose access to your Lotus node.

1. List the addresses associated with your Lotus node:

    ```shell
    lotus wallet list

    > Address                                    Balance  Nonce  Default  
    > f1nau67e6k6ggdwluatfz4waexetjfrqmx6fil3nq  0 FIL    0      X  
    ```

1. Your Lotus node may already have addresses on it. List all the addesses your Lotus node knows about:

    ```shell
    lotus wallet list

    > Address                                    Balance  Nonce  Default  
    > f1nau67e6k6ggdwluatfz4waexetjfrqmx6fil3nq  0 FIL    0      X  
    ```

1. Copy the address `f1nau...` that you want to export.
1. Run the `lotus wallet export` command to export an address:

    ```shell
    lotus wallet export f1nau67e6k6ggdwluatfz4waexetjfrqmx6fil3nq 

    > 7b2254797065223a22736563703235366b31222c22507269766174654b6579223a2238313578377535366c77706238347038797036336a6d4154614f425934795454635a7a7932375554416f673d227d
    ```

    This command simply prints out the _private key_ of your address. 

1. To export an address _into_ a file, run the previous command followed by `> my_address.key`:

    ```shell
    lotus wallet export f1nau67e6k6ggdwluatfz4waexetjfrqmx6fil3nq > my_address.key
    ```

    This will create a new file called `my_address.key` in the current directory.

Once you have your address in a file, you can copy it to another drive, securely send it to another computer, or even print it out.

## Import an address

1. Move your key-file to the Lotus node that you want to import the address into. 
1. Use the `lotus wallet import` command to import an address:

    ```shell
    lotus wallet import my_address.key

    > imported key f1nau67e6k6ggdwluatfz4waexetjfrqmx6fil3nq successfully!
    ```

1. List the addresses associated with this node to see the address you just imported: 

    ```shell
    lotus wallet list

    > Address                                    Balance  Nonce  
    > f1nau67e6k6ggdwluatfz4waexetjfrqmx6fil3nq  0 FIL    0 
    ```
