<template>
  <div class="app">
    <!-- <div class="container"> -->
      <!-- <section class="get" @click="getData(1)">get请求1</section>
      <section class="get" @click="getData(2)">get请求2</section>
      <section class="get" @click="getData(3)">get请求3</section>
      <section class="get" @click="postData(1)">post请求1</section>
      <section class="get" @click="postData(2)">post请求2</section>
      <section class="get" @click="postData(3)">post请求3</section>
      <section class="get" @click="ajaxData(1)">原生ajax请求1</section>
      <section class="get" @click="ajaxData(2)">原生ajax请求2</section>
      <section class="get" @click="ajaxData(3)">原生ajax请求3</section>
      <section class="get" @click="ajaxDataAxios(3)">axios请求</section>

      <a class="get" href="http://11.241.8.195:3000/download">a标签下载</a>
      <section class="get" @click="cancel">取消请求</section> -->
      <router-view></router-view>
    <!-- </div> -->
  </div>
</template>

<script>
import {post, get} from './common/js/post';
import axios from 'axios';
import http from './selfAxios/axios';
// 取消请求

// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();
const CancelToken = axios.CancelToken;
let cancel;
export default {
  data() {
    return {
      canceled: false
    }
  },
  methods: {
    getData(index) {
      get('user_get1.do', {
        id: index
      }).then(res => {
        console.log(res)
      })
    },
    postData(index) {
      let that = this;
      post('/login', {
        id: index
      }, {
        cancelToken: new axios.CancelToken(function executor(cb) {
          console.log(cb)
          // executor 函数接收一个 cancel 函数作为参数
          cancel = cb;
          // if (that.canceled) {
          //   cb()
          // }
        })
      }).then(res => {
        console.log(res)
      }).catch(err => {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
        } else {
          // 处理错误
        }
      })
    },
    ajaxData(index) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.responseText);
        }
      }
      xhr.open('GET', 'http://11.241.8.195:3000/download');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(`id=${index}`)
    },
    ajaxDataAxios(index) {
      http.interceptors.request.use(function(config) {
        // const a = config.data;
        // Object.assign(a, {
        //   addParam: '请求拦截器添加参数'
        // })
        // config.data = a;
        console.log(config)
        return config
      }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      })
      http.post('http://11.241.8.195:3000/login', {
        data: {
          id: index
        }
      }).then(res => {
        console.log('res', res)
      })
    },
    cancel() {
      try {
        cancel('取消请求');
      } catch (error) {
        
      }
    }
  },
}
</script>

<style lang="less" scoped>
.app{
  width: 100%;
  height: 100%;
}
.container{
  display: flex;
  flex-wrap: wrap;
}
.get{
  width: 33.3%;
  font-size: 14px;
  color: #000000;
  line-height: 50px;
  text-align: center;
}
</style>
