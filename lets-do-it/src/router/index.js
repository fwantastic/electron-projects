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
    props: { filterOption: { type: '' } }
  },
  {
    path: '/important',
    name: 'Important',
    component: Tasks,
    props: { filterOption: { type: 'important' } }
  },
  {
    path: '/planned',
    name: 'Planned',
    component: Tasks,
    props: { filterOption: { type: 'planned' } }
  },
  {
    path: '/tasklist',
    name: 'TaskList',
    component: Tasks,
    // maps query params as props
    props: (route) => ({ filterOption: { type: 'taskList', taskListName: route.query.taskListName } })
  },
]

const router = new VueRouter({
  routes
})

export default router
