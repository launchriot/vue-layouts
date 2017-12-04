<template>
  <div class="vl-input-tooltip">
    <p class="vl-input-tooltip-header">{{helptipHeaderMsg}}</p>
    <p class="vl-input-tooltip-body">{{helptipBody}}</p>
  </div>
</template>

<script>
  export default {
    name: 'vl-input-tooltip',
    props: {
      helptipHeader: {
        type: String,
        default: 'What is this?'
      },
      helptipBody: {
        type: String,
        default: 'Please fill in this field'
      },
      errorTip: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      helptipHeaderMsg: function () {
        if (this.errorTip && this.helptipHeader === 'What is this?') {
          return 'Invalid Entry'
        } else {
          return this.helptipHeader
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "~@/assets/sass/_variables.scss";

  .vl-input-tooltip {
    z-index: 9999;
    background:linear-gradient(#fefefe, #f8f8f8);
    border: $border-width-default solid;
    @include themify() {
      border-color: getThemifyVariable('background'); 
    }
    border-radius: $border-radius;
    padding:1em;
    position: absolute;
    left:105%;
    top: 18%;
    width:100%;
    max-width:400px;
    box-shadow: 0px 3px 4px 2px rgba(0, 0, 0, 0.06);

    &.error-message {
      @include themify() {
        border-color: getThemifyVariable('urgent-01'); 
      }

       &:before {
        border-color: rgba(194, 225, 245, 0);
        @include themify() {
          border-right-color: getThemifyVariable('urgent-01'); 
        }
      }
    }
  }

  .vl-input-tooltip:after, .vl-input-tooltip:before {
    right: 100%;
    top: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  .vl-input-tooltip:after {
    border-color: rgba(136, 183, 213, 0);
    border-right-color: #fbfbfb;
    border-width: 14px;
    margin-top: -14px;
  }
  .vl-input-tooltip:before {
    border-color: rgba(194, 225, 245, 0);
    @include themify() {
      border-right-color: getThemifyVariable('background');
    }
    border-width: 15px;
    margin-top: -15px;
  }

  .vl-input-tooltip-header {
    font-weight: $font-weight-ultra-bold;
    margin-bottom:0;
    font-size:$font-size-base;
  }

  .vl-input-tooltip-body {
    margin-bottom:0;
    font-size:$font-size-medium;
  }

</style>