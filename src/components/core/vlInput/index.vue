<template>
  <div class="form-group">
    <label v-if="fieldLabel">{{fieldLabel}} <span v-if="required"> &nbsp*</span></label>
    <input :type="setType" :dir="setDir" v-bind="$props" v-focus.lazy="autofocus"
      :required="required" :autofocus="autofocus" class="form-control" ref="input"
      @blur="emitBlur" @focus="emitFocus" :value="value" @input="updateValue($event.target.value)"
    />
    <span class="toggle-password-icon" v-if="showPassword" @click="togglePassword">
      <i v-if="fieldType === 'password'" class="fa fa-eye"></i>
      <i v-if="fieldType === 'text'" class="fa fa-eye-slash"></i>
    </span>
    <small class="form-text text-muted" v-if="helpText">{{helpText}}</small>
  </div>
</template>

<script>
  export default {
    name: 'vl-input',
    props: {
      fieldLabel: String,
      type: {
        type: String,
        default: 'text'
      },
      dir: String,
      required: Boolean,
      autofocus: Boolean,
      name: String,
      disabled: Boolean,
      error: Boolean,
      placeholder: String,
      value: [String, Number],
      helpText: String,
      showPassword: Boolean
    },
    data () {
      return {
        fieldType: this.type
      }
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
    },
    computed: {
      setDir () {
        if (this.type === 'number' && this.dir !== 'ltr') {
          return 'rtl'
        } else {
          return 'ltr'
        }
      },
      setType () {
        return this.fieldType
      }
    },
    methods: {
      updateValue (value) {
        this.$emit('input', value)
      },
      togglePassword () {
        this.fieldType = this.fieldType === 'password' ? 'text' : 'password'
        this.$refs.input.setAttribute('type', this.fieldType)
        this.$refs.input.focus()
      },
      emitBlur (event) {
        this.$emit('focus', event.target.value)
      },
      emitFocus (event) {
        this.$emit('focus', event.target.value)
      }
    }
  }
</script>

<style scoped lang="scss">
@import "~@/assets/sass/_variables.scss";
@import "~@/assets/sass/_form_fields.scss";  

.form-group {
  position: relative;
}

.form-control,
.form-group .form-control {
  @include form-field;
  
}

.toggle-password-icon {
  color: $brand-grey;
  display: inline-block;
  height: 100%;
  position: absolute;
  right: 2%;
  top: 40%;
  z-index: 1;
  padding:.5em;
  transition: all .5s ease-out;

  &:hover {
    cursor: pointer;
    color: $brand-primary;
  }
}

</style>