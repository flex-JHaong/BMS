import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
Vue.use(VueRouter)
var routes = [
  {
    path: '/',
    component: () => import('../components/Home.vue'),
    meta: { select: '/index' },
    redirect:'/index',
    children: [
      {
          path: '/index',
          component: () => import('../components/view/Index.vue'),
          meta: { select: '/index' },
      },
      {
        path: '/menu',
        meta: { select: '/menu' },
        component: () => import('../components/view/Menu.vue')
      },
      {
        path: '/menu/add',
        meta: { select: '/menu' },
        component: () => import('../components/view/MenuChange.vue')
      },
      {
        path: '/menu/:id',
        meta: { select: '/menu' },
        component: () => import('../components/view/MenuChange.vue')
      },
      {
        path: '/user',
        meta: { select: '/user' },
        component: () => import('../components/view/User.vue')
      },
      {
        path: '/user/add',
        meta: { select: '/user' },
        component: () => import('../components/view/UserChange.vue')
      },
      {
        path: '/user/:uid',
        meta: { select: '/user' },
        component: () => import('../components/view/UserChange.vue')
      },
      {
        path: '/role',
        meta: { select: '/role' },
        component: () => import('../components/view/Role.vue')
      },
      {
        path: '/role/add',
        meta: { select: '/role' },
        component: () => import('../components/view/RoleChange.vue')
      },
      {
        path: '/role/:id',
        meta: { select: '/role' },
        component: () => import('../components/view/RoleChange.vue')
      },
      {
        path: '/category',
        meta: { select: '/category' },
        component: () => import('../components/view/Category.vue')
      },
      {
        path: '/category/add',
        meta: { select: '/category' },
        component: () => import('../components/view/CategoryChange.vue')
      },
      {
        path: '/category/:id',
        meta: { select: '/category' },
        component: () => import('../components/view/CategoryChange.vue')
      },
      {
        path: '/specs',
        meta: { select: '/specs' },
        component: () => import('../components/view/Specs.vue')
      },
      {
        path: '/specs/add',
        meta: { select: '/specs' },
        component: () => import('../components/view/SpecsChange.vue')
      },
      {
        path: '/specs/:id',
        meta: { select: '/specs' },
        component: () => import('../components/view/SpecsChange.vue')
      },
      {
        path: '/goods',
        meta: { select: '/goods' },
        component: () => import('../components/view/Goods.vue')
      },
      {
        path: '/goods/add',
        meta: { select: '/goods' },
        component: () => import('../components/view/GoodsChange.vue')
      },
      {
        path: '/goods/:id',
        meta: { select: '/goods' },
        component: () => import('../components/view/GoodsChange.vue')
      },
      {
        path: '/member',
        meta: { select: '/member' },
        component: () => import('../components/view/Member.vue')
      },
      {
        path: '/member/:uid',
        meta: { select: '/member' },
        component: () => import('../components/view/MemberChange.vue')
      },
      {
        path: '/banner',
        meta: { select: '/banner' },
        component: () => import('../components/view/Banner.vue')
      },
      {
        path: '/banner/add',
        meta: { select: '/banner' },
        component: () => import('../components/view/BannerChange.vue')
      },
      {
        path: '/banner/:id',
        meta: { select: '/banner' },
        component: () => import('../components/view/BannerChange.vue')
      },
      {
        path: '/seckill',
        meta: { select: '/seckill' },
        component: () => import('../components/view/Seckill.vue')
      },
      {
        path: '/seckill/add',
        meta: { select: '/seckill' },
        component: () => import('../components/view/SeckillChange.vue')
      },
      {
        path: '/seckill/:id',
        meta: { select: '/seckill' },
        component: () => import('../components/view/SeckillChange.vue')
      },
    ]
  },
  {
    path: '/login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

var router = new VueRouter({ routes, mode: 'history' })
//全局守卫
router.beforeEach((to, from, next) => {
  //  如果进入登录页面，直接进入就可以
  if (to.path == "/login") {
    next();
    return
  }
  // 判断有没有用户信息
  if (!store.getters.userinfo) {
    next('/login')
  }
  next()
})

export default router