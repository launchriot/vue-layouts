<template>
  <div class="projects-wrapper">
  	<vl-tab-nav class="uniform">
      <vl-tab title="Project Information" :active="true" icon="clipboard">
        <project-information />
      </vl-tab>
      <vl-tab title="Clients" icon="briefcase">
        <project-clients />
      </vl-tab>
      <vl-tab title="Agenda" icon="calendar-check-o">
        <project-agenda />
      </vl-tab>
      <vl-tab title="Services" icon="shopping-basket">
        <project-services />
      </vl-tab>
      <vl-tab title="Design &amp; Layout" icon="paint-brush">
        <project-design />
      </vl-tab>
      <vl-tab title="Project Settings" icon="rocket">
        <project-settings />
      </vl-tab>
    </vl-tab-nav>
  </div>
</template>

<script>
import ProjectInformation from '@/components/Projects/new/projectInformation.vue'
import ProjectClients from '@/components/Projects/new/projectClients.vue'
import ProjectAgenda from '@/components/Projects/new/projectAgenda.vue'
import ProjectServices from '@/components/Projects/new/projectServices.vue'
import ProjectDesign from '@/components/Projects/new/projectDesign.vue'
import ProjectSettings from '@/components/Projects/new/projectSettings.vue'

export default {
  name: 'NewProjects',
  components: {
    'project-information': ProjectInformation,
    'project-clients': ProjectClients,
    'project-services': ProjectServices,
    'project-agenda': ProjectAgenda,
    'project-design': ProjectDesign,
    'project-settings': ProjectSettings
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>