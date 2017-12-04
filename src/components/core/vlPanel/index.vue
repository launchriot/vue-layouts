<template>
  <transition name="vl-panel">
    <div class="vl-panel" @click.stop v-show="show">
      <div class="vl-panel-top">
        <span class="close-icon" @click="close"><i class="fa fa-close"></i></span>
      </div>
      <div class="vl-panel-header">
        <h3 class="title">{{title}} test</h3>
        <p class="subtitle">{{subtitle}}</p>
      </div>
      <slot name="body"></slot>
      <div class="vl-panel-footer text-right">
          <slot name="footer"></slot>
          <div v-if="!hasSlotFooter">
            <vl-button v-if="secondaryButton != 'false'" class="btn btn-secondary" @click="close">{{secondaryButton}}</vl-button>
            <vl-button v-if="primaryButton != 'false'"class="btn btn-primary" @click="close">{{primaryButton}}</vl-button>
          </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'vl-panel',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        required: true
      },
      subtitle: String,
      primaryButton: {
        type: String,
        default: 'Ok'
      },
      secondaryButton: {
        type: String,
        default: 'Cancel'
      }
    },
    data: function () {
      return {
        body: null,
        footer: null
      }
    },
    methods: {
      close: function () {
        this.$emit('close')
      }
    },
    mounted: function () {
      document.addEventListener('keydown', (e) => {
        if (this.show && e.keyCode === 27) {
          this.close()
        }
      })
    },
    computed: {
      hasSlotFooter () {
        return this.$slots.footer
      }
    }
  }
</script>

<style scoped lang="scss">
@import "~@/assets/sass/_variables.scss";

.vl-panel {
    padding: 1em 1.5em;
    @include themify() {
      background: getThemifyVariable('canvas');
    }
    box-shadow:$box-shadow;
    position: fixed;
    width:500px;
    top: 0;
    right: 0;
    margin-top: 0;
    border-radius: 3px 0px 0px 3px;
    z-index: 9999;
    height: 100%;

    h3.title {
      font-weight: $font-weight-extra-bold;
      font-size: $font-size-large;
    }

    p.subtitle {
      font-weight:normal;
      font-size:$font-size-base;
    }
}

.vl-panel-top {
  text-align: right;
  margin-bottom:-15px;
  
  span.close-icon {
    font-weight: 100;
    color: $ink;
    margin-left: 2em;
    text-align: right;
    &:hover {
      cursor: pointer;
    }
  }
}

.vl-panel-body {
    margin: 1em 0;
}

.text-right {
    text-align: right;
}

.vl-panel-enter-active, .vl-panel-leave-active {
  transition: all .6s ease-in-out;
}

.vl-panel-enter,.vl-panel-leave-to {
  right:-500px;
}

.vl-panel-leave,.vl-panel-enter-to {
  right:0px;
}

</style>