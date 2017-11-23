<template>
  <div class="auth-layout-wrapper">
    <header class="auth-header"></header>
    <div class="auth-top">
      <Logo />
    </div>
    <div class="row">
      <div class="auth-main-body col-md-4 offset-md-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthWrapper'
}
</script>

<style lang="scss">
@import "~@/assets/sass/_variables.scss";

body {
  background: $brand-white;
  height: 100vh;
}

.auth-layout-wrapper {
  background: $background-default;
  padding-bottom: 1em;
  height: 100vh;
}

.auth-header {
  width: 100%;
  height:.85em;
  background: $brand-primary;
  padding: 0em $side-padding;
}

.auth-top {
  width: 100%;
  background: lighten($brand-primary, 30%);
  padding: 1em $side-padding;
}

.auth-main-body {
  background:$brand-white;
  padding:1em;
  border-radius: $border-radius;
  margin: -2em auto;
  box-shadow: $box-shadow;
}

</style>