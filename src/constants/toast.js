import {Platform, ToastAndroid} from 'react-native';
import Toast from 'react-native-root-toast';

export const showToast = message => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
    });
  }
};
