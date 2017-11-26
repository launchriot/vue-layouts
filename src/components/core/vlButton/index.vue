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
      @include btn-styles($brand-secondary);
    }

    &.btn-primary{
      @include btn-styles($brand-primary);
    }
    &.btn-secondary {
      @include btn-styles($brand-secondary);
    }
    &.btn-info{
      @include btn-styles($brand-info);
    }
    &.btn-success{
      @include btn-styles($brand-success);
    }
    &.btn-warning{
      @include btn-styles($brand-warning);
    }
    &.btn-danger{
      @include btn-styles($brand-danger);
    }
    &.btn-white{
        &,
        &:focus,
        &:hover{
            background-color: $brand-white;
            color: lighten($brand-grey, 30%);
        }
        &.btn-simple{
            color: $brand-white;
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
        background: $brand-white;
        color: $brand-black;
        font-weight: 600;
        border:$border-default;
        padding: 4px 12px;
        font-size: 11px;
        border-radius: $border-radius - .5em;
    }
}

</style>