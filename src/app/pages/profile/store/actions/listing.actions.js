import axios from "axios";

export const GET_SUBLOTS_SUCCESS = "[LISTING] GET_SUBLOTS_SUCCESS";
export const GET_SUBLOTS_ERROR = "[LISTING] GET_SUBLOTS_ERROR";

export const GET_SUBLOT_BY_ID_SUCCESS = "[LISTING] GET_SUBLOT_BY_ID_SUCCESS";
export const GET_BBB_SUBLOT_BY_ID_ERROR = "[LISTING] GET_SUBLOT_BY_ID_ERROR";

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
