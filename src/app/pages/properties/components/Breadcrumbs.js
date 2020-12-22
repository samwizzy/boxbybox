import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Breadcrumbs } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    margin: theme.spacing(1, 0),
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    "& svg": {
      fill: theme.palette.secondary.main,
    },
    "& a": {
      display: "flex",
      alignItems: "center",
      color: theme.palette.secondary.main,
    },
  },
}));

export default function Banner(props) {
  const classes = useStyles(props);
  const handleClick = () => {};

  return (
    <div className="w-full overflow-hidden">
      <div className="flex flex-col w-full h-full">
        <Breadcrumbs
          className={classes.breadcrumbs}
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link href="/" onClick={handleClick} className="text-sm font-bold">
            <HomeIcon fontSize="small" /> Home
          </Link>
          <p className="text-sm font-bold">Property</p>
        </Breadcrumbs>
      </div>
    </div>
  );
}
