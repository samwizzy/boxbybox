import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withReducer from "../../../store/withReducer";
import reducer from "./../store/reducers";
import * as Actions from "./../store/actions";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Tabs, Tab, Toolbar } from "@material-ui/core";
import { GoBackButton } from "../../../common/components";
import SellSublotDialog from "./components/SellSublotDialog";
import MergeSublotDialog from "./components/MergeSublotDialog";
import ConfirmMergeDialog from "./components/ConfirmMergeDialog";
import ConfirmSellDialog from "./components/ConfirmSellDialog";
import ConfirmSplitDialog from "./components/ConfirmSplitDialog";
import BoxlotListing from "./boxlots/BoxlotListing";
import RentalListing from "./rentals/RentalListing";
import SalesListing from "./sales/SalesListing";

const AntTabs = withStyles((theme) => ({
  flexContainer: {
    flexDirection: "column",
  },
  indicator: {
    backgroundColor: theme.palette.secondary.main,
    left: 0,
    top: 0,
  },
}))(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: "100%",
    "&:hover": {
      color: theme.palette.secondary.main,
      opacity: 1,
    },
    "&$selected": {
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: theme.palette.secondary.main,
      outline: 0,
    },
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    "& img:first-child": {
      marginRight: 10,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    "& td": {
      border: 0,
    },
  },
  toolbar: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
}));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function PropertyListing(props) {
  const classes = useStyles(props);
  const [value, setValue] = useState(0);
  const {
    userIpoStakedProperties,
    userPropertiesOnRent,
    userPropertiesOnSale,
    getUserPropertiesWithIpoStake,
    getPropertiesOnRent,
    getPropertiesOnSale,
    openSellSublotDialog,
    openMergeSublotDialog,
    openConfirmSplitDialog,
  } = props;

  useEffect(() => {
    getUserPropertiesWithIpoStake();
    getPropertiesOnRent();
    getPropertiesOnSale();
    return () => {};
  }, [getUserPropertiesWithIpoStake, getPropertiesOnRent, getPropertiesOnSale]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container">
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Toolbar variant="dense" className={classes.toolbar}>
            <GoBackButton />
            <h3 className="text-gray-800 ml-2">My Listing</h3>
          </Toolbar>

          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <AntTabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleTabChange}
                    aria-label="ant example"
                    className={classes.tabs}
                  >
                    <AntTab label="Boxlots" {...a11yProps(0)} />
                    <AntTab label="My Rental Listing" {...a11yProps(1)} />
                    <AntTab label="My Sales Listing" {...a11yProps(2)} />
                  </AntTabs>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={9}>
              {value === 0 && (
                <BoxlotListing
                  properties={userIpoStakedProperties}
                  openSellSublotDialog={openSellSublotDialog}
                  openMergeSublotDialog={openMergeSublotDialog}
                  openConfirmSplitDialog={openConfirmSplitDialog}
                />
              )}
              {value === 1 && (
                <RentalListing
                  properties={userPropertiesOnRent}
                  openSellSublotDialog={openSellSublotDialog}
                  openMergeSublotDialog={openMergeSublotDialog}
                />
              )}
              {value === 2 && (
                <SalesListing
                  properties={userPropertiesOnSale}
                  openSellSublotDialog={openSellSublotDialog}
                  openMergeSublotDialog={openMergeSublotDialog}
                />
              )}
            </Grid>
          </Grid>

          <SellSublotDialog />
          <MergeSublotDialog />
          <ConfirmMergeDialog />
          <ConfirmSellDialog />
          <ConfirmSplitDialog />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ profileListing }) => {
  return {
    userIpoStakedProperties: profileListing.property.userIpoStakedProperties,
    userPropertiesOnRent: profileListing.property.userPropertiesOnRent,
    userPropertiesOnSale: profileListing.property.userPropertiesOnSale,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUserPropertiesWithIpoStake: Actions.getUserPropertiesWithIpoStake,
      getPropertiesOnRent: Actions.getPropertiesOnRent,
      getPropertiesOnSale: Actions.getPropertiesOnSale,
      openSellSublotDialog: Actions.openSellSublotDialog,
      openMergeSublotDialog: Actions.openMergeSublotDialog,
      openConfirmSplitDialog: Actions.openConfirmSplitDialog,
    },
    dispatch
  );
};

export default withReducer(
  "profileListing",
  reducer
)(withRouter(connect(mapStateToProps, mapDispatchToProps)(PropertyListing)));
