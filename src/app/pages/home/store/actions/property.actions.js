import axios from "axios";

export const GET_PROPERTIES_SUCCESS = "[HOME] GET_PROPERTIES";
export const GET_PROPERTIES_PROGRESS = "[HOME] GET_FEATURES_PROGRESS";

export function getProperties() {
  const request = axios.get("/properties");

  console.log(request, "request home");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_PROPERTIES_SUCCESS,
        payload: response.data,
      })
    );
}
