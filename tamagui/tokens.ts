import { createTokens } from 'tamagui';
import { config as tamaguiConfig } from '@tamagui/config/v3';
import { fontConfig } from './font';

export const tokens = createTokens({
  size: tamaguiConfig.tokens.size,
  space: tamaguiConfig.tokens.space,
  radius: tamaguiConfig.tokens.radius,
  zIndex: {
    0: 0,
    1: 10,
    2: 20,
    3: 30,
    4: 40,
    '-4': -40,
    '-3': -30,
    '-2': -20,
    '-1': -10,
  },
  color: {
    ...tamaguiConfig.tokens.color,
    white: '#ffffff',
    black: '#000000',
    button_bg_red: '#F85F5F',
    primary: '#2B2B2B',
    gray: '#A9A9A9',
    gray_dark: '#696969',
    gray_light: '#D3D3D3',
    gray_lighter: '#BABABA',
    black_60: '#00000099',
  },

  font: {
    ...fontConfig,
    heading: 'Roboto-Regular',
    headingBold: 'Roboto-Bold',
    headingSemiBold: 'Roboto-SemiBold',
    headingExtraBold: 'Roboto-ExtraBold',
    body: 'Oswald-Regular',
    bodyBold: 'Oswald-Bold',
    bodySemiBold: 'Oswald-SemiBold',
  },
});
