<template>
  <ul class="list">
    <li @click="add(1)">get请求</li>
    <li @click="add(2)">post请求</li>
    <li @click="add(3)">请求拦截</li>
    <li @click="add(4)">响应拦截</li>
    <li @click="add(5)">取消请求</li>
    <li>
      <input type="file" @change="changefile">
      组件
      <Upload :action="action" :headers=headers></Upload>
    </li>
  </ul>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      headers: {},
      action: '',
    }
  },
  mounted() {
    console.log('2333333');
    axios({
      method: 'post',
      url: 'http://e-stg1.hrx.pingan.com.cn/hbp-api/hbp-s3adapter-web/test-token/CHDUIE8QRPG16AJFM2B9NL0OS3TK574/C1584063722001/buck-obs?suffix=png&multipart=true',
    }).then((res) => {
      const data = res.data.data;
      const bucket = data.bucket;
      const key = data.fileKey;
      const accessKey = data.accessKey;
      console.log(data);
      this.action = `${data.innerEndPoint}${data.resPath}`;
      this.headers = {
        Authorization: `AWS ${accessKey}:${data.token}`,
        'x-amz-date': data.gmtDate,
        // 'x-amz-meta-portal-uplod': 'Y',
        // Date: data.gmtDate,
        // 'Content-Type': 'application/octet-stream',
      }
    })
  },
  methods: {
    changefile(e) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      const blob = new Blob([file]);
      axios({
        method: 'PUT',
        url: this.action,
        headers: this.headers,
        // data: formData,
        data: blob,
      });
    },
    add(index) {
      switch(index) {
        case 1:
          this.$router.push('/get');
          break;
        case 2:
          this.$router.push('/post');
          break;
        case 3:
          this.$router.push('/requestInterceptors');
          break;
        case 4:
          this.$router.push('/responseInterceptors');
          break;
        case 5:
          this.$router.push('/cancelRequest');
          break;
        default: break;
      }
    }
  },
}
</script>

<style lang="less" scoped>
.list{
  li{
    font-size: 12px;
    text-align: left;
    line-height: 50px;
    padding-left: 20px;
    margin: 0 10px;
    border-bottom: 1px solid #eeeeee;
  }
}
</style>
