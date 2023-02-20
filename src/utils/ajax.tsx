import axios from 'axios'
import mocks from '@/mock'
import store from '@/store'
import rsaUtil from 'ilot-sign'
import { responseHandler, errorHandler } from './ajaxUtils'

const http = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  timeout: 15000,
})

// mock开关
const mockSwitch = false
const isDev = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test'

// 请求拦截器
http.interceptors.request.use(
  function (config: any) {
    // 添加签名
    config.headers['User-Token'] = store.getters.token
    config.headers['Sign'] = rsaUtil.signParams(config.data)
    if (config.data.baseURL) {
      config.baseURL = config.data.baseURL
      delete config.data.baseURL
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    const config = response.config as any
    if (isDev && mockSwitch && mocks[config.url]) {
      return responseHandler(mocks[config.url]())
    } else {
      return responseHandler(response)
    }
  },
  function (error) {
    const { config } = error
    if (isDev && mockSwitch && mocks[config.url]) {
      return responseHandler(mocks[config.url]())
    } else {
      return Promise.reject(errorHandler(error))
    }
  }
)

export default http
