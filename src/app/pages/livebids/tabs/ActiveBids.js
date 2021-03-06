import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppButton } from "../../../common/components";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Alert, AlertTitle, Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function ActiveBids(props) {
  const classes = useStyles(props);
  const { bids, openQueueInBidDialog } = props;

  return (
    <div className={classes.root}>
      {bids.map((bid, i) => (
        <div
          key={i}
          className="flex justify-between items-center my-4 border-0 border-b border-gray-200 border-solid"
        >
          <div className="flex space-x-4">
            <img
              src="https://image.freepik.com/free-photo/happy-asian-family-father-mother-daughter-near-new-home-real-estate_36356-245.jpg"
              alt=""
              width="180px"
            />
            <div className="flex flex-col">
              <h3 className="text-lg text-gray-800">
                <Link className="no-underline" to={`live-bid/${bid.id}`}>
                  {bid.ipoStake.property.title}
                </Link>
              </h3>
              <span className="font-medium text-sm">{bid.ipoStake.ipoRef}</span>
              <span className="flex items-center text-sm font-normal text-gray-600 mb-4 mt-2">
                <LocationOnIcon color="secondary" fontSize="small" />{" "}
                {`${bid.ipoStake.property.address.city} ${bid.ipoStake.property.address.state} ${bid.ipoStake.property.address.country}`}
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <AppButton color="inherit" variant="contained">
              View Details
            </AppButton>
            <AppButton
              color="secondary"
              variant="contained"
              onClick={() => openQueueInBidDialog(bid.ipoStake.property)}
            >
              Queue in a Bid
            </AppButton>
          </div>
        </div>
      ))}

      {bids.length ? (
        <div className="flex items-center justify-center mt-16">
          <Pagination count={5} variant="outlined" color="secondary" />
        </div>
      ) : (
        <Alert severity="info">
          <AlertTitle>Hey there!</AlertTitle>
          <div className="flex flex-col md:flex-row md:flex-wrap items-center space-y-2">
            You currently have no active bid
          </div>
        </Alert>
      )}
    </div>
  );
}
