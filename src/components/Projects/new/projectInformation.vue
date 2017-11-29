<template>
  <vl-section title="Project Information" class="active">
    <vl-form class="col-md-6">
      <vl-input field-label="Project Name" placeholder="Enter a name for your project" required/>
      <vl-textarea field-label="Project Description" placeholder="Describe your project. For internal use only." required/>
    </vl-form>
  </vl-section>
</template>

<script>
export default {
  name: 'project-information',
  props: {
    title: String,
    subtitle: String
  }
}
</script>

<style scoped lang="scss">
</style>