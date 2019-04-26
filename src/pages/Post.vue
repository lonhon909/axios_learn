<template>
  <div class="common">
    <ul>
      <li @click="send1">写法一</li>
      <li @click="send2">写法二</li>
      <li @click="send3">写法三</li>
      <li @click="send4">写法四</li>
    </ul>
  </div>
</template>

<script>
import host from '../common/js/host';

const headers = {
  'Content-Type': 'application/json',
  'X-HRX-SESSION': '123'
}

const data = {
  username: '张三',
  password: '123123'
}

export default {
  methods: {
    send1() {
      this.$axios({
        url: '/login',
        baseURL: host,
        method: 'POST',
        data: data,
        headers,
      }).then(console.log)
    },
    send2() {
      this.$axios('/login', {
        baseURL: host,
        method: 'post',
        data,
        headers
      }).then(console.log)
    },
    send3() {
      this.$axios.post(host + '/login', data, {
        headers
      }).then(console.log)
    },
    send4() {
      this.$axios.request({
        url: '/login',
        baseURL: host,
        method: 'POST',
        data: data,
        headers,
      }).then(console.log)
    }
  },
}
</script>
