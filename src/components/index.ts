/*
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-02-01 14:05:25
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-02-01 14:06:50
 * @FilePath: \vue3-background-system\src\components\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { App, Component } from 'vue';

interface FileType {
  [key: string]: Component;
}

interface ComponentItem {
  name: string;
  sfc: Component;
}

const componentList: ComponentItem[] = [];
const modules: Record<string, FileType> = import.meta.globEager('./src/**/*.vue');
Object.keys(modules).forEach((c: string) => {
  const component = modules[c]?.default;
  const componentName = (c.split('/').pop() as any).split('.vue')[0];
  componentList.push({ name: componentName, sfc: component });
});
export default function installComponents(app: App) {
  // 注册自定义组件
  componentList.forEach((component) => {
    app.component(component.name, component.sfc);
  });
}
