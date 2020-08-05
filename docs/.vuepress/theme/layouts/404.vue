<template>
  <div class="theme-container">
    <Navbar />
    <div class="theme-default-content">
      <h1>🤷‍♀️ 404</h1>

      <blockquote>
        Oops, it seems that this page has moved or no longer exists.
      </blockquote>

      <RouterLink to="/">
        Return home
      </RouterLink>
      or <a href="#" @click="searchFocus">try to search</a>.
    </div>
  </div>
</template>

<script>
import Navbar from '@theme/components/Navbar.vue'

export default {
  name: 'NotFound',
  components: {
    Navbar
  },

  mounted() {
    // bail if ga is not enabled
    if (!window.ga) return

    window.ga('send', 'event', {
      eventCategory: '404',
      eventAction: this.currentPath,
      eventLabel: document.referrer
    })
  },
  methods: {
    searchFocus(e) {
      e.preventDefault()
      document.querySelector('#search-form input').focus()
    }
  }
}
</script>
