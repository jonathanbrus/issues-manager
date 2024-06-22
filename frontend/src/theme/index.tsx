"use client";

import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  typography: {
    fontFamily: ["Poppins", "Arial", "sans-serif"].join(","),

    h2: {
      fontSize: "1.5rem",
    },
  },

  palette: {
    primary: {
      main: "#7F56D8",
      contrastText: "white",
    },
  },

  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
    },
  },
});
