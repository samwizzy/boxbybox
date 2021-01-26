import authService from "./../../../services/authService";
import { showSnackbar } from "./../../../store/actions";
import history from "./../../../history";

export const SET_USER_DATA_SUCCESS = "[AUTH] SET_USER_DATA_SUCCESS";
export const SET_USER_DATA_ERROR = "[AUTH] SET_USER_DATA_ERROR";
export const SET_USER_DATA_PROGRESS = "[AUTH] SET_USER_DATA_PROGRESS";

export const REMOVE_USER_DATA_SUCCESS = "[AUTH] REMOVE_USER_DATA_SUCCESS";
export const REMOVE_USER_DATA_ERROR = "[AUTH] REMOVE_USER_DATA_ERROR";
export const REMOVE_USER_DATA_PROGRESS = "[AUTH] REMOVE_USER_DATA_PROGRESS";

export const LOGOUT_SUCCESS = "[AUTH] LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "[AUTH] LOGOUT_ERROR";
export const LOGOUT_PROGRESS = "[AUTH] LOGOUT_PROGRESS";

export function setUserData(payload) {
  return {
    type: SET_USER_DATA_SUCCESS,
    payload,
  };
}

export function removeUserData(payload) {
  return {
    type: REMOVE_USER_DATA_SUCCESS,
    payload,
  };
}

export function logout() {
  return (dispatch) =>
    authService.logout().then((data) => {
      Promise.all([
        dispatch({
          type: LOGOUT_SUCCESS,
        }),
      ]).then(
        dispatch(showSnackbar({ message: data.message })),
        history.push("/")
      );
    });
}
