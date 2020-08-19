import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/home'

const originalPush = VueRouter.prototype.push

// 处理路由跳转会报错的问题
VueRouter.prototype.push = function push(...rest) {
  return originalPush.apply(this, rest).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "home"
  },
  {
    path: '/home',
    name: 'Home',
    redirect: "home/main",
    component: Home,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: "main",
        name: "home_main",
        component: () => import("@/views/home-tab"),
        meta: {
          title: '首页主內容'
        }
      },
      {
        path: "search",
        name: "home_search",
        component: () => import("@/views/search-tab"),
        meta: {
          title: '首页-查找',
          transitionName: 'van-fade'
        }
      }
    ]
  },
  {
    path: '/RankPage/:id',
    name: 'RankPage',
    component: () => import('@/views/rank-page'),
    meta: {
      title: '榜內歌單'
    }
  },
  {
    path: '/no-permission',
    name: 'NoPermission',
    component: () => import('@/views/error-page/no-permission'),
    meta: {
      title: '访问无权限'
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/error-page/404'),
    meta: {
      title: '页面走丢了'
    }
  }
]

const router = new VueRouter({
  routes,
  // 页面滚动行为
  scrollBehavior(/* to, from, savedPosition */) {
    return {
      x: 0,
      y: 0
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
