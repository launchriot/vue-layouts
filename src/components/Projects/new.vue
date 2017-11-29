<template>
  <div class="projects-wrapper">
  	<vl-tab-nav class="uniform">
      <vl-tab title="Project Information" :active="true" icon="clipboard">
        Tab 1 Content
      </vl-tab>
      <vl-tab title="Clients" icon="briefcase">
        Tab 2 Content
      </vl-tab>
      <vl-tab title="Agenda" icon="calendar-check-o">
        Tab 3 Content
      </vl-tab>
      <vl-tab title="Services" icon="shopping-basket">
        Tab 4 Content
      </vl-tab>
      <vl-tab title="Design &amp; Layout" icon="paint-brush">
        Tab 5 Content
      </vl-tab>
      <vl-tab title="Project Settings" icon="rocket">
        Tab 6 Content
      </vl-tab>
    </vl-tab-nav>
  </div>
</template>

<script>
export default {
  name: 'NewProjects'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>