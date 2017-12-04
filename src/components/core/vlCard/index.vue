<template>
  <div class="vl-card">
        <div class="vl-card-top">
          <span class="close-icon" @click="removecard"><i class="fa fa-close"></i></span>
        </div>
        <div class="vl-card-header">
          <p class="title">
            <slot name="title"></slot>
            <span v-if="!hasSlotTitle">{{title}}</span>
          </p>
          <p class="subtitle" v-if="subtitle">{{subtitle}}</p>
        </div>
        <div class="vl-card-body">
          <slot name="body"></slot>
        </div>
        <div class="vl-card-footer text-right">
            <slot name="footer"></slot>
            <div v-if="!hasSlotFooter">
              <vl-button @click="edit" v-if="footerButton != 'false'" class="btn btn-actionbar">{{footerButton}}</vl-button>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'vl-card',
    props: {
      id: {
        type: Number,
        default: 1
      },
      title: {
        type: String
      },
      subtitle: String,
      footerButton: {
        type: String,
        default: 'Edit'
      }
    },
    computed: {
      hasSlotTitle () {
        return this.$slots.title
      },
      hasSlotFooter () {
        return this.$slots.footer
      }
    },
    methods: {
      removecard: function () {
        var id = this.id
        this.$emit('removecard', id)
      },
      edit: function () {
        var id = this.id
        this.$emit('edit', id)
      }
    }
  }
</script>

<style scoped lang="scss">
@import "~@/assets/sass/_variables.scss";

.vl-card {
    display:inline-block;
    min-width: 285px;
    max-width: 300px;
    margin: 1em 1em 1em 0em;
    padding: .75em .65em .0em .65em;
    box-shadow: $box-shadow;
    @include themify() {
      background-color: getThemifyVariable('canvas');
      border-color: getThemifyVariable('background'); 
    }
    transition: all .3s ease;

    p.title {
      font-weight: $font-weight-bold;
      font-size: $font-size-base;
      @include themify() {
        color: getThemifyVariable('primary-05'); 
      }
      margin-bottom:0;
    }

    p.subtitle {
      font-weight:normal;
      font-size:$font-size-base;
    }
}

.vl-card-top {
  text-align: right;
  margin-bottom:-20px;
  
  span.close-icon {
    font-weight: 100;
    @include themify() {
      color: getThemifyVariable('ink'); 
    }
    margin-left: 2em;
    text-align: right;
    &:hover {
      cursor: pointer;
    }
  }
}

.vl-card-body p {
    font-size: $font-size-medium;
    margin-bottom:0;
}

.text-right {
    text-align: right;
}

.vl-card-enter {
  opacity: 0;
}

.vl-card-leave-active {
  opacity: 0;
}

.vl-card-enter .vl-card-container,
.vl-card-leave-active .vl-card-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}


</style>