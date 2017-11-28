<template>
  <div class="vl-title-nav">
    <div class="title-area">
      <h1 class="page-title">{{title}}</h1>
      <p v-if="subtitle" class="page-subtitle">{{subtitle}}</p>
    </div>
    <div v-if="hasAction" class="action-area text-right">
      <router-link v-if="$routerHistory.hasHistory()" :to="{ path: $routerHistory.previous().path }">
        <i class="fa fa-left-arrow"></i> Back
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vl-title-nav',
  props: {
    title: String,
    subtitle: String,
    hasAction: Boolean
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/sass/_variables.scss";

  .vl-title-nav {
    width: 100%;
    border-bottom: $border-default;
    @include themify() {
      border-color:  getThemifyVariable('background-light');
      background:  getThemifyVariable('canvas');
    }
    padding: 1em .75em;
    text-transform: none;

    .title-area, .action-area {
      display:inline-block;
    }

    .action-area {
      float:right;
    }

    p.page-subtitle {
      font-size:$font-size-base;
      font-weight: $font-weight-bold;
    }
  }

</style>