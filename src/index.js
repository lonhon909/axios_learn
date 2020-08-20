// import {post, get} from './common/js/post';

// const url = 'https://z-stg1.pa18.com/mobile/entry/applBaseinfo/selectByBaseKinds.do'
// // const url = 'mobile-ctf/eap/eapCtfMsgUpdateT/get.do'

// let country = []; // CHN
// let province = [];
// let city = [];

// let address = [];

// post(url, [
//   'COUNTRY',
//   'STATE',
//   'CITY'
// ]).then(res => {
//   let data = res.data;
//   country = data.COUNTRY;
//   province = data.STATE;
//   city = data.CITY;
//   let aa = province.filter(item => item.parentId === 'CHN');
//   console.log(JSON.stringify(aa))
// }).catch(err => {
//   console.log(err)
// })


// get('user_get1.do', {}).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err);
// })



import Vue from 'vue';
import App from './App';
import Container from './Container';
import router from './route';
import axios from 'axios';
import iView from 'iview';
// import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.prototype.$axios = axios;

import './common/style/reset.less';

new Vue({
  router,
  render: h => h(Container)
}).$mount('#app')