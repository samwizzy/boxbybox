import React, { useState } from "react";
import { AppBar, Divider, Tabs, Tab } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { TabPanel } from "../../../../../common/components";

const useStyles = makeStyles((theme) => ({
  tabs: {
    "& .MuiTab-root": {
      "&:focus": { outline: "none" },
    },
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DescriptionTabs({ property }, props) {
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
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Terms of Service" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <div>
        <TabPanel value={value} index={0}>
          <h3 className="text-lg font-semibold text-gray-600 mb-4">
            Description
          </h3>
          {property ? (
            <p className="text-sm text-gray-600">{property.description}</p>
          ) : (
            <Skeleton />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h3 className="text-lg font-semibold text-gray-600 mb-4">
            Terms of Service
          </h3>
          <p className="text-base text-gray-800">
            The Property Owner desires to engage the Property Manager to
            supervise, manage, lease, operate, and maintain the Project.
          </p>
          <p className="text-sm text-gray-800">
            NOW, THEREFORE, for good and valuable consideration, the receipt and
            sufficiency of which is hereby acknowledged, the parties agree as
            follows:
          </p>

          <div className="my-4">
            <Divider />
          </div>

          <p className="text-xs text-gray-600">
            1. Commencement and Termination Dates.
          </p>
          <p className="text-xs text-gray-600">
            1.1 Commencement and Termination. The Property Manager’s duties and
            responsibilities under this Agreement shall begin on the Effective
            Date.
          </p>
        </TabPanel>
      </div>
    </div>
  );
}
