import Vue from 'vue'
import Router from 'vue-router'
import LogIn from '@/components/LogIn'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogIn,
      meta: {authLayout: true}
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {appLayout: true}
    }
  ]
})
