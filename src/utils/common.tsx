/*
* common.js
* 说明：定义通用的方法，计算，消息，数据处理等
*/
import moment from 'dayjs'

// 判断是否为空
export function isEmpty(value: any) {
  return [null, undefined, ''].includes(value)
}

// 判断url是否合法
export function checkIsValidUrl (url: string) {
  const reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/
  return reg.test(url)
}

// 判断浏览器类型
export function getBrowser() {
  const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  // 判断是否Opera浏览器 OPR/43.0.2442.991
  if (userAgent.indexOf('OPR') > -1) {
    return 'Opera'
  }
  // 判断是否Firefox浏览器 Firefox/51.0
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF'
  }
  // 判断是否IE浏览器  Trident/7.0 rv:11.0
  if (userAgent.indexOf('Trident') > -1) {
    return 'IE'
  }
  // 判断是否Edge浏览器  Edge/14.14393
  if (userAgent.indexOf('Edge') > -1) {
    return 'Edge'
  }
  // Chrome/56.0.2924.87
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome'
  }
  // 判断是否Safari浏览器 AppleWebKit/534.57.2 Version/5.1.7 Safari/534.57.2
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari'
  }
}

/**
 * 判断当前是否PC端环境
 */
export function isPc() {
  const userAgentInfo = navigator.userAgent
  const Agents = ['Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    'iPad', 'iPod'
  ]
  let flag = true
  for (let i = 0; i < Agents.length; i++) {
    if (userAgentInfo.indexOf(Agents[i]) !== -1) {
      flag = false
      break
    }
  }
  return flag
}

// 获取dom元素的绝对位置(top)
export function getTop(e: any) {
  let posTop = e.offsetTop
  if (e.offsetParent != null) {
    posTop += getTop(e.offsetParent)
  }
  return posTop
}

// 获取指定名称的cookie
export function getCookie(name: any) {
  // 获取cookie字符串
  var strcookie = document.cookie
  // 分割
  var arrcookie = strcookie.split('; ')
  // 遍历匹配
  for (var i = 0; i < arrcookie.length; i++) {
    var arr = arrcookie[i].split('=')
    if (arr[0] === name) {
      return arr[1]
    }
  }
  return ''
}

/**
 * 日期格式转化
 * @param {日期} dateTime 日期
 * @param {格式} format 格式
 * @returns 日期
 */
export function formatDateTime(dateTime: any, format: string) {
  let res = moment(dateTime).format(format)
  if (res === 'Invalid Date') {
    dateTime = replaceDateTime(dateTime)
    res = moment(dateTime).format(format)
  }
  return res
}

// 日期转化，兼容iPhone7以下的老手机出现Invalid Date问题
export function replaceDateTime(dateTime: any) {
  let ua = navigator.userAgent.toLowerCase()
  console.log('[common.js] replaceDateTime.ua', ua)
  // 兼容firefox浏览器
  if (/firefox/i.test(ua)) {
    return dateTime
  }
  console.log('[common.js] replaceDateTime: ', dateTime)
  // 2022-07-10T10:14:12.000+0000 ==> 2022/07/10 10:14:12+0000
  dateTime = dateTime.replace(/-/g, '/').replace(/T/g, ' ').replace(/\.[0-9]{3}/, '')
  console.log('[common.js] replaceDateTime -ok: ', dateTime)
  return dateTime
}

