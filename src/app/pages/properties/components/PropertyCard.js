import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, CardMedia, Icon } from "@material-ui/core";

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

  return (
    <Card className="md:grid md:grid-cols-2 gap-4 mb-4">
      <CardMedia
        className="h-64 md:h-auto"
        image="https://image.freepik.com/free-photo/house-key-home-insurance-broker-agent-s-hand-protection_1150-14910.jpg"
        title="Live property"
      />
      <CardContent className="flex flex-col items-start">
        <Button variant="contained" color="primary" className={classes.button}>
          For Rent
        </Button>

        <span className="text-xs text-gray-400 uppercase mt-4 mb-1">
          R003YXXEN
        </span>
        <h3 className="mb-1 text-sm text-gray-500 uppercase">
          4 BEDROOM DUPLEX
        </h3>
        <h3 className="mb-1 text-lg text-gray-800">N 300,000.00</h3>

        <p className="text-sm text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
          consectetur id facilisi sodales sollicitudin malesuada proin. Suscipit
          risus ut porttitor cursus consequat iaculis habitant enim.
        </p>

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
  );
}
