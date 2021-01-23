import React, { Fragment, useEffect } from "react";
import BoxUtils from "./../../../utils/BoxUtils";
import clsx from "clsx";
import _ from "lodash";
import withReducer from "./../../../store/withReducer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link, useParams, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import * as Actions from "./../store/actions";
import reducer from "./../store/reducers";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Icon,
  Typography,
  Slider,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ExploreIcon from "@material-ui/icons/Explore";
import { FormTabs, DescriptionTabs } from "./tabs";
import {
  AppButton,
  AppBreadcrumbs,
  FeaturedCard,
  LandscapeCard,
} from "../../../common/components";
import BidPaymentDialog from "./components/BidPaymentDialog";
import BuyIpoStakeDialog from "./components/BuyIpoStakeDialog";
import QueueInBidDialog from "./components/QueueInBidDialog";
import ConfirmBidDialog from "./components/ConfirmBidDialog";
import ConfirmIpoStakeDialog from "./components/ConfirmIpoStakeDialog";

const useStyles = makeStyles((theme) => ({
  root: {},
  birdview: {
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: console.log(theme, "theme"),
  },
  media: {
    backgroundSize: "80px",
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  button: {
    marginBottom: theme.spacing(2),
    borderRadius: 0,
  },
  rail: {
    height: theme.spacing(1),
    borderRadius: 4,
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  thumb: {
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -3,
    marginLeft: -3, //&$active
    "&:focus, &:hover, &:active": {
      boxShadow: "inherit",
    },
  },
}));

function PropertyDetails(props) {
  const classes = useStyles(props);
  const {
    getProperties,
    properties,
    property,
    getPropertyById,
    openIpoStakeDialog,
    openBidPaymentDialog,
    openQueueInBidDialog,
    match,
  } = props;
  const params = useParams();

  console.log(property, "single property details");

  useEffect(() => {
    getProperties();
  }, [getProperties]);

  useEffect(() => {
    getPropertyById(params.id);
  }, [params, getPropertyById]);

  return (
    <div className="container bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-6 gap-2 md:gap-6">
          <div className="col-span-6 md:col-span-4">
            <AppBreadcrumbs
              prevLinks={{ properties: "/properties" }}
              current={property && property.propertyRef}
            />

            <h3 className="text-gray-600 text-lg mt-2 uppercase">
              {property ? property.title : <Skeleton />}
            </h3>

            <span className="text-xs text-gray-600 uppercase mt-2">
              {property ? property.propertyRef : <Skeleton />}
            </span>

            <div className="mb-2 mt-1">
              {property ? (
                <h3 className="flex items-center text-xs font-normal text-gray-500">
                  <LocationOnIcon color="secondary" fontSize="small" />{" "}
                  {property.address.city} {property.address.state}{" "}
                  {property.address.country}
                </h3>
              ) : (
                <Skeleton />
              )}
            </div>

            <Fragment>
              <Card>
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
                      {property ? property.size : <Skeleton />} sqft
                    </div>
                    <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
                      <Icon fontSize="small">hotel</Icon>&nbsp;
                      {property ? property.bedrooms : <Skeleton />}
                    </div>
                    <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
                      <Icon fontSize="small">bathtub</Icon>&nbsp;
                      {property ? property.bathrooms : <Skeleton />}
                    </div>
                    <div className="flex items-center text-sm border-0 px-2">
                      <Icon fontSize="small">drive_eta</Icon>&nbsp;
                      {property ? property.parkingLot : <Skeleton />}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="my-8">
                <DescriptionTabs property={property} />
              </div>
            </Fragment>
          </div>
          <div className="col-span-6 mt-4 md:mt-16 md:col-span-2">
            {property ? (
              <Fragment>
                {property.feature === "RENT" ? (
                  <Fragment>
                    <h2 className="text-gray-600 text-lg font-bold mb-4">
                      Contact Agent
                    </h2>

                    <Card
                      className="grid grid-cols-2 gap-4 mb-4"
                      square
                      elevation={1}
                    >
                      <CardMedia
                        className={clsx(classes.media, "bg-center")}
                        image="https://www.flaticon.com/svg/static/icons/svg/3048/3048127.svg"
                        title="Agent contact"
                      />
                      <CardContent>
                        <Typography variant="subtitle1">Chika Uzo</Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                          Agent
                        </Typography>
                      </CardContent>
                    </Card>

                    <h3 className="text-sm text-gray-600 font-medium my-4">
                      {property ? property.createdBy.email : <Skeleton />}
                    </h3>

                    <div className="mb-12 md:mb-0">
                      <FormTabs />
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <h2 className="text-gray-600 text-lg mb-2">
                      {property ? property.title : <Skeleton />}
                    </h2>
                    <h3 className="flex items-center text-sm font-normal text-gray-500 mb-2">
                      <LocationOnIcon color="secondary" fontSize="small" />{" "}
                      {property ? (
                        `${property.address.city} ${property.address.state} ${property.address.country}`
                      ) : (
                        <Skeleton />
                      )}
                    </h3>

                    <h3 className="text-sm text-gray-600 mb-4">
                      Property ID: &nbsp;{" "}
                      {property ? (
                        <strong>{property.propertyRef}</strong>
                      ) : (
                        <Skeleton />
                      )}
                    </h3>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-600">
                          Current Market Price
                        </span>
                        {property ? (
                          <Typography color="secondary">
                            {BoxUtils.formatCurrency(property.price)}
                          </Typography>
                        ) : (
                          <Skeleton />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-600">
                          Price per unit
                        </span>
                        {property ? (
                          <Typography color="secondary">
                            {BoxUtils.formatCurrency(property.price)}
                          </Typography>
                        ) : (
                          <Skeleton />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-600">
                          Number of Units
                        </span>
                        {property ? (
                          <Typography color="secondary">
                            {property.units}
                          </Typography>
                        ) : (
                          <Skeleton />
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <span className="text-sm text-gray-600">
                        Sales Status Bar
                      </span>
                      {property ? (
                        <Slider
                          value={property.unitsSold}
                          color="secondary"
                          valueLabelDisplay="auto"
                          valueLabelFormat={(value) => <div>{value}%</div>}
                          className="mx-1"
                          classes={{
                            track: classes.track,
                            rail: classes.rail,
                            thumb: classes.thumb,
                          }}
                          aria-labelledby="sales-status-bar"
                        />
                      ) : (
                        <Skeleton />
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <AppButton
                        variant="contained"
                        color="secondary"
                        disabled={!property.unitsAvailable}
                        onClick={() => openIpoStakeDialog(property)}
                      >
                        Buy IPO Stake
                      </AppButton>
                      <AppButton
                        variant="contained"
                        color="secondary"
                        onClick={() => openQueueInBidDialog(property)}
                      >
                        Queue in a Bid
                      </AppButton>
                      <AppButton
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to={`${match.url}/offers`}
                      >
                        View BBB Offers
                      </AppButton>
                      <AppButton
                        variant="contained"
                        color="secondary"
                        onClick={openBidPaymentDialog}
                      >
                        Buy BBB Offer
                      </AppButton>
                    </div>
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <Skeleton />
            )}
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

            <h3 className="text-gray-600 text-lg mb-4 font-bold">
              Similar Listings
            </h3>
            {properties.entities.map((property, i) => (
              <Fragment key={i}>
                <LandscapeCard property={property} />

                {_.range(0, 1).length !== i && (
                  <Divider className={classes.divider} />
                )}
              </Fragment>
            ))}

            <div
              className={clsx(
                classes.birdview,
                "container mx-auto h-64 bg-no-repeat bg-center text-white flex items-center justify-center mt-8 p-16 rounded-lg"
              )}
            >
              <h3 className="text-2xl font-bold">Broad Street Marina lagos</h3>
            </div>

            <h3 className="text-gray-600 text-lg mb-4 mt-6 font-bold">
              About Neighbourhood
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. At id
              amet, felis, elementum egestas quam a. Egestas sed justo, faucibus
              massa mauris elementum tincidunt. Blandit eleifend amet velit a
              nibh. Tempor nam vel dictum mauris. Risus neque amet lacus, vel
              et. Penatibus non adipiscing nam fermentum at volutpat semper
              turpis adipiscing.
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Aliquet nunc dui egestas nunc interdum quis. Tristique aliquet
              condimentum erat proin mattis et, non gravida. Amet tincidunt
              viverra morbi laoreet faucibus. Amet a sed maecenas id pharetra
              vel odio. Aliquam nunc, nibh ultrices rhoncus faucibus. Sed
              pulvinar diam quisque arcu.
            </p>

            <div className="mt-8">
              <AppButton
                color="secondary"
                variant="contained"
                startIcon={<ExploreIcon />}
              >
                Take a 3D Tour
              </AppButton>
            </div>
          </div>
          <div className="col-span-6 md:col-span-2">
            <h3 className="text-gray-600 text-lg mb-4 font-bold">
              Feature Property
            </h3>

            <div className="flex flex-col space-y-4">
              {properties.entities.map((property, item) => (
                <FeaturedCard key={item} property={property} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <BidPaymentDialog />
      <BuyIpoStakeDialog />
      <QueueInBidDialog />
      <ConfirmIpoStakeDialog />
      <ConfirmBidDialog />
    </div>
  );
}

const mapStateToProps = ({ propertyDetails }) => {
  return {
    properties: propertyDetails.property.properties,
    property: propertyDetails.property.property,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getProperties: Actions.getProperties,
      getPropertyById: Actions.getPropertyById,
      openIpoStakeDialog: Actions.openIpoStakeDialog,
      openBidPaymentDialog: Actions.openBidPaymentDialog,
      openQueueInBidDialog: Actions.openQueueInBidDialog,
    },
    dispatch
  );
};

export default withReducer(
  "propertyDetails",
  reducer
)(withRouter(connect(mapStateToProps, mapDispatchToProps)(PropertyDetails)));
