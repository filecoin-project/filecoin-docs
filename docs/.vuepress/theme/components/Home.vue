<template>
  <main class="home">
    <div class="home-container theme-default-content">
      <Content class="intro" />
      <div class="grid">
        <div
          v-for="(category, i) in manualSidebar"
          :key="i"
          v-bind:class="{
            category: true,
            meta: category.title === 'Community' || category.title === 'Project'
          }"
        >
          <h2>
            <RouterLink :to="category.path" class="title">
              {{ category.title }}
            </RouterLink>
          </h2>
          <p v-for="(item, j) in category.children" :key="j">
            <RouterLink v-if="!isExternal(item.path)" :to="item.path">
              {{ item.title }}
            </RouterLink>
            <a v-else :href="item.path" target="_blank">
              {{ item.title }}
              <OutboundLink />
            </a>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { isExternal } from '@parent-theme/util/'

export default {
  name: 'Home',
  data: function () {
    return {
      manualSidebar: [
        {
          title: 'Get Started',
          path: '/get-started',
          children: [
            {
              title: 'What is Filecoin?',
              path: '/about-filecoin/what-is-filecoin'
            },
            {
              title: 'How Filecoin Works',
              path: '/about-filecoin/how-filecoin-works'
            },
            {
              title: 'Filecoin networks',
              path: 'https://networks.filecoin.io'
            },
            {
              title: 'Lotus installation and setup',
              path: '/get-started/lotus/installation'
            },
            {
              title: 'Lotus wallets',
              path: '/get-started/lotus/send-and-receive-fil'
            },
            {
              title: 'Filecoin FAQ',
              path: '/about-filecoin/faq'
            },
            {
              title: 'Glossary',
              path: '/reference/glossary'
            }
          ]
        },
        {
          title: 'Store',
          path: '/store',
          children: [
            {
              title: 'Slingshot competition',
              path: 'http://slingshot.filecoin.io/'
            },
            {
              title: 'Store data with Lotus',
              path: '/store/lotus/store-data'
            },
            {
              title: 'Very large files',
              path: '/store/lotus/very-large-files'
            },
            {
              title: 'Retrieve data with Lotus',
              path: '/store/lotus/retrieve-data'
            },
            {
              title: 'Import data from IPFS',
              path: '/store/lotus/import-data-from-ipfs'
            }
          ]
        },
        {
          title: 'Mine',
          path: '/mine',
          children: [
            {
              title: 'How mining works',
              path: '/mine/how-mining-works'
            },
            {
              title: 'Hardware requirements',
              path: '/mine/hardware-requirements'
            },
            {
              title: 'Mining architectures',
              path: '/mine/mining-architectures'
            },
            {
              title: 'Lotus guides for miners',
              path: '/mine/lotus'
            },
            {
              title: 'Lotus miner setup',
              path: '/mine/lotus/miner-setup'
            },
            {
              title: 'Configuration reference',
              path: '/mine/lotus/miner-configuration'
            },
            { title: 'Seal workers', path: '/mine/lotus/seal-workers' }
          ]
        },
        {
          title: 'Build',
          path: '/build',
          children: [
            {
              title: 'Build with Textile Buckets',
              path: '/build/textile-buckets'
            },
            {
              title: 'Build with Hosted Powergate',
              path: '/build/hosted-powergate'
            },
            {
              title: 'Build with Glif Nodes',
              path: '/build/hosted-lotus'
            },
            {
              title: 'Filecoin-backed pinning services',
              path: '/build/filecoin-pinning-services'
            },
            {
              title: 'Lotus API',
              path: '/reference/lotus-api'
            },
            {
              title: 'Example applications',
              path: '/build/examples'
            },
            {
              title: 'Filecoin community resources',
              path:
                'https://github.com/filecoin-project/docs/wiki#community-resources'
            },
            {
              title: 'Protocol specification',
              path: 'https://github.com/filecoin-project/specs'
            }
          ]
        },
        {
          title: 'Community',
          path: '/community',
          children: [
            {
              title: 'Ways to contribute',
              path: '/community/contribute/ways-to-contribute'
            },
            {
              title: 'Chat & discussion forums',
              path: '/community/chat-and-discussion-forums'
            },
            {
              title: 'Social media',
              path: '/community/social-media/social-media'
            },
            {
              title: 'Docs: Grammar, formatting and style',
              path: '/community/contribute/grammar-formatting-and-style'
            },
            {
              title: 'Docs: Writing guide',
              path: '/community/contribute/writing-guide'
            },
            {
              title: 'Docs: Contribution tutorial',
              path: '/community/contribute/contribution-tutorial'
            }
          ]
        },
        {
          title: 'Project',
          path: '/project',
          children: [
            {
              title: 'Security issues',
              path:
                'https://github.com/filecoin-project/community/blob/master/SECURITY.md'
            },
            {
              title: 'Roadmap',
              path:
                'https://app.instagantt.com/shared/s/1152992274307505/latest'
            },
            {
              title: 'Research',
              path: 'https://research.filecoin.io/'
            },
            {
              title: 'Related projects',
              path: '/project/related-projects'
            },
            {
              title: 'Code of conduct',
              path:
                'https://github.com/filecoin-project/community/blob/master/CODE_OF_CONDUCT.md'
            }
          ]
        }
      ]
    }
  },
  methods: {
    isExternal
  }
}
</script>

<style lang="stylus">
.home .header-anchor {
  display: none;
}
</style>

<style lang="stylus" scoped>
@media (min-width: $MQNarrow) {
  .home {$contentClass}:not(.custom) {
      background: no-repeat url("/images/main-page-background.png");
      background-position: right 3rem;
      background-size: 280px 336px;
  }
}
.home {$contentClass}:not(.custom) > h1:first-child {
    font-weight: normal;
    margin: 0 0 3rem;
}
.home {
    .intro {
	max-width: 500px;
	margin-top: 3rem;
    }
    .grid {
	margin-top: 4rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-flow: row dense;
	grid-auto-rows: auto;
	grid-gap: 32px;
    }
    .category {
	background: linear-gradient(-50deg, #effcf5, #e2f6f7);
	padding: 1em;
    }
    .category.meta {
	background: linear-gradient(-50deg, #dbe7f4, #e9dbf4);
    }
    .category h2 {
	font-weight: normal;
	font-size: 1.4rem;
	border-bottom: none;
	margin: 0 0 0.5rem;
    }
    .category p {
	margin: 0;
    }
    .category a {
	font-weight: normal;
    }
    .category.meta a {
	color: #5c456e;
    }

    .category a.title {
	color: black;
    }

    @media (max-width: $MQNarrow) {
	.grid {
	    grid-template-columns: 1fr;
	    /* grid-auto-rows: minmax(16rem, max-content); */
	    grid-auto-rows: auto;

	}
	.category {
	    grid-column: auto !important;
	    grid-row: auto !important;
	}

	.intro {
	  margin-top: 0;
	}
    }
}
</style>
