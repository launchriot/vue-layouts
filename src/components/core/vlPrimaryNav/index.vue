<template>
  <div class="vl-primary-nav-wrapper">
    <div class="vl-primary-nav">
        <Logo />
      <span class="vl-primary-nav-toggle" v-on:click='toggleMenu'><i class="fa fa-bars"></i></span>
      <ul class="primary-nav-menu" v-bind:class="[menuClosed ? hideMenu : !menuClosed, showMenu]">
        <li v-for="item in items" class="primary-nav-item-wrapper">
          <router-link tag="span" :to="item.path" class="primary-nav-item" active-class="active">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vl-primary-nav',
  props: {
    items: Array
  },
  data () {
    return {
      menuClosed: false,
      showMenu: 'nav-menu-show',
      hideMenu: 'nav-menu-hide',
      active: 'active'
    }
  },
  methods: {
    toggleMenu () {
      this.menuClosed = !this.menuClosed
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@/assets/sass/_variables.scss";

.vl-primary-nav {
  display: block;
  width: 100%;
  background: lighten($brand-primary, 30%);
  padding: 1.5em $side-padding 0em $side-padding;
  position: relative;
  border-bottom: 4px solid $background-default;
  box-shadow: $box-shadow;
  font-size: $font-size-medium;

  span.vl-primary-nav-toggle {
    color: $brand-white;
    padding: 0em .3em;
    border: 2px solid $brand-white;
    border-radius: $border-radius;
    font-size: 1.5em;
    position: absolute;
    right: 1em;
    top: .75em;
    display:block;
    transition: all .3s ease-out;
    &:hover {
      cursor: pointer;
      border-color:$brand-white;
      color: $brand-white;
      opacity: .8;
    }
    @include media(">tablet") {
      display:none;
    }
  }

ul.primary-nav-menu {
  display: inline-block;
  list-style:none;
  padding:0;
  position:absolute;
  right: $side-padding;
  bottom:0;
  margin-bottom: 0;

  li.primary-nav-item-wrapper {
    display: inline-block;

    span.primary-nav-item {
      display: block;
      margin: 0em .1em;
      background: $brand-primary;
      padding: .8em 1.5em;
      border-radius: 3px 3px 0px 0px;
      color: $brand-white;
      transition: all .3s ease-out;
      &:hover, &.active  {
        background:$background-default;
        color: $brand-primary;
        cursor:pointer;
      }
    }
  }

  div.primary-nav-dropdown {
    position:absolute;
    top: -.15em;
    left: 1em;
    background:$brand-white;
    box-shadow: $box-shadow;
    padding:0em 1em 1em 1em;
    width:100%;

    ul.primary-nav-dropdown-menu {
      list-style:none;
      padding:0;

      li.primary-nav-dropdown-title {
        font-weight: $font-weight-bold;
        margin-bottom:.3em;
        color: $brand-primary;

        span.close-icon {
          font-weight: 100;
          color: $brand-black;
          margin-left: 2em;
          &:hover {
            cursor: pointer;
          }
        }
      }

      li.primary-nav-dropdown-item {
        border-radius: $border-radius;
        padding:.3em 0em;
        a {
          padding: .5em;
          color: $brand-primary;
          opacity:1;
          font-size: $font-size-small;
          line-height: 1em;
        }

        &:hover {
          background:$background-default;
          transition: all .5s ease-out;
        }

      }
    }
  }

  @include media("<tablet") {
      background: $background-default;
      padding: 1em;
      overflow-y: auto;
      top: 4.5em;
      left:0;
      right:0;
      height:70vh;
      box-shadow: $box-shadow;

      &.nav-menu-show {
        display:block;
        z-index: 99999;
      }

      &.nav-menu-hide {
        display:none;
      }

      li.primary-nav-item-wrapper {
        display:block;

        span.primary-nav-item {
          display: block;
          margin: .5em;
          background: none;
          padding: .8em 1.5em;
          border-radius: $border-radius;
          color: $brand-primary;
          transition: all .3s ease-out;
          &:hover, .active {
            background:$brand-primary;
            color: $brand-white;
            cursor:pointer;
          }
        }
      }
    }
  }

}

</style>