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
  @include themify() {
    background-color: getThemifyVariable('canvas');
  }
  height: 100vh;
}

.auth-layout-wrapper {
  @include themify() {
    background: getThemifyVariable('background');
  }
  padding-bottom: 1em;
  height: 100vh;
}

.auth-header {
  width: 100%;
  height:.85em;
  @include themify() {
    background: getThemifyVariable('primary-05');
  }
  padding: 0em $side-padding;
}

.auth-top {
  width: 100%;
  @include themify() {
    background: getThemifyVariable('primary-04');
  }
  padding: 1em $side-padding;
}

.auth-main-body {
  @include themify() {
    background: getThemifyVariable('canvas');
  }
  padding:1em;
  border-radius: $border-radius;
  margin: -2em auto;
  box-shadow: $box-shadow;
}

</style>