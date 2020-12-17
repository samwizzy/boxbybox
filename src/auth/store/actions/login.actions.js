export const LOGIN_SUCCESS = "[AUTH] LOGIN_SUCCESS";
export const LOGIN_ERROR = "[AUTH] LOGIN_ERROR";
export const LOGIN_PROGRESS = "[AUTH] LOGIN_PROGRESS";

export function login(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
}
