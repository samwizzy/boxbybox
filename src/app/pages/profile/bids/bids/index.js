import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./../../store/actions";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { TabPanel } from "../../../../common/components";
import ActiveBids from "./components/ActiveBids";
import ExpiredBids from "./components/ExpiredBids";

const useStyles = makeStyles((theme) => ({
  root: {},
  tabs: {
    "& button": {
      "&:last-child": {
        marginLeft: theme.spacing(2),
      },
      "&:focus": {
        outline: "none",
      },
    },
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const dummyBids = {
  entities: [
    {
      id: 1,
      title: "4 BEDROOM DUPLEX",
      address: { country: "Nigeria", state: "Lagos", city: "Lekki" },
    },
    {
      id: 1,
      title: "4 BEDROOM DUPLEX",
      address: { country: "Nigeria", state: "Lagos", city: "Lekki" },
    },
  ],
};

function Bids(props) {
  const classes = useStyles(props);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const bids = useSelector(({ bidsApp }) => bidsApp.property.properties);

  console.log(bids, "bids state live");

  useEffect(() => {
    dispatch(Actions.getProperties());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!bids) {
    return null;
  }

  return (
    <div className={clsx(classes.root, "container")}>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-6 gap-2 md:gap-6">
            <div className="col-span-6 md:col-span-6">
              <AppBar position="static" color="inherit" elevation={0}>
                <Tabs
                  className={classes.tabs}
                  value={value}
                  onChange={handleTabChange}
                  aria-label="live-bids"
                >
                  <Tab label="Active Bids ( 30 )" {...a11yProps(0)} />
                  <Tab label="Expired Bids ( 10 )" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <div>
                <TabPanel value={value} index={0} nopadding>
                  <ActiveBids bids={dummyBids} />
                </TabPanel>
                <TabPanel value={value} index={1} nopadding>
                  <ExpiredBids bids={dummyBids} />
                </TabPanel>
              </div>

              <div className="flex items-center justify-center mt-16">
                <Pagination count={10} variant="outlined" color="secondary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bids;
