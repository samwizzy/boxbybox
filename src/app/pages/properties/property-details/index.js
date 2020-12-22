import React, { Fragment } from "react";
import clsx from "clsx";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Icon,
  Typography,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ExploreIcon from "@material-ui/icons/Explore";
import Breadcrumbs from "../components/Breadcrumbs";
import { FormTabs, DescriptionTabs } from "./tabs";
import {
  AppButton,
  FeaturedCard,
  LandscapeCard,
} from "../../../common/components";

const useStyles = makeStyles((theme) => ({
  root: {},
  tabs: {
    "& button": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.contrastText,
      "&:last-child": {
        marginLeft: theme.spacing(2),
      },
      "&:focus": {
        outline: "none",
      },
    },
  },
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
}));

export default function PropertyDetails(props) {
  const classes = useStyles(props);

  return (
    <div className="container">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-6 gap-2 md:gap-6">
            <div className="col-span-6 md:col-span-4">
              <Breadcrumbs />

              <h3 className="text-gray-800 font-medium text-lg my-1 uppercase">
                4 BEDROOM DUPLEX
              </h3>

              <span className="text-xs text-gray-600 uppercase my-2">
                R003YXXEN
              </span>

              <h3 className="flex items-center text-sm font-normal text-gray-500 mb-4 mt-2">
                <LocationOnIcon color="secondary" fontSize="small" /> Yaba Lagos
                Nigeria
              </h3>

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
                        780 sqft
                      </div>
                      <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
                        <Icon fontSize="small">hotel</Icon>&nbsp;4
                      </div>
                      <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
                        <Icon fontSize="small">bathtub</Icon>&nbsp;3
                      </div>
                      <div className="flex items-center text-sm border-0 px-2">
                        <Icon fontSize="small">drive_eta</Icon>&nbsp;2
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
                chikauzo@yahoo.com
              </h3>

              <div className="mb-12 md:mb-0">
                <FormTabs />
              </div>
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
              {_.range(0, 2).map((props, i) => (
                <Fragment key={i}>
                  <LandscapeCard />

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
                <h3 className="text-2xl font-bold">
                  Broad Street Marina lagos
                </h3>
              </div>

              <h3 className="text-gray-600 text-lg mb-4 mt-6 font-bold">
                About Neighbourhood
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. At id
                amet, felis, elementum egestas quam a. Egestas sed justo,
                faucibus massa mauris elementum tincidunt. Blandit eleifend amet
                velit a nibh. Tempor nam vel dictum mauris. Risus neque amet
                lacus, vel et. Penatibus non adipiscing nam fermentum at
                volutpat semper turpis adipiscing.
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
                {_.range(0, 4).map((item) => (
                  <FeaturedCard key={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
