import axios from "axios";

export const GET_USER_IPO_STAKES = "[IPOSTAKE] GET_USER_IPO_STAKES";

export const ADD_IPO_STAKE_BY_ID_SUCCESS =
  "[IPOSTAKE] ADD_IPO_STAKE_BY_ID_SUCCESS";

export const MERGE_IPO_STAKE_SUCCESS = "[IPOSTAKE] MERGE_IPO_STAKE_SUCCESS";

export const PUT_IPO_STAKE_FOR_SALE_SUCCESS =
  "[IPOSTAKE] PUT_IPO_STAKE_FOR_SALE_SUCCESS";

export const SPLIT_IPO_STAKE_SUCCESS = "[IPOSTAKE] SPLIT_IPO_STAKE_SUCCESS";

export const BUY_IPO_STAKE_SUCCESS = "[IPOSTAKE] BUY_IPO_STAKE_SUCCESS";

export const GET_IPO_STAKE_BY_ID_SUCCESS =
  "[IPOSTAKE] GET_IPO_STAKE_BY_ID_SUCCESS";
export const GET_IPO_STAKE_BY_ID_ERROR = "[IPOSTAKE] GET_IPO_STAKE_BY_ID_ERROR";

export const OPEN_MERGE_SUBLOT_DIALOG = "[LISTING] OPEN_MERGE_SUBLOT_DIALOG";
export const CLOSE_MERGE_SUBLOT_DIALOG = "[LISTING] CLOSE_MERGE_SUBLOT_DIALOG";

export const OPEN_SELL_SUBLOT_DIALOG = "[LISTING] OPEN_SELL_SUBLOT_DIALOG";
export const CLOSE_SELL_SUBLOT_DIALOG = "[LISTING] CLOSE_SELL_SUBLOT_DIALOG";

export const OPEN_CONFIRM_MERGE_DIALOG = "[LISTING] OPEN_CONFIRM_MERGE_DIALOG";
export const CLOSE_CONFIRM_MERGE_DIALOG =
  "[LISTING] CLOSE_CONFIRM_MERGE_DIALOG";

export const OPEN_CONFIRM_SALE_DIALOG = "[LISTING] OPEN_CONFIRM_SALE_DIALOG";
export const CLOSE_CONFIRM_SALE_DIALOG = "[LISTING] CLOSE_CONFIRM_SALE_DIALOG";

export function getUserIpoStakes(propertyId) {
  // const request = axios.get(`/auth/users/ipo-stake?propertyId=${propertyId}`);
  const request = axios.get(`/auth/ipo-stake`);

  console.log(request, "request get ipo stakes on property");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_USER_IPO_STAKES,
        payload: response.data,
      })
    );
}

export function buyIpoStakeById(propertyId) {
  const request = axios.post("/auth/ipo-stake/" + propertyId);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: ADD_IPO_STAKE_BY_ID_SUCCESS,
        payload: response.data,
      })
    );
}

export function updateIpoStake(ipoStakeId) {
  const request = axios.put("/auth/ipo-stake/buy/" + ipoStakeId);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: BUY_IPO_STAKE_SUCCESS,
        payload: response.data,
      })
    );
}

export function mergeIpoStake(data) {
  const request = axios.put("/auth/ipo-stake/merge", data);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: MERGE_IPO_STAKE_SUCCESS,
        payload: response.data,
      })
    );
}

export function putIpoStakeForSale(data) {
  const request = axios.put("/auth/ipo-stake/put-up-for-sale", data);

  console.log(request, "putIpoStakeForSale request");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: PUT_IPO_STAKE_FOR_SALE_SUCCESS,
        payload: response.data,
      })
    );
}

export function splitIpoStake(ipoStakeId) {
  const request = axios.put("/auth/ipo-stake/split/" + ipoStakeId);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: SPLIT_IPO_STAKE_SUCCESS,
        payload: response.data,
      })
    );
}

export function getIpoStakeById(propertyId) {
  const request = axios.put("/auth/properties/ipo-stake/" + propertyId);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_IPO_STAKE_BY_ID_SUCCESS,
        payload: response.data,
      })
    );
}

export function openSellSublotDialog(payload) {
  return {
    type: OPEN_SELL_SUBLOT_DIALOG,
    payload,
  };
}

export function closeSellSublotDialog() {
  return {
    type: CLOSE_SELL_SUBLOT_DIALOG,
  };
}

export function openMergeSublotDialog(payload) {
  return {
    type: OPEN_MERGE_SUBLOT_DIALOG,
    payload,
  };
}

export function closeMergeSublotDialog() {
  return {
    type: CLOSE_MERGE_SUBLOT_DIALOG,
  };
}

export function openConfirmMergeDialog(payload) {
  return {
    type: OPEN_CONFIRM_MERGE_DIALOG,
    payload,
  };
}

export function closeConfirmMergeDialog() {
  return {
    type: CLOSE_CONFIRM_MERGE_DIALOG,
  };
}

export function openConfirmSaleDialog(payload) {
  return {
    type: OPEN_CONFIRM_SALE_DIALOG,
    payload,
  };
}

export function closeConfirmSaleDialog() {
  return {
    type: CLOSE_CONFIRM_SALE_DIALOG,
  };
}
