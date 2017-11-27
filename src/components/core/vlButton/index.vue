<template>
  <a class="btn btn-primary" v-bind="$props" v-if="!!href">
    <slot></slot>
  </a>
  <button class="btn btn-primary" v-bind="$props" @click="$emit('click', $event)" v-else>
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'vl-button',
    props: {
      type: {
        type: String,
        default: 'button'
      },
      disabled: Boolean,
      href: String
    }
  }
</script>

<style scoped lang="scss">
@import "~@/assets/sass/_variables.scss";

button, html [type="button"], [type="reset"], [type="submit"] {
    -webkit-appearance: none;
}

.btn, a.btn {
    border: none;
    border-radius: $border-radius;
    position: relative;
    padding: 8px 22px;
    margin: 10px 2px;
    font-size: $font-size-medium;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0;
    box-shadow: none;

    &::-moz-focus-inner {
        border: 0;
    }

    &,
    &.btn-default{
      @include themify() {
        @include btn-styles(getThemifyVariable('ink-light')); 
      }
    }

    &.btn-primary{
      @include themify() {
        @include btn-styles(getThemifyVariable('primary-05')); 
      }
    }
    &.btn-secondary {
      @include themify() {
        @include btn-styles(getThemifyVariable('ink-light')); 
      }
    }
    &.btn-info{
      @include themify() {
        @include btn-styles(getThemifyVariable('secondary-01')); 
      }
    }
    &.btn-success{
      @include themify() {
        @include btn-styles(getThemifyVariable('tertiary-01')); 
      }
    }
    &.btn-warning{
      @include themify() {
        @include btn-styles(getThemifyVariable('urgent-01')); 
      }
    }
    &.btn-danger{
      @include themify() {
        @include btn-styles(getThemifyVariable('urgent-01')); 
      }
    }
    &.btn-white{
        &,
        &:focus,
        &:hover{
          @include themify() {
            color:  getThemifyVariable('ink-light');
            background-color: getThemifyVariable('canvas');
          }
        }
        &.btn-simple{
            @include themify() {
              color:  getThemifyVariable('canvas');
            }
            background: transparent;
            box-shadow: none;
        }
    }

    &.btn-lg,
    .btn-group-lg & {
        font-size: $font-size-large;
        padding: 18px 36px;
    }
    &.btn-sm,
    .btn-group-sm & {
        padding: 5px 20px;
        font-size: $font-size-small;
    }
    &.btn-xs,
    .btn-group-xs & {
        padding: 4px 15px;
        font-size: $font-size-xsmall;
    }

    &.btn-just-icon{
        font-size: 20px;
        padding: 12px 12px;
        line-height: 1em;

        i{
            width: 20px;
        }
        &.btn-lg{
            font-size: 22px;
            padding: 13px 18px;
        }
    }

    &.btn-actionbar {
        @include themify() {
          color:  getThemifyVariable('ink');
          background:  getThemifyVariable('canvas');
        }
        font-weight: 600;
        border:$border-default;
        padding: 4px 12px;
        font-size: 11px;
        border-radius: $border-radius - .5em;
    }
}

</style>