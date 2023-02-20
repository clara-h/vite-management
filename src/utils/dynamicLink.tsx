import axios from 'axios'

// 创建动态链接API
const API_BASE_URL = 'https://union.ilot.ng/api'
const URI_API = 'v1/shortLinks?key=AIzaSyBh-2r3Bo6LrpgVyVndmxsplcifE2xTR6k'
const APP_DOWNLOAD_URL = 'https://file.ilot.ng/files/ilot-app-release.apk'

/**
 * @desc  动态链接（基于FireBase Dynamic Link）
 * @author mi
 * @date 2022-03-11
 */
class DynamicLink {
  // 重试最大次数
  retryMaxCount = 3
  // 当前次数
  retryCurrentCount = 0
  instance = axios.create({
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  })

  // 动态链接参数配置
  config = {
    dynamicLinkInfo: {
      domainUriPrefix: 'https://ilotapp.page.link',
      link: `${APP_DOWNLOAD_URL}?type=$key&data=$data`,
      androidInfo: {
        androidPackageName: 'com.ilot.app',
        androidFallbackLink: APP_DOWNLOAD_URL,
      },
      iosInfo: {
        iosBundleId: 'com.ilot.app',
      },
    },
  }

  /**
   * 创建动态链接
   * @param {*} key 参数key
   * @param {*} data 参数值
   * @param {*} callback 回调
   */
  async createLink(key: string, data: any, callback: Function) {
    // 判断重试次数
    if (this.retryCurrentCount >= this.retryMaxCount) {
      return
    }
    this.retryCurrentCount++
    let param = this.config
    let link = param.dynamicLinkInfo.link
    if (typeof data !== 'string') {
      data = JSON.stringify(data)
      console.log('[dynamicLink.js] param is obj', data)
    } else {
      console.log('[dynamicLink.js] param is string')
    }
    link = link.replace('$key', key).replace('$data', data)
    param.dynamicLinkInfo.link = link
    console.log(
      '[dynamicLink.js] sending request: param,retryCurrentCount ',
      param,
      this.retryCurrentCount
    )
    let self = this
    this.instance({
      method: 'post',
      url: `${API_BASE_URL}/${URI_API}`,
      data: param,
    })
      .then(function (res) {
        let status = res.status
        let statusText = res.statusText
        // 获取动态链接
        let shortLink = res.data.shortLink
        console.log('[dynamicLink.js] res :', status, statusText, shortLink)
        if (status === 200) {
          // 回调方法
          callback && callback(shortLink)
        } else {
          // 失败重试
          self.createLink(key, data, callback)
        }
      })
      .catch(function (error) {
        console.log('[dynamicLink.js] error:', error)
        // 异常重试
        self.createLink(key, data, callback)
      })
  }
}

export default new DynamicLink()
