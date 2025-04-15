import { Dimensions, PixelRatio } from 'react-native';

const standardWidth = 375;
const standardHeight = 812;

// Get device dimensions
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Calculate scaling factors
const widthScale = screenWidth / standardWidth;
const heightScale = screenHeight / standardHeight;

const Responsive = {
    width: (w) => PixelRatio.roundToNearestPixel(w * widthScale),
    height: (h) => PixelRatio.roundToNearestPixel(h * heightScale),
    font: (f) => PixelRatio.roundToNearestPixel(f * widthScale),
    screenWidth: () => screenWidth,
    screenHeight: () => screenHeight,
};

export default Responsive;