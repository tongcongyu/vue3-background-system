/*
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-01-18 17:08:37
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-01-18 17:10:16
 * @FilePath: \vue3-background-system\src\router\routes\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { RouteRecordRaw } from 'vue-router';

// 获取modules中的路由规则
// https://cn.vitejs.dev/guide/features.html#glob-import
const modules: any = import.meta.globEager('./modules/**/*.ts');
// modules routes
const routes: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const modulesRoutes = modules[key].default || {};

  let modRoutesList: any = [];
  if (Array.isArray(modulesRoutes)) {
    modRoutesList = [...modulesRoutes];
  } else {
    modRoutesList = [modulesRoutes];
  }

  routes.push(...modRoutesList);
});

// 根目录
const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'root',
  redirect: '/home',
};

// 404页面
const notFoundPage: RouteRecordRaw = {
  // vue-router@4的变化，舍弃*通配符
  // 官方文档：https://next.router.vuejs.org/zh/guide/migration/index.html#%E5%88%A0%E9%99%A4%E4%BA%86-%EF%BC%88%E6%98%9F%E6%A0%87%E6%88%96%E9%80%9A%E9%85%8D%E7%AC%A6%EF%BC%89%E8%B7%AF%E7%94%B1
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import('@/views/common/404Page.vue'),
};

export default [rootRoute, ...routes, notFoundPage];
