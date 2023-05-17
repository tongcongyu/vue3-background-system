/*
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-01-18 17:12:21
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-05-17 15:12:15
 * @FilePath: \vue3-background-system\src\router\routes\modules\common.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { RouteRecordRaw } from 'vue-router';

// 路由规则
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '',
    // redirect: '/login',
    component: () => import('@/views/mainIndex/index.vue'),
  },
  //   {
  //     path: '/login',
  //     name: 'login',
  //     component: () => import('@/views/mainIndex/index.vue'),
  //   },
];

export default routes;
