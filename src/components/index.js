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
  }
}
