import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppButton } from "../../../common/components";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function ActiveBids(props) {
  const classes = useStyles(props);
  const { bids } = props;

  return (
    <div className={classes.root}>
      {bids.entities.map((bid, i) => (
        <div
          key={i}
          className="flex justify-between items-center my-4 border-0 border-b border-gray-200 border-solid"
        >
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://image.freepik.com/free-photo/happy-asian-family-father-mother-daughter-near-new-home-real-estate_36356-245.jpg"
              alt=""
              width="180px"
            />
            <div className="flex flex-col">
              <h3 className="text-lg text-gray-800">
                <Link className="no-underline" to={`live-bid/${bid.id}`}>
                  {bid.title}
                </Link>
              </h3>
              <span>{bid.propertyRef}</span>
              <span className="flex items-center text-sm font-normal text-gray-500 mb-4 mt-2">
                <LocationOnIcon color="secondary" fontSize="small" />{" "}
                {`${bid.address.city} ${bid.address.state} ${bid.address.country}`}
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <AppButton color="inherit" variant="contained">
              View Details
            </AppButton>
            <AppButton color="secondary" variant="contained">
              Queue in a Bid
            </AppButton>
          </div>
        </div>
      ))}
    </div>
  );
}
