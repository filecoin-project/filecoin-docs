<template></template>
<script>
export default {
  methods: {
    scrollTop: function () {
      // FireFox has a problem setting the correct scroll postion on route change this patch will fix it for now
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        window.scrollTo(0, 0)
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 100)
      }
    }
  },
  watch: {
    '$route.path': function (path) {
      this.scrollTop()
    },
    $route: function () {
      // activates on every route change
      const items = document.querySelectorAll('.sidebar-links .active')
      if (items.length && document.documentElement.scrollIntoView) {
        const lastItem = items.item(items.length - 1)
        try {
          lastItem.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          })
        } catch (e) {
          lastItem.scrollIntoView(false)
        }
      }
    }
  }
}
</script>
