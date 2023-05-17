/*
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-04-13 14:53:31
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-05-16 15:17:39
 * @FilePath: \四川省GA厅NCMS机房可视化\src\request\url.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 是否开启mock数据
 */
const isMock = false;
/**
 * 接口i请求地址
 */
const httpUrl = {
  development: {
    base_url: 'http://10.88.44.37:8848',
  },
  production: {
    base_url: window.origin,
  },
  test: {
    base_url: 'http://localhost:1989',
  },
};
export { httpUrl, isMock };
