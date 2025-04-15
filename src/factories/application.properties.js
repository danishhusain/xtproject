import {Platform} from 'react-native';

const applicationProperties = {
  baseUrl:
    Platform.OS === 'ios'
      ? 'https://dev3.xicomtechnologies.com/xttest'
      : 'http://dev3.xicomtechnologies.com/xttest',
  noImageUrl:
    'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=826',
};

export default applicationProperties;
