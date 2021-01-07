import axios from "axios";

export const GET_COUNTRIES = "[AUTH] GET_COUNTRIES";
export const GET_COUNTRIES_SUCCESS = "[AUTH] GET_COUNTRIES_SUCCESS";
export const GET_COUNTRIES_ERROR = "[AUTH] GET_COUNTRIES_ERROR";

export const GET_STATES_BY_COUNTRY = "[AUTH] GET_STATES_BY_COUNTRY";
export const GET_STATES_BY_COUNTRY_SUCCESS =
  "[AUTH] GET_STATES_BY_COUNTRY_SUCCESS";
export const GET_STATES_BY_COUNTRY_ERROR = "[AUTH] GET_STATES_BY_COUNTRY_ERROR";

export const GET_LGA_BY_STATE = "[AUTH] GET_LGA_BY_STATE";
export const GET_LGA_BY_STATE_SUCCESS = "[AUTH] GET_LGA_BY_STATE_SUCCESS";
export const GET_LGA_BY_STATE_ERROR = "[AUTH] GET_LGA_BY_STATE_ERROR";

export function getCountries() {
  const request = axios.get("/country");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_COUNTRIES,
        payload: response.data,
      })
    );
}

export function getStateByCountry(country) {
  const request = axios.get(`/state/${country}`);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_STATES_BY_COUNTRY,
        payload: response.data,
      })
    );
}

export function getLgaByState(state) {
  const request = axios.get(`/lga/${state}`);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_LGA_BY_STATE,
        payload: response.data,
      })
    );
}
