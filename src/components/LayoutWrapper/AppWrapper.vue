<template>
  <div class="app-layout-wrapper">
    <vl-meta-nav></vl-meta-nav>
    <vl-primary-nav :items="items"></vl-primary-nav>
    <vl-secondary-nav :items="items"></vl-secondary-nav>
    <div class="row app-main-body-wrapper">
      <div class="app-main-body col-md-12">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppWrapper',
  created () {
    this.$router.options.routes.forEach(route => {
      if (route.meta.appLayout) {
        this.items.push({
          name: route.name,
          path: route.path,
          secondary: route.children
        })
      }
    })
  },
  data () {
    return {
      items: []
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/sass/_variables.scss";

body {
  background: $background-default;
  height: 100vh;
}

.app-layout-wrapper {
  background: $brand-white;
  padding-bottom: 1em;
  height: 100vh;
}

.app-main-body-wrapper {
  margin:0;
}

.app-main-body {
  background:$brand-white;
  padding:1em;
}

</style>