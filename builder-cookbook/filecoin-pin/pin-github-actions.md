# Host a website with Filecoin Pin using GitHub Actions

`filecoin-pin` can be used in CI pipelines like GitHub Actions to upload assets to the Filecoin decentralized storage network.  Static website assets are particularly good candidates, given the existing tooling within the IPFS ecosystem for static website retrieval.

The [Filecoin Pin repo](https://github.com/filecoin-project/filecoin-pin) has an [example upload to Filecoin GitHub Action](https://github.com/filecoin-project/filecoin-pin/tree/master/upload-action) that can be used directly or as a starting point for your own CI pipeline.  

The example filecoin-pin upload action itself has a [usage example](https://github.com/filecoin-project/filecoin-pin/tree/master/upload-action/examples), and you can even see it in production as part of [filecoin-pin-website's CI pipeline](https://github.com/filecoin-project/filecoin-pin-website/tree/main/.github/workflows)!

Below is also a video walkthrough of the example GitHub Action in use!


<!-- TODO: FIX THIS AFTER UPLOADING https://drive.google.com/drive/folders/1H6_g9Vvnh5RnzO7ymE3liLjNAL5hmpW2?usp=sharing to YouTube -->
{% embed url="https://www.youtube.com/watch?v=D_uLM5i0Z4c=" %}

Note: there is more work coming soon to add "filecoin-pin functionality" directly to the robust [ipshipyard/ipfs-deploy-action](https://github.com/ipshipyard/ipfs-deploy-action) ([tracking issue](https://github.com/ipfs/ipfs-deploy-action/issues/39)).


