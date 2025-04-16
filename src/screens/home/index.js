import {ApiMethods} from '../../constants/apiMethods';
import {showToast} from '../../constants/toast';
import apiFactory from '../../factories/apiFactory';

export const HomeScreenHelper = {
  getPost: async offset => {
    try {
      const formData = new FormData();
      formData.append('user_id', '108');
      formData.append('offset', offset);
      formData.append('type', 'popular');

      const resp = await apiFactory({
        url: '/getdata.php',
        method: ApiMethods.POST,
        body: formData,
      });
      return resp.response.images;
    } catch (error) {
      showToast(`${error}`);
    }
  },
};
