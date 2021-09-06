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
  static async all(user, cancelToken) {
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
  static async get(user, id, cancelToken) {
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
  static async update(user, id, data, cancelToken) {
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

  /**
   *
   * @param {*} user
   * @param {*} data
   * @param {*} cancelToken
   * @returns
   */
  static async create(user, data, cancelToken) {
    if (!user || !data) {
      return;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.post('/api/guns/', data);
      return res.data;
    } catch (error) {
      console.error('Failed to create gun', error.message);
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
  static async delete(user, id, cancelToken) {
    if (!user) {
      return;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.delete(`/api/guns/${id}`);
      return res.status === 200;
    } catch (error) {
      console.error('Failed to delete gun', error.message);
      return;
    }
  }
}

export { GunService };
