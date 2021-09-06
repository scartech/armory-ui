import { createTheme } from '@material-ui/core';
import { lightGreen, deepPurple } from '@material-ui/core/colors';

export const theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: lightGreen,
  },
  typography: {
    fontFamily: 'Quicksand',
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});
