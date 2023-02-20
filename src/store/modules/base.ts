interface MenuObj {
  parentId: number,
  id: number,
  child?: MenuObj[],
  name: string
}

interface State {
  menus: MenuObj[]
}

interface newMenu {
  [key: number | string]: MenuObj,
}

import api from '@/api/api'
import { Commit } from 'vuex'

interface obj{
  commit: Commit
}

export default {
  name: 'base',

  state: {
    menus: []
  },

  getters: {
    getNewMenu(state: State) {
      // 获取旧的菜单
      let newMenu:newMenu = {}
      let menus = state.menus
      menus.forEach(val => {
        if(val.parentId === 0 ) {
          // 一级菜单
          newMenu[val.id] = {
            ...val,
            child: newMenu[val.id]?.child || []
          }
        } else {
          // 二级菜单
          newMenu[val.parentId] = newMenu[val.parentId] || {}
          newMenu[val.parentId].child = newMenu[val.parentId].child || []
          newMenu[val.parentId].child?.push(val)
        }
      })
      console.log(newMenu)
      return newMenu
    },
    // 获取权限路由名称
    getMenusPath(state: State) {
      let menus = state.menus
      let nameData:MenuObj[]= []
      let first:newMenu = {}
      let allPath:newMenu = {}
      menus.forEach( val => {
        if(val.parentId === 0 ) {
          first[val.id] = {
            ...val
          }
        }
        if(val.parentId !== 0) {
          nameData.push(val)
        }
      })
      nameData.forEach(val => {
        if(first[val.parentId]) {
          const path = `/${first[val.parentId].name}/${val.name}`
          allPath[path] = {
            ...val
          }
        }
      })
      return allPath
    }
  },

  mutations: {
    // 设置menus数据
    UPDATE_MENUS(state: { menus: MenuObj[] }, data: MenuObj[]) {
      state.menus = data
    }
  },

  actions: {
    // 获取用户信息方法
    getUserInfo(store:obj) {
      return new Promise((resolve, reject) => {
        api.userInfoApi().then((res: any)=> {
          if(res.code === 200) {
            store.commit('UPDATE_MENUS', res.data.menus)
            resolve(res.data)
          } else {
            reject(res)
          }
        })
      })
    }
  }
}


