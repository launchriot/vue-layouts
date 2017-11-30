<template>
  <div class="vlSelect__content-table-wrapper">
      <div class="vlSelect__content-table-body-wrapper">
          <div class="vlSelect__content-table-row-wrapper">
              <div class="vlSelect__content-table-image-wrapper" v-if="thumbnails">
                  <slot name="image"></slot>
              </div>
              <div class="vlSelect__content-table-content-wrapper">
                  <slot name="row1"></slot>
                  <slot name="row2"></slot>
                  <slot name="row3"></slot>
                  <slot name="row4"></slot>
                  <slot name="row5"></slot>
                  <slot name="row6"></slot>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'vl-select-options',
  props: {
    thumbnails: Boolean
  }
}
</script>

<style lang="scss">
</style>
