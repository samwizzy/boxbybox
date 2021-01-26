import React from "react";
import BoxUtils from "./../../../utils/BoxUtils";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, CardMedia, Icon } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  media: {
    backgroundSize: "80px",
  },
  button: {
    marginBottom: theme.spacing(2),
    borderRadius: 0,
  },
}));

export default function LandscapeCardComponent({ property }, props) {
  const classes = useStyles(props);

  return (
    <Card className="md:grid md:grid-cols-2 gap-4 mb-4">
      <CardMedia
        className="h-64 md:h-auto"
        image="https://image.freepik.com/free-photo/house-key-home-insurance-broker-agent-s-hand-protection_1150-14910.jpg"
        title="Live property"
      />
      <CardContent className="flex flex-col items-start">
        {property ? (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            For {property.feature}
          </Button>
        ) : (
          <Skeleton width="100%" />
        )}

        {property ? (
          <span className="text-xs text-gray-400 uppercase mt-4 mb-1">
            {property.propertyRef}
          </span>
        ) : (
          <Skeleton width="100%" />
        )}
        {property ? (
          <h3 className="mb-1 text-sm text-gray-500 uppercase">
            {property ? (
              <Link className="no-underline" to={`/property/${property.id}`}>
                {property.title}
              </Link>
            ) : (
              <Skeleton />
            )}
          </h3>
        ) : (
          <Skeleton width="100%" />
        )}
        {property ? (
          <h3 className="mb-1 text-lg text-gray-800">
            {BoxUtils.formatCurrency(property.price)}
          </h3>
        ) : (
          <Skeleton width="100%" />
        )}

        {property ? (
          <p className="text-sm text-gray-400">{property.description}</p>
        ) : (
          <Skeleton width="100%" />
        )}

        <div className="flex items-center flex-wrap space-x-2 mt-5">
          {property ? (
            <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid pr-2">
              {property.size} sq ft
            </div>
          ) : (
            <Skeleton width="50px" />
          )}
          {property ? (
            <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid pr-2">
              <Icon fontSize="small">hotel</Icon>&nbsp;
              {property.bedrooms}
            </div>
          ) : (
            <Skeleton width="50px" />
          )}
          {property ? (
            <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid pr-2">
              <Icon fontSize="small">bathtub</Icon>&nbsp;
              {property.bathrooms}
            </div>
          ) : (
            <Skeleton width="50px" />
          )}
          {property ? (
            <div className="flex items-center text-sm border-0 pr-2">
              <Icon fontSize="small">drive_eta</Icon>&nbsp;
              {property.parkingLot ? "Yes" : "No"}
            </div>
          ) : (
            <Skeleton width="50px" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
