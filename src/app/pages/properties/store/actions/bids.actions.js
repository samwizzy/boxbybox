import axios from "axios";

export const GET_BIDS_BY_USER_SUCCESS = "[BIDS] GET_BIDS_BY_USER_SUCCESS";

export const GET_BIDS_ON_USER_IPO_STAKES = "[BIDS] GET_BIDS_ON_USER_IPO_STAKES";

export const GET_AVAILABLE_UNITS_SUCCESS = "[BIDS] GET_AVAILABLE_UNITS_SUCCESS";
export const GET_AVAILABLE_UNITS_ERROR = "[BIDS] GET_AVAILABLE_UNITS_ERROR";

export const GET_MIN_COST_OF_UNIT_SUCCESS =
  "[BIDS] GET_MIN_COST_OF_UNIT_SUCCESS";
export const GET_MIN_COST_OF_UNIT_ERROR = "[BIDS] GET_MIN_COST_OF_UNIT_ERROR";

export const GET_MIN_COST_OF_COUNTERING_BID =
  "[BIDS] GET_MIN_COST_OF_COUNTERING_BID";

export const OPEN_BID_PAYMENT_DIALOG = "[BIDS] OPEN_BID_PAYMENT_DIALOG";
export const CLOSE_BID_PAYMENT_DIALOG = "[BIDS] CLOSE_BID_PAYMENT_DIALOG";

export const OPEN_QUEUE_IN_BID_DIALOG = "[BIDS] OPEN_QUEUE_IN_BID_DIALOG";
export const CLOSE_QUEUE_IN_BID_DIALOG = "[BIDS] CLOSE_QUEUE_IN_BID_DIALOG";

export const OPEN_CONFIRM_BID_DIALOG = "[BIDS] OPEN_CONFIRM_BID_DIALOG";
export const CLOSE_CONFIRM_BID_DIALOG = "[BIDS] CLOSE_CONFIRM_BID_DIALOG";

export function getBidsByUser() {
  const request = axios.get("/auth/bids-by-user");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_BIDS_BY_USER_SUCCESS,
        payload: response.data,
      })
    );
}

export function getBidsOnUserIpoStakes() {
  const request = axios.get("/auth/bids-on-user-ipostakes");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_BIDS_ON_USER_IPO_STAKES,
        payload: response.data,
      })
    );
}

export function getAvailableUnits(propertyId) {
  const request = axios.get("/auth/properties/ipo-stake/" + propertyId);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_AVAILABLE_UNITS_SUCCESS,
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

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_MIN_COST_OF_UNIT_SUCCESS,
        payload: response.data,
      })
    );
}

export function openBidPaymentDialog(payload) {
  return {
    type: OPEN_BID_PAYMENT_DIALOG,
    payload,
  };
}

export function closeBidPaymentDialog() {
  return {
    type: CLOSE_BID_PAYMENT_DIALOG,
  };
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
