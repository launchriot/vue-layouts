<template>
  <div class="form-group">
    <label v-if="fieldLabel">{{fieldLabel}} <span v-if="required"> &nbsp*</span></label>
    <div class="datepicker" :style="{'width': width + 'px','min-width':range ? (type === 'datetime' ? '320px' : '210px') : '140px'}" v-clickoutside="closePopup">
      <input :class="inputClass" :value="text" :placeholder="innerPlaceholder" ref="input" @click="togglePopup" v-on:keyup="keyMonitor">
      <i class="input-icon input-icon__calendar" @click="clickIcon"></i>
      <div class="datepicker-popup" :class="{'range':range}" :style="position" ref="calendar" v-show="showPopup">
        <template v-if="!range">
          <calendar-panel v-model="currentValue" @select="selectDate" :show="showPopup" />
        </template>
        <template v-else>
          <div class="datepicker-top" v-if="ranges.length">
            <span v-for="range in ranges" @click="selectRange(range)">{{range.text}}</span>
          </div>
          <calendar-panel style="width:50%;box-shadow:1px 0 rgba(0, 0, 0, .1)"
          v-model="currentValue[0]" :end-at="currentValue[1]" @select="selectDate" :show="showPopup" />
          <calendar-panel style="width:50%;" v-model="currentValue[1]" :start-at="currentValue[0]" @select="selectDate" :show="showPopup"/>
        </template>
        <div class="datepicker-footer" v-if="confirm">
          <button type="button" class="datepicker-btn datepicker-btn-confirm" @click="confirmDate">Confirm</button>
        </div>
      </div>
    </div>
    <small class="form-text text-muted" v-if="helpText">{{helpText}}</small>
  </div>
</template>

<script>
import CalendarPanel from './calendar-panel.vue'
import Languages from './languages.js'

export default {
  name: 'vl-datepicker',
  props: {
    fieldLabel: String,
    name: String,
    disabled: Boolean,
    value: null,
    required: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    helptipHeader: String,
    helptipBody: String,
    helpText: String,
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    range: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'date'
    },
    width: {
      type: [String, Number],
      default: 210
    },
    placeholder: String,
    lang: {
      type: String,
      default: 'en'
    },
    shortcuts: {
      type: [Boolean, Array],
      default: true
    },
    disabledDays: {
      type: Array,
      default: function () { return [] }
    },
    notBefore: {
      default: ''
    },
    notAfter: {
      default: ''
    },
    firstDayOfWeek: {
      default: 7,
      type: Number,
      validator: val => val >= 1 && val <= 7
    },
    minuteStep: {
      type: Number,
      default: 0,
      validator: val => val >= 0 && val <= 60
    },
    confirm: {
      type: Boolean,
      default: false
    },
    inputClass: {
      type: String,
      default: 'input'
    }
  },
  data () {
    return {
      focused: false,
      model: null,
      showPopup: false,
      currentValue: this.value,
      position: null,
      ranges: []
    }
  },
  components: {
    'calendar-panel': CalendarPanel
  },
  watch: {
    value: {
      handler (val) {
        if (!this.range) {
          this.currentValue = this.isValidDate(val) ? val : undefined
        } else {
          this.currentValue = this.isValidRange(val) ? val.slice(0, 2) : [undefined, undefined]
        }
      },
      immediate: true
    },
    showPopup (val) {
      if (val) {
        this.$nextTick(this.displayPopup)
      }
    }
  },
  computed: {
    translation () {
      return Languages[this.lang] || Languages['en']
    },
    innerPlaceholder () {
      return this.placeholder || (this.range ? this.translation.placeholder.dateRange : this.translation.placeholder.date)
    },
    text () {
      if (!this.range && this.isValidDate(this.value)) {
        return this.stringify(this.value)
      }
      if (this.range && this.isValidRange(this.value)) {
        return this.stringify(this.value[0]) + ' → ' + this.stringify(this.value[1])
      }
      return ''
    }
  },
  methods: {
    keyMonitor () {
      if (this.$refs.input.value === '') {
        this.$emit('input', '')
      }
    },
    updateDate () {
      const val = this.currentValue
      if ((!this.range && val) || (this.range && val[0] && val[1])) {
        this.$emit('input', val)
        console.log(this.value, this.currentValue)
      }
    },
    confirmDate () {
      this.updateDate()
      this.closePopup()
      this.$emit('confirm')
    },
    selectDate () {
      if (!this.confirm) {
        this.updateDate()
        if (this.type === 'date' && !this.range) {
          this.closePopup()
        }
      }
    },
    closePopup () {
      this.showPopup = false
    },
    togglePopup () {
      if (this.showPopup) {
        this.$refs.input.blur()
        this.showPopup = false
      } else {
        this.$refs.input.focus()
        this.showPopup = true
      }
    },
    clickIcon () {
      this.togglePopup()
    },
    formatDate (date, fmt) {
      const map = {
        'M+': date.getMonth() + 1,
        '[Dd]+': date.getDate(),
        '[Hh]+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
      }
      let str = fmt.replace(/[Yy]+/g, function (str) {
        return ('' + date.getFullYear()).slice(4 - str.length)
      })
      Object.keys(map).forEach((key) => {
        str = str.replace(new RegExp(key), function (str) {
          const value = '' + map[key]
          return str.length === 1 ? value : ('00' + value).slice(value.length)
        })
      })
      return str
    },
    stringify (date) {
      return this.formatDate(new Date(date), this.format)
    },
    isValidDate (date) {
      return !!new Date(date).getTime()
    },
    isValidRange (date) {
      return Array.isArray(date) &&
        date.length === 2 &&
        this.isValidDate(date[0]) &&
        this.isValidDate(date[1])
    },
    selectRange (range) {
      this.$emit('input', [range.start, range.end])
    },
    initRanges () {
      if (Array.isArray(this.shortcuts)) {
        this.ranges = this.shortcuts
      } else if (this.shortcuts) {
        this.ranges = [{
          text: 'Next 7 Days',
          start: new Date(),
          end: new Date(Date.now() + 3600 * 1000 * 24 * 7)
        }, {
          text: 'Next 30 Days',
          start: new Date(),
          end: new Date(Date.now() + 3600 * 1000 * 24 * 30)
        }, {
          text: 'Previous 7 Days',
          start: new Date(Date.now() - 3600 * 1000 * 24 * 7),
          end: new Date()
        }, {
          text: 'Previous 30 Days',
          start: new Date(Date.now() - 3600 * 1000 * 24 * 30),
          end: new Date()
        }]
        this.ranges.forEach((v, i) => {
          v.text = this.translation.pickers[i]
        })
      } else {
        this.ranges = []
      }
    },
    displayPopup () {
      const dw = document.documentElement.clientWidth
      const dh = document.documentElement.clientHeight
      const InputRect = this.$el.getBoundingClientRect()
      const PopupRect = this.$refs.calendar.getBoundingClientRect()
      this.position = {}
      if (dw - InputRect.left < PopupRect.width && InputRect.right < PopupRect.width) {
        this.position.left = 1 - InputRect.left + 'px'
      } else if (InputRect.left + InputRect.width / 2 <= dw / 2) {
        this.position.left = 0
      } else {
        this.position.right = 0
      }
      if (InputRect.top <= PopupRect.height + 1 && dh - InputRect.bottom <= PopupRect.height + 1) {
        this.position.top = dh - InputRect.top - PopupRect.height - 1 + 'px'
      } else if (InputRect.top + InputRect.height / 2 <= dh / 2) {
        this.position.top = '100%'
      } else {
        this.position.bottom = '100%'
      }
    }
  },
  created () {
    this.initRanges()
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
    },
    clickoutside: {
      bind (el, binding, vnode) {
        el['@clickoutside'] = (e) => {
          if (!el.contains(e.target) && binding.expression && vnode.context[binding.expression]) {
            binding.value()
          }
        }
        document.addEventListener('click', el['@clickoutside'], true)
      },
      unbind (el) {
        document.removeEventListener('click', el['@clickoutside'], true)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
@import "~@/assets/sass/_variables.scss";
@import "~@/assets/sass/_form_fields.scss";  

.datepicker {
  position: relative;
  display: block;
  color: $ink;
}
.datepicker * {
  box-sizing: border-box;
}
.datepicker-popup {
  position: absolute;
  width: 250px;
  margin-top: 1px;
  margin-bottom: 1px;
  border: $border-width-default solid;
  @include themify() {
    border-color: getThemifyVariable('background');
    background-color: getThemifyVariable('canvas'); 
  }
  box-shadow: $box-shadow;
  z-index: 1000;
}
.range {
  width: 496px;
}
.input {
  @include form-field;
  display: inline-block;
  width: 100%;
  height: 34px;
  padding: 6px 30px 6px 10px;
}
.input-icon {
  top: 0;
  right: 0;
  position: absolute;
  width: 30px;
  height: 100%;
  @include themify() {
    color: getThemifyVariable('tertiary-01'); 
  }
  text-align: center;
  font-style: normal;
}
.input-icon::after{
  content:'';
  display: inline-block;
  width: 0;
  height: 100%;
  vertical-align: middle;
}
.input-icon__calendar::before {
  font-family: FontAwesome;
  content: '\f073';
  @include themify() {
    color: getThemifyVariable('tertiary-01'); 
  }
  vertical-align: middle;
}
.datepicker-top {
  padding: 0 12px;
  line-height: 34px;
  border-bottom: 1px solid rgba(0, 0, 0, .05);
}
.datepicker-top>span {
  white-space: nowrap;
  cursor: pointer;
}
.datepicker-top>span:hover {
  color: #1284e7;
}
.datepicker-top>span:after {
  content: "|";
  margin: 0 10px;
  color: #48576a;
}
.datepicker-footer {
  padding: 4px;
  clear: both;
  text-align: right;
  border-top: 1px solid rgba(0, 0, 0, .05);
}
.datepicker-btn {
  font-size: 12px;
  line-height: 28px;
  padding: 0 5px;
  margin: 0 5px;
  cursor: pointer;
  background-color: transparent;
  outline: none;
  border: none;
}
.datepicker-btn-confirm {
  color: #1284e7;
}


label {
  display: block;
}

.datepicker {
  display:block;
}

.form-control {
  display: block;
  @include form-field;

}

.datepicker input[readonly] {
  @include themify() {
    color: getThemifyVariable('ink'); 
  }
}

</style>