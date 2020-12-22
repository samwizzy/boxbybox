export const OPEN_DIALOG = "[AUTH] OPEN_DIALOG";
export const CLOSE_DIALOG = "[AUTH] CLOSE_DIALOG";

export const LOGIN_SUCCESS = "[AUTH] LOGIN_SUCCESS";
export const LOGIN_ERROR = "[AUTH] LOGIN_ERROR";
export const LOGIN_PROGRESS = "[AUTH] LOGIN_PROGRESS";

export function login(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload,
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
