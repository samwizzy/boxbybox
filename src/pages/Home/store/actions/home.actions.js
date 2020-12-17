export const GET_FEATURES_SUCCESS = "[HOME] GET_FEATURES_SUCCESS";
export const GET_FEATURES_ERROR = "[HOME] GET_FEATURES_ERROR";
export const GET_FEATURES_PROGRESS = "[HOME] GET_FEATURES_PROGRESS";

export function getFeatures(payload) {
  return {
    type: GET_FEATURES_SUCCESS,
    payload,
  };
}
