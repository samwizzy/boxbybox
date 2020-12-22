import React, { useState } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { TabPanel } from "../../../../../common/components";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DescriptionTabs(props) {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="inherit" elevation={0}>
        <Tabs
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
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. At id amet,
            felis, elementum egestas quam a. Egestas sed justo, faucibus massa
            mauris elementum tincidunt. Blandit eleifend amet velit a nibh.
            Tempor nam vel dictum mauris. Risus neque amet lacus, vel et.
            Penatibus non adipiscing nam fermentum at volutpat semper turpis
            adipiscing. Aliquet nunc dui egestas nunc interdum quis. Tristique
            aliquet condimentum erat proin mattis et, non gravida. Amet
            tincidunt viverra morbi laoreet faucibus. Amet a sed maecenas id
            pharetra vel odio. Aliquam nunc, nibh ultrices rhoncus faucibus. Sed
            pulvinar diam quisque arcu.
          </p>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h3 className="text-lg font-semibold text-gray-600 mb-4">
            Terms of Service
          </h3>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. At id amet,
            felis, elementum egestas quam a. Egestas sed justo, faucibus massa
            mauris elementum tincidunt. Blandit eleifend amet velit a nibh.
            Tempor nam vel dictum mauris. Risus neque amet lacus, vel et.
            Penatibus non adipiscing nam fermentum at volutpat semper turpis
            adipiscing. Aliquet nunc dui egestas nunc interdum quis. Tristique
            aliquet condimentum erat proin mattis et, non gravida. Amet
            tincidunt viverra morbi laoreet faucibus. Amet a sed maecenas id
            pharetra vel odio. Aliquam nunc, nibh ultrices rhoncus faucibus. Sed
            pulvinar diam quisque arcu.
          </p>
        </TabPanel>
      </div>
    </div>
  );
}
