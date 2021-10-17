import { AxiosUtils } from '../utils';

/**
 *
 */
class GunService {
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
      const res = await axios.get('/api/guns');
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
      const res = await axios.get(`/api/guns/${id}`);
      return res.data;
    } catch (error) {
      return undefined;
    }
  }

  /**
   *
   * @param {*} user
   * @param {*} id
   * @param {*} type
   * @returns
   */
  static async getImage(user, id, type) {
    if (!user) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.get(`/api/guns/images/${id}/${type}`);
      return res.data;
    } catch (error) {
      return undefined;
    }
  }

  /**
   *
   * @param {*} user
   * @param {*} id
   * @param {*} type
   * @returns
   */
  static async getImages(user, id) {
    if (!user) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.get(`/api/guns/images/${id}`);
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
      const res = await axios.put(`/api/guns/${id}`, data);
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
  static async updateImages(user, id, data) {
    if (!user || !data) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.put(`/api/guns/images/${id}`, data);
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
      const res = await axios.post('/api/guns/', data);
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
      const res = await axios.delete(`/api/guns/${id}`);
      return res.status === 200;
    } catch (error) {
      return undefined;
    }
  }
}

export default GunService;
