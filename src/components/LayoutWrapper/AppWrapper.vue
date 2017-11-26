<template>
  <div class="app-layout-wrapper">
    <vl-meta-nav></vl-meta-nav>
    <vl-primary-nav></vl-primary-nav>
    <div class="row app-main-body-wrapper">
      <div class="app-main-body col-md-12">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppWrapper'
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