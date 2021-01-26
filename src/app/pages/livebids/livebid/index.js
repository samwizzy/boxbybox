import React, { Fragment, useEffect } from "react";
import BoxUtils from "./../../../utils/BoxUtils";
import _ from "lodash";
import withReducer from "./../../../store/withReducer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import * as Actions from "./../store/actions";
import reducer from "./../store/reducers";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Icon,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ExploreIcon from "@material-ui/icons/Explore";
import Breadcrumbs from "./../components/Breadcrumbs";
import { DescriptionTabs } from "./tabs";
import { AppButton } from "../../../common/components";
import QueueInBidDialog from "./components/QueueInBidDialog";
import ConfirmBidDialog from "./components/ConfirmBidDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    backgroundColor: "#fcfcfb",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
  },
}));

function LiveBidDetails(props) {
  const classes = useStyles(props);
  const { bid, getBidById } = props;
  const params = useParams();

  console.log(bid, "single livebid details");
  console.log(params, "params livebid details");

  useEffect(() => {
    getBidById(params.id);
  }, [params, getBidById]);

  return (
    <div className="container">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-6 gap-2 md:gap-6">
            <div className="col-span-6 md:col-span-4">
              <Breadcrumbs />

              <h3 className="text-gray-800 text-lg my-1 uppercase">
                {bid ? bid.title : <Skeleton />}
              </h3>

              <span className="text-xs text-gray-600 uppercase my-2">
                {bid ? bid.propertyRef : <Skeleton />}
              </span>

              {bid ? (
                <h3 className="flex items-center text-sm font-normal text-gray-500 mb-4 mt-2">
                  <LocationOnIcon color="secondary" fontSize="small" />{" "}
                  {`${bid.address.city} ${bid.address.state} ${bid.address.country}`}
                </h3>
              ) : (
                <Skeleton />
              )}

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
                      {bid ? (
                        <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
                          {bid.size} sqft
                        </div>
                      ) : (
                        <Skeleton />
                      )}
                      {bid ? (
                        <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
                          <Icon fontSize="small">hotel</Icon>&nbsp;
                          {bid.bedrooms}
                        </div>
                      ) : (
                        <Skeleton />
                      )}
                      {bid ? (
                        <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
                          <Icon fontSize="small">bathtub</Icon>&nbsp;
                          {bid.bathrooms}
                        </div>
                      ) : (
                        <Skeleton />
                      )}
                      {bid ? (
                        <div className="flex items-center text-sm border-0 px-2">
                          <Icon fontSize="small">drive_eta</Icon>&nbsp;
                          {bid.parkingLot ? "Yes" : "No"}
                        </div>
                      ) : (
                        <Skeleton />
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="my-8">
                  <DescriptionTabs bid={bid} />
                </div>
              </Fragment>
            </div>
            <div className="col-span-6 mt-4 md:mt-16 md:col-span-2">
              <Fragment>
                {bid ? (
                  <h2 className="text-gray-600 text-lg mb-4">{bid.title}</h2>
                ) : (
                  <Skeleton />
                )}
                {bid ? (
                  <h3 className="flex items-center text-sm font-normal text-gray-500 mb-4 mt-2">
                    <LocationOnIcon color="secondary" fontSize="small" />{" "}
                    {`${bid.address.city} ${bid.address.state} ${bid.address.country}`}
                  </h3>
                ) : (
                  <Skeleton />
                )}
                {bid ? (
                  <h3 className="text-sm text-gray-600 mb-4">
                    Property ID: &nbsp; <strong>{bid.propertyRef}</strong>
                  </h3>
                ) : (
                  <Skeleton />
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">
                      Number of Units
                    </span>
                    {bid ? (
                      <Typography color="secondary">{bid.units}</Typography>
                    ) : (
                      <Skeleton />
                    )}
                  </div>
                </div>

                <div className="bg-gray-100 px-4 py-8 my-4">
                  <h4 className="text-sm font-normal text-gray-600">
                    Make your Offer
                  </h4>
                  <span className="flex justify-between items-center gap-6 mt-4 mb-4">
                    <div>
                      <TextField
                        label="Number of Units"
                        variant="outlined"
                        size="small"
                        fullWidth
                        InputProps={{ classes }}
                      />
                    </div>
                    <div>
                      <span className="text-xs">Amount</span>
                      {bid ? (
                        <Typography color="secondary">
                          {BoxUtils.formatCurrency(5000000)}
                        </Typography>
                      ) : (
                        <Skeleton />
                      )}
                    </div>
                  </span>
                  <div className="flex justify-center">
                    <AppButton variant="contained" color="secondary">
                      bid
                    </AppButton>
                  </div>
                </div>

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
    bid: bidDetail.bids.bid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getBidById: Actions.getBidById,
      openQueueInBidDialog: Actions.openQueueInBidDialog,
    },
    dispatch
  );
};

export default withReducer(
  "bidDetail",
  reducer
)(withRouter(connect(mapStateToProps, mapDispatchToProps)(LiveBidDetails)));
