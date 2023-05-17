<!--
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-04-18 11:47:24
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-05-15 10:26:40
 * @FilePath: \四川省GA厅NCMS机房可视化\src\components\src\server.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="server" :style="`height:${13 * uSite}px;margin:${uSite - 1}px 0`">
    <div></div>
    <div></div>
    <div></div>
    <div v-if="uSite > 1" class="split-line">
      <div v-for="item in uSite - 1" :key="item"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    uSite: number;
  }>(),
  {
    uSite: 1,
  }
);
</script>
<style lang="scss" scoped>
.server {
  width: 100px;
  //   height: 15px;
  border: 2px solid #545c5e;
  display: flex;
  position: relative;
  > div:nth-of-type(1) {
    height: 100%;
    width: 11px;
    background: #e5e5e5;
    margin-left: 3px;
    z-index: 99;
  }
  > div:nth-of-type(2) {
    height: 100%;
    width: 16px;
    background: #6ec0d4;
    margin-left: 20px;
    z-index: 99;
  }
  > div:nth-of-type(3) {
    height: 100%;
    width: 5px;
    background: #e5e5e5;
    margin-left: 5px;
    z-index: 99;
  }
  .split-line {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column-reverse;
    padding: 3px 0;
    > div {
      width: 100%;
      height: 3px;
      background: #555c5f;
    }
  }
}
</style>
