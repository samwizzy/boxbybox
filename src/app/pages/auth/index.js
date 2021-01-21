import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    dispatch(Actions.getCountries());
    return () => {};
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <Dialog
      open={dialog.open}
      onClose={() => dispatch(Actions.closeDialog())}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
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
        <Login handleTabChange={handleTabChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Register handleTabChange={handleTabChange} />
      </TabPanel>
    </Dialog>
  );
}

export default AuthDialog;
// export default function Auth() {
//   return ReactDOM.createPortal(
//     <AuthDialog />,
//     document.getElementById("portal-root")
//   );
// }
