import axios from "axios";
import { showSnackbar } from "./../../../../store/actions";
import { setUserData } from "./../../../../auth/store/actions";

export const UPDATE_PROGRESS = "[PROFILE] UPDATE_PROGRESS";

export const UPDATE_PROFILE_SUCCESS = "[PROFILE] UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_ERROR = "[PROFILE] UPDATE_PROFILE_ERROR";

export const OPEN_PROFILE_DIALOG = "[PROFILE] OPEN_PROFILE_DIALOG";
export const CLOSE_PROFILE_DIALOG = "[PROFILE] CLOSE_PROFILE_DIALOG";

export function updateProfile(data) {
  const request = axios.put("/auth/users", data);

  return (dispatch) => {
    dispatch({ type: UPDATE_PROGRESS });

    request.then((response) =>
      Promise.all([
        dispatch({
          type: UPDATE_PROFILE_SUCCESS,
          payload: response.data,
        }),
        dispatch(setUserData(response.data)),
      ]).then(
        dispatch(showSnackbar({ message: "Profile updated successfully" })),
        dispatch(closeProfileDialog())
      )
    );
  };
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
