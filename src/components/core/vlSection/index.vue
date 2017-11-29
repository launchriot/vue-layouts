<template>
  <div class="vl-page-section">
    <div class="title-area">
      <h1 class="page-title">{{title}}</h1>
      <p v-if="subtitle" class="page-subtitle">{{subtitle}}</p>
    </div>
    <div class="page-section-main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vl-section',
  props: {
    title: String,
    subtitle: String
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/sass/_variables.scss";

  .vl-page-section {

    h1.page-title {
      font-size: 1.1em;
      margin-bottom:1em;
    }
    @include themify() {
      background: getThemifyVariable('background-light');
    }
    opacity: .5;
    padding:1em;
    margin:1em 0em;

    &.active {
      opacity: 1;
    }
  }

</style>