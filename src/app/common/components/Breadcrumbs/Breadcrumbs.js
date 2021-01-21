import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Breadcrumbs } from "@material-ui/core";
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

export default function BreadCrumb(props) {
  const classes = useStyles(props);
  const { current, prevLinks } = props;

  return (
    <div className="w-full overflow-hidden">
      <div className="flex flex-col w-full h-full">
        <Breadcrumbs
          className={classes.breadcrumbs}
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link to="/" className="text-sm font-bold no-underline">
            <HomeIcon fontSize="small" /> Home
          </Link>

          {prevLinks &&
            _.keys(prevLinks).length &&
            _.keys(prevLinks).map((k, i) => (
              <Link
                key={i}
                to={prevLinks[k]}
                className="text-sm font-bold no-underline"
              >
                <HomeIcon fontSize="small" /> {k}
              </Link>
            ))}

          <p className="text-sm font-bold">{current}</p>
        </Breadcrumbs>
      </div>
    </div>
  );
}
