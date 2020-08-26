<template>
  <main class="page">
    <slot name="top" />
    <Breadcrumbs />
    <Content v-if="!isHome" class="theme-default-content" />
    <Home v-else-if="isHome" />
    <div class="content-footer" v-if="!isContentStatus && !isHome">
      <Feedback
        class="content-feedback"
        evtYes="information_helpful"
        evtNo="information_not_helpful"
      />
      <PageNav v-bind="{ sidebarItems }" />
      <LegacyCallout />
      <PageEdit />
    </div>

    <Analytics />
    <ScrollPatch />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@parent-theme/components/PageEdit.vue'
import PageNav from '@parent-theme/components/PageNav.vue'

import Breadcrumbs from './Breadcrumbs.vue'
import Feedback from './Feedback.vue'
import LegacyCallout from './LegacyCallout.vue'
import Analytics from './Analytics.vue'
import ScrollPatch from './ScrollPatch.vue'
import Home from './Home.vue'

export default {
  name: 'Page',
  components: {
    PageEdit,
    PageNav,
    Breadcrumbs,
    Feedback,
    LegacyCallout,
    Analytics,
    ScrollPatch,
    Home
  },
  props: ['sidebarItems'],
  computed: {
    isContentStatus: function () {
      return !!(this.$frontmatter && this.$frontmatter.issueUrl)
    },
    isHome: function () {
      return !!(this.$frontmatter && this.$frontmatter.homepage)
    }
  },
  methods: {
    smoothScroll: function () {
      const root = document.getElementsByTagName('html')[0]
      // only enable smooth-scrolling on pages shorter that 15000 px
      return root.scrollHeight < 15000
        ? root.classList.add('smooth-scroll')
        : root.classList.remove('smooth-scroll')
    },
    htmlRouteClass: function () {
      // patch to apply a root class for styling elements
      // any path that isn't a primary nav item will add the route-index class
      const root = document.getElementsByTagName('html')[0]
      const path = this.$page.path
      const navItems = this.$themeConfig.locales['/'].nav
        .slice(1)
        .map(a => a.link)
      navItems.some(i => path.includes(i))
        ? root.classList.remove('route-index')
        : root.classList.add('route-index')
    }
  },
  mounted: function () {
    this.smoothScroll()
    this.htmlRouteClass()
  },
  updated: function () {
    this.smoothScroll()
    this.htmlRouteClass()
  }
}
</script>

<style lang="stylus" scoped>
.page {
  padding-bottom: 2rem;
  display: block;
}

.content-footer {
  padding-top: 0;
  max-width: $contentWidth;
}

.page-edit {
  max-width: 100%;
  padding: 2rem 2rem;
}

.content-feedback {
  padding: 0 2rem;
}

@media (min-width: $MQMobile) {
  .content-footer {
    padding: 0 2.5rem;
    padding-top: 0;
  }

  .content-feedback {
    padding: 0;
    margin: 0;
  }

  .page-edit {
    padding: 2.5rem 0;
  }

  section {
    display: flex;

    .block {
      flex: 1;
    }
  }
}
</style>
