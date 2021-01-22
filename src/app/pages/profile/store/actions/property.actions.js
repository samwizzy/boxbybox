import axios from "axios";
import history from "./../../../../history";
import { showSnackbar } from "./../../../../store/actions";

export const GET_PROPERTIES_SUCCESS = "[PROPERTY] GET_PROPERTIES_SUCCESS";
export const GET_PROPERTIES_ERROR = "[PROPERTY] GET_PROPERTIES_ERROR";

export const GET_USER_PROPERTIES = "[PROPERTY] GET_USER_PROPERTIES";

export const GET_PROPERTY_BY_ID_SUCCESS =
  "[PROPERTY] GET_PROPERTY_BY_ID_SUCCESS";
export const GET_PROPERTY_BY_ID_ERROR = "[PROPERTY] GET_PROPERTY_BY_ID_ERROR";

export const GET_USER_PROPERTIES_WITH_IPO_STAKE_SUCCESS =
  "[PROPERTY] GET_USER_PROPERTIES_WITH_IPO_STAKE_SUCCESS";
export const GET_USER_PROPERTIES_WITH_IPO_STAKE_ERROR =
  "[PROPERTY] GET_USER_PROPERTIES_WITH_IPO_STAKE_ERROR";

export const ADD_PROPERTY_SUCCESS = "[PROPERTY] ADD_PROPERTY_SUCCESS";
export const ADD_PROPERTY_PROGRESS = "[PROPERTY] ADD_PROPERTY_PROGRESS";
export const ADD_PROPERTY_ERROR = "[PROPERTY] ADD_PROPERTY_ERROR";

export function getProperties() {
  const request = axios.get("/properties");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_PROPERTIES_SUCCESS,
        payload: response.data,
      })
    );
}

export function getUserProperties() {
  const request = axios.get("/auth/users/properties");

  console.log(request, "request get user properties");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_USER_PROPERTIES,
        payload: response.data,
      })
    );
}

export function getUserPropertiesWithIpoStake() {
  const request = axios.get("/auth/users/properties-ipo-stake-purchased");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_USER_PROPERTIES_WITH_IPO_STAKE_SUCCESS,
        payload: response.data,
      })
    );
}

export function getPropertyById(id) {
  const request = axios.get("/properties/" + id);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_PROPERTY_BY_ID_SUCCESS,
        payload: response.data,
      })
    );
}

export function addProperty(data) {
  const request = axios.post("/auth/properties", data);
  console.log(request, "add new property request");

  return (dispatch) => {
    dispatch({ type: ADD_PROPERTY_PROGRESS });
    request.then((response) => {
      if (response.status === 201) {
        Promise.all([
          dispatch({
            type: ADD_PROPERTY_SUCCESS,
            payload: response.data,
          }),
        ]).then(
          dispatch(
            showSnackbar({
              message: "Your property has been added successfully",
            })
          ),
          history.push("/profile/upload-property")
        );
      }
    });
  };
}
