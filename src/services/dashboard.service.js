import { AxiosUtils } from '../utils';

/**
 *
 */
class DashboardService {
  /**
   *
   * @param {*} user
   * @returns
   */
  static async data(user) {
    if (!user) {
      return undefined;
    }

    try {
      const axios = AxiosUtils.createInstance(user.token);
      const res = await axios.get('/api/dashboard');
      return res.data;
    } catch (error) {
      return undefined;
    }
  }
}

export default DashboardService;
