import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiCardMedia-root": {
      backgroundSize: "contain",
    },
  },
}));

export default function FeaturedCardComponent({ property }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, "grid grid-cols-2")}>
      <CardMedia
        image={
          property && property.images.length
            ? property.images[0].imageUrl
            : "/assets/images/icons/picture.svg"
        }
        title="featured"
      />
      <CardContent>
        <h3 className="text-gray-800 font-medium text-sm mb-1 uppercase">
          {property ? (
            <Link className="no-underline" to={`/property/${property.id}`}>
              {property.title}
            </Link>
          ) : (
            <Skeleton />
          )}
        </h3>
        <span className="text-xs text-gray-600 uppercase">
          {property ? property.propertyRef : <Skeleton />}
        </span>
        {property ? (
          <h3 className="flex items-center text-xs font-normal text-gray-500 mt-1">
            <LocationOnIcon color="secondary" fontSize="small" />{" "}
            {property.address.city} {property.address.state}{" "}
            {property.address.country}
          </h3>
        ) : (
          <Skeleton />
        )}
      </CardContent>
    </Card>
  );
}
