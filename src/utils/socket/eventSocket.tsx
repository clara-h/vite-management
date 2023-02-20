/**
 * socket回调方法
 */
interface EventSocket {
  callBackfn: any
  isOnListen: boolean
}

class EventSocket {
  constructor() {
    this.callBackfn = null // 回调方法
    this.isOnListen = false // 是否当前处理监听状态
  }

  set listen(val: any) {
    this.isOnListen = val
  }

  get fn() {
    return this.callBackfn
  }

  set fn(fn) {
    this.callBackfn = fn
  }

  callBack(data: any) {
    if (!this.isOnListen) return
    this.callBackfn && this.callBackfn(data)
  }
}

export { EventSocket }
