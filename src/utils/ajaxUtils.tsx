import store from '@/store'

// 响应处理
export function responseHandler(res: any) {
  if (res.data.code !== 0 && res.data.msg) {
    // ElMessage.error(res.data.msg)

    // 登录态失效
    if (res.data.code === 20018) {
      store.commit('SET_IS_LOGIN', false)
      location.href = '/login'
    }
  }

  return res
}

// 错误处理
export function errorHandler(error: any) {
  if (error && error.stack) {
    // ElMessage.error(JSON.stringify(error.stack))
  }

  return error
}
