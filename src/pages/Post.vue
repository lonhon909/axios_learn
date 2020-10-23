<template>
  <div class="common">
    <ul>
      <li @click="send1">写法一</li>
      <li @click="send2">写法二</li>
      <li @click="send3">写法三</li>
      <li @click="send4">写法四</li>
      <li @click="send5">测试</li>
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
    },
    send5() {
      this.$axios.request({
        url: '/ess-api/entryMobile/employee/essOptionConfig/getAppointOptItemByBaseKind.do',
        baseURL: 'https://hrx-sit.ctg.cn',
        method: 'POST',
        data: {
          "parentLongKind": "HKG",
          "longBaseKind": "STATE!CITY",
          "containsChild": false
        },
        headers: {
          'X-HRX-SESSION': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImFwcF9wYV9ocm1fMTAwMDA1IiwidGVuYW50SWQiOiJDSERVSUU4UVJQRzE2QUpGTTJCOU5MME9TM1RLNTc0IiwidHlwZSI6IjEiLCJleHAiOjE1OTg2MDMxMzUsImlhdCI6MTU5ODUxMzEzNSwic2lkIjoiUzg5ZGU4MWI1NzQyYTAxZTMwMTc0MmVjZWMwNWUwMDc2MCJ9._QhuXIFvphrVrWecT6EfL4yF8dAzmcI7rh_repchTlA',
        },
      }).then(console.log)
    }
  },
}
</script>
