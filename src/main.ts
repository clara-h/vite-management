import { createApp } from 'vue'
// import './assets/style/base.less'
import App from './App.vue'
import { initRouter } from './router'
import { initStore } from './store'
import i18n from './locals'
import api from './api/api'

/**
 * 第一种写法
 */
// createApp(App).use(router).mount('#app')

/**
 * 第二种写法，在router中配置
 */
const app = createApp(App)

// 定义全局属性
app.config.globalProperties.$api = api

// app.use(router)
// 初始化路由
initRouter(app)
// 初始化vuex
initStore(app)
app.use(i18n)
app.mount('#app')