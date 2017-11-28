<template>
  <div id="app" class="main-wrapper" :class="$route.meta.theme">
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
  }
}
</script>

<style>
</style>
