/*
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-01-18 10:36:06
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-02-01 14:15:01
 * @FilePath: \vue3-background-system\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue';
import './assets/css/index.scss';
import ViewUIPlus from 'view-ui-plus';
import { Message, Modal } from 'view-ui-plus';
import 'view-ui-plus/dist/styles/viewuiplus.css';
import { createPinia } from 'pinia';
import installComponents from '@/components/index';
// 挂载pinia
const pinia = createPinia();
import App from './App.vue';
// 挂载路由
import { setupRouter } from './router';
/**
 * 定义启动初始化函数
 */
const bootstrap = () => {
  const app = createApp(App);
  // 注册组件
  installComponents(app);
  // 安装初始化路由
  setupRouter(app);
  app.use(pinia);
  app.use(ViewUIPlus);
  app.mount('#app');
};
// 挂载message方法到全局
window.$message = Message;
window.$modal = Modal;
// 启动
bootstrap();
