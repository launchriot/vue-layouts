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

$auth-layout-side-padding: 1em;

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
  padding: 0em $auth-layout-side-padding;
}

.auth-top {
  width: 100%;
  background: lighten($brand-primary, 30%);
  padding: 1em $auth-layout-side-padding;

  .logo {
    width:13em;
    display:block;
    color: $brand-white;

    img {
      width:20%;
      display:inline-block;
    }

    p {
      display: inline-block;
      font-family: $font-family-logo;
    }
  }
}

.auth-main-body {
  background:$brand-white;
  padding:1em;
  border-radius: $border-radius;
  margin: -2em auto;
  box-shadow: $box-shadow;
}

</style>