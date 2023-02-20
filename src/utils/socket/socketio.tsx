import api from '@/apis'
// import { getStore } from '@/store'
import { EventSocket } from './eventSocket'
import { initSocketDebugger, startSocketDebugger } from './debugger'

interface WebSocketClass {
  blInit: boolean // 初始化状态
  instance: any // socket实例
  blDestory: boolean // socket销毁状态
  eventObj: any // 事件对象（记录链接的事件）
  defaultConfig: any // 初始化配置
  status: any
}

/**
 * 全局socket处理
 */
class WebSocketClass {
  constructor() {
    this.blInit = false // 初始化状态
    this.instance = null // socket实例
    this.blDestory = false // socket销毁状态
    this.eventObj = {} // 事件对象（记录链接的事件）
    this.defaultConfig = { // 初始化配置
      removeGroups: 'all',
      userToken: ''
    }
    this.connect()
  }

  connect() {
    this.instance = (api as any).socketio() // 开始链接
    this.initListen() // 初始化监听
  }

  initListen() {
    this.instance.onopen = (e: any) => { // 监听成功状态
      this.status = 'open'
    }

    this.instance.on('error', (error: any) => { // 监听失败状态
      console.log('[socketIO.js]error', error)
    })

    this.instance.on('connect', (data: any) => { // 监听链接状态
      let obj = {
        groups: 'g',
        userToken: ''
      }

      // 发送消息给服务端订阅主题可用于初始化数据
      // this.emit('sport_global_topic_v2', obj, function (data) {
      //   getStore().commit('SET_GLOBALFLAG', JSON.parse(data).data.up)
      // })

      // 重新订阅（针对IP变化的）
      if (this.blInit) {
        for (const objKey in this.eventObj) {
          if (this.eventObj.hasOwnProperty(objKey)) {
            this.emit(this.eventObj[objKey].event, this.eventObj[objKey].obj, this.eventObj[objKey].fn, this.eventObj[objKey].type)
          }
        }
      }
      // 修改初始化状态
      this.blInit = true
    })
  }

  /**
   * 监听事件
   * @params event 事件名
   * @params obj 事件参数
   * @params fn 回调函数
   * @params type 同一事件名回调区分字段
   */
  emit(event: any, obj: any, fn: any, type = '') {
    initSocketDebugger(event)
    if (this.blDestory) return // 销毁后，所有监听全部拒绝
    const key = event + type // 对于同一事件，不同地方的监听，记录不同的回调key
    if (!this.eventObj[key]) {
      this.eventObj[key] = new EventSocket() // 初始化回调函数
    }

    if (typeof obj !== 'string') { // 非string类型参数转为string
      try {
        obj = JSON.stringify(obj)
      } catch (err) {}
    }
    this.instance.emit(event, obj, function (data: any) { // 调用socket实例发起监听
      // 链接成功后保存传的数据
      let socketObj = {
        name: event,
        obj: obj
      }
      // getStore().commit('SET_SOCKETDATA', socketObj)
    })


    this.on(event, key) // 监听回调

    this.eventObj[key].event = event
    this.eventObj[key].obj = obj
    this.eventObj[key].type = type
    this.eventObj[key].listen = true
    this.eventObj[key].fn = fn // 重置回调方法
  }

  /**
   * 回调触发
   * @params event 事件名
   * @params key 回调函数存储的key
   */
  on(event: any, key: any) {
    if (!this.eventObj[key].fn) { // 未配置回调（初次建立event连接）
      // 接受返回数据
      this.instance.on(event, (data: any) => {
        this.eventObj[key].callBack(data)
        startSocketDebugger(event, data)
      })
    }
  }


  /**
   * 断开监听
   * @params event 事件名
   * @params type 同一事件名回调区分字段
   * @params config 配置参数
   */
  off(event: any, type = '', config: any) {
    if (this.eventObj[event + type]) {
      this.eventObj[event + type].listen = false
    }
    this.instance.emit(event, JSON.stringify(config || this.defaultConfig))
  }

  /**
   * 销毁socket
   */
  destory() {
    this.blDestory = true
    for (const objKey in this.eventObj) {
      if (this.eventObj.hasOwnProperty(objKey)) {
        (this as any).off(this.eventObj[objKey].event)
      }
    }
  }
}
const socket = new WebSocketClass()

export {
  socket
}
