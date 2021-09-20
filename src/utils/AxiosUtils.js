import axios from 'axios';
import PubSub from 'pubsub-js';
import Config from './Config';

class AxiosUtils {
  static createInstance(token) {
    const instance = axios.create({
      baseURL: Config.getAPIBaseUrl(),
      timeout: 3000,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    instance.interceptors.response.use(
      (response) => {
        if (response.status === 401) {
          PubSub.publish('UNAUTHORIZED', 401);
        }
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          PubSub.publish('UNAUTHORIZED', 401);
        }
        return Promise.reject(error);
      },
    );

    return instance;
  }
}

export default AxiosUtils;
