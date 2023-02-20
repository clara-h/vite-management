<template>
   <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="编号" width="180" />
      <el-table-column prop="name" label="账号" width="180" />
      <el-table-column prop="address" label="姓名" />
      <el-table-column prop="address" label="邮箱" />
      <el-table-column prop="address" label="添加时间" />
      <el-table-column prop="address" label="最后登录时间" />
      <el-table-column prop="address" label="是否启用" />
      <el-table-column prop="address" label="操作" />
  </el-table>
</template>

<script setup lang='ts'>
import { ref, toRefs, reactive } from 'vue'

const data = reactive({
   tableData: []
})

const {tableData} = toRefs(data)

</script>
<style scoped lang='less'>

</style>