/*
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-01-19 14:50:07
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-02-01 09:42:16
 * @FilePath: \vue3-background-system\src\store\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia';

// 创建store,命名规则： useXxxxStore
// 参数1：store的唯一表示
// 参数2：对象，可以提供state actions getters
const useMenuFlagStore = defineStore('counter', {
  state: () => {
    return {
      menuFlag: false,
    };
  },
  getters: {},
  actions: {
    updateMenuFlag(flag: boolean) {
      console.error('改变菜单状态---', flag);
      this.menuFlag = flag;
    },
  },
});
//导出pinia
export { useMenuFlagStore };
