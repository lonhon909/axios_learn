import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Home from '../pages/Home';
import Get from '../pages/Get';
import Post from '../pages/Post';
import RequestInterceptors from '../pages/RequestInterceptors';
import ResponseInterceptors from '../pages/ResponseInterceptors';
import CancelRequest from '../pages/CancelRequest';

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/get',
      name: 'Get',
      component: Get
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/requestInterceptors',
      name: 'RequestInterceptors',
      component: RequestInterceptors
    },
    {
      path: '/responseInterceptors',
      name: 'ResponseInterceptors',
      component: ResponseInterceptors
    },
    {
      path: '/cancelRequest',
      name: 'CancelRequest',
      component: CancelRequest
    },
  ]
})