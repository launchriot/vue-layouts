<template>
  <vl-section title="Project Information" class="active">
    <vl-form class="col-md-6">
      <vl-input field-label="Project Name" placeholder="Enter a name for your project" required v-model="projectName"/>
      <vl-textarea field-label="Project Description" placeholder="Describe your project. For internal use only." required v-model="projectDescription"/>
      <vl-select field-label="Program Owner" placeholder="Select a Program Owner" :options="programOwners" required v-model="programOwner" label="name" track-by="name">
        <template slot="option" slot-scope="props">
          <vl-select-options>
            <p slot="row1">{{ props.option.name }}</p>
            <p slot="row2">{{ props.option.title }}</p>
          </vl-select-options>
        </template>
      </vl-select>
    </vl-form>
  </vl-section>
</template>

<script>
export default {
  name: 'project-information',
  props: {
    title: String,
    subtitle: String
  },
  data () {
    return {
      projectName: null,
      projectDescription: null,
      programOwner: null,
      programOwners: [
        {name: 'Bret Jennings', title: 'Manager'},
        {name: 'Marcy Figoni', title: 'Manager'},
        {name: 'Kendra Schazshow', title: 'Implementation Specialist'},
        {name: 'Tony Lumposki', title: 'Client Services'},
        {name: 'Sabrina Esmarelda', title: 'VP, Implementation'}
      ]
    }
  }
}
</script>

<style scoped lang="scss">
</style>