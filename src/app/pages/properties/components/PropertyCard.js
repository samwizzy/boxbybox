import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, CardMedia, Icon } from "@material-ui/core";
import BoxUtils from "./../../../utils/BoxUtils";

const useStyles = makeStyles((theme) => ({
  media: {
    backgroundSize: "80px",
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
    <Card className="md:grid md:grid-cols-2 gap-4 mb-4">
      <CardMedia
        className="h-64 md:h-auto"
        image="https://image.freepik.com/free-photo/house-key-home-insurance-broker-agent-s-hand-protection_1150-14910.jpg"
        title="Live property"
      />
      <CardContent className="flex flex-col items-start">
        <Button variant="contained" color="primary" className={classes.button}>
          For {property.feature}
        </Button>

        <span className="text-xs text-gray-400 uppercase mt-4 mb-1">
          R003YXXEN
        </span>
        <h3 className="mb-1 text-sm text-gray-500 uppercase">
          <Link className="no-underline" to={`/property/${property.id}`}>
            {property.title}
          </Link>
        </h3>
        <h3 className="mb-1 text-lg text-gray-800">
          {BoxUtils.formatCurrency(property.price)}
        </h3>

        <p className="text-sm text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
          consectetur id facilisi sodales sollicitudin malesuada proin. Suscipit
          risus ut porttitor cursus consequat iaculis habitant enim.
        </p>

        <div className="flex items-center flex-wrap mt-5">
          <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
            {property.size} sqft
          </div>
          <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
            <Icon fontSize="small">hotel</Icon>&nbsp;{property.bedrooms}
          </div>
          <div className="flex items-center text-sm border-0 border-r-2 border-gray-300 border-solid px-2">
            <Icon fontSize="small">bathtub</Icon>&nbsp;{property.bathrooms}
          </div>
          <div className="flex items-center text-sm border-0 px-2">
            <Icon fontSize="small">drive_eta</Icon>&nbsp;
            {property.parkingLot ? "Yes" : "No"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
