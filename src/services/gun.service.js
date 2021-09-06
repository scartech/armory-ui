import { AxiosUtils } from '../utils';

/**
 *
 */
class GunService {
  /**
   *
   * @param {*} user
   * @param {*} cancelToken
   * @returns
   */
  static async getGuns(user, cancelToken) {
    if (!user) {
      return;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.get('/api/guns');
      return res.data;
    } catch (error) {
      console.error('Failed to get guns', error.message);
      return;
    }
  }

  /**
   *
   * @param {*} user
   * @param {*} id
   * @param {*} cancelToken
   * @returns
   */
  static async getGun(user, id, cancelToken) {
    if (!user) {
      return;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.get(`/api/guns/${id}`);
      return res.data;
    } catch (error) {
      console.error('Failed to get gun', error.message);
      return;
    }
  }

  /**
   *
   * @param {*} user
   * @param {*} id
   * @param {*} data
   * @param {*} cancelToken
   * @returns
   */
  static async updateGun(user, id, data, cancelToken) {
    if (!user || !data) {
      return;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.put(`/api/guns/${id}`, data);
      return res.data;
    } catch (error) {
      console.error('Failed to update gun', error.message);
      return;
    }
  }
}

export { GunService };
