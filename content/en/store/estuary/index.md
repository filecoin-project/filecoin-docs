---
title: "Estuary"
description: "Estuary makes storing data with Filecoin simpler by managing replication tasks and automating much of the workflow, allow you to carry on building your applications."
menu:
    store:
        parent: "store-tools"
weight: 10
---

[Estuary](https://estuary.tech) automates storage activities with Filecoin. At its core, Estuary is a simple IPFS node that integrates a minimal Filecoin client library. It is an open-source project built by [ARG](https://arg.protocol.ai/) and is available at [github.com/application-research/estuary](https://github.com/application-research/estuary).

Estuary is a great solution for developers and users who want a more accessible interface to store data on Filecoin. See the [Estuary documentation](https://docs.estuary.tech) to learn more about the project.

## Store Data on Filecoin

If you want to quickly upload any data that is to be hosted on IPFS and stored on the Filecoin network:

1. Go to [Estuary.tech](https://estuary.tech) and log in.
1. Select **Deals** from the sidebar menu.
1. Click **Upload data** and select the file you want to upload and create a storage deal for. Once the file is successfully uploaded, Estuary will output the cost for storing the data on the Filecoin Network, in both [FIL](https://docs.filecoin.io/reference/glossary/#fil) and USD, size of the data, amount of the storage providers that the file is stored with, duration of the storage and whether the[ deal is verified](https://spec.filecoin.io/#section-algorithms.verified_clients).

    ![Estuary upload file successfully](estuary-upload.png)

1. If your file is larger than 3.57Gib, that's it; you can then click **Make storage deal**, and Estuary will first host the file on IPFS and attempt to make storage deals with six storage providers! To check your deal information, select **Deals** from the sidebar menu.

    ![Estuary deals](estuary-user-deal.png)

1. If your data is less than 3.57Gib, it will be hosted on IPFS first and placed in the `Staging Zone`. A storage deal will be made a few hours later for the data to be stored on Filecoin Network.

## Retrieve Your Data

Your data is retrievable as soon as a deal is created. Simply go to your deal page by selecting **Deals** from the sidebar menu, find the file you want to retrieve, click the link under `RETRIEVAL CID`, and you will get the data at any minute!

   ![Estuary retrieve](estuary-retrieve.png)

{{< alert icon="tip" >}}
Your data is retrievable even it is in the _Staging Zone_! Just select **Staging** from the sidebar menu and click the link under `RETRIEVAL CID` to get your data!
{{< /alert >}}

## Additional resources

- [Estuary Github repository](https://github.com/application-research/estuary)
- [Estuary documentation](https://docs.estuary.tech)
- [Build with Estuary](https://docs.filecoin.io/build/estuary/)
- [Sample application built with Estuary](https://github.com/application-research/estuary-www)
- [Who is ARG](https://arg.protocol.ai)
