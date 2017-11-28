<template>
  <div class="projects-wrapper">
  	<vl-title-nav :title="$route.name"></vl-title-nav>
    <router-view v-if="$route.path !== '/projects'"/>
  </div>
</template>

<script>
export default {
  name: 'Projects'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>