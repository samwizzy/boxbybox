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

export function getUserIpoStakes() {
  const request = axios.get("/auth/users/ipo-stake");

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
