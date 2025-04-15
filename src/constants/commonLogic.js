import applicationProperties from '../factories/application.properties';

export const getUpdatedImageUrl = url => {
  return url?.includes(applicationProperties.baseUrl)
    ? url
    : url?.replace(/^https?:\/\/[^/]+/, applicationProperties.baseUrl);
};
