export const REGISTER_SUCCESS = "[AUTH] REGISTER_SUCCESS";
export const REGISTER_ERROR = "[AUTH] REGISTER_ERROR";
export const REGISTER_PROGRESS = "[AUTH] REGISTER_PROGRESS";

export function register(payload) {
  return {
    type: REGISTER_SUCCESS,
    payload,
  };
}
