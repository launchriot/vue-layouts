<template>
  <div class="navless-layout-wrapper">
    <div class="navless-layout-header">
      <Logo/>
      <span class="navless-page-name">{{$route.name}}</span>
      <span class="navless-page-close">
        <router-link v-if="$routerHistory.hasHistory()" :to="{ path: $routerHistory.previous().path }">
          Close <i class="fa fa-times-circle-o"></i>
        </router-link>
      </span>
    </div>
    <div class="row navless-main-body-wrapper">
      <div class="navless-main-body col-md-12">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavlessWrapper'
}
</script>

<style scoped lang="scss">
@import "~@/assets/sass/_variables.scss";

body {
  @include themify() {
    background:  getThemifyVariable('background');
  }
  height: 100vh;
}


.navless-layout-wrapper {
  @include themify() {
    background:  getThemifyVariable('canvas');
  }
  padding-bottom: 1em;
  height: 100vh;

  span.logo {
    display: inline-block;
    width:10em;
  }
  
  .navless-layout-header {
    padding: $side-padding;

    .navless-page-name {
      display: inline-block;
      font-size: $font-size-large;
    }

    @include themify() {
      background: getThemifyVariable('primary-04');
      color: getThemifyVariable('canvas');
    }

    .navless-page-close{
      text-align: right;
      float: right;

      a {
        @include themify() {
        color: getThemifyVariable('canvas');
        transition: all .2s ease-in-out;
        }
        &:hover {
          opacity:.3;
          text-decoration:none;
        }
      }

    }

  }

}

.navless-main-body-wrapper {
  margin:0;
}

.navless-main-body {
  @include themify() {
    background:  getThemifyVariable('canvas');
  }
  padding:1em;
}

</style>