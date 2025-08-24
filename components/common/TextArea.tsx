import { TextArea as TamaTextArea, styled } from 'tamagui';

export const TextArea = styled(TamaTextArea, {
  name: 'TextArea',
  theme: 'text_area',
  color: '$colorFocus',
  placeholderTextColor: '$color',
  variants: {
    font: {
      heading: {
        fontFamily: '$heading',
      },
      headingLight: {
        fontFamily: '$headingLight',
      },
      headingBold: {
        fontFamily: '$headingBold',
      },
      headingSemiBold: {
        fontFamily: '$headingSemiBold',
      },
      headingExtraBold: {
        fontFamily: '$headingExtraBold',
      },
      body: {
        fontFamily: '$body',
      },
      bodyBold: {
        fontFamily: '$bodyBold',
      },
      bodySemiBold: {
        fontFamily: '$bodySemiBold',
      },
    },
    size: {
      smallest: {
        fontSize: '$smallest',
      },
      extra_small: {
        fontSize: '$xs',
      },
      small: {
        fontSize: '$sm',
      },
      normal: {
        fontSize: '$nm',
      },
      medium: {
        fontSize: '$md',
      },
      large: {
        fontSize: '$lg',
      },
      extra_large: {
        fontSize: '$xl',
      },
      double_extra_large: {
        fontSize: '$2xl',
      },
      triple_extra_large: {
        fontSize: '$3xl',
      },
      largest: {
        fontSize: '$largest',
      },
    },
    weight: {
      light: {
        fontWeight: '$light',
      },
      normal: {
        fontWeight: '$normal',
      },
      bold: {
        fontWeight: '$bold',
      },
      bolder: {
        fontWeight: '$bolder',
      },
      semibold: {
        fontWeight: '$semibold',
      },
    },
  },
});
