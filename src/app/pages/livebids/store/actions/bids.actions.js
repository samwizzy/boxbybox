import axios from "axios";

export const GET_BIDS_SUCCESS = "[PROPERTY] GET_BIDS_SUCCESS";
export const GET_BIDS_ERROR = "[PROPERTY] GET_BIDS_ERROR";

export const GET_BID_BY_ID_SUCCESS = "[PROPERTY] GET_BID_BY_ID_SUCCESS";
export const GET_BID_BY_ID_ERROR = "[PROPERTY] GET_BID_BY_ID_ERROR";

export const OPEN_BID_PAYMENT_DIALOG = "[PROPERTY] OPEN_BID_PAYMENT_DIALOG";
export const CLOSE_BID_PAYMENT_DIALOG = "[PROPERTY] CLOSE_BID_PAYMENT_DIALOG";

export const OPEN_QUEUE_IN_BID_DIALOG = "[PROPERTY] OPEN_QUEUE_IN_BID_DIALOG";
export const CLOSE_QUEUE_IN_BID_DIALOG = "[PROPERTY] CLOSE_QUEUE_IN_BID_DIALOG";

export const OPEN_CONFIRM_BID_DIALOG = "[PROPERTY] OPEN_CONFIRM_BID_DIALOG";
export const CLOSE_CONFIRM_BID_DIALOG = "[PROPERTY] CLOSE_CONFIRM_BID_DIALOG";

export function getBids() {
  const request = axios.get("/properties");

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
