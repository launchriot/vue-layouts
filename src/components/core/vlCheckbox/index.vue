<template>
  <div class="form-group">
    <label class="control-label" v-if="fieldLabel">{{fieldLabel}} <span v-if="required"> &nbsp*</span></label>
    <checkbox v-model="value" :name="name" v-for="(option, index) in options" :key="index" :option-index="index" :option-label="option.label" :option-status="option.status"></checkbox>
  </div>
</template>

<script>
  import Checkbox from '@/components/core/vlCheckbox/checkbox.vue'
  export default {
    name: 'vl-checkbox',
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
      'checkbox': Checkbox
    }
  }
</script>

<style lang="scss">
</style>