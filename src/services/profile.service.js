import { AxiosUtils } from '../utils';

/**
 *
 */
class ProfileService {
  /**
   *
   * @param {*} user
   * @returns
   */
  static async refreshTotp(user) {
    if (!user) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.post('/api/profile/totp');
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
  static async validateTotp(user, data) {
    if (!user) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.post('/api/profile/validatetotp', data);
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
  static async get(user) {
    if (!user) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.get('/api/profile');
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
  static async update(user, data) {
    if (!user || !data) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.put('/api/profile', data);
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
  static async enableTotp(user, data) {
    if (!user || !data) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.put('/api/profile/enabletotp', data);
      return res.status === 200;
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
  static async updatePassword(user, data) {
    if (!user || !data) {
      return false;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.put('/api/profile/password', data);
      return res.status === 200;
    } catch (error) {
      return false;
    }
  }
}

export default ProfileService;
