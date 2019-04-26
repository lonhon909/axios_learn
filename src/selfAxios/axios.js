import Axios from './core/Axios';
import defaults from './defaults';

/**
 * 
 * @param {*} defaultConfig The default config for the instance
 */
function createInstance(defaultConfig) {
  const instance = new Axios(defaultConfig);
  return instance;
}

const axios = createInstance(defaults);

// 公开Axios类以允许类继承
axios.Axios = Axios;

export default axios;