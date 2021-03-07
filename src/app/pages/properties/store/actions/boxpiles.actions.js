import axios from "axios";
import * as Actions from "./bids.actions";
import { showSnackbar } from "../../../../store/actions";

export const GET_BOXPILES = "[IPOSTAKES] GET_BOXPILES";

export const GET_BOXPILES_BY_PROPERTY_ID =
  "[IPOSTAKES] GET_BOXPILES_BY_PROPERTY_ID";

export const GET_USER_BOXPILES_BY_PROPERTY_ID =
  "[IPOSTAKES] GET_USER_BOXPILE_BY_PROPERTY_ID";

export const ADD_BOXPILE_SUCCESS = "[IPOSTAKES] ADD_BOXPILE_SUCCESS";
export const ADD_BOXPILE_ERROR = "[IPOSTAKES] ADD_BOXPILE_ERROR";

export const BUY_BOXPILE_SUCCESS = "[IPOSTAKES] BUY_BOXPILE_SUCCESS";
export const BUY_BOXPILE_ERROR = "[IPOSTAKES] BUY_BOXPILE_ERROR";

export const BID_BOXPILE_SUCCESS = "[IPOSTAKES] BID_BOXPILE_SUCCESS";
export const BID_BOXPILE_ERROR = "[IPOSTAKES] BID_BOXPILE_ERROR";

export const OPEN_NEW_BOXPILE_DIALOG = "[IPOSTAKES] OPEN_NEW_BOXPILE_DIALOG";
export const CLOSE_NEW_BOXPILE_DIALOG = "[IPOSTAKES] CLOSE_NEW_BOXPILE_DIALOG";

export const OPEN_CONFIRM_NEW_BOXPILE_DIALOG =
  "[IPOSTAKES] OPEN_CONFIRM_NEW_BOXPILE_DIALOG";
export const CLOSE_CONFIRM_NEW_BOXPILE_DIALOG =
  "[IPOSTAKES] CLOSE_CONFIRM_NEW_BOXPILE_DIALOG";

export const OPEN_CONFIRM_BOXPILE_DIALOG =
  "[IPOSTAKES] OPEN_CONFIRM_BOXPILE_DIALOG";
export const CLOSE_CONFIRM_BOXPILE_DIALOG =
  "[IPOSTAKES] CLOSE_CONFIRM_BOXPILE_DIALOG";

export function getIpoStakes() {
  const request = axios.get("/auth/ipo-stake");

  return (dispatch) =>
    request.then((response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_BOXPILES,
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
        type: GET_BOXPILES_BY_PROPERTY_ID,
        payload: response.data,
      })
    );
}

export function getUserIpoStakeByPropertyId(propertyId) {
  const request = axios.get("/auth/users/ipo-stake?propertyId=" + propertyId);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_USER_BOXPILES_BY_PROPERTY_ID,
        payload: response.data,
      })
    );
}

export function addIpoStake(data, propertyId) {
  const request = axios.post(`/auth/ipo-stake/${propertyId}`, data);
  console.dir(request, "request addipostake action");

  return (dispatch) =>
    request.then((response) => {
      if (response.status === 201) {
        Promise.all([
          dispatch({
            type: ADD_BOXPILE_SUCCESS,
            payload: response.data,
          }),
        ]).then(
          Promise.all([
            dispatch(
              showSnackbar({
                message: `You have successfully purchased ${response.data.noOfUnitsPurchased} units, worth NGN ${response.data.purchaseAmount}`,
              })
            ),
          ]).then(
            dispatch(closeConfirmNewIpoStakeDialog()),
            window.location.reload()
          )
        );
      } else {
        Promise.all([dispatch({ type: ADD_BOXPILE_ERROR })]).then(
          dispatch(showSnackbar({ message: response.data.message }))
        );
      }
    });
}

export function buyBoxPile(ipoStakeId) {
  const request = axios.put(`/auth/ipo-stake/buy/${ipoStakeId}`);

  console.log(request, "buy boxpile request");

  return (dispatch) =>
    request.then((response) => {
      if (response.status === 200) {
        Promise.all([
          dispatch({
            type: BUY_BOXPILE_SUCCESS,
            payload: response.data,
          }),
        ]).then(
          Promise.all([
            dispatch(
              showSnackbar({
                message: `You have successfully purchased a boxpile worth NGN ${response.data.purchaseAmount}`,
              })
            ),
          ]).then(dispatch(closeConfirmBoxpileDialog()))
        );
      }
    });
}

export function bidForIpoStake(data) {
  // queue to bid feature
  const request = axios.post("/auth/properties/ipo-stake/bid", data);

  console.dir(request);

  return (dispatch) =>
    request
      .then((response) => {
        if (response.status === 200) {
          Promise.all([
            dispatch({
              type: BID_BOXPILE_SUCCESS,
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
      })
      .catch((error) => {
        dispatch(
          showSnackbar({
            message: error.response.data.message,
            variant: "error",
          })
        );
        dispatch(Actions.closeConfirmBidDialog());
        dispatch(Actions.closeQueueInBidDialog());
      });
}

// for a new boxpile
export function openIpoStakeDialog(payload) {
  return {
    type: OPEN_NEW_BOXPILE_DIALOG,
    payload,
  };
}

export function closeIpoStakeDialog() {
  return {
    type: CLOSE_NEW_BOXPILE_DIALOG,
  };
}

export function openConfirmNewIpoStakeDialog(payload) {
  return (dispatch) => {
    Promise.all([
      dispatch(closeIpoStakeDialog()),
      dispatch({
        type: OPEN_CONFIRM_NEW_BOXPILE_DIALOG,
        payload,
      }),
    ]);
  };
}

export function closeConfirmNewIpoStakeDialog() {
  return {
    type: CLOSE_CONFIRM_NEW_BOXPILE_DIALOG,
  };
}

// for existing boxpiles
export function openConfirmBoxpileDialog(payload) {
  return (dispatch) => {
    Promise.all([
      dispatch(closeIpoStakeDialog()),
      dispatch({
        type: OPEN_CONFIRM_BOXPILE_DIALOG,
        payload,
      }),
    ]);
  };
}

export function closeConfirmBoxpileDialog(payload) {
  return {
    type: CLOSE_CONFIRM_BOXPILE_DIALOG,
    payload,
  };
}
