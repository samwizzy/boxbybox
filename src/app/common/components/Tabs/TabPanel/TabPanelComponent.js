import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";

export default function TabPanelComponent(props) {
  const { children, nopadding, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={nopadding ? 0 : 3}>{children}</Box>}
    </div>
  );
}

TabPanelComponent.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
