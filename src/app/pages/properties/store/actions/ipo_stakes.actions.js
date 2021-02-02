import axios from "axios";
import * as Actions from "./bids.actions";
import { showSnackbar } from "../../../../store/actions";

export const GET_IPO_STAKES = "[IPOSTAKES] GET_IPO_STAKES";

export const GET_IPO_STAKES_BY_PROPERTY_ID =
  "[IPOSTAKES] GET_IPO_STAKES_BY_PROPERTY_ID";

export const GET_USER_IPO_STAKES_BY_PROPERTY_ID =
  "[IPOSTAKES] GET_USER_IPO_STAKE_BY_PROPERTY_ID";

export const ADD_IPO_STAKE_SUCCESS = "[IPOSTAKES] ADD_IPO_STAKE_SUCCESS";
export const ADD_IPO_STAKE_ERROR = "[IPOSTAKES] ADD_IPO_STAKE_ERROR";

export const BID_IPO_STAKE_SUCCESS = "[IPOSTAKES] BID_IPO_STAKE_SUCCESS";
export const BID_IPO_STAKE_ERROR = "[IPOSTAKES] BID_IPO_STAKE_ERROR";

export const OPEN_IPO_STAKE_DIALOG = "[IPOSTAKES] OPEN_IPO_STAKE_DIALOG";
export const CLOSE_IPO_STAKE_DIALOG = "[IPOSTAKES] CLOSE_IPO_STAKE_DIALOG";

export const OPEN_CONFIRM_IPO_STAKE_DIALOG =
  "[IPOSTAKES] OPEN_CONFIRM_IPO_STAKE_DIALOG";
export const CLOSE_CONFIRM_IPO_STAKE_DIALOG =
  "[IPOSTAKES] CLOSE_CONFIRM_IPO_STAKE_DIALOG";

export function getIpoStakes() {
  const request = axios.get("/auth/ipo-stake");

  return (dispatch) =>
    request.then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_IPO_STAKES,
          payload: response.data,
        });
      }
    });
}

export function getIpoStakeByPropertyId(propertyId, page = 0) {
  const request = axios.get("/auth/ipo-stake", {
    params: { propertyId, page },
  });
  console.log(request, "request get ipo stake by");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_IPO_STAKES_BY_PROPERTY_ID,
        payload: response.data,
      })
    );
}

export function getUserIpoStakeByPropertyId(propertyId) {
  const request = axios.get("/auth/users/ipo-stake?propertyId=" + propertyId);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_USER_IPO_STAKES_BY_PROPERTY_ID,
        payload: response.data,
      })
    );
}

export function addIpoStake(data, propertyId) {
  const request = axios.post(`/auth/ipo-stake/${propertyId}`, data);
  console.log(request, "request addipostake action");

  return (dispatch) =>
    request.then((response) => {
      console.log(response, "did it even make it in here");
      if (response.status === 200) {
        Promise.all([
          dispatch({
            type: ADD_IPO_STAKE_SUCCESS,
            payload: response.data,
          }),
        ]).then(
          dispatch(showSnackbar({ message: "Ipo stake added successfully" }))
        );
      } else {
        Promise.all([dispatch({ type: ADD_IPO_STAKE_ERROR })]).then(
          dispatch(showSnackbar({ message: response.data.message }))
        );
      }
    });
}

export function bidForIpoStake(data) {
  // queue to bid feature
  const request = axios.post("/auth/properties/ipo-stake/bid", data);

  return (dispatch) =>
    request.then((response) => {
      if (response.status === 200) {
        Promise.all([
          dispatch({
            type: BID_IPO_STAKE_SUCCESS,
            payload: response.data,
          }),
        ]).then(
          dispatch(
            showSnackbar({ message: "You have successfully queue a bid" })
          ),
          dispatch(Actions.closeConfirmBidDialog()),
          dispatch(Actions.closeQueueInBidDialog())
        );
      }
    });
}

export function openIpoStakeDialog(payload) {
  return {
    type: OPEN_IPO_STAKE_DIALOG,
    payload,
  };
}

export function closeIpoStakeDialog() {
  return {
    type: CLOSE_IPO_STAKE_DIALOG,
  };
}

export function openConfirmIpoStakeDialog(payload) {
  return (dispatch) => {
    Promise.all([
      dispatch(closeIpoStakeDialog()),
      dispatch({
        type: OPEN_CONFIRM_IPO_STAKE_DIALOG,
        payload,
      }),
    ]);
  };
}

export function closeConfirmIpoStakeDialog() {
  return {
    type: CLOSE_CONFIRM_IPO_STAKE_DIALOG,
  };
}
