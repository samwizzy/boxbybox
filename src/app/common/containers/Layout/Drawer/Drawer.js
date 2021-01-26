import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Avatar, Divider, Drawer, IconButton } from "@material-ui/core";
import { AppButton } from "./../../../components";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import NavigationList from "./components/NavigationList";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {},
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
}));

export default function AppDrawer(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  const { user, open, handleDrawerClose, handleOpen } = props;

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          {user.role ? (
            <Avatar className="uppercase">{user.email[0]}</Avatar>
          ) : (
            <AppButton onClick={handleOpen}>Login or Register</AppButton>
          )}
        </div>
        <Divider />
        <NavigationList user={user} handleOpen={handleOpen} />
      </Drawer>
    </div>
  );
}
