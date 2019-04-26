import axios from 'axios';
// const axios = require('./lib/axios');
import session from './session';

// const host = 'https://z-stg1.pa18.com'
const host = 'http://11.241.8.195:3000';

// 模拟异步获取session
function getSession() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(session)
    }, 100)
  })
}

async function ajax() {
  try {
    const session = await getSession();
    // 方法一
    const instance = axios.create({
      baseURL: host,
      headers: {
        'X-HRX-SESSION': session,
        'Content-Type': 'application/json',
      }
    })
    // 请求拦截
    instance.interceptors.request.use(function(config) {
      const a = config.data;
      Object.assign(a, {
        addParam: '请求拦截器添加参数'
      })
      config.data = a;
      return config
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    })
    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      console.log('response', response)
      return response;
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });
    return instance;
/* 
    // 方法二
    axios.defaults.baseURL = host;
    axios.defaults.headers['X-HRX-SESSION'] = session;
    return axios;
     */
  } catch (error) {
    Promise.reject(error)
  }
}

export function post(url = '', data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    ajax().then((axios) => {
      // 方法一
      /* axios({
        method: 'post',
        url,
        data,
      }).then() ... */
      // 方法二
      axios.post(url, data, config).then((res) => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res.statusText)
        }
      }).catch(error => {
        reject(error);
      })
    }).catch(error => {
      reject(error);
    })
  })
}

export function get(url, data, config) {
  return new Promise((resolve, reject) => {
    ajax().then(axios => {
      axios({
        method: 'get',
        url,
        params: data,
        // headers: {
        //   "Accept": "application/json;charset=utf-8",
        //   'Content-Type': 'application/json'
        // }
      }).then(res => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res.statusText);
        }
      }).catch(error => {
        reject(error);
      })
    }).catch(error => {
      reject(error);
    })
  })
}
