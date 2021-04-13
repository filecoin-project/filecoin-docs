# Filecoin Docs

**View conceptual documentation for the Filecoin project at [docs.filecoin.io](https://docs.filecoin.io/).** You may also be interested in Filecoin's [technical specifcation](https://filecoin-project.github.io/specs/) or the implementation details provided in the [lotus tutorial](https://lotu.sh).

This repo generates the new conceptual Filecoin documentation at [docs.filecoin.io](https://docs.filecoin.io/), building off of the work done in [VuePress](https://github.com/vuejs/vuepress) by the IPFS Docs team to create their [spiffy new IPFS docs site](https://docs-beta.ipfs.io/) (in beta).

[![Netlify Status](https://api.netlify.com/api/v1/badges/b3586cdd-c0e3-404c-b451-875025e0e990/deploy-status)](https://app.netlify.com/sites/filecoin-docs/deploys)

## Working on this platform

To spin up a local instance of this new VuePress site, see below:

1. Install the NPM dependencies:

   ```bash
   npm install
   ```

2. Boot up the application in _dev mode_:

   ```bash
   npm start
   ```

3. Open [localhost:8080](http://localhost:8080) in your browser.

## Code organization

- Content lives in Markdown files in the `docs` folder. Each major section has its own subfolder.
- Navigation is generated from [docs/.vuepress/config.js](https://github.com/filecoin-project/filecoin-docs/blob/master/docs/.vuepress/config.js) and the metadata within each Markdown file. Be sure to create an entry in this config file when adding new content.
- To feature a new article on the homepage, you'll also need to update the `manualSidebar` object in the Home component at [docs/.vuepress/themes/components/Home.vue](https://github.com/filecoin-project/filecoin-docs/blob/master/docs/.vuepress/theme/components/Home.vue).

## Contributing

Learn more about [contributing to this docs site](https://docs.filecoin.io/community/contribute/ways-to-contribute/#documentation).

## License

All software code is copyright (c) Protocol Labs, Inc. under the **MIT license**. Other written documentation and content is copyright (c) Protocol Labs, Inc. under the [**Creative Commons Attribution-Share-Alike License**](https://creativecommons.org/licenses/by/4.0/). See [LICENSE file](./LICENSE.md) for details.
