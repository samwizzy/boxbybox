import axios from "axios";

export const GET_SUBLOTS_SUCCESS = "[LISTING] GET_SUBLOTS_SUCCESS";
export const GET_SUBLOTS_ERROR = "[LISTING] GET_SUBLOTS_ERROR";

export const GET_SUBLOT_BY_ID_SUCCESS = "[LISTING] GET_SUBLOT_BY_ID_SUCCESS";
export const GET_BBB_SUBLOT_BY_ID_ERROR = "[LISTING] GET_SUBLOT_BY_ID_ERROR";

export const OPEN_MERGE_SUBLOT_DIALOG = "[LISTING] OPEN_MERGE_SUBLOT_DIALOG";
export const CLOSE_MERGE_SUBLOT_DIALOG = "[LISTING] CLOSE_MERGE_SUBLOT_DIALOG";

export const OPEN_SELL_SUBLOT_DIALOG = "[LISTING] OPEN_SELL_SUBLOT_DIALOG";
export const CLOSE_SELL_SUBLOT_DIALOG = "[LISTING] CLOSE_SELL_SUBLOT_DIALOG";

export const OPEN_CONFIRM_MERGE_DIALOG = "[LISTING] OPEN_CONFIRM_MERGE_DIALOG";
export const CLOSE_CONFIRM_MERGE_DIALOG =
  "[LISTING] CLOSE_CONFIRM_MERGE_DIALOG";

export function getSublots() {
  const request = axios.get("/properties");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_SUBLOTS_SUCCESS,
        payload: response.data,
      })
    );
}

export function getSublotById(id) {
  const request = axios.get("/property/" + id);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_SUBLOT_BY_ID_SUCCESS,
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
