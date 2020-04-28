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
          <h2>{{ category.title }}</h2>
          <p v-for="(item, j) in category.children" :key="j">
            <RouterLink :to="item.path">
              {{ item.title }}
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>

export default {
  name: 'Home',
  data: function() {
    return {
      manualSidebar: [
        {
          title: 'Introduction',
          children: [
            {
              title: 'Writing Guide',
              path: '/community/contribute/writing-guide'
            },
            {
              title: 'Grammar, Formatting and Style',
              path: '/community/contribute/grammar-formatting-and-style'
            }
          ]
        },
        {
          title: 'How-Tos',
          children: [
            {
              title: 'Writing Guide',
              path: '/community/contribute/writing-guide'
            },
            {
              title: 'Grammar, Formatting and Style',
              path: '/community/contribute/grammar-formatting-and-style'
            }
          ]
        },
        {
          title: 'Community',
          children: [
            {
              title: 'Writing Guide',
              path: '/community/contribute/writing-guide'
            },
            {
              title: 'Grammar, Formatting and Style',
              path: '/community/contribute/grammar-formatting-and-style'
            }
          ]
        },
        {
          title: 'Project',
          children: [
            {
              title: 'Writing Guide',
              path: '/community/contribute/writing-guide'
            },
            {
              title: 'Grammar, Formatting and Style',
              path: '/community/contribute/grammar-formatting-and-style'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
.home .theme-default-content:not(.custom) {
    margin: auto;
    padding: 2rem 2.5rem 6rem;
    max-width: 920px;
    background: no-repeat url("../../public/images/main-page-background.png") 600px 34px;
    background-size: 400px 480px;
}
.home .theme-default-content:not(.custom) > h1:first-child {
    font-weight: normal;
    margin: 0 0 3rem;
}
.home {
    .intro {
        max-width: 500px;
    }
    .grid {
        margin-top: 6rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-flow: row dense;
        grid-auto-rows: 16rem;
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
    @media (max-width: $MQMobile) {
        .grid {
            grid-template-columns: 1fr;
            grid-auto-rows: minmax(16rem, max-content);
        }
        .category {
            grid-column: auto !important;
            grid-row: auto !important;
        }
    }
}
</style>
