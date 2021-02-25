import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Icon,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiCardMedia-root": {
      backgroundSize: "contain",
    },
  },
}));

export default function PropertyCardComponent(props) {
  const classes = useStyles(props);
  const { property } = props;

  return (
    <Card className={clsx(classes.root, "flex-1")} variant="outlined">
      <CardMedia
        className={classes.media}
        classes={{
          root: "w-full h-48",
        }}
        image={
          property && property.images.length
            ? property.images[0].imageUrl
            : "/assets/images/icons/picture.svg"
        }
        title="demo"
      />
      <CardContent className="text-center">
        <Typography color="textSecondary" variant="caption">
          {property.reference}
        </Typography>
        <h3 className="mb-1 text-sm text-gray-500 uppercase">
          {property.title}
        </h3>
        <h3 className="mb-1 text-lg text-gray-800">{property.price}</h3>

        <div className="flex items-center justify-center flex-wrap mt-5">
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
