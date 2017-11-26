// Layouts
import AuthWrapper from './LayoutWrapper/AuthWrapper'
import AppWrapper from './LayoutWrapper/AppWrapper'

// Core
import Logo from './core/vlLogo'
import MetaNav from './core/vlMetaNav'
import PrimaryNav from './core/vlPrimaryNav'
import SecondaryNav from './core/vlSecondaryNav'
import Input from './core/vlInput'
import Button from './core/vlButton'

export default {
  install (Vue) {
    Vue.component(AuthWrapper.name, AuthWrapper)
    Vue.component(AppWrapper.name, AppWrapper)
    Vue.component(Logo.name, Logo)
    Vue.component(MetaNav.name, MetaNav)
    Vue.component(PrimaryNav.name, PrimaryNav)
    Vue.component(SecondaryNav.name, SecondaryNav)
    Vue.component(Input.name, Input)
    Vue.component(Button.name, Button)
  }
}
