import axios from 'axios';

export class AxiosUtils {
  static createInstance(token) {
    return axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      timeout: 3000,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
