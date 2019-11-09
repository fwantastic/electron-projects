import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Tasks from '../views/Tasks.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks,
    props: { filterOption: '' }
  },
  {
    path: '/important',
    name: 'Important',
    component: Tasks,
    props: { filterOption: 'important' }
  },
  {
    path: '/planned',
    name: 'Planned',
    component: Tasks,
    props: { filterOption: 'planned' }
  },
]

const router = new VueRouter({
  routes
})

export default router
