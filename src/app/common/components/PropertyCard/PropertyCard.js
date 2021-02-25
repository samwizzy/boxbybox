import React from "react";
import BoxUtils from "./../../../utils/BoxUtils";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, CardMedia, Icon } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiCardMedia-root": {
      backgroundSize: "contain",
    },
  },
  button: {
    marginBottom: theme.spacing(2),
    borderRadius: 0,
  },
}));

export default function PropertyCard(props) {
  const classes = useStyles(props);
  const { property } = props;

  return (
    <Card className={clsx(classes.root, "md:grid md:grid-cols-2 gap-4 mb-4")}>
      <CardMedia
        className="h-64 md:h-auto"
        image={
          property && property.images.length
            ? property.images[0].imageUrl
            : "/assets/images/icons/picture.svg"
        }
        title="Live property"
      />
      <CardContent className="flex flex-col items-start">
        <Button variant="contained" color="primary" className={classes.button}>
          For {property ? property.feature : <Skeleton />}
        </Button>

        <span className="text-xs text-gray-400 uppercase mt-4 mb-1">
          {property ? property.propertyRef : <Skeleton />}
        </span>
        <h3 className="mb-1 text-sm text-gray-500 uppercase">
          {property ? (
            <Link className="no-underline" to={`/property/${property.id}`}>
              {property.title}
            </Link>
          ) : (
            <Skeleton />
          )}
        </h3>
        <h3 className="mb-1 text-lg text-gray-800">
          {property ? BoxUtils.formatCurrency(property.price) : <Skeleton />}
        </h3>

        {property ? (
          <p className="text-sm text-gray-400">{property.description}</p>
        ) : (
          <Skeleton />
        )}

        <div className="flex items-center flex-wrap mt-5">
          <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
            {property ? property.size : <Skeleton />} sq ft
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
            {property ? property.parkingLot ? "Yes" : "No" : <Skeleton />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
