import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import themeConfig from "../../../config/themeConfig";

class Theme extends React.Component {
  render() {
    const { children } = this.props;

    return <MuiThemeProvider theme={themeConfig}>{children}</MuiThemeProvider>;
  }
}

export default Theme;
