export default {
  mounted() {
    // catch unhandledRejection from promise
    window.addEventListener('unhandledrejection', this.unhandledRejection)
  },
  beforeDestroy() {
    // remove on unmount
    window.removeEventListener('unhandledrejection', this.unhandledRejection)
  },
  methods: {
    unhandledRejection(e) {
      if (/loading chunk \d* failed./i.test(e.reason)) {
        const targetPath = this.$router.history.pending.fullPath
        if (targetPath) {
          window.location.pathname = targetPath
        }
      }
    }
  }
}
