<!--
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-01-18 17:20:07
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-02-01 11:26:19
 * @FilePath: \vue3-background-system\src\views\main\main.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="layout">
    <Layout class="main">
      <Header class="header-con">
        <div class="head-right">
          <p style="float: left; color: white">{{ currentUser }}</p>
          <user style="float: left; margin-left: 8px"></user>
        </div>
      </Header>
      <Layout class="layout-sider">
        <Sider class="left-sider" breakpoint="md" hide-trigger>
          <side-menu :menuList="leftMenu" :flatMenu="flatMenu"></side-menu>
        </Sider>

        <Layout :style="{ padding: '5px 10px' }">
          <Breadcrumb class="breadcrumb-class">
            <BreadcrumbItem>
              <span class="icon iconfont icon-computer" style="margin-right: 5px"></span>
              {{ breadActiveName }}
            </BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{ minHeight: '280px', background: '#fff' }">
            <div class="content">
              <router-view :key="$route.fullPath"></router-view>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script lang="ts" setup>
import { useMenuFlagStore } from '@/store';
import { useGet } from '@/utils/http/axios';
import { dealMenu } from '@/utils/menu/dealMenu';
import user from './user.vue';
import sideMenu from './side-menu.vue';
// pinia
const menuFlagStore = useMenuFlagStore();

// 树形结构，菜单经过处理以后的，实际的菜单需要的结构
const leftMenu = ref<Array<any>>([]);
// 扁平菜单，接口直接返回的，用于查找菜单
const flatMenu = ref<Array<any>>([]);
// 当前登录用户
const currentUser = ref<string>('');
// 当前页面面包屑
const breadActiveName = ref<string>('首页');
onMounted(() => {
  getCurrentUserInfo();
  getUerMenu();
});
// 获取当前用户名
function getCurrentUserInfo() {
  useGet('/api/user/current', {}).then((res: any) => {
    if (res.data) {
      currentUser.value = res.data.userName || '';
    }
  });
}
// 获取用户菜单
function getUerMenu() {
  useGet('/api/v1/menu/loadUserMenu', {}).then((res: any) => {
    if (res.data) {
      const resData = res.data;
      flatMenu.value = resData;
      //   处理成树形结构
      const menuArr = dealMenu(resData);
      leftMenu.value = menuArr;
      //   初始化菜单状态
      menuFlagStore.updateMenuFlag(false);
      console.log(leftMenu.value, '用户菜单');
    }
  });
}
</script>
<style lang="scss" scoped>
.layout {
  height: 100%;
  width: 100%;
  .main {
    width: 100%;
    height: 100%;
    .header-con {
      // background: blue;
      .head-right {
        float: right;
        > p {
          cursor: pointer;
        }
      }
    }
    .layout-sider {
      overflow: hidden;
      .left-sider {
        width: 240px !important;
        min-width: 200px !important;
        max-width: 240px !important;
        height: 100%;
        background: #fff;
        overflow: auto;
      }
      .breadcrumb-class {
        padding: 10px 0;
      }
      .content {
        width: 100%;
        height: 100%;
        overflow-y: auto;
      }
    }
  }
}
</style>
