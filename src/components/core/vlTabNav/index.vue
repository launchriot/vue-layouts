<template>
  <div class="vl-tab-nav-wrapper">
    <div class="vl-tab-nav">
      <ul>
        <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }" @click="selectTab(tab)">
          <span v-if="tab.icon" class="tab-icon-wrapper">
            <i :class="tab.iconClass"></i>
          </span>
          <span class="tab-title-wrapper">
            <a :href="tab.href">{{tab.title}}</a>
          </span>
        </li>
      </ul>
    </div>
    <div class="vl-tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Tab from '@/components/core/vlTabNav/vlTab.vue'
export default {
  name: 'vl-tab-nav',
  components: {
    'vl-tab': Tab
  },
  data () {
    return {
      tabs: []
    }
  },
  created () {
    this.tabs = this.$children
  },
  methods: {
    selectTab (activeTab) {
      this.tabs.forEach(tab => {
        tab.isActive = (tab.href === activeTab.href)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@/assets/sass/_variables.scss";

.vl-tab-nav-wrapper {
  margin-left: -15px;
  margin-right: -15px;
}

.uniform {
  li {
    width: 7em;
    text-align: center;
    height: 8em;
    vertical-align: top;

    .tab-title-wrapper {
      display: block;
      position: absolute;
      bottom: .1em;
      left: 0;
      right: 0;
    }
  }
}

.vl-tab-nav {
  border-bottom: $border;
  @include themify() {
    border-color: getThemifyVariable('background');
  }

  ul {
    display: inline-block;
    list-style: none;
    padding-left: .75em;
    padding-right: .75em;
    margin-bottom:1em;
    width:100%;
    padding-bottom:.15em;
    border-bottom: $border-width-default solid $background-light;

    li {
      position:relative;
      display: inline-block;
      margin:.5em 2.5em 0em 0em;
      padding-bottom:.3em;
      font-weight: $font-weight-bold;
      border-bottom:.2em solid;
      @include themify() {
        border-color: getThemifyVariable('border');
      }
      transition: all .2s ease-in-out;

      &:hover {
        cursor: pointer;
      }

        .tab-icon-wrapper {
          display: block;
          font-size: 3em;
          text-align: center;
          @include themify() {
            color: getThemifyVariable('border');
          }
          transition: all .2s ease-in-out;
        }

        a {
          @include themify() {
            color: getThemifyVariable('border');
          }
          text-decoration: none;
          transition: all .2s ease-in-out;
        }

    &.is-active, &:hover {
      @include themify() {
        border-color: getThemifyVariable('tertiary-01');
      }

      .tab-icon-wrapper {
        @include themify() {
          color: getThemifyVariable('ink');
        }
      }

      a {
        @include themify() {
          color: getThemifyVariable('primary-04');
        }
      }
    }    

    }
  }
}

</style>