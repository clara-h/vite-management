import qs from 'qs'
import io from 'socket.io-client'

const ws = (path: any, options: any) => {
  return io(
    process.env.VITE_API_SOCKET_URL as any,
    {
      reconnection: true, // 是否自动重新连接
      reconnectionAttempts: Infinity, // 放弃前尝试重新连接的次数
      reconnectionDelay: 1000, // 重连间隔
      reconnectionDelayMax: 5000, // 重新连接之间等待的最大时间。每次尝试都会增加2倍的重联延迟，同时增加随机化因子
      randomizationFactor: 0.5, // 随机因子
      timeout: 20000, // 超时
      autoConnect: true,
      path,
      transports: ['websocket'],
      query: qs.stringify(options.data) as any,
    }
  )
}

export default ws
