import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Report from '@/components/Report'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Write from '@/components/Write'
import Me from '@/components/Me'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Me
    },
    {
      path: '/write',
      name: 'write',
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Write
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Logout
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/report/:kmom',
      name: 'Redovisning',
      component: Report
    }
  ]
})
