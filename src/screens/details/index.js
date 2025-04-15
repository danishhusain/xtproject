import {ApiMethods} from '../../constants/apiMethods';
import apiFactory from '../../factories/apiFactory';

export const DetailsScreenHelper = {
  saveUserData: async formData => {
    try {
      const resp = await apiFactory({
        url: '/savedata.php',
        method: ApiMethods.POST,
        body: formData,
      });

      return resp.response;
    } catch (error) {
      console.warn(error);
    }
  },
  extractImageInfo: item => {
    if (!item?.xt_image) return null;

    const uri = item.xt_image;
    const name = uri.split('/').pop();

    // Extract image type from file extension
    const extension = name.split('.').pop().toLowerCase();
    const type = `image/${extension === 'jpg' ? 'jpeg' : extension}`;

    return {
      uri,
      name,
      type,
    };
  },
};
