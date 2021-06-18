// .vuepress/config.js
const DEPLOY_DOMAIN = 'https://docs.filecoin.io'
const pageSuffix = '/'

module.exports = {
  base: '/',
  head: require('./head'),
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Filecoin Docs',
      description: 'Filecoin Documentation'
    }
  },
  markdown: {
    pageSuffix,
    extendMarkdown: md => {
      md.set({
        breaks: true
      })
      md.use(require('markdown-it-video'))
      md.use(require('markdown-it-footnote'))
      md.use(require('markdown-it-task-lists'))
      md.use(require('markdown-it-deflist'))
    }
  },
  themeConfig: {
    algolia: {
      apiKey: '6c3d7635474cdcd0a0aaf8ca397a4c44',
      indexName: 'filecoin'
    },
    betaTestFormUrl:
      'https://docs.google.com/forms/d/1LVaD1B2uyW6Ff0jfU_iQ5mCeyQcHfyQO6BDD99XAgK0/viewform',
    defaultImage: '/images/social-card.png',
    author: {
      name: 'Filecoin Team',
      twitter: '@filecoin'
    },
    keywords:
      'Filecoin, crypto, mining, blockchain, IPFS, dweb, protocol, libp2p, ipld, multiformats, bitswap, decentralized web, InterPlanetary File System, dapp, documentation, docs, Protocol Labs',
    domain: DEPLOY_DOMAIN,
    docsRepo: 'filecoin-project/filecoin-docs',
    docsDir: 'docs',
    docsBranch: 'master',
    feedbackWidget: {
      docsRepoIssue: 'filecoin-project/filecoin-docs'
    },
    editLinks: false,
    nextLinks: true,
    prevLinks: true,
    logo: '/images/filecoin-symbol-color.svg',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page',
        lastUpdated: 'Last Updated',
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        },
        nav: require('./nav/en'),
        sidebar: {
          '/get-started/': [
            {
              title: 'Lotus',
              path: '/get-started/lotus/',
              sidebarDepth: 2,
              collapsable: true,
              children: [
                ['lotus/running-in-the-cloud', 'Running in the Cloud'],
                ['lotus/installation', 'Local Installation'],
                ['lotus/switch-networks', 'Switch networks'],
                ['lotus/upgrades', 'Upgrades'],
                ['lotus/send-and-receive-fil', 'Send and receive ⨎'],
                ['lotus/multisig', 'Multi-signature wallets'],
                ['lotus/chain', 'Chain management'],
                ['lotus/ledger', 'Ledger wallet'],
                ['lotus/tips-running-in-china', 'Tips when running in China'],
                ['lotus/configuration-and-advanced-usage', 'Advanced options'],
                ['lotus/troubleshooting', 'Troubleshooting']
              ]
            },
            {
              title: 'Store and retrieve',
              path: '/get-started/store-and-retrieve/',
              sidebarDepth: 2,
              collapsable: true,
              children: [
                ['/get-started/store-and-retrieve/', 'Start here'],
                ['/get-started/store-and-retrieve/set-up', 'Set up'],
                ['/get-started/store-and-retrieve/store-data', 'Store data'],
                ['/get-started/store-and-retrieve/retrieve-data', 'Retrieve data']
              ]
            },
            'explore-the-network',
            [
              'https://proto.school/verifying-storage-on-filecoin/',
              'Protoschool tutorial'
            ],
          ],

          '/store/': [
            ['http://slingshot.filecoin.io/', 'Slingshot competition'],
            'slate',
            'starling',
            {
              title: 'LOTUS',
              path: '/store/lotus/',
              sidebarDepth: 2,
              children: [
                ['lotus/store-data', 'Store data'],
                ['lotus/very-large-files', 'Very large files'],
                ['lotus/retrieve-data', 'Retrieve data'],
                ['lotus/import-data-from-ipfs', 'Import data from IPFS'],
                ['lotus/store-troubleshooting', 'Troubleshooting']
              ]
            },
            'filecoin-plus',
            'estuary',
          ],

          '/mine/': [
            'how-mining-works',
            'hardware-requirements',
            'mining-architectures',
            //'storage-sector-lifecycle',
            ['mining-rewards', 'Mining rewards'],
            ['slashing', 'Slashing'],
            {
              title: 'LOTUS MINER',
              path: '/mine/lotus/',
              sidebarDepth: 2,
              collapsable: false,
              children: [
                ['lotus/miner-setup', 'Miner setup'],
                ['lotus/miner-configuration', 'Configuration reference'],
                ['lotus/miner-upgrades', 'Upgrades'],
                ['lotus/miner-lifecycle', 'Miner lifecycle'],
                ['lotus/manage-storage-deals', 'Manage storage deals'],
                ['lotus/manage-retrieval-deals', 'Manage retrieval deals'],
                ['lotus/custom-storage-layout', 'Custom storage layout'],
                ['lotus/sector-pledging', 'Sector pledging'],
                ['lotus/connectivity', 'Connectivity'],
                ['lotus/miner-addresses', 'Miner addresses'],
                //'lotus/fees-control-and-limits',
                ['lotus/message-pool', 'The Message Pool'],
                ['lotus/seal-workers', 'Seal workers'],
                ['lotus/benchmarks', 'Benchmarks'],
                ['lotus/backup-and-restore', 'Backup and restore'],
                ['lotus/gpus', 'Custom GPUs'],
                //'lotus/disaster-recovery',
                ['lotus/tips-running-in-china', 'Tips for running in China'],
                ['lotus/miner-troubleshooting', 'Troubleshooting']
              ]
            }
          ],

          '/build/': [
            'get-started',
            'textile-buckets',
            'hosted-powergate',
            'hosted-lotus',
            'powergate',
            'estuary',
            {
              title: 'Lotus',
              path: '/build/lotus/',
              sidebarDepth: 2,
              collapsable: true,
              children: [
                ['lotus/lotus-lite', 'Lotus lite'],
                ['lotus/enable-remote-api-access', 'Enable remote API access'],
                ['lotus/api-tokens', 'API tokens'],
                ['lotus/api-client-libraries', 'API client libraries'],
                ['lotus/go-json-rpc', 'Use Go with JSON-RPC APIs'],
                ['lotus/payment-channels', 'Payment channels'],
                ['lotus/troubleshooting', 'Troubleshooting']
              ]
            },
            'filecoin-pinning-services',
            'signing-libraries',
            ['local-devnet', 'Local devnet']
          ],

          '/reference/': [
            'glossary',
            ['https://github.com/filecoin-project/specs', 'Specification'],
            ['lotus-api', 'Lotus API']
          ],

          '/': [
            '/about-filecoin/what-is-filecoin',
            '/about-filecoin/how-filecoin-works',
            '/about-filecoin/why-filecoin',
            '/about-filecoin/ipfs-and-filecoin',
            '/about-filecoin/network-performance',
            '/about-filecoin/filecoin-compared-to',
            '/about-filecoin/managing-assets',
            '/about-filecoin/faq',
            {
              title: 'Project',
              path: '/project/',
              children: [
                [
                  'https://app.instagantt.com/shared/s/1152992274307505/latest',
                  'Roadmap'
                ],
                ['https://research.filecoin.io/', 'Research'],
                '/project/related-projects',
                [
                  'https://github.com/filecoin-project/community/blob/master/CODE_OF_CONDUCT.md',
                  'Code of conduct'
                ],
                [
                  'https://github.com/filecoin-project/community/blob/master/SECURITY.md',
                  'Security issues'
                ]
              ]
            },

            {
              title: 'Community',
              path: '/community/',
              children: [
                {
                  title: 'Join the community',
                  sidebarDepth: 2,
                  collapsable: false,
                  children: [
                    '/community/contribute/ways-to-contribute',
                    '/community/chat-and-discussion-forums',
                    ['https://proto.school/#/events', 'ProtoSchool workshops'],
                    '/community/social-media/social-media'
                  ]
                },
                {
                  title: 'Write the docs',
                  sidebarDepth: 1,
                  collapsable: false,
                  children: [
                    '/community/contribute/grammar-formatting-and-style',
                    '/community/contribute/writing-guide',
                    '/community/contribute/contribution-tutorial'
                  ]
                }
              ]
            }
          ]
        }
      }
    }
  },
  plugins: [
    '@vuepress/plugin-back-to-top',
    [
      '@vuepress/active-header-links',
      {
        sidebarLinkSelector: '.sidebar-link',
        headerAnchorSelector: '.header-anchor',
        headerTopOffset: 120
      }
    ],
    '@vuepress/plugin-last-updated',
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: pageSuffix,
        indexSuffix: pageSuffix,
        notFoundPath: '/404/'
      }
    ],
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-148766289-2'
      }
    ],
    ['vuepress-plugin-code-copy', { align: 'bottom', color: '#fff' }],
    [
      'vuepress-plugin-medium-zoom',
      {
        selector: '.theme-default-content img',
        delay: 500,
        options: {
          margin: 20,
          background: 'rgba(255,255,255,0.8)',
          scrollOffset: 0
        }
      }
    ],
    [
      'vuepress-plugin-seo',
      {
        siteTitle: ($page, $site) => $site.title,
        title: $page => $page.title,
        description: $page => $page.frontmatter.description,
        author: ($page, $site) =>
          $page.frontmatter.author || $site.themeConfig.author,
        tags: $page => $page.frontmatter.tags,
        twitterCard: _ => 'summary_large_image',
        type: $page =>
          ['articles', 'posts', 'blog'].some(folder =>
            $page.regularPath.startsWith('/' + folder)
          )
            ? 'article'
            : 'website',
        url: ($page, $site, path) => ($site.themeConfig.domain || '') + path,
        image: ($page, $site) =>
          $page.frontmatter.image
            ? ($site.themeConfig.domain || '') + $page.frontmatter.image
            : ($site.themeConfig.domain || '') + $site.themeConfig.defaultImage,
        publishedAt: $page =>
          $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
        customMeta: (add, context) => {
          const { $site, image } = context
          add(
            'twitter:site',
            ($site.themeConfig.author && $site.themeConfig.author.twitter) || ''
          )
          add('image', image)
          add('keywords', $site.themeConfig.keywords)
        }
      }
    ],
    [
      'vuepress-plugin-sitemap',
      {
        hostname: DEPLOY_DOMAIN
      }
    ],
    [
      'vuepress-plugin-robots',
      {
        host: DEPLOY_DOMAIN
      }
    ],
    [
      'vuepress-plugin-canonical',
      {
        // add <link rel="canonical" header (https://tools.ietf.org/html/rfc6596)
        // to deduplicate SEO across all copies loaded from various public gateways
        baseURL: DEPLOY_DOMAIN
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'callout',
        defaultTitle: ''
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'right',
        defaultTitle: ''
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'left',
        defaultTitle: ''
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'shell-input',
        defaultTitle: ''
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'shell-output',
        defaultTitle: ''
      }
    ],
    'vuepress-plugin-check-md',
    'vuepress-plugin-chunkload-redirect',
    'vuepress-plugin-ipfs'
  ],
  extraWatchFiles: ['.vuepress/nav/en.js']
}
