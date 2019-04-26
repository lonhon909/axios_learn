<template>
  <ul class="list">
    <li @click="add(1)">get请求</li>
    <li @click="add(2)">post请求</li>
    <li @click="add(3)">请求拦截</li>
    <li @click="add(4)">响应拦截</li>
    <li @click="add(5)">取消请求</li>
  </ul>
</template>

<script>
export default {
  methods: {
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
