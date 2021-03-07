import axios from "axios";
// import { showSnackbar } from "./../../../../store/actions";

export const GET_OFFERS_SUCCESS = "[OFFERS] GET_OFFERS_SUCCESS";
export const GET_OFFERS_ERROR = "[OFFERS] GET_OFFERS_ERROR";

export const GET_OFFER_BY_ID_SUCCESS = "[OFFERS] GET_OFFER_BY_ID_SUCCESS";
export const GET_OFFER_BY_ID_ERROR = "[OFFERS] GET_OFFER_BY_ID_ERROR";

export const OPEN_OFFER_DIALOG = "[OFFERS] OPEN_OFFER_DIALOG";
export const CLOSE_OFFER_DIALOG = "[OFFERS] CLOSE_OFFER_DIALOG";

export const OPEN_CONFIRM_ACCEPT_DIALOG = "[OFFERS] OPEN_CONFIRM_ACCEPT_DIALOG";
export const CLOSE_CONFIRM_ACCEPT_DIALOG =
  "[OFFERS] CLOSE_CONFIRM_ACCEPT_DIALOG";

export const OPEN_CONFIRM_REJECT_DIALOG = "[OFFERS] OPEN_CONFIRM_REJECT_DIALOG";
export const CLOSE_CONFIRM_REJECT_DIALOG =
  "[OFFERS] CLOSE_CONFIRM_REJECT_DIALOG";

export function getOffers() {
  const request = axios.get("auth/bids-on-user-ipostakes");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_OFFERS_SUCCESS,
        payload: response.data,
      })
    );
}

export function getOfferById() {
  const request = axios.get("/auth/bids-on-user-ipostakes");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_OFFER_BY_ID_SUCCESS,
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

export function openConfirmAcceptDialog(payload) {
  return {
    type: OPEN_CONFIRM_ACCEPT_DIALOG,
    payload,
  };
}

export function closeConfirmAcceptDialog() {
  return {
    type: CLOSE_CONFIRM_ACCEPT_DIALOG,
  };
}

export function openConfirmRejectDialog(payload) {
  return {
    type: OPEN_CONFIRM_REJECT_DIALOG,
    payload,
  };
}

export function closeConfirmRejectDialog() {
  return {
    type: CLOSE_CONFIRM_REJECT_DIALOG,
  };
}
