<template>
  <div class="common">
    <ul>
      <li @click="send1">写法一</li>
      <li @click="send2">写法二</li>
      <li @click="send3">写法三</li>
      <li @click="send4">写法四</li>
      <li @click="send5">写法五</li>
    </ul>
    <h3>表单提交</h3>
    <form :action="host+'/second'" method="GET">
      用户：<input type="text" name="username" id="username"><br />
      密码：<input type="text" name="password" id="password"><br />
      <!-- <input type="submit" @click.prevent="submit" value="表单登录" /> -->
      <input type="submit" value="表单登录" />
    </form>
  </div>
</template>

<script>
import host from '../common/js/host';

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'X-HRX-SESSION': '123'
}

export default {
  data() {
    return {
      host: host
    }
  },
  methods: {
    send1() {
      // 写法1
      this.$axios({
        url: '/second',
        method: 'get',
        // get请求使用params,post请求使用data
        params: {
          num: 100
        },
        baseURL: host,
        headers, 
      }).then(console.log)
    },
    send2() {
      // 写法2
      this.$axios('/second', {
        method: "GET",
        params: {num: 100},
        baseURL: host,
        headers,
      }).then(console.log)
    },
    send3() {
      // 写法3
      this.$axios(host + '/second?num=' + 100, {
        method: "GET",
        headers
      }).then(console.log)
    },
    send4() {
      // 写法4
      this.$axios(host + '/second', {
        params: {num: 100},
        method: "GET",
        headers,
      }).then(console.log)
    },
    send5() {
      // 写法5
      this.$axios.request({
        url: '/second',
        method: 'get',
        // get请求使用params,post请求使用data
        params: {
          num: 100
        },
        baseURL: host,
        headers,
      }).then(console.log)
    },
    submit() {

    }
  },
}
</script>
