import { createTheme } from "@mui/material/styles";

export const mainTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#242edb",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#F11010",
      contrastText: "#F11010",
    },
    background: {
      default: "#f9f9f9",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#232323",
      secondary: "#B2B3B9",
    },
  },
});

export const theme = createTheme(mainTheme, {
  palette: {
    lightBlue: mainTheme.palette.augmentColor({
      color: {
        main: "#797FEA",
      },
      name: "lightblue",
    }),
    darkBlue: mainTheme.palette.augmentColor({
      color: {
        main: "#3C538E",
      },
      name: "darkblue",
    }),
  },
});
