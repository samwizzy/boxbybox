import axios from "axios";

export const GET_USER_WALLET_BALANCE = "[WALLET] GET_USER_WALLET_BALANCE";
export const GET_USER_WALLET_TRANSACTIONS =
  "[WALLET] GET_USER_WALLET_TRANSACTIONS";

export const GET_PAYMENT_GATEWAYS = "[WALLET] GET_PAYMENT_GATEWAYS";

export const REGISTER_TRANSACTION = "[WALLET] REGISTER_TRANSACTION";

export const VERIFY_PAYMENT = "[WALLET] VERIFY_PAYMENT";

export const FUND_WALLET_SUCCESS = "[WALLET] ADD_WALLET_SUCCESS";
export const FUND_WALLET_ERROR = "[WALLET] ADD_WALLET_ERROR";

export const OPEN_FUND_WALLET_DIALOG = "[WALLET] OPEN_FUND_WALLET_DIALOG";
export const CLOSE_FUND_WALLET_DIALOG = "[WALLET] CLOSE_FUND_WALLET_DIALOG";

export const OPEN_NEW_CARD_DIALOG = "[WALLET] OPEN_NEW_CARD_DIALOG";
export const CLOSE_NEW_CARD_DIALOG = "[WALLET] CLOSE_NEW_CARD_DIALOG";

export function getWalletBalance() {
  const request = axios.get("/auth/wallet-balance");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_USER_WALLET_BALANCE,
        payload: response.data,
      })
    );
}

export function getWalletTransactions() {
  const request = axios.get("/auth/wallet-transactions");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_USER_WALLET_TRANSACTIONS,
        payload: response.data,
      })
    );
}

export function getPaymentGateways() {
  const request = axios.get("/auth/payment-gateways");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_PAYMENT_GATEWAYS,
        payload: response.data,
      })
    );
}

export function registerTransaction() {
  const request = axios.get("/auth/transactions");

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: REGISTER_TRANSACTION,
        payload: response.data,
      })
    );
}

export function verifyPayment(paymentGateway, transactionRef) {
  const request = axios.get(
    `/auth/payment-verification/${paymentGateway}/${transactionRef}`
  );

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: VERIFY_PAYMENT,
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
