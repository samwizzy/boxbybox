import axios from "axios";

export const GET_OFFERS_SUCCESS = "[OFFER] GET_OFFERS_SUCCESS";
export const GET_OFFERS_ERROR = "[OFFER] GET_OFFERS_ERROR";

export const GET_OFFER_BY_ID_SUCCESS = "[OFFER] GET_OFFER_BY_ID_SUCCESS";
export const GET_OFFER_BY_ID_ERROR = "[OFFER] GET_OFFER_BY_ID_ERROR";

export const ADD_OFFER_SUCCESS = "[OFFER] ADD_OFFER_SUCCESS";
export const ADD_OFFER_ERROR = "[OFFER] ADD_OFFER_ERROR";

export function getOffers() {
  const request = axios.get("/properties");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_OFFERS_SUCCESS,
        payload: response.data,
      })
    );
}

export function getOfferById(id) {
  const request = axios.get("/properties/" + id);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_OFFER_BY_ID_SUCCESS,
        payload: response.data,
      })
    );
}

export function addOffer(data) {
  const request = axios.post("/auth/properties", data);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: ADD_OFFER_SUCCESS,
        payload: response.data,
      })
    );
}
