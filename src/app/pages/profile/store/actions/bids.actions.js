import axios from "axios";
import { showSnackbar } from "./../../../../store/actions";

export const GET_BIDS_SUCCESS = "[BIDS] GET_BIDS_SUCCESS";
export const GET_BIDS_ERROR = "[BIDS] GET_BIDS_ERROR";

export const COUNTER_BID_SUCCESS = "[BIDS] COUNTER_BID_SUCCESS";
export const COUNTER_BID_ERROR = "[BIDS] COUNTER_BID_ERROR";

export const UPDATE_BID_SUCCESS = "[BIDS] UPDATE_BID_SUCCESS";
export const UPDATE_BID_ERROR = "[BIDS] UPDATE_BID_ERROR";

export const GET_BID_BY_ID_SUCCESS = "[BIDS] GET_BID_BY_ID_SUCCESS";
export const GET_BID_BY_ID_ERROR = "[BIDS] GET_BID_BY_ID_ERROR";

export const OPEN_OFFER_DIALOG = "[BIDS] OPEN_OFFER_DIALOG";
export const CLOSE_OFFER_DIALOG = "[BIDS] CLOSE_OFFER_DIALOG";

export const OPEN_BID_PAYMENT_DIALOG = "[BIDS] OPEN_BID_PAYMENT_DIALOG";
export const CLOSE_BID_PAYMENT_DIALOG = "[BIDS] CLOSE_BID_PAYMENT_DIALOG";

export const OPEN_COUNTER_BID_DIALOG = "[BIDS] OPEN_COUNTER_BID_DIALOG";
export const CLOSE_COUNTER_BID_DIALOG = "[BIDS] CLOSE_COUNTER_BID_DIALOG";

export const OPEN_UPDATE_BID_DIALOG = "[BIDS] OPEN_UPDATE_BID_DIALOG";
export const CLOSE_UPDATE_BID_DIALOG = "[BIDS] CLOSE_UPDATE_BID_DIALOG";

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

export function getBidById() {
  const request = axios.get("/auth/bids-on-user-ipostakes");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_BID_BY_ID_SUCCESS,
        payload: response.data,
      })
    );
}

export function counterBid(data) {
  const request = axios.post("/auth/counter-a-bid", data);

  return (dispatch) =>
    request
      .then((response) =>
        Promise.all([
          dispatch({
            type: COUNTER_BID_SUCCESS,
            payload: response.data,
          }),
        ]).then(
          dispatch(
            showSnackbar({
              message: "Your bid has been countered successfully",
            })
          )
        )
      )
      .catch((error) => {
        console.dir(error);
        dispatch(
          showSnackbar({
            message: error.response.data.message,
            variant: "warning",
          })
        );
      });
}

export function updateBid(data) {
  const request = axios.post("/auth/update-a-bid", data);

  return (dispatch) =>
    request.then((response) =>
      Promise.all([
        dispatch({
          type: UPDATE_BID_SUCCESS,
          payload: response.data,
        }),
      ])
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

// counter bid dialog
export function openCounterBidDialog(payload) {
  return {
    type: OPEN_COUNTER_BID_DIALOG,
    payload,
  };
}

export function closeCounterBidDialog() {
  return {
    type: CLOSE_COUNTER_BID_DIALOG,
  };
}

// update a bid dialog
export function openUpdateBidDialog(payload) {
  return {
    type: OPEN_UPDATE_BID_DIALOG,
    payload,
  };
}

export function closeUpdateBidDialog() {
  return {
    type: CLOSE_UPDATE_BID_DIALOG,
  };
}
