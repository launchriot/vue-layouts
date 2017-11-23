import Vue from 'vue'
import Router from 'vue-router'
import LogIn from '@/components/LogIn/index'
import Dashboard from '@/components/Dashboard/index'
import Projects from '@/components/Projects/index'
import Reports from '@/components/Reports/index'
import Team from '@/components/Team/index'
import Admin from '@/components/Admin/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Log In',
      component: LogIn,
      meta: {authLayout: true}
    },
    {
      path: '/login',
      name: 'Log In',
      component: LogIn,
      meta: {authLayout: true}
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {appLayout: true}
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
      meta: {appLayout: true}
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports,
      meta: {appLayout: true}
    },
    {
      path: '/team',
      name: 'Team',
      component: Team,
      meta: {appLayout: true}
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {appLayout: true}
    }
  ]
})
