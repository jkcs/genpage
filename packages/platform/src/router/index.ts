import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      name: 'index',
      path: '/index',
      component: () => import(/* webpackChunkName: "index" */ '@/views/index/index.vue')
    },
    {
      name: 'h5',
      path: '/h5',
      component: () => import(/* webpackChunkName: "h5" */ '@/views/h5/index.vue')
    }
  ]
})
