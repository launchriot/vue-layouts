<template>
  <div class="reports-wrapper">
    <vl-title-nav :title="$route.name"></vl-title-nav>
    <vl-tab-nav>
      <vl-tab title="Sales Reports" :active="true">
        Tab 1 Content
      </vl-tab>
      <vl-tab title="Other Reports">
        Tab 2 Content
      </vl-tab>
    </vl-tab-nav>
  </div>
</template>

<script>
export default {
  name: 'Reports'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>