import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import { App } from 'vue'
import store from '../store'
import Cookies from 'js-cookie'
// createRouter, createWebHashHistory: 方法
// RouteRecordRaw：类型别名
import child from './modules'

const login = () => import("@/views/login/login.vue")

const routes:RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/home/homeIndex.vue'),
  },
  {
    path: '/',
    redirect: {
      path: '/index'
    }
  },
  {
    path: '/',
    component: () => import('@/views/home/homeIndex.vue'),
    children: child
  }
]

interface state {
  base?: base
}

interface base {
  menus: []
}

interface menusItem {
  name: string
}

const router = createRouter({
  history: createWebHashHistory(),
  routes // 路由配置
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 1.token && vuex里面的menus数据为空
  const token = Cookies.get('token')
  let state:state = store.state as state
  // if(!router.hasRoute(to.name as string)) {
  //   next({
  //     path: '/error'
  //   })
  // }
  const allowRouter = ['/index', '/error', '/login']
  if (allowRouter.includes(to.path)) {
    if (to.path !== '/login' && !token){
      next({
        name: 'login'
      })
    } else {
      next()
    }
  }

  if(token && state.base?.menus.length === 0) {
    // 获取用户信息方法
    store.dispatch('getUserInfo').then(() => {
      // setNewRouter()
      next({
        path: to.path
      })
    })
  } else {
    let name = store.getters.getMenusPath[to.fullPath]? store.getters.getMenusPath[to.fullPath].name : ''
    // 判断是否允许访问
    let allow = name && router.hasRoute(name as string)
    if(to.path === '/index' || allow) {
      next()
    } else{
      console.log(to)
      console.log('没有权限')
    }
  }
})

function setNewRouter() {
  // 设置动态路由
  const menus = store.getters.getNewMenu
  // 循环菜单对象
  for(let key in menus) {
    let obj:RouteRecordRaw = {
      path: `/${menus[key].name}`,
      name: menus[key].name,
      component: () => import('../views/home/homeIndex.vue'),
      children: []
    }
    let arr = menus[key].child || []
    if(arr.length > 0) {
      arr.forEach((val: menusItem) => {
        let childObj = {
          path: val.name,
          name: val.name,
          component: () => import(`../views/${menus[key].name}/${val.name}.vue`),
        }
        obj.children?.push(childObj)
      })
    }
    // 动态添加路由
    router.addRoute(obj)
  }
  console.log(router)
}

export const initRouter = (app: App<Element>) => {
  app.use(router)
}

// export default router // 默认导出：只能有一个，使用时不用{}

/**
 * vue2 路由设置
 */
// import VueRouter from 'vue-router'
// import Vue from 'vue'
// Vue.use(VueRouter)
// Vue2 use : 调用的就是参数上的install方法，或者是直接调用参数。Vue.prototype.$router/$route