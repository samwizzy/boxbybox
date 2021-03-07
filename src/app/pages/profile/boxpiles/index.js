import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withReducer from "../../../store/withReducer";
import reducer from "./../store/reducers";
import * as Actions from "./../store/actions";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Tabs, Tab, Toolbar } from "@material-ui/core";
import { GoBackButton } from "../../../common/components";
import SellSublotDialog from "./components/SellSublotDialog";
import ConfirmSellDialog from "./components/ConfirmSellDialog";
import MergeSublotDialog from "./components/MergeSublotDialog";
import ConfirmMergeDialog from "./components/ConfirmMergeDialog";
import ConfirmSplitDialog from "./components/ConfirmSplitDialog";
import BoxlotListing from "./boxlots/BoxlotListing";

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

function BoxPileListing(props) {
  const classes = useStyles(props);
  const [value, setValue] = useState(0);
  const params = useParams();
  const {
    property,
    userProperties,
    boxpiles,
    getPropertyById,
    getUserIpoStakeByPropertyId,
    openSellSublotDialog,
    openMergeSublotDialog,
    openConfirmMergeDialog,
    openConfirmSplitDialog,
    user,
  } = props;

  useEffect(() => {
    getPropertyById(params.propertyId);
    getUserIpoStakeByPropertyId(params.propertyId);
    return () => {};
  }, [params.propertyId, getPropertyById, getUserIpoStakeByPropertyId]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(property, "profile single property");
  console.log(userProperties, "userProperties listing");
  console.log(boxpiles, "boxpiles listing");

  return (
    <div className="container">
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Toolbar variant="dense" className={classes.toolbar}>
            <GoBackButton /> <h3 className="text-gray-800 ml-2">My Boxpiles</h3>
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
                    <AntTab label="Boxpiles" {...a11yProps(0)} />
                  </AntTabs>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={9}>
              {value === 0 && (
                <BoxlotListing
                  user={user}
                  boxpiles={boxpiles}
                  property={property}
                  openSellSublotDialog={openSellSublotDialog}
                  openMergeSublotDialog={openMergeSublotDialog}
                  openConfirmMergeDialog={openConfirmMergeDialog}
                  openConfirmSplitDialog={openConfirmSplitDialog}
                />
              )}
            </Grid>
          </Grid>

          <SellSublotDialog />
          <ConfirmSellDialog />
          <MergeSublotDialog />
          <ConfirmMergeDialog />
          <ConfirmSplitDialog />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ auth, boxpilesReducer }) => {
  return {
    properties: boxpilesReducer.property.properties,
    userProperties: boxpilesReducer.property.userProperties,
    boxpiles: boxpilesReducer.ipostakes.boxpiles,
    property: boxpilesReducer.property.property,
    user: auth.user.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUserIpoStakeByPropertyId: Actions.getUserIpoStakeByPropertyId,
      getPropertyById: Actions.getPropertyById,
      openSellSublotDialog: Actions.openSellSublotDialog,
      openMergeSublotDialog: Actions.openMergeSublotDialog,
      openConfirmMergeDialog: Actions.openConfirmMergeDialog,
      openConfirmSplitDialog: Actions.openConfirmSplitDialog,
    },
    dispatch
  );
};

export default withReducer(
  "boxpilesReducer",
  reducer
)(withRouter(connect(mapStateToProps, mapDispatchToProps)(BoxPileListing)));
