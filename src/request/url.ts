/**
 * 是否开启mock数据
 */
const isMock = false;
/**
 * 接口i请求地址
 */
const httpUrl = {
  development: {
    base_url: 'http://10.10.132.231:8848',
  },
  production: {
    base_url: window.origin,
  },
  test: {
    base_url: 'http://localhost:1989',
  },
};
export { httpUrl, isMock };
