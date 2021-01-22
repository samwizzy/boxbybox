import React from "react";
import BoxUtils from "./../../../utils/BoxUtils";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Icon,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  media: {
    position: "relative",
    "&::before": {
      position: "absolute",
      content: "'Rent'",
      top: 0,
      right: 0,
      width: "100px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

export default function FeatureCardComponent(props) {
  const classes = useStyles(props);
  const { property } = props;

  return (
    <div className={classes.root}>
      <Card className={clsx(classes.card, "flex-1")} variant="outlined">
        <CardMedia
          className={classes.media}
          classes={{
            root: "w-full h-48",
          }}
          image="https://image.freepik.com/free-photo/industrial-park-factory-building-warehouse_1417-1913.jpg"
          title="demo"
        />
        <CardContent className="text-center">
          <Typography color="textSecondary" variant="caption">
            {property ? property.propertyRef : <Skeleton />}
          </Typography>
          {property ? (
            <h3 className="mb-1 text-sm text-gray-500 uppercase">
              <Link className="no-underline" to={`/property/${property.id}`}>
                {property.title}
              </Link>
            </h3>
          ) : (
            <Skeleton />
          )}
          <h3 className="mb-1 text-lg text-gray-800">
            {property ? BoxUtils.formatCurrency(property.price) : <Skeleton />}
          </h3>

          <div className="flex items-center justify-center flex-wrap mt-5">
            {property ? (
              <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
                {property.size} sqft
              </div>
            ) : (
              <Skeleton />
            )}
            {property ? (
              <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
                <Icon fontSize="small">hotel</Icon>&nbsp;{property.bedrooms}
              </div>
            ) : (
              <Skeleton />
            )}
            {property ? (
              <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
                <Icon fontSize="small">bathtub</Icon>&nbsp;{property.bathrooms}
              </div>
            ) : (
              <Skeleton />
            )}
            {property ? (
              <div className="flex items-center text-sm border-0 px-2">
                <Icon fontSize="small">drive_eta</Icon>&nbsp;
                {property.parkingLot ? "Yes" : "No"}
              </div>
            ) : (
              <Skeleton />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}