<template>
  <div class="app-layout-wrapper">
    <header class="app-header"></header>
    <div class="app-top">
      <Logo />
    </div>
    <div class="row">
      <div class="app-main-body col-md-4 offset-md-4">
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

$app-layout-side-padding: 1em;

body {
  background: red;
  height: 100vh;
}

.app-layout-wrapper {
  background: $background-default;
  padding-bottom: 1em;
  height: 100vh;
}

.app-header {
  width: 100%;
  height:.85em;
  background: $brand-primary;
  padding: 0em $app-layout-side-padding;
}

.app-top {
  width: 100%;
  background: lighten($brand-primary, 30%);
  padding: 1em $app-layout-side-padding;
}

.app-main-body {
  background:$brand-white;
  padding:1em;
  border-radius: $border-radius;
  margin: -2em auto;
  box-shadow: $box-shadow;
}

</style>