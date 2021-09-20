import { AxiosUtils } from '../utils';

/**
 *
 */
class HistoryService {
  /**
   *
   * @param {*} user
   * @param {*} gunId
   * @returns
   */
  static async all(user, gunId) {
    if (!user) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.get(`/api/history/${gunId}`);
      return res.data;
    } catch (error) {
      return undefined;
    }
  }

  /**
   *
   * @param {*} user
   * @param {*} gunId
   * @param {*} id
   * @returns
   */
  static async get(user, gunId, id) {
    if (!user) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.get(`/api/history/${gunId}/${id}`);
      return res.data;
    } catch (error) {
      return undefined;
    }
  }

  /**
   *
   * @param {*} user
   * @param {*} gunId
   * @param {*} id
   * @param {*} data
   * @returns
   */
  static async update(user, gunId, id, data) {
    if (!user || !data) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.put(`/api/history/${gunId}/${id}`, data);
      return res.data;
    } catch (error) {
      return undefined;
    }
  }

  /**
   *
   * @param {*} user
   * @param {*} gunId
   * @param {*} data
   * @returns
   */
  static async create(user, gunId, data) {
    if (!user || !data) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.post(`/api/history/${gunId}`, data);
      return res.data;
    } catch (error) {
      return undefined;
    }
  }

  /**
   *
   * @param {*} user
   * @param {*} gunId
   * @param {*} id
   * @returns
   */
  static async delete(user, gunId, id) {
    if (!user) {
      return false;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.delete(`/api/history/${gunId}/${id}`);
      return res.status === 200;
    } catch (error) {
      return false;
    }
  }
}

export default HistoryService;
