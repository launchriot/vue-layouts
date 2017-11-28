<template>
  <div class="vl-tab-nav-wrapper">
    <div class="vl-tab-nav">
      <ul>
        <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
          <a :href="tab.href" @click="selectTab(tab)">{{tab.title}}</a>
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
    margin-bottom:0;

    li {
      display: inline-block;
      margin:.5em 2.5em 0em 0em;
      padding-bottom:.3em;
      font-weight: $font-weight-bold;
      border-bottom:.2em solid;
      @include themify() {
        border-color: getThemifyVariable('border');
      }
      transition: all .2s ease-in-out;

        a {
          @include themify() {
            color: getThemifyVariable('border');
          }
          text-decoration: none;
        }

    &.is-active, &:hover {
      @include themify() {
        border-color: getThemifyVariable('tertiary-01');
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