<template>
  <transition name="vl-modal">
    <div class="vl-modal-mask" @click="close" v-show="show">
        <div class="vl-modal-container" @click.stop>
          <div class="vl-modal-top">
            <span class="close-icon" @click="close"><i class="fa fa-close"></i></span>
          </div>
          <div class="vl-modal-header">
            <h3 class="title">{{title}}</h3>
            <p class="subtitle">{{subtitle}}</p>
          </div>
          <slot name="body"></slot>
          <div class="vl-modal-footer text-right">
              <slot name="footer"></slot>
              <div v-if="!hasSlotFooter">
                <vl-button v-if="secondaryButton != 'false'" class="btn btn-secondary" @click="close">{{secondaryButton}}</vl-button>
                <vl-button v-if="primaryButton != 'false'"class="btn btn-primary" @click="close">{{primaryButton}}</vl-button>
              </div>
          </div>
        </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'vl-modal',
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

.vl-modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(120, 87, 132, 0.3);
    transition: opacity .3s ease;
}

.vl-modal-container {
    width: 500px;
    margin: 4em auto 0;
    padding: 1em 1.5em;
    @include themify() {
      background: getThemifyVariable('canvas');
    }
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    transition: all .3s ease;

    h3.title {
      font-weight: $font-weight-extra-bold;
      font-size: $font-size-large;
    }

    p.subtitle {
      font-weight:normal;
      font-size:$font-size-base;
    }
}

.vl-modal-top {
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

.vl-modal-body {
    margin: 1em 0;
}

.text-right {
    text-align: right;
}

.vl-modal-enter {
  opacity: 0;
}

.vl-modal-leave-active {
  opacity: 0;
}

.vl-modal-enter .vl-modal-container,
.vl-modal-leave-active .vl-modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}


</style>