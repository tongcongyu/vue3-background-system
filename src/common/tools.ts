/**
 * 通过模块ID和名称加载json文件
 * * 需要自己做缓存
 */
import axios from 'axios';
export function loadJson(name: string) {
  const baseUrl = import.meta.env.VITE_ASSETS_URL;
  console.log(import.meta.env, 'ppppp');
  return new Promise((resolve) => {
    // 加载
    axios.get(`${baseUrl}${name}.json`).then((res) => {
      // console.log('异步加载', res)
      if (res.status === 200) {
        // statusText
        // 正常
        resolve(res.data);
      }
    });
  });
}
