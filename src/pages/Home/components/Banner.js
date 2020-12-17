import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppButton } from "../../../common/components";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    marginBottom: theme.spacing(4),
    color: theme.palette.primary.contrastText,
  },
  button: {
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
}));

export default function Banner(props) {
  const classes = useStyles(props);

  return (
    <div className="bg-indigo-500 w-full h-96 border shadow-md overflow-hidden">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <Typography variant="h4" className={classes.title}>
          Real estate for all
        </Typography>
        <AppButton className={classes.button}>Take a tour</AppButton>
      </div>
    </div>
  );
}
