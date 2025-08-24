import { Input as TamaInput, styled } from 'tamagui';

export const Input = styled(TamaInput, {
  theme: 'input',
  fontSize: '$nm',
  fontFamily: '$heading',
  height: 'auto',
  paddingVertical: '$3.5',
  paddingHorizontal: '$3.5',
  backgroundColor: 'transparent',
  borderWidth: '$0',
});
