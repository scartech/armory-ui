import { AxiosUtils } from '../utils';

/**
 *
 */
class InventoryService {
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
      const res = await axios.get('/api/inventory');
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
      const res = await axios.get(`/api/inventory/${id}`);
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
      const res = await axios.put(`/api/inventory/${id}`, data);
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
      const res = await axios.post('/api/inventory/', data);
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
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.delete(`/api/inventory/${id}`);
      return res.status === 200;
    } catch (error) {
      return undefined;
    }
  }
}

export default InventoryService;
