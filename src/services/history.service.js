import { AxiosUtils } from '../utils';

/**
 *
 */
class HistoryService {
  /**
   *
   * @param {*} user
   * @returns
   */
  static async all(user) {
    if (!user) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.get('/api/history');
      return res.data;
    } catch (error) {
      return undefined;
    }
  }

  /**
   *
   * @param {*} user
   * @param {string} gunId
   * @returns
   */
  static async allForGun(user, gunId) {
    if (!user) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.get(`/api/history/gun/${gunId}`);
      return res.data;
    } catch (error) {
      return undefined;
    }
  }

  /**
   *
   * @param {*} user
   * @returns
   */
  static async rangeDays(user) {
    if (!user) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.get('/api/history/rangedays');
      return res.data;
    } catch (error) {
      return undefined;
    }
  }

  /**
   *
   * @param {*} user
   * @param {*} id
   * @returns
   */
  static async get(user, id) {
    if (!user) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.get(`/api/history/${id}`);
      return res.data;
    } catch (error) {
      return undefined;
    }
  }

  /**
   *
   * @param {*} user
   * @param {*} id
   * @param {*} data
   * @returns
   */
  static async update(user, id, data) {
    if (!user || !data) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.put(`/api/history/${id}`, data);
      return res.data;
    } catch (error) {
      return undefined;
    }
  }

  /**
   *
   * @param {*} user
   * @param {*} data
   * @returns
   */
  static async create(user, data) {
    if (!user || !data) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.post('/api/history', data);
      return res.data;
    } catch (error) {
      return undefined;
    }
  }

  /**
   *
   * @param {*} user
   * @param {*} data
   * @returns
   */
  static async createRangeDay(user, data) {
    if (!user || !data) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.post('/api/history/rangeday', data);
      return res.data;
    } catch (error) {
      return undefined;
    }
  }

  /**
   *
   * @param {*} user
   * @param {*} id
   * @returns
   */
  static async delete(user, id) {
    if (!user) {
      return false;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.delete(`/api/history/${id}`);
      return res.status === 200;
    } catch (error) {
      return false;
    }
  }
}

export default HistoryService;
