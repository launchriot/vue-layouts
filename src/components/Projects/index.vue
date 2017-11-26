<template>
  <div class="projects-wrapper">
    <h3 v-if="$route.path === '/projects'">Projects</h3>
    <router-view></router-view>
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