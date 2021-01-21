import React, { Fragment, useEffect } from "react";
import BoxUtils from "./../../../../utils/BoxUtils";
import _ from "lodash";
import withReducer from "./../../../../store/withReducer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import * as Actions from "./../../store/actions";
import reducer from "./../../store/reducers";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Icon,
  TextField,
  Typography,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ExploreIcon from "@material-ui/icons/Explore";
import Breadcrumbs from "../../components/Breadcrumbs";
import { DescriptionTabs } from "./tabs";
import { AppButton } from "../../../../common/components";
import QueueInBidDialog from "./components/QueueInBidDialog";
import ConfirmBidDialog from "./components/ConfirmBidDialog";

function LiveBidDetails(props) {
  const { bid, getPropertyById } = props;
  const params = useParams();

  console.log(bid, "single livebid details");
  console.log(params, "params livebid details");

  useEffect(() => {
    getPropertyById(params.id);
  }, [params, getPropertyById]);

  if (!bid) {
    return null;
  }

  return (
    <div className="container">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-6 gap-2 md:gap-6">
            <div className="col-span-6 md:col-span-4">
              <Breadcrumbs />

              <h3 className="text-gray-800 font-medium text-lg my-1 uppercase">
                {bid.title}
              </h3>

              <span className="text-xs text-gray-600 uppercase my-2">
                R003YXXEN
              </span>

              <h3 className="flex items-center text-sm font-normal text-gray-500 mb-4 mt-2">
                <LocationOnIcon color="secondary" fontSize="small" />{" "}
                {`${bid.address.city} ${bid.address.state} ${bid.address.country}`}
              </h3>

              <Fragment>
                <Card>
                  <CardHeader
                    title={
                      <AppButton
                        color="secondary"
                        variant="contained"
                        startIcon={<ExploreIcon />}
                      >
                        Take a 3D Tour
                      </AppButton>
                    }
                  />
                  <CardMedia
                    className="h-80 md:h-80"
                    image="https://image.freepik.com/free-photo/house-key-home-insurance-broker-agent-s-hand-protection_1150-14910.jpg"
                    title="Live property details"
                  />
                  <CardContent>
                    <div className="flex items-center justify-around space-x-6 overflow-x-auto">
                      {_.range(0, 4).map((thumb, i) => (
                        <Card key={i}>
                          <CardMedia
                            className="h-40 w-40"
                            image="https://image.freepik.com/free-photo/house-key-home-insurance-broker-agent-s-hand-protection_1150-14910.jpg"
                            title={`thumbnail ${i + 1}`}
                          />
                        </Card>
                      ))}
                    </div>

                    <div className="flex items-center flex-wrap mt-5">
                      <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
                        {bid.size} sqft
                      </div>
                      <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
                        <Icon fontSize="small">hotel</Icon>&nbsp;
                        {bid.bedrooms}
                      </div>
                      <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
                        <Icon fontSize="small">bathtub</Icon>&nbsp;
                        {bid.bathrooms}
                      </div>
                      <div className="flex items-center text-sm border-0 px-2">
                        <Icon fontSize="small">drive_eta</Icon>&nbsp;
                        {bid.parkingLot}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="my-8">
                  <DescriptionTabs />
                </div>
              </Fragment>
            </div>
            <div className="col-span-6 mt-4 md:mt-16 md:col-span-2">
              <Fragment>
                <h2 className="text-gray-600 text-lg font-bold mb-4">
                  {bid.title}
                </h2>
                <h3 className="flex items-center text-sm font-normal text-gray-500 mb-4 mt-2">
                  <LocationOnIcon color="secondary" fontSize="small" />{" "}
                  {`${bid.address.city} ${bid.address.state} ${bid.address.country}`}
                </h3>

                <h3 className="text-sm text-gray-600 mb-8">
                  Property ID: &nbsp; <strong>S008XXXYN</strong>
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">
                      Number of Units
                    </span>
                    <Typography color="secondary">{bid.units}</Typography>
                  </div>
                </div>

                <h4 className="text-sm font-normal text-gray-600 my-4">
                  Make your Offer
                </h4>
                <span className="flex justify-between items-center gap-6 mt-8">
                  <div>
                    <TextField
                      label="Number of Units"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs">Amount</span>
                    <Typography color="secondary">
                      {BoxUtils.formatCurrency(5000000)}
                    </Typography>
                  </div>
                </span>

                <div className="grid grid-cols-2 gap-4 mt-4"></div>
              </Fragment>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2 md:gap-6">
            <div className="col-span-6 md:col-span-4">
              <div className="w-full mb-8">
                <iframe
                  title="Box by Box"
                  width="100%"
                  height="480"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=3A%20Idowu%20Matins%20Victoria%20Island%20Lagos+(Box%20by%20Box)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QueueInBidDialog />
      <ConfirmBidDialog />
    </div>
  );
}

const mapStateToProps = ({ bidDetail }) => {
  return {
    bid: bidDetail.property.property,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getPropertyById: Actions.getPropertyById,
      openQueueInBidDialog: Actions.openQueueInBidDialog,
    },
    dispatch
  );
};

export default withReducer(
  "bidDetail",
  reducer
)(withRouter(connect(mapStateToProps, mapDispatchToProps)(LiveBidDetails)));
