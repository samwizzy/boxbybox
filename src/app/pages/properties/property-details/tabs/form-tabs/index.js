import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { TabPanel } from "../../../../../common/components";
import AgentContactForm from "./components/AgentContactForm";

const useStyles = makeStyles((theme) => ({
  root: {},
  tabs: {
    "& button": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.contrastText,
      "&:last-child": {
        marginLeft: theme.spacing(2),
      },
      "&:focus": {
        outline: "none",
      },
      fontSize: theme.typography.caption.fontSize,
    },
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function FormTabs(props) {
  const classes = useStyles(props);
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="inherit" elevation={0}>
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleTabChange}
          aria-label="simple tabs example"
        >
          <Tab label="Book Appointment" {...a11yProps(0)} />
          <Tab label="Tenant Code of Conduct" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <div>
        <TabPanel value={value} nopadding index={0}>
          <AgentContactForm />
        </TabPanel>
        <TabPanel value={value} nopadding index={1}>
          <AgentContactForm />
        </TabPanel>
      </div>
    </div>
  );
}
