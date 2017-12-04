<template>
  <div class="form-check">
    <label class="form-check-label">
      <input
        class="form-check-input"
        type="checkbox"
        :name="name"
        :value="optionStatus"
        :checked="optionStatus"
        :id="optionLabel"
        v-bind="$props"
        @click="changeStatus"
      > {{optionLabel}}
    </label>
  </div>
 
</template>

<script>
  import EventBus from '@/event-bus.js'
  export default {
    name: 'checkbox',
    props: {
      optionIndex: Number,
      optionLabel: String,
      optionStatus: Boolean,
      name: String,
      disabled: Boolean
    },
    computed: {
      _optionStatus: function () {
        return this.optionStatus
      },
      _optionLabel: function () {
        return this.optionName
      },
      _optionIndex: function () {
        return this.optionIndex
      }
    },
    methods: {
      changeStatus: function () {
        EventBus.$emit('changeStatus', {
          'idx': this._optionIndex,
          'status': !this._optionStatus
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "~@/assets/sass/_variables.scss";
  @import "~@/assets/sass/_form_fields.scss";

input[type=checkbox] {
    @include form-field;
    position: relative;
    margin: 0 0.2em 0 0;
    padding: 0;
    text-align: center;
    width: 1.3rem;
    height: 1.3rem;
    @include themify() {
      background-color: getThemifyVariable('canvas');
    }
    -webkit-appearance: none;
    -webkit-border-radius: 0;
    border-radius: 0;
    color: rgba(white, 0);
    transition: all 0.2s ease;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    &:before {
      font-family: FontAwesome;
      content: "\f00c";
    }
    &:focus {
      outline: 0;
    }
    &:active {
      outline: none;
    }
    &:hover {
      outline: none;
      cursor:pointer;
    }
    &:checked {
      @include themify() {
        color: getThemifyVariable('border');
      }
    }
}
</style>