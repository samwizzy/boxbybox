import axios from "axios";

export const GET_USER_WALLET_SUCCESS = "[WALLET] GET_USER_WALLET_SUCCESS";
export const GET_USER_WALLET_ERROR = "[WALLET] GET_USER_WALLET_ERROR";

export const FUND_WALLET_SUCCESS = "[WALLET] ADD_WALLET_SUCCESS";
export const FUND_WALLET_ERROR = "[WALLET] ADD_WALLET_ERROR";

export const OPEN_FUND_WALLET_DIALOG = "[WALLET] OPEN_FUND_WALLET_DIALOG";
export const CLOSE_FUND_WALLET_DIALOG = "[WALLET] CLOSE_FUND_WALLET_DIALOG";

export const OPEN_NEW_CARD_DIALOG = "[WALLET] OPEN_NEW_CARD_DIALOG";
export const CLOSE_NEW_CARD_DIALOG = "[WALLET] CLOSE_NEW_CARD_DIALOG";

export function getWallet() {
  const request = axios.get("/auth/wallet");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_USER_WALLET_SUCCESS,
        payload: response.data,
      })
    );
}

export function fundWallet(data) {
  const request = axios.post("/auth/wallet/fund", data);

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: FUND_WALLET_SUCCESS,
        payload: response.data,
      })
    );
}

export function openFundWalletDialog(payload) {
  return {
    type: OPEN_FUND_WALLET_DIALOG,
    payload,
  };
}

export function closeFundWalletDialog() {
  return {
    type: CLOSE_FUND_WALLET_DIALOG,
  };
}

export function openNewCardDialog(payload) {
  return {
    type: OPEN_NEW_CARD_DIALOG,
    payload,
  };
}

export function closeNewCardDialog() {
  return {
    type: CLOSE_NEW_CARD_DIALOG,
  };
}
