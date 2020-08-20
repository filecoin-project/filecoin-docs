<template>
  <nav v-if="bread.length > 1" class="breadcrumbs fixed">
    <div class="nav-wrapper">
      <router-link
        class="breadcrumb"
        v-for="crumb in bread"
        :key="crumb.path"
        :to="crumb.path"
        >{{ crumb.title }}</router-link
      >
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  computed: {
    bread() {
      const parts = this.$page.path.split('/')
      if (!parts[parts.length - 1].length) {
        parts.pop()
      }
      let link = ''
      const crumbs = []
      for (let i = 0; i < parts.length; i++) {
        link += parts[i]
        const page = this.$site.pages.find(
          el => el.path === link || el.path === link + '/'
        )
        link += '/'
        if (page != null) {
          crumbs.push({
            path: page.path,
            title: page.frontmatter.breadcrumb || page.title
          })
        }
      }
      return crumbs
    }
  }
}
</script>

<style lang="stylus">
// offset hash position for breadcrumb bar
h1, h2, h3, h4, h5, h6
  {$contentClass}:not(.custom) > &
    margin-top (0.5rem - ($navbarHeight + $breadcrumbsHeight)) !important
    padding-top $navbarHeight + $breadcrumbsHeight + 1rem !important

.breadcrumbs.fixed + {$contentClass} {
  padding-top: $breadcrumbsHeight - 0.5rem;
}
</style>

<style lang="stylus" scoped>
nav
  border-bottom 1px solid #eaecef
  font-size 0.9em
  padding: 1.5rem 2rem

  @media (min-width: $MQNarrow)
    margin: 0 2.5rem
    padding: 1.5rem 0

  &.fixed
    position fixed
    z-index 5
    background-color #fff
    width 100%
    max-width 740px
    display flex
.breadcrumb
  margin-right: 0.5em
  color: $sidebarTextColor;
  opacity: 0.7;
  font-weight 600
  transition: opacity 0.5s;
  &:not(:first-child)::before
    margin-right: 0.5em
    content "/"
    font-family inherit
    font-size inherit

  &:last-child
  &:hover
    opacity 1
    color: $accentColor
</style>
