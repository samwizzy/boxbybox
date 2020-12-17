import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Link } from "@material-ui/core";
import { AppButton } from "../../../components";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      "&.hide": { display: "none" },
    },
  },
  navigation: {
    "& a": {
      color: theme.palette.grey[200],
      textDecoration: "none",
      "&:hover": {
        color: theme.palette.primary.contrastText,
        textDecoration: "none",
      },
    },
  },
}));

export default function Header(props) {
  const classes = useStyles(props);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-1 items-center">
            <img
              className={clsx("img h-10 mr-8")}
              src="assets/logo.svg"
              alt="logo"
            />

            <div
              className={clsx(
                classes.navigation,
                "sm:flex sm:flex-1 flex-grow md:space-x-8 sm:space-x-1 hidden"
              )}
            >
              <Link href="/" variant="subtitle2">
                Home
              </Link>
              <Link href="/listing" variant="subtitle2">
                Listing
              </Link>
              <Link href="/news" variant="subtitle2">
                News
              </Link>
              <Link href="/about" variant="subtitle2">
                About
              </Link>
              <Link href="/contacts" variant="subtitle2">
                Contacts
              </Link>
              <Link href="/live-bids" variant="subtitle2">
                Live Bids
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex">
              <IconButton>
                <img
                  className="h-4"
                  src="assets/images/social/facebook.svg"
                  alt=""
                />
              </IconButton>
              <IconButton>
                <img
                  className="h-4"
                  src="assets/images/social/twitter.svg"
                  alt=""
                />
              </IconButton>
              <IconButton>
                <img
                  className="h-4"
                  src="assets/images/social/instagram.svg"
                  alt=""
                />
              </IconButton>
            </div>
            <AppButton>Login / Sign up</AppButton>

            <IconButton
              className={clsx(
                classes.menuButton,
                { hide: true },
                "focus:outline-none"
              )}
              edge="end"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
