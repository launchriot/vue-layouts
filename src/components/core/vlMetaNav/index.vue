<template>
  <header class="vl-meta-nav">
    <ul class="meta-nav-menu">
      <li class="meta-nav-item">
        <a href="#"><i class="fa fa-question-circle"></i></a>
      </li>
      <li class="meta-nav-item">
        <a href="#"><i class="fa fa-bell"></i></a>
      </li>
      <li class="meta-nav-item meta-nav-user meta-nav-dropdown">
        <a v-on:click='showDropdown = !showDropdown'>your.name@email.com <i class="fa fa-caret-down"></i></a>
        <div class="meta-nav-dropdown" v-if="showDropdown">
          <ul class="meta-nav-dropdown-menu">
            <li class="meta-nav-dropdown-title">
              <span>your.name@email.com</span>
              <span class="close-icon" v-on:click='showDropdown = !showDropdown'><i class="fa fa-close"></i></span>
            </li>
            <li class="meta-nav-dropdown-item">
              <a href="#">My Profile</a>
            </li>
            <li class="meta-nav-dropdown-item">
              <a href="#">My Settings</a>
            </li>
            <li class="meta-nav-dropdown-item">
              <a href="/#/login">Logout</a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'vl-meta-nav',
  data () {
    return {
      showDropdown: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/sass/_variables.scss";

.vl-meta-nav {
  display: block;
  width: 100%;
  padding:.3em $side-padding;
  text-align: right;
  font-size: $font-size-small;
  @include themify() {
    background: getThemifyVariable('primary-05');
  }
}

ul.meta-nav-menu {
  display: inline-block;
  list-style:none;
  padding:0;
  position:relative;
  text-align: left;
  margin-bottom:0;

  li.meta-nav-item {
    display: inline-block;
    margin:0em .5em;

    a {
      @include themify() {
        color: getThemifyVariable('canvas');
      }
      opacity:0.3;
      transition: opacity .5s ease-out;
      &:hover {
        opacity:1;
        text-decoration: none;
        cursor:pointer;
      }
    }
  }

  li.meta-nav-user {
    margin-left:2em;
  }

  div.meta-nav-dropdown {
    position:absolute;
    top: -.15em;
    left: 1em;
    @include themify() {
      background: getThemifyVariable('canvas');
    }
    box-shadow: $box-shadow;
    padding:0em 1em 1em 1em;
    width:100%;
    z-index: 9999;

    ul.meta-nav-dropdown-menu {
      list-style:none;
      padding:0;

      li.meta-nav-dropdown-title {
        font-weight: $font-weight-bold;
        margin-bottom:.3em;
        @include themify() {
          color: getThemifyVariable('primary-05');
        }

        span.close-icon {
          font-weight: 100;
          @include themify() {
            color: getThemifyVariable('primary-05');
          }
          margin-left: 2em;
          &:hover {
            cursor: pointer;
          }
        }
      }

      li.meta-nav-dropdown-item {
        border-radius: $border-radius;
        padding:.3em 0em;
        a {
          padding: .5em;
          @include themify() {
            color: getThemifyVariable('primary-05');
          }
          opacity:1;
          font-size: $font-size-xsmall;
          line-height: 1em;
        }

        &:hover {
          @include themify() {
            background: getThemifyVariable('background-light');
          }
          transition: all .5s ease-out;
        }

      }
    }
  }

}

</style>