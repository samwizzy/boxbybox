import React from "react";
import { withRouter } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function GoBackButton(props) {
  const { history } = props;

  const goBack = () => {
    history.goBack();
  };

  return (
    <IconButton onClick={goBack}>
      <ArrowBackIcon />
    </IconButton>
  );
}

export default withRouter(GoBackButton);
