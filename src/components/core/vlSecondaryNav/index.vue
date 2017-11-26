<template>
  <div class="vl-secondary-nav-wrapper">
    <div class="vl-secondary-nav">
      <ul class="secondary-nav-menu">
        <li class="secondary-nav-item-wrapper">
          <router-link tag="span" :to="item.path" class="secondary-nav-item" active-class="active">{{item.name}}</router-link>
        </li>
        <li v-for="child in item.children" class="secondary-nav-item-wrapper">
          <router-link tag="span" :to="child.path" class="secondary-nav-item" active-class="active">{{child.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vl-secondary-nav',
  props: {
    item: Object
  },
  data () {
    return {
      active: 'active'
    }
  },
  created () {
    console.log('created')
    console.log('path: ' + this.$route.path)
    console.log('item: ' + this.item.path)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@/assets/sass/_variables.scss";

.vl-secondary-nav {
  display: block;
  background: $background-default;
  padding: .4em 1em .7em 1em; 
  font-size: $font-size-small;
  font-weight: $font-weight-bold;
  text-transform: uppercase;
  box-shadow: $box-shadow;
  line-height:1;
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
      color: lighten($brand-black, 30%);
      transition: all .3s ease-out;
      font-size: $font-size-small;
      line-height:1;
      &:hover, &.active  {
        color: $brand-black;
        cursor:pointer;
      }
    }
  }

}

</style>