/**
 * 是否开启mock数据
 */
const isMock = true;
/**
 * 接口i请求地址
 */
const httpUrl = {
  development: {
    base_url: 'https://10.10.130.196:8087',
  },
  production: {
    base_url: window.origin,
  },
  test: {
    base_url: 'http://localhost:1989',
  },
};
export { httpUrl, isMock };
