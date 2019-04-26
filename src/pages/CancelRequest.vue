<template>
  <div class="common">
    <ul>
      <li @click="send1">请求数据</li>
      <li @click="send2">取消请求</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
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
  data() {
    return {
      cancel: null,
    }
  },
  methods: {
    send1() {
      const _this = this;
      this.$axios.post('/user.do', data, {
        baseURL: host,
        headers,
        cancelToken: new axios.CancelToken(function executor(cb) {
          _this.cancel = cb;
        })
      }).then(console.log)
    },
    send2() {
      if (this.cancel && typeof this.cancel === 'function') {
        this.cancel();
        this.cancel = null;
      }
    }
  },
}
</script>
