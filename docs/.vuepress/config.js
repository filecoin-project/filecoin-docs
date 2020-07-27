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
    },
    '/zh-cn/': {
      lang: 'zh-CN',
      title: 'Filecoin 文档',
      description: 'Filecoin 中文文档'
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
        sidebar: [
          {
            title: 'Introduction',
            path: '/introduction/',
            children: [
              '/introduction/new-to-web3',
              '/introduction/what-is-filecoin',
              '/introduction/why-filecoin',
              '/introduction/ipfs-and-filecoin',
              '/introduction/filecoin-compared-to'
            ]
          },
          {
            title: 'How-tos',
            path: '/how-to/',
            children: [
              {
                title: 'Install Filecoin',
                sidebarDepth: 1,
                collapsable: false,
                children: ['/how-to/install-filecoin', '/how-to/networks']
              },
              {
                title: 'Store Data',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/how-to/store/prepare-data',
                  '/how-to/store/tokens',
                  '/how-to/store/making-storage-deals',
                  '/how-to/store/retrieving-data',
                  '/how-to/store/large-files'
                ]
              }
            ]
          },
          {
            title: 'Mine',
            path: '/mine/',
            children: ['/mine/connectivity', '/mine/spacerace']
          },
          {
            title: 'Build',
            path: '/build/',
            children: [
              {
                title: 'Start Building',
                sidebarDepth: 1,
                collapsable: false,
                children: ['/build/start-building/interacting-with-the-network']
              },
              {
                title: 'Core Products',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/build/core-products/filecoin-backed-pinning-services',
                  '/build/core-products/powergate',
                  '/build/core-products/protocol-implementations'
                ]
              },
              {
                title: 'Developer Tools',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/build/developer-tools/wallets-signing-tools-api-clients',
                  [
                    'https://github.com/filecoin-project/docs/wiki#community-resources',
                    'Filecoin Community Resources'
                  ],
                  ['http://filecoin.onrender.com/', 'Component Design System']
                ]
              },
              {
                title: 'Examples',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/build/examples/sample-architectures',

                  {
                    title: 'Meme Marketplace',
                    sidebarDepth: 1,
                    collapsable: false,
                    children: ['build/examples/meme-marketplace/overview']
                  },
                  {
                    title: 'Simple Pinning Service',
                    sidebarDepth: 1,
                    collapsable: false,
                    children: ['build/examples/simple-pinning-service/overview']
                  },
                  {
                    title: 'Web Applications',
                    sidebarDepth: 1,
                    collapsable: false,
                    children: ['build/examples/web-applications/overview']
                  },
                  {
                    title: 'Slate',
                    sidebarDepth: 1,
                    collapsable: false,
                    children: ['build/examples/slate/overview']
                  },
                  {
                    title: 'Network Inspector',
                    sidebarDepth: 2,
                    collapsable: false,
                    children: [
                      'build/examples/network-inspector/overview',
                      'build/examples/network-inspector/lotus-and-go-ipfs-interactions',
                      'build/examples/network-inspector/step-1-start-lotus-devnet-and-go-ipfs',
                      'build/examples/network-inspector/step-2-run-the-react-app',
                      'build/examples/network-inspector/step-3-set-up-the-lotus-and-go-ipfs-api-clients',
                      'build/examples/network-inspector/step-4-explore-the-filecoin-network-inspector-app',
                      'build/examples/network-inspector/step-5-shut-down-the-application',
                      'build/examples/network-inspector/summary'
                    ]
                  }
                ]
              }
            ]
          },

          {
            title: 'Reference',
            path: '/reference/',
            children: [
              ['https://github.com/filecoin-project/specs', 'Specification'],
              ['https://lotu.sh/', 'lotus tutorial']
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
          },
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
          }
        ]
      },
      '/zh-cn/': {
        label: '简体中文',
        selectText: '语言',
        ariaLabel: '选择语言',
        editLinkText: '编辑页面',
        lastUpdated: '最近更新',
        serviceWorker: {
          updatePopup: {
            message: '有新内容啦！',
            buttonText: '刷新'
          }
        },
        nav: require('./nav/en'),
        sidebar: [
          {
            title: '介绍',
            path: '/zh-cn/introduction/',
            children: [
              ['/zh-cn/introduction/new-to-web3', 'web3 入门'],
              ['/zh-cn/introduction/what-is-filecoin', '什么是 Filecoin？'],
              ['/zh-cn/introduction/why-filecoin', '为何选择 Filecoin？'],
              ['/zh-cn/introduction/ipfs-and-filecoin', 'IPFS 与 Filecoin'],
              ['/zh-cn/introduction/filecoin-compared-to', 'Filecoin 对比...']
            ]
          },
          {
            title: '新手上路',
            path: '/zh-cn/how-to/',
            children: [
              {
                title: '安装 Filecoin',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  ['/zh-cn/how-to/install-filecoin', '安装 Filecoin'],
                  ['/zh-cn/how-to/networks', '连接到网络']
                ]
              },
              {
                title: '存储数据',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  ['/zh-cn/how-to/store/prepare-data', '准备数据'],
                  ['/zh-cn/how-to/store/tokens', '代币支付'],
                  ['/zh-cn/how-to/store/making-storage-deals', '进行存储交易'],
                  ['/zh-cn/how-to/store/retrieving-data', '检索数据'],
                  ['/zh-cn/how-to/store/large-files', '大文件']
                ]
              }
            ]
          },
          {
            title: '挖矿',
            path: '/zh-cn/mine/',
            children: [
              ['/zh-cn/mine/connectivity', '改善连接'],
              ['/zh-cn/mine/spacerace', 'Filecoin 太空竞赛']
            ]
          },
          {
            title: '构建',
            path: '/zh-cn/build/',
            children: [
              {
                title: '开始构建',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  '/zh-cn/build/start-building/interacting-with-the-network',
                  '与网络交互'
                ]
              },
              {
                title: '核心产品',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  [
                    '/zh-cn/build/core-products/filecoin-backed-pinning-services',
                    'Filecoin 支持的 pinning 服务'
                  ],
                  '/zh-cn/build/core-products/powergate',
                  [
                    '/zh-cn/build/core-products/protocol-implementations',
                    '协议实现'
                  ]
                ]
              },
              {
                title: '开发工具',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  [
                    '/zh-cn/build/developer-tools/wallets-signing-tools-api-clients',
                    '钱包，签名工具和 API 客户端'
                  ],
                  [
                    'https://github.com/filecoin-project/docs/wiki#community-resources',
                    'Filecoin 社区资源'
                  ],
                  ['http://filecoin.onrender.com/', '组件设计系统']
                ]
              },
              {
                title: '示例',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  ['/zh-cn/build/examples/sample-architectures', '示例架构'],

                  {
                    title: 'Meme Marketplace',
                    sidebarDepth: 1,
                    collapsable: false,
                    children: [
                      '/zh-cnbuild/examples/meme-marketplace/overview',
                      '概览'
                    ]
                  },
                  {
                    title: 'Simple Pinning Service',
                    sidebarDepth: 1,
                    collapsable: false,
                    children: [
                      '/zh-cnbuild/examples/simple-pinning-service/overview',
                      '概览'
                    ]
                  },
                  {
                    title: 'Web Applications',
                    sidebarDepth: 1,
                    collapsable: false,
                    children: [
                      '/zh-cnbuild/examples/web-applications/overview',
                      '概览'
                    ]
                  },
                  {
                    title: 'Slate',
                    sidebarDepth: 1,
                    collapsable: false,
                    children: ['/zh-cnbuild/examples/slate/overview', '概览']
                  },
                  {
                    title: 'Network Inspector',
                    sidebarDepth: 2,
                    collapsable: false,
                    children: [
                      [
                        '/zh-cnbuild/examples/network-inspector/overview',
                        '概览'
                      ],
                      [
                        '/zh-cnbuild/examples/network-inspector/lotus-and-go-ipfs-interactions',
                        'lotus 与 go-ipfs 交互'
                      ],
                      [
                        '/zh-cnbuild/examples/network-inspector/step-1-start-lotus-devnet-and-go-ipfs',
                        '第一步 启动 lotus-devnet 和 go-ipfs'
                      ],
                      [
                        '/zh-cnbuild/examples/network-inspector/step-2-run-the-react-app',
                        '第二步 运行 React 应用'
                      ],
                      [
                        '/zh-cnbuild/examples/network-inspector/step-3-set-up-the-lotus-and-go-ipfs-api-clients',
                        '第三步 设置 lotus 和 go-ipfs API 客户端'
                      ],
                      [
                        '/zh-cnbuild/examples/network-inspector/step-4-explore-the-filecoin-network-inspector-app',
                        '第四步 探索 Filecoin 网络检查程序'
                      ],
                      [
                        '/zh-cnbuild/examples/network-inspector/step-5-shut-down-the-application',
                        '第五步 关闭应用'
                      ],
                      ['/zh-cnbuild/examples/network-inspector/summary', '总结']
                    ]
                  }
                ]
              }
            ]
          },

          {
            title: '参考',
            path: '/reference/',
            children: [
              ['https://github.com/filecoin-project/specs', '规格说明书'],
              ['https://lotu.sh/', 'lotus 指南']
            ]
          },
          {
            title: '社区',
            path: '/zh-cn/community/',
            children: [
              {
                title: '加入社区',
                sidebarDepth: 2,
                collapsable: false,
                children: [
                  [
                    '/zh-cn/community/contribute/ways-to-contribute',
                    '如何贡献'
                  ],
                  ['/zh-cn/community/chat-and-discussion-forums', '聊天&讨论'],
                  ['https://proto.school/#/events', 'ProtoSchool workshops'],
                  ['/zh-cn/community/social-media/social-media', '社交媒体']
                ]
              },
              {
                title: '编写文档',
                sidebarDepth: 1,
                collapsable: false,
                children: [
                  [
                    '/zh-cn/community/contribute/grammar-formatting-and-style',
                    '风格指南'
                  ],
                  ['/zh-cn/community/contribute/writing-guide', '写作指南'],
                  [
                    '/zh-cn/community/contribute/contribution-tutorial',
                    '贡献指南'
                  ]
                ]
              }
            ]
          },
          {
            title: '项目',
            path: '/zh-cn/project/',
            children: [
              [
                'https://app.instagantt.com/shared/s/1152992274307505/latest',
                '路线图'
              ],
              ['https://research.filecoin.io/', '研究'],
              ['/zh-cn/project/related-projects', '相关项目'],
              [
                'https://github.com/filecoin-project/community/blob/master/CODE_OF_CONDUCT.md',
                '编码规范'
              ]
            ]
          }
        ]
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
