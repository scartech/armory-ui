import axios from 'axios';

export class AxiosUtils {
  static createInstance(token) {
    return axios.create({
      baseURL: 'http://localhost:5000',
      timeout: 3000,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
