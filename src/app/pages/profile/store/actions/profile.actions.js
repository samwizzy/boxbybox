import axios from "axios";

export const UPDATE_PROFILE_SUCCESS = "[PROFILE] UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_ERROR = "[PROFILE] UPDATE_PROFILE_ERROR";

export const OPEN_PROFILE_DIALOG = "[PROFILE] OPEN_PROFILE_DIALOG";
export const CLOSE_PROFILE_DIALOG = "[PROFILE] CLOSE_PROFILE_DIALOG";

export function updateProfile() {
  const request = axios.get("/auth/wallet");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: response.data,
      })
    );
}

export function openProfileDialog(payload) {
  return {
    type: OPEN_PROFILE_DIALOG,
    payload,
  };
}

export function closeProfileDialog() {
  return {
    type: CLOSE_PROFILE_DIALOG,
  };
}
