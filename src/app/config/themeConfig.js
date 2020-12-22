import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const themesConfig = {
  default: {
    palette: {
      type: "light",
      primary: {
        light: "#3b5064",
        main: "#0B253E",
        dark: "#07192b",
      },
      secondary: {
        light: "#3bb7d8",
        main: "#0BA6CF",
        dark: "#077490",
        contrastText: "#fff",
      },
      error: {
        main: red[800],
      },
    },
    status: {
      danger: red[500],
    },
    overrides: {
      MuiButton: {
        label: {},
      },
    },
  },
};

export default createMuiTheme(themesConfig.default);
