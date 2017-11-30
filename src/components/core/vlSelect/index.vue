<template>
  <div id="vlSelect__main-wrapper" class="form-group">
    <label class="control-label" v-if="fieldLabel">{{fieldLabel}}<span v-if="required"> &nbsp*</span></label>
    <div
      :tabindex="searchable ? -1 : tabindex"
      :class="{ 'vlSelect--active': isOpen, 'vlSelect--disabled': disabled, 'vlSelect--above': isAbove }"
      @focus="activate()"
      @blur="searchable ? false : deactivate()"
      @keydown.self.down.prevent="pointerForward()"
      @keydown.self.up.prevent="pointerBackward()"
      @keydown.enter.tab.stop.self="addPointerElement($event)"
      @keyup.esc="deactivate()"
      class="vlSelect">
        <slot name="caret" :toggle="toggle">
          <div @mousedown.prevent.stop="toggle()" class="vlSelect__select"></div>
        </slot>
        <slot name="clear" :search="search"></slot>
        <div ref="tags" class="vlSelect__tags">
          <div class="vlSelect__tags-wrap" v-show="visibleValue.length > 0">
            <template v-for="option of visibleValue" @mousedown.prevent>
              <slot name="tag" :option="option" :search="search" :remove="removeElement">
                <span class="vlSelect__tag">
                  <span v-text="getOptionLabel(option)"></span>
                  <i aria-hidden="true" tabindex="1" @keydown.enter.prevent="removeElement(option)"  @mousedown.prevent="removeElement(option)" class="vlSelect__tag-icon"></i>
                </span>
              </slot>
            </template>
          </div>
          <template v-if="internalValue && internalValue.length > limit">
            <strong class="vlSelect__strong" v-text="limitText(internalValue.length - limit)"></strong>
          </template>
          <transition name="vlSelect__loading">
            <slot name="loading"><div v-show="loading" class="vlSelect__spinner"></div></slot>
          </transition>
          <input
            @focus="focused = true"
            @blur="focused = false"
            ref="search"
            :name="name"
            :id="id"
            type="text"
            autocomplete="off"
            :placeholder="placeholder"
            v-bind="$props"
            v-focus.lazy="autofocus"
            :required="required"
            :autofocus="autofocus"
            v-if="searchable"
            :style="inputStyle"
            :value="isOpen ? search : currentOptionLabel"
            :disabled="disabled"
            :tabindex="tabindex"
            @input="updateSearch($event.target.value)"
            @focus.prevent="activate()"
            @blur.prevent="deactivate()"
            @keyup.esc="deactivate()"
            @keydown.down.prevent="pointerForward()"
            @keydown.up.prevent="pointerBackward()"
            @keydown.enter.prevent.stop.self="addPointerElement($event)"
            @keydown.delete.stop="removeLastElement()"
            class="vlSelect__input"/>
          <span
            v-if="!searchable"
            class="vlSelect__single"
            @mousedown.prevent="toggle"
            v-text="currentOptionLabel">
          </span>
        </div>
        <transition name="vlSelect">
          <div
            class="vlSelect__content-wrapper"
            v-show="isOpen"
            @focus="activate"
            @mousedown.prevent
            :style="{ maxHeight: optimizedHeight + 'px' }"
            ref="list">
            <ul class="vlSelect__content" :style="contentStyle">
              <slot name="beforeList"></slot>
              <li v-if="multiple && max === internalValue.length">
                <span class="vlSelect__option">
                  <slot name="maxElements">Maximum of {{ max }} options selected. First remove a selected option to select another.</slot>
                </span>
              </li>
              <template v-if="!max || internalValue.length < max">
                <li class="vlSelect__element" v-for="(option, index) of filteredOptions" :key="index">
                  <span
                    v-if="!(option && (option.$isLabel || option.$isDisabled))"
                    :class="optionHighlight(index, option)"
                    @click.stop="select(option)"
                    @touchstart.stop.prevent="handleTouchStartStop(index, option)"
                    @mouseenter.self="pointerSet(index)"
                    :data-select="option && option.isTag ? tagPlaceholder : selectLabelText"
                    :data-selected="selectedLabelText"
                    :data-deselect="deselectLabelText"
                    class="vlSelect__option">
                      <slot name="option" :option="option" :search="search">
                        <span>{{ getOptionLabel(option) }}</span>
                      </slot>
                  </span>
                  <span
                    v-if="option && (option.$isLabel || option.$isDisabled)"
                    :class="optionHighlight(index, option)"
                    class="vlSelect__option vlSelect__option--disabled">
                      <slot name="option" :option="option" :search="search">
                        <span>{{ getOptionLabel(option) }}</span>
                      </slot>
                  </span>
                </li>
              </template>
          <!-- This allows us to display a message if no results are found in search. -->
          <!--<li v-show="showNoResults && (filteredOptions.length === 0 && search && !loading)">
                <span class="vlSelect__option">
                  <slot name="noResult">No items found. Consider changing your search query.</slot>
                </span>
              </li> -->
              <slot name="afterList"></slot>
            </ul>
          </div>
        </transition>
    </div>
  </div>
</template>

<script>
  import multiselectMixin from './multiselectMixin'
  import pointerMixin from './pointerMixin'
  export default {
    name: 'vl-select',
    mixins: [multiselectMixin, pointerMixin],
    props: {
      required: {
        type: Boolean,
        default: false
      },
      autofocus: {
        type: Boolean,
        default: false
      },
      fieldLabel: {
        type: String,
        default: ''
      },
      helptipHeader: String,
      helptipBody: String,
      name: {
        type: String,
        default: ''
      },
      selectLabel: {
        type: String,
        default: 'Press enter to select'
      },
      selectedLabel: {
        type: String,
        default: 'Selected'
      },
      deselectLabel: {
        type: String,
        default: 'Press enter to remove'
      },
      showLabels: {
        type: Boolean,
        default: true
      },
      limit: {
        type: Number,
        default: 99999
      },
      maxHeight: {
        type: Number,
        default: 300
      },
      limitText: {
        type: Function,
        default: count => `and ${count} more`
      },
      loading: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      openDirection: {
        type: String,
        default: ''
      },
      showNoResults: {
        type: Boolean,
        default: true
      },
      tabindex: {
        type: Number,
        default: 0
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
    data: function () {
      return {
        focused: false
      }
    },
    computed: {
      visibleValue () {
        return this.multiple
          ? this.internalValue.slice(0, this.limit)
          : []
      },
      deselectLabelText () {
        return this.showLabels
          ? this.deselectLabel
          : ''
      },
      selectLabelText () {
        return this.showLabels
          ? this.selectLabel
          : ''
      },
      selectedLabelText () {
        return this.showLabels
          ? this.selectedLabel
          : ''
      },
      inputStyle () {
        if (this.multiple && this.value && this.value.length) {
          // Hide input by setting the width to 0 allowing it to receive focus
          return this.isOpen ? { 'width': 'auto' } : { 'width': '0', 'position': 'absolute' }
        }
      },
      contentStyle () {
        return this.options.length
          ? { 'display': 'inline-block' }
          : { 'display': 'block' }
      },
      isAbove () {
        if (this.openDirection === 'above' || this.openDirection === 'top') {
          return true
        } else if (this.openDirection === 'below' || this.openDirection === 'bottom') {
          return false
        } else {
          return this.prefferedOpenDirection === 'above'
        }
      }
    }
  }
</script>

<style lang="scss">
@import "~@/assets/sass/_variables.scss";
@import "~@/assets/sass/_form_fields.scss";  

#vlSelect__main-wrapper {
  position: relative;
}

fieldset[disabled] .vlSelect {
  pointer-events: none;
}
.vlSelect__spinner {
  position: absolute;
  right: 1px;
  top: 1px;
  width: 48px;
  height: 35px;
  background: #fff;
  display: block;
}
.vlSelect__spinner:before,
.vlSelect__spinner:after {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border-color: #41B883 transparent transparent;
  border-style: solid;
  border-width: 2px;
  box-shadow: 0 0 0 1px transparent;
}
.vlSelect__spinner:before {
  animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
  animation-iteration-count: infinite;
}
.vlSelect__spinner:after {
  animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
  animation-iteration-count: infinite;
}
.vlSelect__loading-enter-active,
.vlSelect__loading-leave-active {
  transition: opacity 0.4s ease-in-out;
  opacity: 1;
}
.vlSelect__loading-enter,
.vlSelect__loading-leave-active {
  opacity: 0;
}
.vlSelect,
.vlSelect__input,
.vlSelect__single {
  font-family: inherit;
  font-size: $font-size-base;
  touch-action: manipulation;
}
.vlSelect {
  @include form-field;
  box-sizing: content-box;
  display: block;
  position: relative;
  width: 100%;
  min-height: 34px;
  text-align: left;
  @include themify() {
    color: getThemifyVariable('ink');
  }
}
.vlSelect * {
  box-sizing: border-box;
}
.vlSelect:focus {
  outline: none;
  border:$border-width-default solid;
  @include themify() {
    border-color: getThemifyVariable('tertiary-01');
    box-shadow: 0px 0px 0px 1px getThemifyVariable('tertiary-01');
  }
  
}
.vlSelect--disabled {
  pointer-events: none;
  opacity: 0.6;
}
.vlSelect--active {
  z-index: 50;
  border:$border-width-default solid;
  @include themify() {
    border-color: getThemifyVariable('tertiary-01');
    box-shadow: 0px 0px 0px 1px getThemifyVariable('tertiary-01');
  }
}
.vlSelect--active:not(.vlSelect--above) .vlSelect__current,
.vlSelect--active:not(.vlSelect--above) .vlSelect__input,
.vlSelect--active:not(.vlSelect--above) .vlSelect__tags {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.vlSelect--active .vlSelect__select:before {
  transform: rotateZ(180deg);
  display:inline-block;
  top:0;
  transition: transform .2s ease-out;
}
.vlSelect--above.vlSelect--active .vlSelect__current,
.vlSelect--above.vlSelect--active .vlSelect__input,
.vlSelect--above.vlSelect--active .vlSelect__tags {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.vlSelect__input,
.vlSelect__single {
  position: relative;
  display: inline-block;
  min-height: 20px;
  line-height: 20px;
  border: none;
  border-radius: $border-radius;
  background: #fff;
  padding: 0 0 0 5px;
  width: calc(100%);
  transition: border 0.1s ease;
  box-sizing: border-box;
  margin-bottom: 8px;
  vertical-align: top;
}
.vlSelect__tag ~ .vlSelect__input,
.vlSelect__tag ~ .vlSelect__single {
  width: auto;
}
.vlSelect__input:hover,
.vlSelect__single:hover {
  border-color: #cfcfcf;
}
.vlSelect__input:focus,
.vlSelect__single:focus {
  border-color: #a8a8a8;
  outline: none;
}
.vlSelect__single {
  padding-left: 6px;
  margin-bottom: 8px;
}
.vlSelect__tags-wrap {
  display: inline
}
.vlSelect__tags {
  min-height: 34px;
  display: block;
  padding: 6px 40px 0 8px;
  @include themify() {
    background: getThemifyVariable('canvas');
  }
}
.vlSelect__tag {
  position: relative;
  display: inline-block;
  padding: 4px 26px 4px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: #fff;
  line-height: 1;
  background: #41B883;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}
.vlSelect__tag-icon {
  cursor: pointer;
  margin-left: 7px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  font-weight: 700;
  font-style: initial;
  width: 22px;
  text-align: center;
  line-height: 22px;
  transition: all 0.2s ease;
  border-radius: 5px;
}
.vlSelect__tag-icon:after {
  content: "×";
  color: #266d4d;
  font-size: $font-size-base;
}
.vlSelect__tag-icon:focus,
.vlSelect__tag-icon:hover {
  background: #369a6e;
}
.vlSelect__tag-icon:focus:after,
.vlSelect__tag-icon:hover:after {
  color: white;
}
.vlSelect__current {
  line-height: 16px;
  min-height: 40px;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  padding: 8px 12px 0;
  padding-right: 30px;
  white-space: nowrap;
  margin: 0;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid #E8E8E8;
  cursor: pointer;
}
.vlSelect__select {
  line-height: 20px;
  display: block;
  position: absolute;
  box-sizing: border-box;
  width: 40px;
  height: 38px;
  right: 1px;
  top: 1px;
  padding: 4px 8px;
  margin: 0;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.vlSelect__select:before {
  position: relative;
  right: 0;
  top: 0;
  margin-top: 4px;
  border-style: solid;
  border-width: 5px 5px 0 5px;
  @include themify() {
    color: getThemifyVariable('primary-05');
    border-color: getThemifyVariable('tertiary-01')  transparent transparent transparent;
  }
  content: "";
  transform: rotateZ(0deg);
  display:inline-block;
  transition: transform .2s ease-out;
}
.vlSelect__placeholder {
  color: #ADADAD;
  display: inline-block;
  margin-bottom: 10px;
  padding-top: 2px;
}
.vlSelect--active .vlSelect__placeholder {
  display: none;
}
.vlSelect__content-wrapper {
  position: absolute;
  display: block;
  @include themify() {
    background: getThemifyVariable('canvas');
    border-color: getThemifyVariable('background');
  }
  width: 100%;
  max-height: 240px;
  overflow: auto;
  border: $border-width-default solid;
  z-index: 50;
  -webkit-overflow-scrolling: touch;
  margin-top: 4px;
}
.vlSelect__content-wrapper::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: transparent;
  padding-right:2px;
}

.vlSelect__content-wrapper::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
}

.vlSelect__content-wrapper::-webkit-scrollbar-thumb{
  border-radius: 10px;
  @include themify() {
    background-color: getThemifyVariable('background');
  }
}
.vlSelect__content {
  list-style: none;
  display: inline-block;
  padding: 0;
  margin: 0;
  min-width: 100%;
  vertical-align: top;
}
.vlSelect--above .vlSelect__content-wrapper {
  bottom: 100%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: none;
  border-top: 1px solid #E8E8E8;
}
.vlSelect__content::webkit-scrollbar {
  display: none;
}
.vlSelect__element {
  display: block;
  font-size:$font-size-small;
}

.vlSelect__element:hover {
  @include themify() {
    background: getThemifyVariable('background-light');
  }
}
.vlSelect__option {
  display: block;
  padding: 8px 16px;
  min-height: 24px;
  line-height: 16px;
  text-decoration: none;
  text-transform: none;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
  font-size:$font-size-small;
}
.vlSelect__option:after {
  top: 0;
  right: 0;
  position: absolute;
  line-height: 40px;
  padding-right: 12px;
  padding-left: 20px;
}
.vlSelect__option--highlight {
  background: #41B883;
  outline: none;
  color: white;
}
.vlSelect__option--highlight:after {
  content: attr(data-select);
  background: #41B883;
  color: white;
}
.vlSelect__option--selected {
  background: #F3F3F3;
  color: #35495E;
  font-weight: bold;
}
.vlSelect__option--selected:after {
  content: attr(data-selected);
  color: silver;
}
.vlSelect__option--selected.vlSelect__option--highlight {
  background: #FF6A6A;
  color: #fff;
}
.vlSelect__option--selected.vlSelect__option--highlight:after {
  background: #FF6A6A;
  content: attr(data-deselect);
  color: #fff;
}
.vlSelect--disabled {
  background: #ededed;
  pointer-events: none;
}
.vlSelect--disabled .vlSelect__current,
.vlSelect--disabled .vlSelect__select {
  background: #ededed;
  color: #a6a6a6;
}
.vlSelect__option--disabled {
  background: #ededed;
  color: #a6a6a6;
  cursor: text;
  pointer-events: none;
}
.vlSelect__option--disabled.vlSelect__option--highlight {
  background: #dedede !important;
}
.vlSelect-enter-active,
.vlSelect-leave-active {
  transition: all 0.15s ease;
}
.vlSelect-enter,
.vlSelect-leave-active {
  opacity: 0;
}
.vlSelect__strong {
  margin-bottom: 8px;
  line-height: 20px;
  display: inline-block;
  vertical-align: top;
}
*[dir="rtl"] .vlSelect {
    text-align: right;
}
*[dir="rtl"] .vlSelect__select {
    right: auto;
    left: 1px;
}
*[dir="rtl"] .vlSelect__tags {
    padding: 8px 8px 0px 40px;
}
*[dir="rtl"] .vlSelect__content {
    text-align: right;
}
*[dir="rtl"] .vlSelect__option:after {
    right: auto;
    left: 0;
}
*[dir="rtl"] .vlSelect__clear {
    right: auto;
    left: 12px;
}
*[dir="rtl"] .vlSelect__spinner {
    right: auto;
    left: 1px;
}
@keyframes spinning {
  from { transform:rotate(0) }
  to { transform:rotate(2turn) }
}

.vlSelect__content-table-wrapper{
  display: table;
  width: 100%;
}
.vlSelect__content-table-row-wrapper {
  display: table-row;
}

.vlSelect__content-table-body-wrapper {
  display: table-row-group;
}
.vlSelect__content-table-image-wrapper {
  width:70px;
  display: table-cell;
  height:60px;
  padding:0px 0px 0px 10px;
}

.vlSelect__content-table-image-wrapper img {
  width:100%;
}
.vlSelect__content-table-content-wrapper{
  vertical-align:top;
  display: table-cell;
  padding:0px 10px;
}
</style>