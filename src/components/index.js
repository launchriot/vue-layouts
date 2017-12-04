// Layouts
import AuthWrapper from './LayoutWrapper/AuthWrapper'
import AppWrapper from './LayoutWrapper/AppWrapper'

// Core
import Logo from './core/vlLogo'
import MetaNav from './core/vlMetaNav'
import PrimaryNav from './core/vlPrimaryNav'
import TitleNav from './core/vlTitleNav'
import TabNav from './core/vlTabNav'
import Tab from './core/vlTabNav/vlTab'
import Input from './core/vlInput'
import Button from './core/vlButton'
import Section from './core/vlSection'
import Form from './core/vlForm'
import Textarea from './core/vlTextarea'
import Select from './core/vlSelect'
import Modal from './core/vlModal'
import Card from './core/vlCard'
import Panel from './core/vlPanel'
import Box from './core/vlBox'
import Datepicker from './core/vlDatepicker'
import Checkbox from './core/vlCheckbox'
import Radio from './core/vlRadio'
import InputTooltip from './core/vlInputTooltip'

export default {
  install (Vue) {
    Vue.component(AuthWrapper.name, AuthWrapper)
    Vue.component(AppWrapper.name, AppWrapper)
    Vue.component(Logo.name, Logo)
    Vue.component(MetaNav.name, MetaNav)
    Vue.component(PrimaryNav.name, PrimaryNav)
    Vue.component(TitleNav.name, TitleNav)
    Vue.component(TabNav.name, TabNav)
    Vue.component(Tab.name, Tab)
    Vue.component(Input.name, Input)
    Vue.component(Button.name, Button)
    Vue.component(Section.name, Section)
    Vue.component(Form.name, Form)
    Vue.component(Textarea.name, Textarea)
    Vue.component(Select.name, Select)
    Vue.component(Modal.name, Modal)
    Vue.component(Card.name, Card)
    Vue.component(Panel.name, Panel)
    Vue.component(Box.name, Box)
    Vue.component(Datepicker.name, Datepicker)
    Vue.component(Checkbox.name, Checkbox)
    Vue.component(Radio.name, Radio)
    Vue.component(InputTooltip.name, InputTooltip)
  }
}
