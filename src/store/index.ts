import { createStore } from 'vuex'
import {App} from 'vue'

import modules from './modules'

const store = createStore({
  state() {
    return {
    }
  },
  getters: {
  },
  mutations: {},
  actions: {
  },
  modules
})

export const initStore = (app: App<Element>) => {
  app.use(store)
}

export default store;