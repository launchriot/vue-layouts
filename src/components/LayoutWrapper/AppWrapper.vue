<template>
  <div class="app-layout-wrapper">
    <vl-meta-nav></vl-meta-nav>
    <div class="app-top">
      <Logo />
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

.app-top {
  width: 100%;
  background: lighten($brand-primary, 30%);
  padding: 1em $side-padding;
}

.app-main-body-wrapper {
  margin:0;
}

.app-main-body {
  background:$brand-white;
  padding:1em;
}

</style>