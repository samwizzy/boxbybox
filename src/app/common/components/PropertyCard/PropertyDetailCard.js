import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Icon } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Thumbnail from "./../Thumbnail/Thumbnail";

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    "& .MuiCardMedia-root": {
      backgroundSize: "cover",
    },
  },
}));

export default function PropertyDetailCard(props) {
  const classes = useStyles(props);
  const { property } = props;

  return (
    <div className={classes.root}>
      <h3 className="text-gray-600 text-lg uppercase">
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

      <Card className={classes.card}>
        <CardMedia
          className="h-80 md:h-80"
          image={
            property && property.images.length
              ? property.images[0].imageUrl
              : "/assets/images/icons/picture.svg"
          }
          title="Live property details"
        />
        <CardContent>
          <div>
            <Thumbnail images={property && property.images} />
          </div>

          <div className="flex items-center flex-wrap space-x-2 mt-5">
            {property ? (
              <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
                {property.size} sq ft
              </div>
            ) : (
              <Skeleton width="50px" />
            )}
            {property ? (
              <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
                <Icon fontSize="small">hotel</Icon>&nbsp;
                {property.bedrooms}
              </div>
            ) : (
              <Skeleton width="50px" />
            )}
            {property ? (
              <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
                <Icon fontSize="small">bathtub</Icon>&nbsp;
                {property.bathrooms}
              </div>
            ) : (
              <Skeleton width="50px" />
            )}
            {property ? (
              <div className="flex items-center text-sm border-0 px-2">
                <Icon fontSize="small">drive_eta</Icon>&nbsp;
                {property.parkingLot ? "Yes" : "No"}
              </div>
            ) : (
              <Skeleton width="50px" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
