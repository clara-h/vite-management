<template>
  <div class="container">
    <div class="head">主页
      <test></test>
    </div>
    <menu class="menu"></menu>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, toRefs, reactive } from 'vue'
// mport menu from '@/components/menu/menu.vue'
const menu = () => import('../../../src/components/menu/menu.vue')


</script>
<style scoped lang='less'>
.container{
  position: relative;
  height: 100%;
  min-height: 100vh;
  .head{
    height: 70px;
    background-color: blue;
  }
  .menu{
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    width: 250px;
    background-color: antiquewhite;
  }
  .content{
    position: absolute;
    top: 70px;
    bottom: 0;
    right: 0;
    left: 250px;
    background-color: aqua;
  }
}
</style>