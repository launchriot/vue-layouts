<template>
  <div class="form-group">
    <label class="control-label" v-if="fieldLabel">{{fieldLabel}} <span v-if="required"> &nbsp*</span></label>
    <radio v-model="value" :name="name" v-for="(option, index) in options" :key="index" :option-index="index" :option-label="option.label" :option-status="option.status"></radio>
  </div>
</template>

<script>
  import Radio from '@/components/core/vlRadio/radio.vue'
  export default {
    name: 'vl-radio',
    props: {
      value: String,
      options: Array,
      fieldLabel: String,
      name: String,
      disabled: Boolean,
      required: {
        type: Boolean,
        default: false
      }
    },
    components: {
      'radio': Radio
    }
  }
</script>

<style lang="scss">
</style>