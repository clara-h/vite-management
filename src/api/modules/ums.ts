import ajax from "../request";

// 当前用户信息
interface adminListParams {
  keyword?: string;
  pageNum: number;
  pageSize: number;
}

export default {
  // 获取用户数据列表
  adminList: (data: adminListParams) => ajax.post('/users/list', { params: data})
}
