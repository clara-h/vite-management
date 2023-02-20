import axios from 'axios'
import Cookies from 'js-cookie'

const ajax = axios.create({
  baseURL: 'http://127.0.0.1:4523/m1/2225282-0-default/admin',
  timeout: 15000, // 响应时间
})

// 拦截器
// 请求拦截器
ajax.interceptors.request.use(config => {
  let token = Cookies.get('token')
  if (token) {
    // config.headers = {
    //   Authorization: token
    // }
    // config.headers = config.headers || {}
    config.headers.Authorization = token
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
ajax.interceptors.response.use( result => {
  return result.data
}, err => {
  return Promise.reject(err)
})

export default ajax