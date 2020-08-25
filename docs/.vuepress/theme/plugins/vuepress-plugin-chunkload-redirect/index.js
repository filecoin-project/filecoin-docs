const { path } = require('@vuepress/shared-utils')

module.exports = (options = {}, context) => ({
  name: 'vuepress-plugin-chunkload-redirect',
  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js')
})
