<template>
  <main class="home">
    <div class="theme-default-content">
      <Content class="intro"/>
      <div class="grid">
        <div
          v-for="(category, i) in manualSidebar"
          :key="i"
          v-bind:class="{'category': true, 'meta': category.title === 'Community' || category.title === 'Project'}"
        >
          <h2>
            <RouterLink :to="category.path" class="title">
              {{ category.title }}
            </RouterLink>
          </h2>
          <p v-for="(item, j) in category.children" :key="j">
            <RouterLink v-if="!isExternal(item.path)"  :to="item.path">
              {{ item.title }}
            </RouterLink>
            <a v-else :href="item.path" target="_blank">
              {{ item.title }}
              <OutboundLink/>
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
  data: function() {
    return {
      manualSidebar: [
        {
          title: 'Introduction',
          path: '/introduction',
          children: [
            {
              title: 'What is Filecoin?',
              path: '/introduction/what-is-filecoin'
            },
            {
              title: 'Why Filecoin?',
              path: '/introduction/why-filecoin'
            },
            {
              title: 'Filecoin compared to...',
              path: '/introduction/filecoin-compared-to'
            }
          ]
        },
        {
          title: 'How-Tos',
          path: '/how-to',
          children: [
            {
              title: 'Installing Filecoin',
              path: '/how-to/install-filecoin'
            },
            {
              title: 'Preparing data',
              path: '/how-to/store-prepare-data'
            },
            {
              title: 'Token payments',
              path: '/how-to/store-tokens'
            },
            {
              title: 'Making storage deals',
              path: '/how-to/store-making-storage-deals'
            },
            {
              title: 'Retrieving data',
              path: '/how-to/store-retrieving-data'
            },
            {
              title: 'Very large files',
              path: '/how-to/store-large-files'
            },
            {
              title: 'Sample architectures',
              path: '/how-to/build-sample-architectures'
            },
            {
              title: 'Wallets, signing tools and API clients',
              path: '/how-to/build-wallets-signing-tools-api-clients'
            },
            {
              title: 'Interacting with the network',
              path: '/how-to/build-interacting-with-the-network'
            }
          ]
        },
        {
          title: 'Reference',
          path: '/reference',
          children: [
            {
              title: 'Specification',
              path: 'https://github.com/filecoin-project/specs'
            },
            {
              title: 'go-filecoin tutorial',
              path: 'https://go.filecoin.io/go-filecoin-tutorial'
            },
            {
              title: 'lotus tutorial',
              path: 'https://lotu.sh'
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
              title: 'ProtoSchool workshops',
              path: 'https://proto.school/#/events'
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
              title: 'Roadmap',
              path: 'https://app.instagantt.com/shared/s/1152992274307505/latest'
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
              path: 'https://github.com/filecoin-project/community/blob/master/CODE_OF_CONDUCT.md'
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

<style lang="stylus" scoped>
.home .theme-default-content:not(.custom) {
    padding: 2rem 2.5rem 6rem;
    max-width: 740px;
    background: no-repeat url("/images/main-page-background.png");
    background-position: 550px 34px;
    background-size: 280px 336px;
}
.home .theme-default-content:not(.custom) > h1:first-child {
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
