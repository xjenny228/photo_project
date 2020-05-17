import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '@/components/Register'
import Welcome from '@/components/Welcome'
import Center from '@/components/Center'
import Album from '@/components/Album'
import Recycler from '@/components/Recycler'
import Home from '@/components/Home'

Vue.use(VueRouter)
const router = new VueRouter({
  routes:[
    // 配置路由路径
  {
    path: '/user/login',
    component: Login
  },
  {
    path: '/user/register',
    component: Register
  },
  {
    path: '/user/welcome',
    redirect: '/user/home',
    component: Welcome,
    children:[
      {path: '/user/home',
        component: Home },
      {path: '/user/center',
        component: Center },
    {path: '/user/album',
      component: Album },
    {path: '/user/recycler',
      component: Recycler },
    ]
  },
  // 重定位
  {
    path: '/',
    redirect: '/user/login'
  }
]
})
//路由拦截器
router.beforeEach((to,from,next) => {
  if(to.path==='/user/login' ) return next()
  if(to.path==='/user/register' ) return next()
  //获取token
  const tokenStr=window.$cookies.get('token')
  if(!tokenStr) return next('/user/login')
  next()
})
export default router
