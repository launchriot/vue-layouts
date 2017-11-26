import Vue from 'vue'
import Router from 'vue-router'
import LogIn from '@/components/LogIn/index'
import Dashboard from '@/components/Dashboard/index'
import Projects from '@/components/Projects/index'
import WebProjects from '@/components/Projects/web'
import MobileProjects from '@/components/Projects/mobile'
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
      meta: {appLayout: true},
      children: [
        {
          path: '/projects/web',
          name: 'Web Projects',
          component: WebProjects,
          meta: {appLayout: true, parent: '/projects'}
        },
        {
          path: '/projects/mobile',
          name: 'Mobile Projects',
          component: MobileProjects,
          parent: '/projects',
          meta: {appLayout: true, parent: '/projects'}
        }
      ]
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
