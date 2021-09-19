import { AxiosUtils } from '../utils';

/**
 *
 */
class HistoryService {
  /**
   *
   * @param {*} user
   * @param {*} gunId
   * @param {*} cancelToken
   * @returns
   */
  static async all(user, gunId, cancelToken) {
    if (!user) {
      return;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.get(`/api/history/${gunId}`);
      return res.data;
    } catch (error) {
      console.error('Failed to get history', error.message);
      return;
    }
  }

  /**
   *
   * @param {*} user
   * @param {*} gunId
   * @param {*} id
   * @param {*} cancelToken
   * @returns
   */
  static async get(user, gunId, id, cancelToken) {
    if (!user) {
      return;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.get(`/api/history/${gunId}/${id}`);
      return res.data;
    } catch (error) {
      console.error('Failed to get history', error.message);
      return;
    }
  }

  /**
   *
   * @param {*} user
   * @param {*} gunId
   * @param {*} id
   * @param {*} data
   * @param {*} cancelToken
   * @returns
   */
  static async update(user, gunId, id, data, cancelToken) {
    if (!user || !data) {
      return;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.put(`/api/history/${gunId}/${id}`, data);
      return res.data;
    } catch (error) {
      console.error('Failed to update history', error.message);
      return;
    }
  }

  /**
   *
   * @param {*} user
   * @param {*} gunId
   * @param {*} data
   * @param {*} cancelToken
   * @returns
   */
  static async create(user, gunId, data, cancelToken) {
    if (!user || !data) {
      return;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.post(`/api/history/${gunId}`, data);
      return res.data;
    } catch (error) {
      console.error('Failed to create history', error.message);
      return;
    }
  }

  /**
   *
   * @param {*} user
   * @param {*} gunId
   * @param {*} id
   * @param {*} cancelToken
   * @returns
   */
  static async delete(user, gunId, id, cancelToken) {
    if (!user) {
      return;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.delete(`/api/history/${gunId}/${id}`);
      return res.status === 200;
    } catch (error) {
      console.error('Failed to delete history', error.message);
      return;
    }
  }
}

export { HistoryService };
