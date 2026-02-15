import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
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
