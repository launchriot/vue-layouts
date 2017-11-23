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
  }
}
</script>

<style>
</style>
