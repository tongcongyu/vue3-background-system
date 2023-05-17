/*
 * @Author: H3C\tys4483 YS.tongcongyu@h3c.com
 * @Date: 2023-01-19 15:29:04
 * @LastEditors: H3C\tys4483 YS.tongcongyu@h3c.com
 * @LastEditTime: 2023-05-17 15:58:00
 * @FilePath: \vue3-background-system\src\utils\http\axios.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import VueCookie from 'js-cookie';
import Axios, { AxiosError, AxiosResponse } from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { httpUrl, isMock } from '@/request/url';
const env = import.meta.env.VITE_ENV_TYPE;
console.log('当前环境：', env);
const BASE_URL = isMock ? httpUrl.test.base_url : httpUrl[env as keyof typeof httpUrl].base_url;
const TIME_OUT = 30 * 1000;
export interface AxiosResponseData {
  data: any;
  status?: string;
  message?: string;
  page?: {
    empty: boolean;
    first: boolean;
    hasContent: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
    last: boolean;
    numberOfElements: number;
    pageNumber: number;
    pageSize: number;
    sorted: boolean;
    totalElements: number;
    total: number;
  } | null;
  [key: string]: any;
}
const instance = Axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});
//默认谁头信息
const tokenHeaderName = 'X-ACCESS-TOKEN';
// 错误状态处理函数
const errorHandle = (status: number, error): void => {
  // HTTP状态码判断
  switch (status) {
    case 401:
      return alert(`Error Code: ${status}, Message: ${error.msg || '登录失效，请重新登录'}`);
    case 403:
      return alert(`Error Code: ${status}, Message: ${error.msg || '你没有访问权限'}`);
    case 500:
      return alert(`Error Code: ${status}, Message: ${error.msg || '后台错误，请联系管理员'}`);
    case 502:
      return alert(`Error Code: ${status}, Message: ${error.msg || '平台环境异常'}`);
    default:
      alert(`Error Code: ${status}, Message: ${error.msg || '未知错误，请刷新重试'}`);
  }
};
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    NProgress.start();
    // 可以处理token等
    const token = VueCookie.get(tokenHeaderName);
    if (token) {
      config.headers[tokenHeaderName] = token;
    }
    return config;
  },
  (err) => {
    NProgress.done();
    return Promise.reject(err);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (res: AxiosResponse) => {
    VueCookie.set(tokenHeaderName, VueCookie.get(tokenHeaderName), {
      expires: 1 / 48,
    });
    NProgress.done();
    return res.data;
  },
  (error: AxiosError) => {
    console.error(error, '出错了出错了....');
    NProgress.done();
    if (error && error.response) {
      errorHandle(error.response.status, error.response);
      return Promise.reject(error.response);
    }
    return Promise.reject(error);
  }
);
/**
 * GET 请求
 * @param url
 * @params data
 */
const useGet = (url: string, params?: any) => {
  return new Promise((resolve, reject) => {
    instance
      .get(BASE_URL + url, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
/**
 * POST 请求
 * @param url
 * @params data
 */
const usePost = (url: string, params?: any) => {
  return new Promise((resolve, reject) => {
    instance
      .post(BASE_URL + url, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
/**
 * PUT 请求
 * @param url
 * @params data
 */
const usePut = (url: string, params?: any) => {
  return new Promise((resolve, reject) => {
    instance
      .post(BASE_URL + url, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
/**
 * DELETE 请求
 * @param url
 * @params data
 */
const useDelete = (url: string, params?: any) => {
  return new Promise((resolve, reject) => {
    instance
      .post(BASE_URL + url, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export { useGet, usePost, usePut, useDelete };
