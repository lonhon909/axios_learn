import utils from '../utils';
import defaults from '../defaults';
import InterceptorManager from './InterceptorManager';
import dispatchRequest from './dispatchRequest';

function Axios(instanceConfig) {
  this.default = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  }
}

Axios.prototype.request = function request(config) {
  // 当使用axios('http://11.241.8.195:3000/login', {}).then()...
  if (typeof config === 'string') {
    config.utils.merge({
      url: arguments[0]
    }, arguments[1])
  }
  // 默认方法 get， 如果config中有设置，此处将会被覆盖
  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  // 初始的 chain 数组 dispatchRequest 是发送请求的方法
  let chain = [dispatchRequest, undefined];
  let promise = Promise.resolve(config);

  // 然后 遍历 interceptors 
  // 注意 这里的 forEach 不是 Array.forEach， 也不是上面讲到的 util.forEach. 具体 拦截器源码 会讲到
  // 现在我们只要理解他是遍历给 chain 里面追加两个方法就可以
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  })
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });
  // 然后添加了请求拦截器和相应拦截器 chain 会是什么样子呢 （重点）
  // chain = [ 请求拦截器的成功方法，请求拦截器的失败方法，dispatchRequest， undefined, 响应拦截器的成功方法，响应拦截器的失败方法 ]。
  while (chain.length) {
    // chain.shift(), 从数组的前端删除元素并返回删除的元素，源数组将被改变
    promise = promise.then(chain.shift(), chain.shift());
  }
  // 意思就是将 chainn 内的方法两两拿出来执行 成如下这样
  //   promise.then(请求拦截器的成功方法, 请求拦截器的失败方法)
  //          .then(dispatchRequest, undefined)
  //          .then(响应拦截器的成功方法, 响应拦截器的失败方法)
  return promise;
}

utils.forEach(['delete', 'get', 'head', 'options'], function(method) {
  Axios.prototype[method] = function(url, config = {}) {
    return this.request(utils.merge(config, {
      method,
      url,
    }))
  }
})

utils.forEach(['post', 'put', 'patch'], function(method) {
  Axios.prototype[method] = function(url, data, config = {}) {
    return this.request(utils.merge(config, {
      method,
      url,
      data,
    }))
  }
})

export default Axios;