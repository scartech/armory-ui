import { AxiosUtils } from '../utils';

/**
 *
 */
class UserService {
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
      const res = await axios.get('/admin/users');
      return res.data;
    } catch (error) {
      console.error('Failed to get users', error.message);
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
      const res = await axios.get(`/admin/users/${id}`);
      return res.data;
    } catch (error) {
      console.error('Failed to get user', error.message);
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
      const res = await axios.put(`/admin/users/${id}`, data);
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
  static async create(user, data, cancelToken) {
    if (!user || !data) {
      return;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.post('/admin/users/', data);
      return res.data;
    } catch (error) {
      console.error('Failed to create user', error.message);
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
      const res = await axios.delete(`/admin/users/${id}`);
      return res.status === 200;
    } catch (error) {
      console.error('Failed to delete user', error.message);
      return;
    }
  }
}

export { UserService };
