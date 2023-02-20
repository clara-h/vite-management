import ajax from "../request";

interface loginData {
  username: string;
  password: string;
}

// 定义所有的返回类型
type PromiseRes<T> = Promise<adminResult<T>>

interface adminResult<T = {}> {
  code: number;
  data: T;
  message: string
}

// 登陆返回接口
interface loginRes {
  token: string
}

// 用户信息返回接口
interface infoRes {
  menus: []
}

export default {
  // 登陆
  loginApi: (data: loginData):PromiseRes<loginRes> => ajax.post('/login', data),
  // 获取用户信息
  userInfoApi: ():PromiseRes<infoRes> => ajax.get('/info'),
}