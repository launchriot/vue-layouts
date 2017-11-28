import Vue from 'vue'
import Router from 'vue-router'
import { routerHistory, writeHistory } from 'vue-router-back-button'
import LogIn from '@/components/LogIn/index'
import Dashboard from '@/components/Dashboard/index'
import Projects from '@/components/Projects/index'
import WebProjects from '@/components/Projects/web'
import MobileProjects from '@/components/Projects/mobile'
import NewProject from '@/components/Projects/new'
import Reports from '@/components/Reports/index'
import Team from '@/components/Team/index'
import Admin from '@/components/Admin/index'
import Company from '@/components/Admin/company'
import Billing from '@/components/Admin/billing'

Vue.use(Router)
Vue.use(routerHistory)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Log In',
      component: LogIn,
      meta: {authLayout: true, theme: 'default'}
    },
    {
      path: '/login',
      name: 'Log In',
      component: LogIn,
      meta: {authLayout: true, theme: 'default'}
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {appLayout: true, theme: 'default'}
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
      meta: {appLayout: true, theme: 'default'},
      children: [
        {
          path: 'web',
          name: 'Web Projects',
          component: WebProjects,
          meta: {appLayout: true, theme: 'default', parent: 'projects'}
        },
        {
          path: 'mobile',
          name: 'Mobile Projects',
          component: MobileProjects,
          meta: {appLayout: true, theme: 'default', parent: 'projects'}
        },
        {
          path: 'new',
          name: 'New Project',
          component: NewProject,
          meta: {focusLayout: true, theme: 'default', parent: 'projects'}
        }
      ]
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports,
      meta: {appLayout: true, theme: 'default'}
    },
    {
      path: '/team',
      name: 'Team',
      component: Team,
      meta: {appLayout: true, theme: 'default'}
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {appLayout: true, theme: 'apple'},
      children: [
        {
          path: '/admin/company',
          name: 'Company',
          component: Company,
          meta: {appLayout: true, theme: 'apple', parent: '/admin'}
        },
        {
          path: '/admin/billing',
          name: 'Billing',
          component: Billing,
          meta: {appLayout: true, theme: 'apple', parent: '/admin'}
        }
      ]
    }
  ]
})

router.afterEach(writeHistory)

export default router
