import authService from "./../../../services/authService";
import { setUserData } from "./";
import { showSnackbar } from "./../../../store/actions";

export const REGISTER_SUCCESS = "[AUTH] REGISTER_SUCCESS";
export const REGISTER_ERROR = "[AUTH] REGISTER_ERROR";
export const REGISTER_PROGRESS = "[AUTH] REGISTER_PROGRESS";

export function register(data) {
  return (dispatch) => {
    dispatch({ type: REGISTER_PROGRESS });
    authService
      .createUser(data)
      .then((user) => {
        Promise.all([
          dispatch(setUserData(user)),
          dispatch({ type: REGISTER_SUCCESS }),
        ]).then(dispatch(showSnackbar({ message: "Registration successful" })));
      })
      .catch((error) => {
        dispatch({
          type: REGISTER_ERROR,
          payload: error.response.message,
        });
      });
  };
}
