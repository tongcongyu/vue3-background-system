/*
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-01-18 13:48:59
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-05-17 15:56:12
 * @FilePath: \vue3-background-system\src\env.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
/** env环境类型 */
type EnvType = 'dev' | 'test' | 'prod';
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  /** vite环境类型 */
  readonly VITE_ENV_TYPE?: EnvType;
}
