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
  PropertyDetailCard,
} from "../../../common/components";
import BuyIpoStakeDialog from "./dialogs/BuyIpoStakeDialog";
import QueueInBidDialog from "./dialogs/QueueInBidDialog";
import ConfirmBidDialog from "./dialogs/ConfirmBidDialog";
import ConfirmIpoStakeDialog from "./dialogs/ConfirmIpoStakeDialog";

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
    openQueueInBidDialog,
    match,
    user,
  } = props;
  const params = useParams();

  console.log(property, "single property details");
  console.log(user, "user details");

  useEffect(() => {
    getProperties();
  }, [getProperties]);

  useEffect(() => {
    getPropertyById(params.id);
  }, [params, getPropertyById]);

  return (
    <div className="container bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-3">
          <AppBreadcrumbs
            prevLinks={{ Properties: "/properties" }}
            current={property && property.propertyRef}
          />
        </div>
        <div className="grid grid-cols-6 gap-2 md:gap-6 mb-4">
          <div className="col-span-6 md:col-span-4">
            <PropertyDetailCard property={property} />

            <div className="my-8">
              <DescriptionTabs property={property} />
            </div>
          </div>
          <div className="col-span-6 mt-4 md:mt-0 md:col-span-2">
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
                    <h3 className="flex items-center text-sm font-normal capitalize text-gray-500 mb-2">
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
                            {BoxUtils.formatCurrency(
                              property.price / property.units
                            )}
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
                          value={_.ceil(
                            property.units / property.unitsSold / 100
                          )}
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
                        disabled={
                          !property.unitsAvailable ||
                          property.createdBy.id === user.id
                        }
                        onClick={() => openIpoStakeDialog(property)}
                      >
                        Buy Boxlot
                      </AppButton>
                      <AppButton
                        variant="contained"
                        color="secondary"
                        disabled={Boolean(property.unitsAvailable)}
                        onClick={() => openQueueInBidDialog(property)}
                      >
                        Queue in a Bid
                      </AppButton>
                      <AppButton
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to={`${match.url}/boxlots`}
                        fullWidth
                      >
                        View Boxlots
                      </AppButton>
                    </div>
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <h3 className="text-lg">
                <Skeleton />
              </h3>
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
            {properties.entities.slice(0, 5).map((property, i) => (
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
              Lekki Peninsula, east of Victoria Island, is a rapidly growing
              area on the coast. Its sandy beaches, including Lekki/Eleko Beach
              and Oso Lekki Backwaters, and relics of Brazilian/Portuguese and
              other imposing architecture make it a tourism goldmine. Housing in
              Lekki is usually in blocks of adjoining flats.
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Its is a lovely and well secured environment. The houses are
              uniformed, neat environment and very serene. For a detailed review
              visit the neighborhood review website.
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
              {properties.entities.slice(0, 5).map((property, item) => (
                <FeaturedCard key={item} property={property} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <BuyIpoStakeDialog />
      <QueueInBidDialog />
      <ConfirmIpoStakeDialog />
      <ConfirmBidDialog />
    </div>
  );
}

const mapStateToProps = ({ propertyDetails, auth }) => {
  return {
    user: auth.user.data,
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
      openQueueInBidDialog: Actions.openQueueInBidDialog,
    },
    dispatch
  );
};

export default withReducer(
  "propertyDetails",
  reducer
)(withRouter(connect(mapStateToProps, mapDispatchToProps)(PropertyDetails)));
