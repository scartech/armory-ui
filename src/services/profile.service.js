import { AxiosUtils } from '../utils';

/**
 *
 */
class ProfileService {
  /**
   *
   * @param {*} user
   * @param {*} cancelToken
   * @returns
   */
  static async get(user, cancelToken) {
    if (!user) {
      return;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.get('/api/profile');
      return res.data;
    } catch (error) {
      console.error('Failed to get user', error.message);
      return;
    }
  }

  /**
   *
   * @param {*} user
   * @param {*} data
   * @param {*} cancelToken
   * @returns
   */
  static async update(user, data, cancelToken) {
    if (!user || !data) {
      return;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.put('/api/profile', data);
      return res.data;
    } catch (error) {
      console.error('Failed to update user', error.message);
      return;
    }
  }

  /**
   *
   * @param {*} user
   * @param {*} data
   * @param {*} cancelToken
   * @returns
   */
  static async updatePassword(user, data, cancelToken) {
    if (!user || !data) {
      return;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.put('/api/profile/password', data);
      return res.status === 200;
    } catch (error) {
      console.error('Failed to update user', error.message);
      return;
    }
  }
}

export { ProfileService };
