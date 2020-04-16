<template>
  <section class="sidebar-group">
    <p class="sidebar-heading">{{ item.title }}</p>
    <SidebarLinks
      class="sidebar-group-items"
      :items="item.children"
      :sidebar-depth="item.sidebarDepth"
      :depth="depth + 1"
    />
  </section>
</template>

<script>
export default {
  name: 'SidebarGroup',

  props: [
    'item',
    'open',
    'collapsable',
    'depth'
  ],

  // ref: https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
  beforeCreate () {
    this.$options.components.SidebarLinks = require('@theme/components/SidebarLinks.vue').default
  }

}
</script>

<style lang="stylus">
.sidebar-group
  .sidebar-group
    padding-left 0.5em

.sidebar-heading
  color $textColor
  font-size 1.1em
  font-weight bold
  padding 0.2rem 1.5rem 0.2rem 1.25rem
  box-sizing border-box
  margin 1.6rem 0 0
  border-left 0.25rem solid transparent

.sidebar-links li:first-child .sidebar-heading
  margin 0

.sidebar-group-items
  font-size 0.9em
</style>
