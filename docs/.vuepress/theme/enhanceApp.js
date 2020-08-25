export default ({ router, isServer }) => {
  // reload the target app route if a stale deploy is being used and the js chunk is not found
  // fixes issue: https://github.com/filecoin-project/filecoin-docs/issues/276
  !isServer &&
    window.addEventListener('unhandledrejection', function (evt) {
      if (/loading chunk \d* failed./i.test(evt.reason)) {
        const targetPath = router.history.pending.fullPath
        document.location.pathname = targetPath
      }
    })
}
