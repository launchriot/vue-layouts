<template>
  <div class="form-group">
    <label class="control-label" v-if="fieldLabel">{{fieldLabel}} <span v-if="required"> &nbsp*</span></label>
    <textarea
      :value="value"
      v-bind="$props"
      v-focus.lazy="autofocus"
      :required="required"
      :autofocus="autofocus"
      :cols="cols"
      class="form-control"
      @focus="focused = true"
      @blur="focused = false"
      @input="$emit('input',$event.target.value)"
    ></textarea>
  </div>
</template>

<script>
  export default {
    name: 'vl-textarea',
    props: {
      type: {
        type: String,
        default: 'text'
      },
      fieldLabel: String,
      name: String,
      disabled: Boolean,
      placeholder: String,
      value: [String, Number],
      required: {
        type: Boolean,
        default: false
      },
      autofocus: {
        type: Boolean,
        default: false
      },
      rows: {
        type: Number,
        default: 6
      },
      cols: Number
    },
    directives: {
      focus: {
        inserted: function (el, binding) {
          if (binding.value) el.focus()
          else el.blur()
        },
        componentUpdated: function (el, binding) {
          if (binding.modifiers.lazy) {
            if (Boolean(binding.value) === Boolean(binding.oldValue)) {
              return
            }
          }
          if (binding.value) el.focus()
          else el.blur()
        }
      }
    }
  }
</script>

<style lang="scss">
@import "~@/assets/sass/_variables.scss";
@import "~@/assets/sass/_form_fields.scss";  

// Inputs

.form-control,
.form-group .form-control {
  @include form-field;
}

</style>