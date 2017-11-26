<template>
  <div class="app-layout-wrapper">
    <vl-meta-nav></vl-meta-nav>
    <vl-primary-nav :items="items"></vl-primary-nav>
    <div v-for="item in items" v-if="matched(item)" class="secondary-wrapper">
      <vl-secondary-nav :item="item"></vl-secondary-nav>
    </div>
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
          children: route.children
        })
      }
    })
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    matched (item) {
      var path = this.$route.path
      var parent = this.$route.meta.parent
      return item.children && (path === item.path || path.includes(parent))
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

.secondary-wrapper {
  position:relative;

}

</style>