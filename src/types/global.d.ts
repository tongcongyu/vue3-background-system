/*
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-01-19 11:50:24
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-01-31 17:00:05
 * @FilePath: \vue3-background-system\src\typings\global.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Window {
  $pinia?: import('pinia').Pinia;
  $message?: alert;
  $router?: any;
  $modal?: any;
}
/** env环境类型 */
declare type EnvType = 'dev' | 'test' | 'prod';
interface ImportMetaEnv {
  /** 项目基本地址 */
  readonly VITE_BASE_URL: string;
  /** 项目代理名称 */
  readonly VITE_APP_PROXY_NAME: string;
  /** 项目名称 */
  readonly VITE_APP_NAME: string;
  /** 项目标题 */
  readonly VITE_APP_TITLE: string;
  /** 项目描述 */
  readonly VITE_APP_DESC: string;
  /** 开发启动的服务端口号 */
  readonly VITE_SERVER_PORT: string;
  /** vite环境类型 */
  readonly VITE_ENV_TYPE?: EnvType;
  /** 开启请求代理 */
  readonly VITE_HTTP_PROXY?: 'true' | 'false';
  /** 是否开启打包文件大小结果分析 */
  readonly VITE_VISUALIZER?: 'true' | 'false';
  /** hash路由模式 */
  readonly VITE_HASH_ROUTE?: 'true' | 'false';
}
