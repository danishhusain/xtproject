import applicationProperties from '../factories/application.properties';

export const getUpdatedImageUrl = url => {
  if (!url) return url;

  const path = url.replace(/^https?:\/\/[^/]+/, '');
  const cleanPath = path.startsWith('/xttest')
    ? path.replace('/xttest', '')
    : path;

  let updatedUrl = applicationProperties.baseUrl + cleanPath;

  return updatedUrl.replace(/^http:/, 'https:');
};
