// Layouts
import AuthWrapper from './LayoutWrapper/AuthWrapper'
import AppWrapper from './LayoutWrapper/AppWrapper'

// Core
import Logo from './core/vlLogo'
import MetaNav from './core/vlMetaNav'
import PrimaryNav from './core/vlPrimaryNav'

export default {
  install (Vue) {
    Vue.component(AuthWrapper.name, AuthWrapper)
    Vue.component(AppWrapper.name, AppWrapper)
    Vue.component(Logo.name, Logo)
    Vue.component(MetaNav.name, MetaNav)
    Vue.component(PrimaryNav.name, PrimaryNav)
  }
}
