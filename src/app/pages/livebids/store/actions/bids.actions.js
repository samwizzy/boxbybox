import axios from "axios";
import { showSnackbar } from "./../../../../store/actions";

export const GET_BIDS_SUCCESS = "[BIDS] GET_BIDS_SUCCESS";
export const GET_BIDS_ERROR = "[BIDS] GET_BIDS_ERROR";

export const GET_BID_BY_ID_SUCCESS = "[BIDS] GET_BID_BY_ID_SUCCESS";
export const GET_BID_BY_ID_ERROR = "[BIDS] GET_BID_BY_ID_ERROR";

export const GET_AVAILABLE_UNITS = "[BIDS] GET_AVAILABLE_UNITS";
export const GET_MIN_COST_OF_COUNTERING_BID =
  "[BIDS] GET_MIN_COST_OF_COUNTERING_BID";
export const GET_MIN_COST_OF_UNIT = "[BIDS] GET_MIN_COST_OF_UNIT";

export const OPEN_QUEUE_IN_BID_DIALOG = "[BIDS] OPEN_QUEUE_IN_BID_DIALOG";
export const CLOSE_QUEUE_IN_BID_DIALOG = "[BIDS] CLOSE_QUEUE_IN_BID_DIALOG";

export const OPEN_CONFIRM_BID_DIALOG = "[BIDS] OPEN_CONFIRM_BID_DIALOG";
export const CLOSE_CONFIRM_BID_DIALOG = "[BIDS] CLOSE_CONFIRM_BID_DIALOG";

export function getBids() {
  const request = axios.get("/auth/bids-by-user");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_BIDS_SUCCESS,
        payload: response.data,
      })
    );
}

export function getBidById(id) {
  const request = axios.get("/properties/" + id);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_BID_BY_ID_SUCCESS,
        payload: response.data,
      })
    );
}

export function getAvailableUnits(propertyId) {
  const request = axios.get("/auth/properties/ipo-stake/" + propertyId);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_AVAILABLE_UNITS,
        payload: response.data,
      })
    );
}

export function getMinCostOfCounteringBid(ipoBidId) {
  const request = axios.get(`/auth/bid-counter-cost/${ipoBidId}`);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_MIN_COST_OF_COUNTERING_BID,
        payload: response.data,
      })
    );
}

export function getMinCostOfUnit(propertyId, units) {
  const request = axios.get(
    `/auth/properties/ipo-stake/units/${propertyId}/${units}`
  );
  console.log(request, "get minimum cost of unit request");

  return (dispatch) =>
    request
      .then((response) =>
        dispatch({
          type: GET_MIN_COST_OF_UNIT,
          payload: response.data,
        })
      )
      .catch((error) => {
        dispatch(
          showSnackbar({
            message: error.response.data.message,
            variant: "warning",
          })
        );
      });
}

export function openQueueInBidDialog(payload) {
  return {
    type: OPEN_QUEUE_IN_BID_DIALOG,
    payload,
  };
}

export function closeQueueInBidDialog() {
  return {
    type: CLOSE_QUEUE_IN_BID_DIALOG,
  };
}

export function openConfirmBidDialog(payload) {
  return {
    type: OPEN_CONFIRM_BID_DIALOG,
    payload,
  };
}

export function closeConfirmBidDialog() {
  return {
    type: CLOSE_CONFIRM_BID_DIALOG,
  };
}
