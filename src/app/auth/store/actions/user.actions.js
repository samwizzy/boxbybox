import authService from "./../../../services/authService";
import { showSnackbar } from "./../../../store/actions";
import history from "./../../../history";

export const SET_USER_DATA = "[AUTH] SET_USER_DATA";

export const REMOVE_USER_DATA = "[AUTH] REMOVE_USER_DATA";

export const LOGOUT_SUCCESS = "[AUTH] LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "[AUTH] LOGOUT_ERROR";
export const LOGOUT_PROGRESS = "[AUTH] LOGOUT_PROGRESS";

export function setUserData(payload) {
  return {
    type: SET_USER_DATA,
    payload,
  };
}

export function removeUserData() {
  return {
    type: REMOVE_USER_DATA,
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
        dispatch(removeUserData()),
        history.push("/")
      );
    });
}
