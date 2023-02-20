import ajax from "../request";

export default {
  // 获取用户数据列表
  adminList: (data: any) => ajax.get('/admin/list', { params: data})
}
