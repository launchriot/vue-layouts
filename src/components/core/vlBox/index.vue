<template>
  <div class="vl-attention-box-wrapper">
    <div class="title-area">
      <h1 class="box-title">{{title}}</h1>
      <p v-if="subtitle" class="page-subtitle">{{subtitle}}</p>
    </div>
    <div class="vl-attention-box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vl-box',
  props: {
    title: String,
    subtitle: String
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/sass/_variables.scss";

.vl-attention-box-wrapper {

  margin:1em 0em .5em 0em;

  .vl-attention-box {
    border:$border-width-default solid;
    @include themify() {
      background: getThemifyVariable('background-light');
      border-color: getThemifyVariable('background');  
    }
    border-radius: $border-radius;
    padding:1em;
  }

  h1.box-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: .5em;
    @include themify() {
      color: getThemifyVariable('ink');  
    }
    font-weight: $font-weight-bold;
  }
}
</style>