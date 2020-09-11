// .vuepress/config.js

const DEPLOY_DOMAIN = 'https://docs.filecoin.io'

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
    // edit links
    // repo: 'filecoin-project/filecoin-docs',
    domain: DEPLOY_DOMAIN,
    docsRepo: 'filecoin-project/filecoin-docs',
    docsDir: 'docs',
    docsBranch: 'master',
    feedbackWidget: {
      docsRepoIssue: 'filecoin-project/filecoin-docs'
    },
    editLinks: false,
    // page nav
    nextLinks: true,
    prevLinks: true,
    // ui/ux
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
          //'/software/': 'auto',
          '/networks/': 'auto',

          '/store/': [
            'explore-the-network',
            [
              'https://proto.school/verifying-storage-on-filecoin/',
              'Protoschool tutorial'
            ],
            {
              title: 'LOTUS',
              path: '/store/lotus/',
              sidebarDepth: 2,
              collapsable: false,
              children: [
                ['lotus/installation', 'Installation'],
                ['lotus/switch-networks', 'Switch networks'],
                ['lotus/upgrades', 'Upgrades'],
                ['lotus/send-and-receive-fil', 'Send and receive ⨎'],
                ['lotus/store-data', 'Store data'],
                ['lotus/very-large-files', 'Very large files'],
                ['lotus/retrieve-data', 'Retrieve data'],
                ['lotus/import-data-from-ipfs', 'Import data from IPFS'],
                ['lotus/tips-running-in-china', 'Tips when running in China'],
                ['lotus/chain-snapshots', 'Chain snapshots'],
                ['lotus/configuration-and-advanced-usage', 'Advanced options'],
                ['lotus/node-troubleshooting', 'Node troubleshooting']
              ]
            }
          ],

          '/mine/': [
            'how-mining-works',
            ['spacerace', 'Space Race'],
            'hardware-requirements',
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
                ['lotus/daemon-lifecycle', 'Daemon lifecycle'],
                ['lotus/manage-storage-deals', 'Manage storage deals'],
                ['lotus/manage-retrieval-deals', 'Manage retrieval deals'],
                ['lotus/custom-storage-layout', 'Custom storage layout'],
                ['lotus/sector-pledging', 'Sector pledging'],
                ['lotus/connectivity', 'Connectivity'],
                [
                  'lotus/separate-address-window-post',
                  'Separate address for WindowPoSt messages'
                ],
                //'lotus/fees-control-and-limits',
                [
                  'lotus/replace-messages-in-mpool',
                  'Replace messages in the message pool'
                ],
                ['lotus/seal-workers', 'Seal workers'],
                ['lotus/benchmarks', 'Benchmarks'],
                ['lotus/gpus', 'Custom GPUs'],
                //'lotus/disaster-recovery',
                ['lotus/tips-running-in-china', 'Tips for running in China'],
                ['lotus/miner-troubleshooting', 'Troubleshooting']
              ]
            }
          ],

          '/build/': [
            //'the-filecoin-ecosystem',
            //'textile-buckets',
            ['onboard-testnet', 'Onboard the testnet'],
            ['filecoin-pinning-services', 'Filecoin-backed pinning services'],
            'powergate',
            {
              title: 'LOTUS',
              path: '/build/lotus/',
              sidebarDepth: 2,
              collapsable: false,
              children: [
                ['lotus/enable-remote-api-access', 'Enable remote API access'],
                ['lotus/api-token-generation', 'API token generation'],
                ['lotus/api-client-libraries', 'API client libraries'],
                ['lotus/go-json-rpc', 'Use Go with JSON-RPC APIs'],
                ['lotus/payment-channels', 'Payment channels'],
                ['lotus/hosted-nodes', 'Hosted nodes'],
                ['lotus/troubleshooting', 'Troubleshotting']
              ]
            },
            'signing-libraries',
            'local-devnet',
            {
              title: 'Example apps',
              path: '/build/examples/',
              sidebarDepth: 2,
              collapsable: false,
              children: [
                {
                  title: 'Simple Pinning Service',
                  path: '/build/examples/simple-pinning-service/overview/',
                  collapsable: true,
                  children: [
                    'examples/simple-pinning-service/powergate-lotus-go-ipfs-interactions',
                    'examples/simple-pinning-service/step-1-powergate-setup',
                    'examples/simple-pinning-service/step-2-react-app-setup',
                    'examples/simple-pinning-service/step-3-connecting-powergate-to-app',
                    'examples/simple-pinning-service/step-4-explore-pinning-service-app',
                    'examples/simple-pinning-service/step-5-shut-down-the-application',
                    'examples/simple-pinning-service/summary'
                  ]
                },
                {
                  title: 'Network Inspector',
                  path: '/build/examples/network-inspector/overview/',
                  collapsable: true,
                  children: [
                    '/build/examples/network-inspector/lotus-and-go-ipfs-interactions',
                    '/build/examples/network-inspector/step-1-start-lotus-devnet-and-go-ipfs',
                    '/build/examples/network-inspector/step-2-run-the-react-app',
                    '/build/examples/network-inspector/step-3-set-up-the-lotus-and-go-ipfs-api-clients',
                    '/build/examples/network-inspector/step-4-explore-the-filecoin-network-inspector-app',
                    '/build/examples/network-inspector/step-5-shut-down-the-application',
                    '/build/examples/network-inspector/summary'
                  ]
                },
                {
                  title: 'Meme Marketplace',
                  path: '/build/examples/meme-marketplace/overview/',
                  collapsable: true,
                  children: [
                    '/build/examples/meme-marketplace/textile-hub-buckets-and-erc721',
                    '/build/examples/meme-marketplace/step-1-blockchain-and-contracts-setup',
                    '/build/examples/meme-marketplace/step-2-run-react-app',
                    '/build/examples/meme-marketplace/step-3-run-hub-auth-server',
                    '/build/examples/meme-marketplace/step-4-connecting-app-with-auth-server',
                    '/build/examples/meme-marketplace/step-5-connecting-app-with-blockchain',
                    '/build/examples/meme-marketplace/step-6-explore-app',
                    '/build/examples/meme-marketplace/step-7-shut-down-the-application',
                    '/build/examples/meme-marketplace/summary'
                  ]
                }
              ]
            }
          ],

          '/reference/': [
            'glossary',
            ['https://github.com/filecoin-project/specs', 'Specification'],
            ['lotus-api', 'Lotus JSON-RPC API']
          ],

          '/': [
            '/about-filecoin/what-is-filecoin',
            '/about-filecoin/how-filecoin-works',
            '/about-filecoin/why-filecoin',
            '/about-filecoin/ipfs-and-filecoin',
            '/about-filecoin/filecoin-compared-to',
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
        normalSuffix: '/',
        indexSuffix: '/',
        notFoundPath: '/404/'
      }
    ],
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-148766289-2'
      }
    ],
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
    'vuepress-plugin-check-md',
    'vuepress-plugin-ipfs'
  ],
  extraWatchFiles: ['.vuepress/nav/en.js']
}
