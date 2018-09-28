import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const components= {
  layout: () => import('@/layout/index'),
  index: () => import('@/views/index'),
  registe: () => import('@/views/registe'),
  write: () => import('@/views/write'),
  read:()=>import('@/views/read'),
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: components.layout,
      children:[
        {
          path:'/',
          component:components.index
        },
        {
          path:'registe',
          component:components.registe
        },
        {
          path:'write',
          component:components.write
        },
        {
          path:'read',
          component:components.read
        },
      ]

    },

  ]
})
