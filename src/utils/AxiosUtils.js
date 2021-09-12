import axios from 'axios';
import { Config } from '../utils';

export class AxiosUtils {
  static createInstance(token) {
    return axios.create({
      baseURL: Config.API_BASE_URL,
      timeout: 3000,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
