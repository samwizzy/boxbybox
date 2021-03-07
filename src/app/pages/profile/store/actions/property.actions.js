import axios from "axios";
import history from "./../../../../history";
import { showSnackbar } from "./../../../../store/actions";

export const GET_PROPERTIES_SUCCESS = "[PROPERTY] GET_PROPERTIES_SUCCESS";

export const GET_USER_PROPERTIES = "[PROPERTY] GET_USER_PROPERTIES";
export const GET_USER_PROPERTIES_ON_RENT =
  "[PROPERTY] GET_USER_PROPERTIES_ON_RENT";
export const GET_USER_PROPERTIES_ON_SALE =
  "[PROPERTY] GET_USER_PROPERTIES_ON_SALE";

export const GET_PROPERTY_BY_ID_SUCCESS =
  "[PROPERTY] GET_PROPERTY_BY_ID_SUCCESS";
export const GET_PROPERTY_BY_ID_ERROR = "[PROPERTY] GET_PROPERTY_BY_ID_ERROR";

export const GET_USER_PROPERTIES_WITH_IPO_STAKE =
  "[PROPERTY] GET_USER_PROPERTIES_WITH_IPO_STAKE";

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

  console.log(request, "request user properties");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_USER_PROPERTIES,
        payload: response.data,
      })
    );
}

export function getPropertiesOnRent(data = { page: 0 }) {
  const request = axios.get(`/auth/users/properties`, {
    params: { page: data.page, saleOrRent: "RENT" },
  });

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_USER_PROPERTIES_ON_RENT,
        payload: response.data,
      })
    );
}

export function getPropertiesOnSale(data = { page: 0 }) {
  const request = axios.get("/auth/users/properties", {
    params: { page: data.page, saleOrRent: "SALE" },
  });

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_USER_PROPERTIES_ON_SALE,
        payload: response.data,
      })
    );
}

export function getUserPropertiesWithIpoStake() {
  const request = axios.get("/auth/users/properties-ipo-stake-purchased");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_USER_PROPERTIES_WITH_IPO_STAKE,
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
  console.dir(request, "add new property request");

  return (dispatch) => {
    dispatch({ type: ADD_PROPERTY_PROGRESS });
    request
      .then((response) => {
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
            history.push("/profile/properties")
          );
        }
      })
      .catch((error) => {
        dispatch({ type: ADD_PROPERTY_ERROR, payload: error.response.data });
        dispatch(
          showSnackbar({
            message: error.response.data.message,
            variant: "error",
          })
        );
        history.push("/profile/upload-property");
      });
  };
}
