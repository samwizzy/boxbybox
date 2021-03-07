import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Actions from "./../../store/actions";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { TabPanel } from "../../../../common/components";
import ActiveBids from "./components/ActiveBids";
import ExpiredBids from "./components/ExpiredBids";
import CounteredBids from "./components/CounteredBids";
import CounterBidDialog from "./../components/CounterBidDialog";
import UpdateBidDialog from "./../components/UpdateBidDialog";

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

function Bids(props) {
  const classes = useStyles(props);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const { bids } = props;

  console.log(bids, "bids state live");

  useEffect(() => {
    dispatch(Actions.getBids());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

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
                  <Tab
                    label={`Active Bids ( ${bids.length} )`}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label={`Expired Bids ( ${bids.length} )`}
                    {...a11yProps(1)}
                  />
                  <Tab
                    label={`Countered Bids ( ${bids.length} )`}
                    {...a11yProps(2)}
                  />
                </Tabs>
              </AppBar>
              <div>
                <TabPanel value={value} index={0} nopadding>
                  <ActiveBids bids={bids} />
                </TabPanel>
                <TabPanel value={value} index={1} nopadding>
                  <ExpiredBids bids={bids} />
                </TabPanel>
                <TabPanel value={value} index={2} nopadding>
                  <CounteredBids bids={bids} />
                </TabPanel>
              </div>
            </div>
          </div>
        </div>

        <CounterBidDialog />
        <UpdateBidDialog />
      </div>
    </div>
  );
}

export default Bids;
