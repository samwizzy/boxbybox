import authService from "./../../../services/authService";
import { setUserData } from "./";
import { showSnackbar } from "./../../../store/actions";

export const OPEN_DIALOG = "[AUTH] OPEN_DIALOG";
export const CLOSE_DIALOG = "[AUTH] CLOSE_DIALOG";

export const LOGIN_SUCCESS = "[AUTH] LOGIN_SUCCESS";
export const LOGIN_ERROR = "[AUTH] LOGIN_ERROR";
export const LOGIN_PROGRESS = "[AUTH] LOGIN_PROGRESS";

export function login(data) {
  const { email, password } = data;

  return (dispatch) => {
    dispatch({ type: LOGIN_PROGRESS });
    authService
      .signInWithEmailAndPassword(email, password)
      .then((user) =>
        Promise.all([
          dispatch(setUserData(user)),
          dispatch({
            type: LOGIN_SUCCESS,
          }),
          dispatch(closeDialog()),
        ]).then(dispatch(showSnackbar({ message: "Login successfully" })))
      )
      .catch((error) => {
        console.log(error, "inside the goddamn login action");
        error.status === 401
          ? dispatch(
              showSnackbar({
                message: "Email or Password is not valid",
                variant: "warning",
              })
            )
          : dispatch(
              showSnackbar({ message: error.message, variant: "error" })
            );
        dispatch({ type: LOGIN_ERROR, payload: error.message });
      });
  };
}

export function openDialog(payload) {
  return {
    type: OPEN_DIALOG,
    payload,
  };
}

export function closeDialog() {
  return {
    type: CLOSE_DIALOG,
  };
}
