<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    :unique-opened="true"
    :router="true"
  >
    <el-sub-menu :index="index+''" v-for="item,index in newMenus" :key="item.id">
      <template #title>
        <span>{{ item.title }}</span>
      </template>
      <el-menu-item :index="'/' + item.name + '/' + child.name" v-for="child in item.child" :key="child.id">{{ child.title }}</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang='ts'>
import { ref, toRefs, reactive, computed } from 'vue'
import {useStore } from 'vuex'
const store = useStore()
interface MenuObj {
  parentId: number,
  id: number,
  title: string,
  hidden: number,
  name: string,
  child?: MenuObj[]
}

interface newMenu {
  [key: number]: MenuObj,
}
const newMenus = computed<newMenu>(() => store.getters.getNewMenu)
console.log(newMenus)

</script>
<style scoped lang='less'>

</style>