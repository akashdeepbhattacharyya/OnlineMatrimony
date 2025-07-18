import {createTheme} from '@rneui/themed';  // ← Uncomment this line

const theme = createTheme({
  lightColors: {
    primary: '#e7e7e8',
  },
  darkColors: {
    primary: '#000',
  },
  mode: 'dark',
});

export {theme};