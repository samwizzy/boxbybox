import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "./../../../store/withReducer";
import reducer from "./../store/reducers";
import * as Actions from "./../store/actions";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { TabPanel } from "../../../common/components";
import ProfileSidebar from "./../components/ProfileSidebar";
import MyBids from "./bids";
import MyOffers from "./offers";

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
  toolbar: { padding: 0 },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Bids(props) {
  const classes = useStyles(props);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const bids = useSelector(({ bidsApp }) => bidsApp.bids.bids);
  const offers = useSelector(({ bidsApp }) => bidsApp.offers.offers);

  console.log(bids, "bids state live");
  console.log(offers, "offers state live");

  useEffect(() => {
    dispatch(Actions.getBids());
    dispatch(Actions.getOffers());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={clsx(classes.root, "container")}>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-6 gap-2 md:gap-6">
            <div className="col-span-6 md:col-span-2">
              <ProfileSidebar />
            </div>
            <div className="col-span-6 md:col-span-4">
              <AppBar position="static" color="inherit" elevation={0}>
                <Tabs
                  className={classes.tabs}
                  value={value}
                  onChange={handleTabChange}
                  centered
                  aria-label="live-bids"
                >
                  <Tab label="Live Bids" {...a11yProps(0)} />
                  <Tab label="Offers Received" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <div>
                <TabPanel value={value} index={0} nopadding>
                  <MyBids bids={bids} />
                </TabPanel>
                <TabPanel value={value} index={1} nopadding>
                  <MyOffers offers={offers} />
                </TabPanel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withReducer("bidsApp", reducer)(Bids);
