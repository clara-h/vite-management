<template>
   <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180" />
      <el-table-column prop="userName" label="账号" width="180" />
      <el-table-column prop="nickName" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="createTime" label="添加时间" />
      <el-table-column prop="loginTime" label="最后登录时间" />
      <el-table-column prop="status" label="是否启用" />
      <el-table-column prop="address" label="操作" />
  </el-table>
</template>

<script setup lang='ts'>
import { ref, toRefs, reactive, onBeforeMount } from 'vue'
import useCurrentInstance from '@/hooks/useCurrentInstance'
const { globalProp } = useCurrentInstance()


const data = reactive<{
   tableData: {}[]
}>({
   tableData: []
})

const {tableData} = toRefs(data)

// 获取用户列表
const queryUserList = () => {
   const data = {
      pageNum: 1,
      pageSize: 20,
   }
   globalProp.$api.adminList(data).then((res: any) => {
      if(res.code === 0) {
         tableData.value = res.data.list
      }
   })
}

onBeforeMount(() => {
   queryUserList()
})

</script>
<style scoped lang='less'>

</style>