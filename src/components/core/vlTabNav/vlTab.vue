<template>
  <div v-show="isActive" class="vl-tab">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'vl-tab',
  props: {
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    href () {
      return '/#' + this.title.toLowerCase().replace(/ /g, '-')
    }
  },
  mounted () {
    this.isActive = this.active
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.vl-tab {
  padding-left: .75em;
  padding-right: .75em;
}

</style>