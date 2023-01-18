/*
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-01-18 10:36:06
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-01-18 17:36:25
 * @FilePath: \vue3-background-system\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue';
import './assets/css/index.scss';
import App from './App.vue';
import { setupRouter } from './router';

/**
 * 定义启动初始化函数
 */
const bootstrap = () => {
  const app = createApp(App);

  // 安装初始化路由
  setupRouter(app);

  app.mount('#app');
};

// 启动
bootstrap();
