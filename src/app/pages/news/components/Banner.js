import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Breadcrumbs, Typography } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles((theme) => ({
  root: { backgroundColor: theme.palette.secondary.main },
  title: {
    marginBottom: theme.spacing(4),
    color: theme.palette.primary.contrastText,
  },
  breadcrumbs: {
    color: theme.palette.primary.contrastText,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    "& svg": {
      fill: "#fff",
    },
    "& a": {
      display: "flex",
      alignItems: "center",
    },
  },
}));

export default function Banner(props) {
  const classes = useStyles(props);

  return (
    <div
      className={clsx(
        classes.root,
        "w-full h-52 border shadow-md overflow-hidden"
      )}
    >
      <div className="flex flex-col w-full h-full items-center justify-center">
        <Typography variant="h4" className={classes.title}>
          News List
        </Typography>

        <Breadcrumbs
          className={classes.breadcrumbs}
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link className="text-sm font-bold no-underline text-white" to="/">
            <HomeIcon fontSize="small" /> Home
          </Link>
          <h3 className="text-sm font-bold no-underline text-gray-800">News</h3>
        </Breadcrumbs>
      </div>
    </div>
  );
}
