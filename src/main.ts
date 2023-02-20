import { createApp } from 'vue'
// import './assets/style/base.less'
import App from './App.vue'
import { initRouter } from './router'
import { initStore } from './store'
import i18n from './locals'

/**
 * 第一种写法
 */
// createApp(App).use(router).mount('#app')

/**
 * 第二种写法，在router中配置
 */
const app = createApp(App)
// app.use(router)
// 初始化路由
initRouter(app)
// 初始化vuex
initStore(app)
app.use(i18n)
app.mount('#app')