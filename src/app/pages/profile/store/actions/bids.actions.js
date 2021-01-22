import axios from "axios";

export const GET_BIDS_SUCCESS = "[BIDS] GET_BIDS_SUCCESS";
export const GET_BIDS_ERROR = "[BIDS] GET_BIDS_ERROR";

export const GET_BID_BY_ID_SUCCESS = "[BIDS] GET_BID_BY_ID_SUCCESS";
export const GET_BID_BY_ID_ERROR = "[BIDS] GET_BID_BY_ID_ERROR";

export const OPEN_OFFER_DIALOG = "[BIDS] OPEN_OFFER_DIALOG";
export const CLOSE_OFFER_DIALOG = "[BIDS] CLOSE_OFFER_DIALOG";

export const OPEN_BID_PAYMENT_DIALOG = "[BIDS] OPEN_BID_PAYMENT_DIALOG";
export const CLOSE_BID_PAYMENT_DIALOG = "[BIDS] CLOSE_BID_PAYMENT_DIALOG";

export const OPEN_CONFIRM_BID_DIALOG = "[BIDS] OPEN_CONFIRM_BID_DIALOG";
export const CLOSE_CONFIRM_BID_DIALOG = "[BIDS] CLOSE_CONFIRM_BID_DIALOG";

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
  const request = axios.get("/bids/" + id);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_BID_BY_ID_SUCCESS,
        payload: response.data,
      })
    );
}

export function openOfferDialog(payload) {
  return {
    type: OPEN_OFFER_DIALOG,
    payload,
  };
}

export function closeOfferDialog() {
  return {
    type: CLOSE_OFFER_DIALOG,
  };
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
