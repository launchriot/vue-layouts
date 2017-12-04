<template>
  <div class="calendar">
    <div class="calendar-header">
      <a v-if="currentPanel === 'time'" @click="currentPanel = 'date'">{{now.toLocaleDateString()}}</a>
      <template v-else>
        <a class="calendar__prev-icon" @click="changeYear(-1)">&laquo;</a>
        <a v-show="currentPanel === 'date'" class="calendar__prev-icon" @click="changeMonth(-1)">&lsaquo;</a>
        <a class="calendar__next-icon" @click="changeYear(1)">&raquo;</a>
        <a v-show="currentPanel === 'date'" class="calendar__next-icon" @click="changeMonth(1)">&rsaquo;</a>
        <a @click="showMonths">{{months[currentMonth]}}</a>
        <a @click="showYears">{{currentYear}}</a>
      </template>
    </div>
    <div class="calendar-content">
      <table class="calendar-table" v-show="currentPanel === 'date'">
        <thead>
          <tr>
            <th v-for="(day, index) in days" :key="index">{{day}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in dates">
            <td v-for="cell in row" :title="cell.title" :class="getDateClasses(cell)" @click="selectDate(cell)">{{cell.day}}</td>
          </tr>
        </tbody>
      </table>
      <div class="calendar-year" v-show="currentPanel === 'years'">
        <a v-for="year in years" @click="selectYear(year)" :class="{'current': currentYear === year}">{{year}}</a>
      </div>
      <div class="calendar-month" v-show="currentPanel === 'months'">
        <a v-for="(month, index) in months" @click="selectMonth(index)" :class="{'current': currentMonth === index}">{{month}}</a>
      </div>
      <div class="calendar-time"
        v-show="currentPanel === 'time'" >
        <div class="time-list-wrapper" 
          :style="{width: 100 / times.length + '%' }"
          v-for="(time, index) in times" 
          :key="index">
          <ul class="time-list">
            <li class="time-item"
              v-for="num in time"
              :class="getTimeClasses(num, index)"
              :key="num"
              @click="selectTime(num, index)"
              >{{num | timeText}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

function getTimeArray (len, step = 1) {
  const length = parseInt(len / step)
  return Array.apply(null, {length}).map((v, i) => i * step)
}

export default {
  props: {
    startAt: null,
    endAt: null,
    value: null,
    show: Boolean
  },
  data () {
    const translation = this.$parent.translation
    const minuteStep = this.$parent.minuteStep
    const times = [getTimeArray(24, 1), getTimeArray(60, minuteStep || 1)]
    if (minuteStep === 0) {
      times.push(getTimeArray(60, 1))
    }
    return {
      months: translation.months,
      dates: [],
      years: [],
      now: new Date(),
      currentPanel: 'date',
      times: times
    }
  },
  computed: {
    days () {
      const days = this.$parent.translation.days
      const firstday = +this.$parent.firstDayOfWeek
      return days.concat(days).slice(firstday, firstday + 7)
    },
    currentYear () {
      return this.now.getFullYear()
    },
    currentMonth () {
      return this.now.getMonth()
    },
    curHour () {
      return this.now.getHours()
    },
    curMinute () {
      return this.now.getMinutes()
    },
    curSecond () {
      return this.now.getSeconds()
    }
  },
  created () {
    this.updateCalendar()
  },
  watch: {
    show (val) {
      if (val) {
        this.currentPanel = 'date'
        this.updateNow()
      }
    },
    value: {
      handler: 'updateNow',
      immediate: true
    },
    now: 'updateCalendar'
  },
  filters: {
    timeText (value) {
      return ('00' + value).slice(String(value).length)
    }
  },
  methods: {
    updateNow () {
      this.now = this.value ? new Date(this.value) : new Date()
    },
    updateCalendar () {
      function getCalendar (time, firstday, length, classes) {
        return Array.apply(null, { length }).map((v, i) => { // eslint-disable-line
          let day = firstday + i
          const date = new Date(time.getFullYear(), time.getMonth(), day, 0, 0, 0)
          date.setDate(day)
          return {
            title: date.toLocaleDateString(),
            date,
            day,
            classes
          }
        })
      }
      const firstDayOfWeek = this.$parent.firstDayOfWeek
      const time = new Date(this.now)
      time.setDate(0)
      const lastMonthLength = (time.getDay() + 7 - firstDayOfWeek) % 7 + 1
      const lastMonthfirst = time.getDate() - (lastMonthLength - 1)
      const lastMonth = getCalendar(time, lastMonthfirst, lastMonthLength, 'lastMonth')

      time.setMonth(time.getMonth() + 2, 0) // 切换到这个月最后一天
      const curMonthLength = time.getDate()
      const curMonth = getCalendar(time, 1, curMonthLength, 'curMonth')

      time.setMonth(time.getMonth() + 1, 1)
      const nextMonthLength = 42 - (lastMonthLength + curMonthLength)
      const nextMonth = getCalendar(time, 1, nextMonthLength, 'nextMonth')

      let index = 0
      let resIndex = 0
      const arr = lastMonth.concat(curMonth, nextMonth)
      const result = new Array(6)
      while (index < 42) {
        result[resIndex++] = arr.slice(index, index += 7)
      }
      this.dates = result
    },
    getDateClasses (cell) {
      const classes = []
      const cellTime = new Date(cell.date).setHours(0, 0, 0, 0)
      const cellEndTime = new Date(cell.date).setHours(23, 59, 59, 999)
      const curTime = this.value ? new Date(this.value).setHours(0, 0, 0, 0) : 0
      const startTime = this.startAt ? new Date(this.startAt).setHours(0, 0, 0, 0) : 0
      const endTime = this.endAt ? new Date(this.endAt).setHours(0, 0, 0, 0) : 0
      const today = new Date().setHours(0, 0, 0, 0)

      if (this.$parent.disabledDays.some(v => +new Date(v) === +cell.date) ||
        (this.$parent.notBefore !== '' && cellEndTime < (new Date(this.$parent.notBefore)).getTime()) ||
        (this.$parent.notAfter !== '' && cellTime > (new Date(this.$parent.notAfter)).getTime())) {
        return 'disabled'
      }

      classes.push(cell.classes)

      if (cellTime === today) {
        classes.push('today')
      }

      // range classes
      if (cellTime === curTime) {
        classes.push('current')
      } else if (startTime) {
        if (cellTime < startTime) {
          classes.push('disabled')
        } else if (curTime && cellTime <= curTime) {
          classes.push('inrange')
        }
      } else if (endTime) {
        if (cellTime > endTime) {
          classes.push('disabled')
        } else if (curTime && cellTime >= curTime) {
          classes.push('inrange')
        }
      }
      return classes.join(' ')
    },
    getTimeClasses (value, index) {
      let curValue
      let cellTime
      const startTime = this.startAt ? new Date(this.startAt) : 0
      const endTime = this.endAt ? new Date(this.endAt) : 0
      const classes = []
      switch (index) {
        case 0:
          curValue = this.curHour
          cellTime = new Date(this.now).setHours(value)
          break
        case 1:
          curValue = this.curMinute
          cellTime = new Date(this.now).setMinutes(value)
          break
        case 2:
          curValue = this.curSecond
          cellTime = new Date(this.now).setSeconds(value)
          break
      }
      if (
        this.$parent.notBefore !== '' && cellTime < new Date(this.$parent.notBefore).getTime() || this.$parent.notAfter !== '' && cellTime > new Date(this.$parent.notAfter).getTime()
      ) {
        return 'disabled'
      }

      if (value === curValue) {
        classes.push('cur-time')
      } else if (startTime) {
        if (cellTime < startTime) {
          classes.push('disabled')
        }
      } else if (endTime) {
        if (cellTime > endTime) {
          classes.push('disabled')
        }
      }
      return classes.join(' ')
    },
    showMonths () {
      if (this.currentPanel === 'months') {
        this.currentPanel = 'date'
      } else {
        this.currentPanel = 'months'
      }
    },
    showYears () {
      if (this.currentPanel === 'years') {
        this.currentPanel = 'date'
      } else {
        let firstYear = Math.floor(this.now.getFullYear() / 10) * 10
        let years = []
        for (let i = 0; i < 10; i++) {
          years.push(firstYear + i)
        }
        this.years = years
        this.currentPanel = 'years'
      }
    },
    changeYear (flag) {
      if (this.currentPanel === 'years') {
        this.years = this.years.map(v => v + flag * 10)
      } else {
        const now = new Date(this.now)
        now.setFullYear(now.getFullYear() + flag, now.getMonth(), 1)
        this.now = now
      }
    },
    changeMonth (flag) {
      const now = new Date(this.now)
      now.setMonth(now.getMonth() + flag, 1)
      this.now = now
    },
    selectDate (cell) {
      const classes = this.getDateClasses(cell)
      if (classes.indexOf('disabled') !== -1) {
        return
      }
      let date = new Date(cell.date)
      if (this.$parent.type === 'datetime') {
        if (this.value instanceof Date) {
          date.setHours(this.value.getHours(), this.value.getMinutes(), this.value.getSeconds())
        }
        if (this.startAt && date.getTime() < new Date(this.startAt).getTime()) {
          date = new Date(this.startAt)
        } else if (this.endAt && date.getTime() > new Date(this.endAt).getTime()) {
          date = new Date(this.endAt)
        }
        this.currentPanel = 'time'
        this.$nextTick(() => {
          Array.prototype.forEach.call(this.$el.querySelectorAll('.cur-time'), function (el) {
            el.scrollIntoView()
          })
        })
      }
      this.now = date
      this.$emit('input', date)
      this.$emit('select')
    },
    selectYear (year) {
      const now = new Date(this.now)
      now.setFullYear(year)
      this.now = now
      this.currentPanel = 'months'
    },
    selectMonth (month) {
      const now = new Date(this.now)
      now.setMonth(month)
      this.now = now
      this.currentPanel = 'date'
    },
    selectTime (value, index) {
      const classes = this.getTimeClasses(value, index)
      if (classes.indexOf('disabled') !== -1) {
        return
      }
      const date = new Date(this.now)
      if (index === 0) {
        date.setHours(value)
      } else if (index === 1) {
        date.setMinutes(value)
      } else if (index === 2) {
        date.setSeconds(value)
      }
      this.now = date
      this.$emit('input', date)
      this.$emit('select')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/_variables.scss";
@import "~@/assets/sass/_form_fields.scss";  

.calendar {
  float: left;
  width: 100%;
  padding: 6px 12px;
}

.calendar * {
  box-sizing: border-box;
}

.calendar a {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}

.calendar-header {
  line-height: 34px;
  text-align: center;
  font-weight:$font-weight-bold;
}

.calendar__next-icon,
.calendar__prev-icon {
  font-size: 20px;
  padding: 0 6px;
}

.calendar-header>a {
  @include themify() {
    color: getThemifyVariable('primary-02'); 
  }
  &:hover {
    @include themify() {
      color: getThemifyVariable('primary-02'); 
    }
  }
}

a.calendar__prev-icon {
  float: left;
  @include themify() {
    color: getThemifyVariable('primary-03'); 
  }
}

a.calendar__next-icon {
  float: right;
  @include themify() {
    color: getThemifyVariable('primary-03'); 
  }
}

.calendar-table {
  width: 100%;
  font-size: 12px;
  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 0;
}

.calendar-table {
  th, td {
    width: 32px;
    text-align: center;
    font-weight:$font-weight-bold;
  }
  td {
    border:$border-width-default solid;
    @include themify() {
      color: getThemifyVariable('primary-02');
      border-color: getThemifyVariable('background'); 
    }
    height: 32px;
  }
  th {
    @include themify() {
      color: getThemifyVariable('primary-04');
    }
    height:20px;
  }
}

.calendar-table td {
  cursor: pointer;
}

.calendar-table td:hover,
.calendar-year>a:hover,
.calendar-month>a:hover {
  @include themify() {
    color: getThemifyVariable('canvas');
    background-color: getThemifyVariable('primary-04'); 
  }
}

.calendar-table td.current,.calendar-table td.inrange {
  @include themify() {
    color: getThemifyVariable('canvas');
    background-color: getThemifyVariable('secondary-01'); 
  }
}


.calendar-year>a.current,
.calendar-month>a.current {
  @include themify() {
    color: getThemifyVariable('canvas');
    background-color: getThemifyVariable('primary-04'); 
  }
}

.calendar-table td.disabled {
  cursor: not-allowed;
  @include themify() {
    color: getThemifyVariable('ink');
    background-color: getThemifyVariable('background'); 
  }
}

td.lastMonth,
td.nextMonth {
  @include themify() {
    color: getThemifyVariable('ink');
    background-color: getThemifyVariable('background-light'); 
  }
}

td.today {
  @include themify() {
    color: getThemifyVariable('primary-04');
  }
  font-weight: $font-weight-bold;
}

.calendar-year,
.calendar-month,
.calendar-time {
  width: 100%;
  height: 224px;
  padding: 7px 0;
  text-align: center;
}

.calendar-year>a {
  display: inline-block;
  width: 40%;
  margin: 1px 5%;
  line-height: 40px;
}

.calendar-month>a {
  display: inline-block;
  width: 30%;
  line-height: 40px;
  margin: 8px 1.5%;
}

.time-list-wrapper {
  display: inline-block;
  width: 50%;
  height: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  overflow-y: auto;
}

.time-list-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.time-list-wrapper::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}

.time-list-wrapper:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
}


.time-list-wrapper:first-child {
  border-left: 0;
}

.time-list {
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: center;
}
.time-item {
  width: 100%;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}
.time-item:hover {
  background-color: #eaf8fe;
}
.time-item.cur-time {
  color: #fff;
  background-color: #1284e7;
}
.time-item.disabled {
  cursor: not-allowed;
  color: #ccc;
  background-color: #f3f3f3;
}
</style>
