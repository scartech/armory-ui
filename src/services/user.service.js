import { AxiosUtils } from '../utils';

/**
 *
 */
class UserService {
  /**
   *
   * @param {*} user
   * @returns
   */
  static async all(user) {
    if (!user) {
      return [];
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.get('/admin/users');
      return res.data;
    } catch (error) {
      return [];
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
      const res = await axios.get(`/admin/users/${id}`);
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
      const res = await axios.put(`/admin/users/${id}`, data);
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
      const res = await axios.post('/admin/users/', data);
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
      const res = await axios.delete(`/admin/users/${id}`);
      return res.status === 200;
    } catch (error) {
      return false;
    }
  }
}

export default UserService;
