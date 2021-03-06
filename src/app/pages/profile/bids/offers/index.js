import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Actions from "./../../store/actions";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { TabPanel } from "../../../../common/components";
import ActiveOffers from "./components/ActiveOffers";
import ExpiredOffers from "./components/ExpiredOffers";
import AcceptedOffers from "./components/AcceptedOffers";
import RejectedOffers from "./components/RejectedOffers";
import OfferDialog from "./dialogs/OfferDialog";
import BidPaymentDialog from "./dialogs/BidPaymentDialog";
import ConfirmBidDialog from "./dialogs/ConfirmBidDialog";

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

function Offers(props) {
  const classes = useStyles(props);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const { offers } = props;

  console.log(offers, "offers state live");

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
                  aria-label="live-offers"
                >
                  <Tab
                    label={`Active Offers ( ${offers.length} )`}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label={`Accepted Offers ( ${offers.length} )`}
                    {...a11yProps(1)}
                  />
                  <Tab
                    label={`Rejected Offers ( ${offers.length} )`}
                    {...a11yProps(2)}
                  />
                  <Tab
                    label={`Expired Offers ( ${offers.length} )`}
                    {...a11yProps(3)}
                  />
                </Tabs>
              </AppBar>
              <div>
                <TabPanel value={value} index={0} nopadding>
                  <ActiveOffers offers={offers} />
                </TabPanel>
                <TabPanel value={value} index={1} nopadding>
                  <AcceptedOffers offers={offers} />
                </TabPanel>
                <TabPanel value={value} index={2} nopadding>
                  <RejectedOffers offers={offers} />
                </TabPanel>
                <TabPanel value={value} index={3} nopadding>
                  <ExpiredOffers offers={offers} />
                </TabPanel>
              </div>
            </div>
          </div>

          <OfferDialog />
          <BidPaymentDialog />
          <ConfirmBidDialog />
        </div>
      </div>
    </div>
  );
}

export default Offers;
