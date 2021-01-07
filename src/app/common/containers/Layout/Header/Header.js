import React, { Fragment, useState } from "react";
import clsx from "clsx";
import { withRouter, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../auth/store/actions";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  Toolbar,
  Icon,
  IconButton,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Popover,
} from "@material-ui/core";
import { AppButton } from "../../../components";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      "&.hide": { display: "none" },
    },
  },
  button: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  navigation: {
    "& a": {
      color: theme.palette.grey[200],
      textDecoration: "none",
      cursor: "pointer",
      "&:hover": {
        color: theme.palette.secondary.main,
        textDecoration: "none",
      },
    },
  },
}));

export default withRouter(function Header(props) {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user.data);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "auth-popover" : undefined;

  const handleOpen = () => {
    dispatch(Actions.openDialog());
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-1 items-center">
            <img
              className={clsx("img h-10 mr-8")}
              src="/assets/logo.svg"
              alt="logo"
            />

            <div
              className={clsx(
                classes.navigation,
                "sm:flex sm:flex-1 flex-grow md:space-x-8 sm:space-x-1 hidden"
              )}
            >
              <Link to="/">Home</Link>
              <Link to="/properties">Listing</Link>
              <Link to="/news">News</Link>
              <Link to="/about">About</Link>
              <Link to="/contacts">Contacts</Link>
              <Link to="/live-bids">Live Bids</Link>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <IconButton>
                <a href="https://www.facebook.com/BoxByBox/">
                  <img
                    className="h-4"
                    src="/assets/images/social/facebook.svg"
                    alt=""
                  />
                </a>
              </IconButton>
              <IconButton>
                <a href="https://www.twitter.com/BoxByBox/">
                  <img
                    className="h-4"
                    src="/assets/images/social/twitter.svg"
                    alt=""
                  />
                </a>
              </IconButton>
              <IconButton>
                <a href="https://www.instagram.com/BoxByBox/">
                  <img
                    className="h-4"
                    src="/assets/images/social/instagram.svg"
                    alt=""
                  />
                </a>
              </IconButton>
            </div>

            {user.role ? (
              <Fragment>
                <AppButton
                  aria-describedby={id}
                  onClick={handleClick}
                  color="inherit"
                  startIcon={<Avatar>{user.email[0]}</Avatar>}
                >
                  {user.email}
                  <Icon
                    className="text-16 ml-4 hidden sm:flex"
                    variant="action"
                  >
                    keyboard_arrow_down
                  </Icon>
                </AppButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Fragment>
                    <MenuItem component={Link} to="/logout">
                      <ListItemIcon className="min-w-40">
                        <Icon>lock</Icon>
                      </ListItemIcon>
                      <ListItemText className="pl-0" primary="Logout" />
                    </MenuItem>
                  </Fragment>
                </Popover>
              </Fragment>
            ) : (
              <AppButton
                onClick={handleOpen}
                className={clsx(classes.button, "hover:text-white")}
                variant="contained"
                color="secondary"
              >
                Login / Sign up
              </AppButton>
            )}

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
});
