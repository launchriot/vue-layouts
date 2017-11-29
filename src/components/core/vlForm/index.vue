<template>
  <div class="form-wrapper" :class="formClass">
    <form action="#" v-on:submit.prevent="submitForm(endpoint)">
      <h4 v-if="formHeader">{{formHeader}}</h4>
      <slot></slot>
      <vl-button :class="submitClass" type="submit">{{submitText}}</vl-button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'vl-form',
    props: {
      formHeader: String,
      submitClass: {
        type: String,
        default: 'btn btn-primary'
      },
      submitText: {
        type: String,
        default: 'Submit'
      },
      endpoint: String,
      formClass: String
    },
    methods: {
      submitForm: function (endpoint) {
        axios.post('api/' + endpoint /*, data */)
          .then((res) => {
          })
          .catch((err) => console.error(err))
      }
    }
  }
</script>

<style scoped lang="scss">
</style>