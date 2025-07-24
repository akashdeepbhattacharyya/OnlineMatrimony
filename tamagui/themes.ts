import { tokens } from './tokens';
import type { TamaguiBaseTheme, Variable } from 'tamagui';
import { config as tamaguiConfig } from '@tamagui/config/v3';

export type BaseTheme = {
  placeholder: string | Variable<any>;
  unselected: string | Variable<any>;
  buttonTitle: string | Variable<any>;
  title: string | Variable<any>;
  subtitle: string | Variable<any>;
} & TamaguiBaseTheme;

const themes: {
  [key: string]: Partial<BaseTheme>;
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
    placeholder: tokens.color.gray_lighter,
  },
  dark_checkbox: {
    background: tokens.color.white,
    color: tokens.color.button_bg_red,
    unselected: tokens.color.gray,
  },
  dark_divider: {
    background: tokens.color.gray_dark,
  },
  dark_sign_up_button: {
    background: tokens.color.button_bg_red,
    color: tokens.color.white,
  },
  dark_sign_up_headline_2: {
    background: tokens.color.button_bg_red,
    color: tokens.color.white,
  },
  dark_error_message: {
    color: tokens.color.button_bg_red,
  },
  dark_date_picker: {
    background: tokens.color.white,
  },
  dark_home_tiles: {
    background: tokens.color.black_60,
    color: tokens.color.white,
    buttonTitle: tokens.color.button_bg_red,
    borderColor: tokens.color.white,
    shadowColor: tokens.color.black,
  },
  dark_profile_item: {
    title: tokens.color.gray_lighter,
    subtitle: tokens.color.white,
  },
  dark_profile_tile: {
    background: tokens.color.black_60,
  },
};

export default themes;
