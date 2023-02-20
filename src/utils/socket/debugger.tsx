// 消息数量
(window as any).__message_count = {}

// 初始化socket debugger
export function initSocketDebugger(topic: any) {
  if (!(window as any).__message_count[topic]) {
    (window as any).__message_count[topic] = 0
  }
}

// 开始socket debugger
export function startSocketDebugger(topic: any, data: any) {
  // 打印耗时2秒以上的topic
  const dataObj = JSON.parse(data)
  const now = new Date().getTime()
  const timeDiff = now - dataObj.time
  const iuctDiff = dataObj.iuct ? now - dataObj.iuct : 0
  if (timeDiff >= 2000 || iuctDiff >= 2000) {
    console.log({
      topic,
      timeDiff,
      iuctDiff,
      originData: dataObj,
    })
  }
  // 统计消息数量
  (window as any).__message_count[topic]++
}
