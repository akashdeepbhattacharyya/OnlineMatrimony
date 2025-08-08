import { tokens } from './tokens';
import type { TamaguiBaseTheme, Variable } from 'tamagui';
import { config as tamaguiConfig } from '@tamagui/config/v3';

export type BaseTheme = {
  placeholder: string | Variable<any>;
  unselected: string | Variable<any>;
  buttonTitle: string | Variable<any>;
  title: string | Variable<any>;
  subtitle: string | Variable<any>;
  description: string | Variable<any>;
} & TamaguiBaseTheme &
  SwitchTheme;

type SwitchTheme = {
  backgroundOff: string | Variable<any>;
  backgroundOn: string | Variable<any>;
  thumbOn: string | Variable<any>;
  thumbOff: string | Variable<any>;
  borderColorOn: string | Variable<any>;
  borderColorOff: string | Variable<any>;
};

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
  dark_secondary_button: {
    background: tokens.color.transparent,
    color: tokens.color.white,
    borderColor: tokens.color.white,
  },
  dark_primary_button: {
    background: tokens.color.button_bg_red,
    color: tokens.color.white,
    borderColor: tokens.color.button_bg_red,
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
    background: tokens.color.gray_lighter,
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
  dark_select: {
    background: tokens.color.primary,
    color: tokens.color.black,
    placeholder: tokens.color.gray_lighter,
  },
  dark_select_selected_item: {
    background: tokens.color.primary,
    color: tokens.color.button_bg_red,
  },
  dark_select_unselected_item: {
    background: tokens.color.primary,
    color: tokens.color.white,
  },
  dark_text_area: {
    background: tokens.color.white,
    colorFocus: tokens.color.black,
    color: tokens.color.gray_lighter,
  },
  dark_image_picker: {
    background: tokens.color.primary,
  },
  dark_image_picker_close_button: {
    color: tokens.color.primary,
  },
  dark_image_picker_photo_library_button: {
    background: tokens.color.button_bg_red,
    borderColor: tokens.color.button_bg_red,
    color: tokens.color.white,
  },
  dark_image_picker_take_photo_button: {
    background: tokens.color.transparent,
    borderColor: tokens.color.white,
    color: tokens.color.white,
  },
  dark_settings_item_title: {
    color: tokens.color.white,
  },
  dark_settings_item_value: {
    color: tokens.color.button_bg_red,
  },
  dark_settings_terms_and_conditions: {
    color: tokens.color.gray_lighter,
  },
  dark_slider: {
    color: tokens.color.gray_lighter,
    colorFocus: tokens.color.button_bg_red,
  },
  dark_tile_header: {
    color: tokens.color.white,
  },
  dark_tile_header_right_button: {
    color: tokens.color.button_bg_red,
  },
  dark_select_light_mode: {
    background: tokens.color.white,
    color: tokens.color.black,
    placeholder: tokens.color.gray_lighter,
  },
  dark_select_dark_mode: {
    background: tokens.color.transparent,
    color: tokens.color.white,
    placeholder: tokens.color.white,
  },
  dark_notification_item: {
    title: tokens.color.white,
    backgroundOff: tokens.color.primary,
    backgroundOn: tokens.color.button_bg_red,
    thumbOn: tokens.color.white,
    thumbOff: tokens.color.gray_lighter,
    borderColorOn: tokens.color.white,
    borderColorOff: tokens.color.gray_dark,
  },
  dark_hide_delete_profile_item: {
    title: tokens.color.gray_lighter,
    subtitle: tokens.color.white,
    description: tokens.color.gray_lighter,
    buttonTitle: tokens.color.button_bg_red,
  },
};

export default themes;
