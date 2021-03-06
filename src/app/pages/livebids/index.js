import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect, useDispatch } from "react-redux";
import withReducer from "./../../store/withReducer";
import reducer from "./store/reducers";
import * as Actions from "./store/actions";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, IconButton, Tabs, Tab, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { AppBreadcrumbs, TabPanel } from "../../common/components";
import RentForm from "./components/RentForm";
import ActiveBids from "./tabs/ActiveBids";
import ExpiredBids from "./tabs/ExpiredBids";
import QueueInBidDialog from "./components/QueueInBidDialog";

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
  const { bids, openQueueInBidDialog } = props;
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  console.log(bids, "bids state live");

  useEffect(() => {
    dispatch(Actions.getBids());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const activeBids = bids.filter((bid) => bid.status === "ACTIVE");
  const expiredBids = bids.filter((bid) => bid.status === "EXPIRED");

  return (
    <div className={clsx(classes.root, "container")}>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-6 gap-2 md:gap-6">
            <div className="col-span-6 mt-16 md:col-span-2">
              <RentForm />
            </div>
            <div className="col-span-6 md:col-span-4">
              <Toolbar className={classes.toolbar}>
                <AppBreadcrumbs current="Live bids" />
                <div className="w-full" />
                <IconButton color="secondary" className="focus:outline-none">
                  <MenuIcon />
                </IconButton>
              </Toolbar>

              <AppBar position="static" color="inherit" elevation={0}>
                <Tabs
                  className={classes.tabs}
                  value={value}
                  onChange={handleTabChange}
                  aria-label="live-bids"
                >
                  <Tab
                    label={`Active Bids ( ${activeBids.length} )`}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label={`Expired Bids ( ${expiredBids.length} )`}
                    {...a11yProps(1)}
                  />
                </Tabs>
              </AppBar>
              <div>
                <TabPanel value={value} index={0} nopadding>
                  <ActiveBids
                    bids={activeBids}
                    openQueueInBidDialog={openQueueInBidDialog}
                  />
                </TabPanel>
                <TabPanel value={value} index={1} nopadding>
                  <ExpiredBids
                    bids={expiredBids}
                    openQueueInBidDialog={openQueueInBidDialog}
                  />
                </TabPanel>
              </div>
            </div>
          </div>

          <QueueInBidDialog />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ livebidsApp }) => {
  return {
    bids: livebidsApp.bids.bids,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      openQueueInBidDialog: Actions.openQueueInBidDialog,
    },
    dispatch
  );
};

export default withReducer(
  "livebidsApp",
  reducer
)(connect(mapStateToProps, mapDispatchToProps)(Bids));
