// Layouts
import AuthWrapper from './LayoutWrapper/AuthWrapper'

// Core
import Logo from './core/vlLogo'

export default {
  install (Vue) {
    Vue.component(AuthWrapper.name, AuthWrapper)
    Vue.component(Logo.name, Logo)
  }
}
