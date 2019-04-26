import isAbsoluteURL from '../helpers/isAbsoluteURL';
import combineURLs from '../helpers/combineURLs';
import transformData from './transformData';
import utils from '../utils';
import defaults from '../defaults';
import isCancel from '../cancel/isCancel';

/**
 * 
 * @param {*} config 如果已经请求取消，则抛出 “Cancel”。
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
export default function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  config.headers = config.headers || {};

  config.data = transformData(
    config.data,
    config.header,
    config.transformRequest
  )

  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  )

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  )

  let adapter = config.adapter || defaults.adapter;
console.log(adapter)
  return adapter(config).then(
    function onAdapterResolution(response) {
      throwIfCancellationRequested(config);

      response.data = transformData(
        response.data,
        response.headers,
        config.transformResponse
      )

      return response
    },
    function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);

        if (reason && reason.response) {
          reason.response.data = transformData(
            reason.response.data,
            reason.response.headers,
            config.transformResponse
          )
        }
      }
      return Promise.reject(reason);
    }
  )
}