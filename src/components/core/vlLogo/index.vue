<template>
  <span class="logo">
    <img src="~@/assets/images/logo.svg">
    <p>Vue Layouts</p>
  </span>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style lang="scss">
@import "~@/assets/sass/_variables.scss";

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

</style>