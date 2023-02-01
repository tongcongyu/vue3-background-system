<!--
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-02-01 09:50:45
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-02-01 11:37:18
 * @FilePath: \vue3-background-system\src\views\main\side-menu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="side-menu">
    <Menu
      width="auto"
      :accordion="true"
      :active-name="activeName"
      :open-names="openedNames"
      @on-select="handleSelect"
      v-if="menuList.length > 0"
    >
      <template v-for="(item, index) in menuList">
        <!-- 二级菜单 -->
        <Submenu :name="item.id" v-if="item.children && item.children.length > 0" :key="index">
          <template v-slot:title>
            <Icon :type="item.icon || 'ios-flower'" />
            {{ item.name }}
          </template>
          <MenuItem :name="el.id" v-for="(el, elIndex) in item.children" :key="elIndex">
            <Icon :type="el.icon || 'ios-flower'" />
            {{ el.name }}
          </MenuItem>
        </Submenu>
        <!-- 一级菜单 -->
        <MenuItem :name="item.id" :key="'MenuItem' + index" v-else>
          <Icon :type="item.icon || 'ios-flower'" />
          {{ item.name }}
        </MenuItem>
      </template>
    </Menu>
  </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const prop = defineProps<{
  flatMenu: any;
  menuList: any;
}>();
const activeName = ref<number>(0);
const openedNames = ref<Array<any>>([]);
function handleSelect(val) {
  const url = prop.flatMenu.find((item) => {
    return item.id == val;
  }).url;
  if (url) {
    router.push(url);
  }
}
//   同时监听路由和扁平化菜单实现activeName
watch(
  () => route,
  () => {
    console.log('当前路由————', route.fullPath);
    setLeftActive(route);
  },
  {
    deep: true,
    immediate: true,
  }
);
watch(
  () => prop.flatMenu,
  () => {
    setLeftActive(route);
  },
  {
    deep: true,
    immediate: true,
  }
);
// 设计当前激活菜单
function setLeftActive(newVal) {
  let indexUrl = newVal.fullPath;
  const item = prop.flatMenu.find((item) => {
    return item.url == indexUrl;
  });
  if (item) {
    activeName.value = item.id;
    if (!item.parentId) {
      openedNames.value = [item.id];
    } else {
      openedNames.value = [item.parentId];
    }
  }
}
</script>
<style lang="scss" scoped>
.side-menu {
  width: 100%;
  height: 100%;
  div,
  span {
    caret-color: transparent;
  }
}
</style>
