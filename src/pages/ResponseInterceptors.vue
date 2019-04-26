<template>
  <div class="common">
    <ul>
      <li @click="send1">拦截添加参数</li>
    </ul>
  </div>
</template>

<script>
import fnAxios from '../common/js/axios'
const axios = fnAxios();
import host from '../common/js/host';

// 请求拦截器
axios.interceptors.request.use((config) => {
  // do something
  let url = config.url;
  if (!/^https?:\/\//.test(url)) {
    config.url = host + url;
  }
  config.data.addParam = '拦截参数';
  return config
}, (error) => {
  // do something
  return Promise.reject(error);
})

axios.interceptors.response.use(response => {
  // do something
  // console.log(response)
  if (response.status === 200) {
    return response.data;
  } else {
    return Promise.reject(response.statusText);
  }
}, error => {
  // console.log(error)
  return Promise.reject(error);
})

const headers = {
  'Content-Type': 'application/json',
  'X-HRX-SESSION': '123'
}

const data = {
  username: '张三',
  password: '123123'
}
export default {
  data() {
    return {
      host: host,
    }
  },
  methods: {
    send1() {
      axios({
        url: '/login',
        method: 'POST',
        data: data,
        headers,
      }).then(console.log)
    },
    send2() {},
    send3() {},
    send4() {},
  },
}
</script>
