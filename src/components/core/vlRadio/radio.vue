<template>
  <div class="form-check">
    <label class="form-check-label">
      <input
        class="form-check-input"
        type="radio"
        :name="name"
        :value="optionStatus"
        :checked="optionStatus"
        :id="optionLabel"
        v-bind="$props"
        @click="chooseRadio"
      > {{optionLabel}}
    </label>
  </div>
 
</template>

<script>
  import EventBus from '@/event-bus.js'
  export default {
    name: 'radio',
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
      chooseRadio: function () {
        EventBus.$emit('chooseRadio', {
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

input[type=radio] {
    @include form-field;
    position: relative;
    margin: 0 0.2em 0 0;
    padding: 0;
    text-align: center;
    width: 1.3rem;
    height: 1.3rem;
    background: white;
    -webkit-appearance: none;
    -webkit-border-radius: 0;
    border-radius: 50%;
    color: rgba(white, 0);
    transition: all 0.2s ease;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    &:before {
      font-family: FontAwesome;
      content: "\f111";
      font-size:1.3em;
      line-height:1.3;
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