<template>
  <div id="app" class="main-wrapper">
    <div class="container-fluid">
      <layout />
    </div>
  </div>
</template>

<script>
import LayoutWrapper from '@/components/LayoutWrapper/index'

export default {
  name: 'app',
  components: {
    'layout': LayoutWrapper
  },
  watch: {
    '$route' (to, from) {
      var theme = this.$route.meta.theme
      document.body.className = theme
    }
  }
}
</script>

<style>
</style>
