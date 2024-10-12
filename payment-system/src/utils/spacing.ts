import { Dimensions, PixelRatio } from 'react-native';

export const baseSpacing: number = 8;
// Get pixel ratio
// Screen height
let designHeight = 932;
let designWidth = 430;
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const scaleWidth = screenWidth / designWidth;
const scaleHeight = screenHeight / designHeight;

export function fontScale(size: number) {
    const newSize = size * scaleWidth;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const widthScale = (size: number) => {
    const responsive = scaleWidth * size;
    return responsive;
};

export const heightScale = (size: number) => {
    const responsive = scaleHeight * size;
    return responsive;
};
export const Spacing = {
    widthScale,
    heightScale,
    fontScale,
};
