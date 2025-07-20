import { tokens } from './tokens';
import type { TamaguiBaseTheme, Variable } from 'tamagui';
import { defaultConfig as tamaguiConfig } from '@tamagui/config/v4';

const themes: {
  [key: string]: Partial<TamaguiBaseTheme>;
} = {
  dark: {
    ...tamaguiConfig.themes.dark,
    background: tokens.color.primary,
    color: tokens.color.white,
  },
  light: {
    ...tamaguiConfig.themes.light,
    background: tokens.color.button_bg_red,
    color: tokens.color.black,
  },
  dark_primary_button: {
    background: tokens.color.button_bg_red,
    color: tokens.color.white,
  },
  dark_input: {
    background: tokens.color.white,
    color: tokens.color.black,
  },
  dark_checkbox: {
    background: tokens.color.white,
  },
  dark_divider: {
    background: tokens.color.gray_dark,
  },
  dark_sign_up_button: {
    background: tokens.color.button_bg_red,
    color: tokens.color.white,
  },
};

export default themes;
