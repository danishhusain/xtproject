import axios from 'axios';
import applicationProperties from './application.properties';

const apiFactory = async ({url, method, body = null}) => {
  const completeUrl = `${applicationProperties.baseUrl}${url}`;
  const isFormData = body instanceof FormData;

  const headers = {
    Authorization: '',
    ...(isFormData
      ? {'Content-Type': 'multipart/form-data'}
      : {'Content-Type': 'application/json'}),
  };

  try {
    const axiosConfig = {
      method,
      url: completeUrl,
      data: body,
      headers,
    };

    const axiosResponse = await axios(axiosConfig);
    return {
      response: axiosResponse.data,
      error: null,
      status: axiosResponse.status,
    };
  } catch (err) {
    const status = err?.response?.status;
    return {response: null, error: err, status};
  }
};

export default apiFactory;
