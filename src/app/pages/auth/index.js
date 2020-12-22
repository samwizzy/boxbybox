import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Dialog, Tabs, Tab } from "@material-ui/core";
import * as Actions from "../../auth/store/actions";
import { TabPanel } from "./../../common/components";
import Login from "./login";
import Register from "./register";

const useStyles = makeStyles((theme) => ({
  root: {},
  tabs: {},
  screen: {
    backgroundImage:
      "url(https://image.freepik.com/free-photo/house-key-home-insurance-broker-agent-s-hand-protection_1150-14910.jpg)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function AuthDialog(props) {
  const classes = useStyles(props);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const dialog = useSelector((store) => store.auth.login.authDialog);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      open={dialog.open}
      onClose={() => dispatch(Actions.closeDialog())}
      aria-labelledby="form-dialog-title"
    >
      <AppBar position="static" color="inherit" elevation={0}>
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleTabChange}
          centered
          aria-label="simple tabs example"
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Register" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Login />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Register />
      </TabPanel>
    </Dialog>
  );
}

export default function Auth() {
  return ReactDOM.createPortal(
    <AuthDialog />,
    document.getElementById("portal-root")
  );
}
