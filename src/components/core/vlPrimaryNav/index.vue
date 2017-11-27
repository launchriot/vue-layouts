<template>
  <div class="vl-primary-nav-wrapper">
    <div class="vl-primary-nav">
        <Logo />
      <span class="vl-primary-nav-toggle" v-on:click='toggleMenu'><i class="fa fa-bars"></i></span>
      <ul class="primary-nav-menu" v-bind:class="[menuClosed ? hideMenu : !menuClosed, showMenu]">
        <li v-for="(item, index) in items" :key="index" class="primary-nav-item-wrapper">
          <router-link tag="span" class="primary-nav-item" :to="{ name: item.name }" active-class="active">
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="vl-secondary-nav" v-if="subNav">
      <ul class="secondary-nav-menu">
        <li v-for="(item, index) in subNav" :key="index" class="secondary-nav-item-wrapper" >
          <router-link tag="span" class="secondary-nav-item" :to="{ name: item.name }" active-class="active">
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vl-primary-nav',
  data () {
    return {
      menuClosed: false,
      showMenu: 'nav-menu-show',
      hideMenu: 'nav-menu-hide',
      active: 'active',
      items: [],
      activeParentLink: {}
    }
  },
  methods: {
    toggleMenu () {
      this.menuClosed = !this.menuClosed
    }
  },
  created () {
    this.$router.options.routes.forEach(route => {
      if (route.meta.appLayout) {
        this.items.push({
          name: route.name,
          path: route.path
        })
      }
    })
  },
  computed: {
    subNav () {
      const found = this.$router.options.routes.find((route) => {
        return route.name === this.$route.matched[0].name
      })
      if (found) {
        return found.children
      }
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
  padding: 1.5em $side-padding 0em $side-padding;
  position: relative;
  border-bottom: 4px solid;
  box-shadow: $box-shadow;
  font-size: $font-size-medium;
  @include themify() {
    color:  getThemifyVariable('background-light');
    background: getThemifyVariable('primary-04');
  }

  span.vl-primary-nav-toggle {
    padding: 0em .3em;
    border: 2px solid;
    border-radius: $border-radius;
    font-size: 1.5em;
    position: absolute;
    right: 1em;
    top: .75em;
    display:block;
    transition: all .3s ease-out;
    @include themify() {
      color:  getThemifyVariable('canvas');
      background: getThemifyVariable('primary-04');
    }
    &:hover {
      cursor: pointer;
      opacity: .8;
      @include themify() {
        color:  getThemifyVariable('canvas');
        border-color: getThemifyVariable('canvas');
      }
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
      padding: .8em 1.5em;
      border-radius: 3px 3px 0px 0px;
      transition: all .3s ease-out;
      @include themify() {
        background:  getThemifyVariable('primary-02');
        color: getThemifyVariable('canvas');
      }
      &:hover, &.active  {
        @include themify() {
          background:  getThemifyVariable('background-light');
          color: getThemifyVariable('primary-04');
        }
        cursor:pointer;
      }
    }
  }

  div.primary-nav-dropdown {
    position:absolute;
    top: -.15em;
    left: 1em;
    box-shadow: $box-shadow;
    padding:0em 1em 1em 1em;
    width:100%;
    @include themify() {
      background:  getThemifyVariable('canvas');
    }

    ul.primary-nav-dropdown-menu {
      list-style:none;
      padding:0;

      li.primary-nav-dropdown-title {
        font-weight: $font-weight-bold;
        margin-bottom:.3em;
        @include themify() {
          color:  getThemifyVariable('primary-04');
        }

        span.close-icon {
          font-weight: 100;
          margin-left: 2em;
          @include themify() {
            color:  getThemifyVariable('ink');
          }
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
          opacity:1;
          font-size: $font-size-small;
          line-height: 1em;
          @include themify() {
            color:  getThemifyVariable('primary-04');
          }
        }

        &:hover {
          @include themify() {
            background:  getThemifyVariable('background-light');
          }
          transition: all .5s ease-out;
        }

      }
    }
  }

  @include media("<tablet") {
      padding: 1em;
      overflow-y: auto;
      top: 4.5em;
      left:0;
      right:0;
      height:70vh;
      box-shadow: $box-shadow;
      @include themify() {
        background:  getThemifyVariable('background-light');
      }

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
          padding: .8em 1.5em;
          border-radius: $border-radius;
          transition: all .3s ease-out;
          @include themify() {
            color:  getThemifyVariable('canvas');
          }
          &:hover, .active {
            @include themify() {
              background:  getThemifyVariable('primary-04');
              color:  getThemifyVariable('canvas');
            }
            cursor:pointer;
          }
        }
      }
    }
  }
}

.vl-secondary-nav {
  position:relative;
  display: block;
  padding: .4em 1em .7em 1em; 
  font-size: $font-size-small;
  font-weight: $font-weight-bold;
  text-transform: uppercase;
  box-shadow: $box-shadow;
  line-height:1;
  @include themify() {
    background:  getThemifyVariable('background-light');
  }
}

ul.secondary-nav-menu {
  list-style:none;
  padding:0;
  position:relative;
  display: inline-block;
  margin-bottom: 0em;

  li.secondary-nav-item-wrapper {
    display: inline-block;

    span.secondary-nav-item {
      display: block;
      margin: 0em .1em;
      padding-right: 2em;
      transition: all .3s ease-out;
      font-size: $font-size-small;
      line-height:1;
      @include themify() {
        color:  getThemifyVariable('background');
      }
      &:hover, &.active  {
        @include themify() {
          color:  getThemifyVariable('ink');
        }
        cursor:pointer;
      }
    }
  }

}

</style>