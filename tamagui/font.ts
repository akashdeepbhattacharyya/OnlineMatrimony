import { createFont } from 'tamagui';

const fontSize = {
  1: 10,
  2: 12,
  3: 14,
  4: 16,
  5: 18,
  6: 20,
  7: 24,
  8: 26,
  9: 28,
  10: 30,
  11: 40,
  12: 50,
};
const fontWeight = {
  light: 300,
  normal: 400,
  bold: 600,
  bolder: 700,
  semibold: 500,
};

const defaultFontConfig = createFont({
  size: {
    ...fontSize,
    h0: fontSize[11],
    smallest: fontSize[1],
    xs: fontSize[2],
    sm: fontSize[3],
    nm: fontSize[4],
    md: fontSize[5],
    lg: fontSize[6],
    xl: fontSize[7],
    '2xl': fontSize[10],
    '3xl': fontSize[11],
    largest: fontSize[12],
  },
  lineHeight: {
    1: 12.5,
    2: 14.5,
    3: 16.5,
    4: 18.5,
    5: 20.5,
    6: 24.5,
    7: 28.5,
    8: 30.5,
    9: 32.5,
    10: 34.5,
  },
  weight: {
    ...fontWeight,
    light: fontWeight['light'],
    normal: fontWeight['normal'],
    bold: fontWeight['bold'],
    bolder: fontWeight['bolder'],
    semibold: fontWeight['semibold'],
  },
});

export const fontConfig = {
  // for tamagui, heading and body are assumed
  heading: {
    ...defaultFontConfig,
    family: 'Roboto-Regular',
  },
  headingLight: {
    ...defaultFontConfig,
    family: 'Roboto-Light',
  },
  headingBold: {
    ...defaultFontConfig,
    family: 'Roboto-Bold',
  },
  headingSemiBold: {
    ...defaultFontConfig,
    family: 'Roboto-SemiBold',
  },
  headingExtraBold: {
    ...defaultFontConfig,
    family: 'Roboto-ExtraBold',
  },
  body: {
    ...defaultFontConfig,
    family: 'Roboto-Regular',
  },
  bodyBold: {
    ...defaultFontConfig,
    family: 'Roboto-Bold',
  },
  bodySemiBold: {
    ...defaultFontConfig,
    family: 'Roboto-SemiBold',
  },
};
