import * as Actions from "../actions/wallet.actions";

const initialState = {
  loading: false,
  error: null,
  paymentGateways: [],
  wallet: null,
  paymentRef: null,
  transactions: {
    page: 0,
    limit: 0,
    total: 0,
    entities: [],
  },
  fundWalletDialog: {
    open: false,
    data: null,
  },
  verifyPaymentDialog: {
    open: false,
    data: null,
  },
  cardDialog: {
    open: false,
    data: null,
  },
};

const walletsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_USER_WALLET_BALANCE: {
      return {
        ...state,
        wallet: action.payload,
      };
    }
    case Actions.GET_USER_WALLET_TRANSACTIONS: {
      return {
        ...state,
        transactions: action.payload,
      };
    }
    case Actions.GET_PAYMENT_GATEWAYS: {
      return {
        ...state,
        paymentGateways: action.payload,
      };
    }
    case Actions.REGISTER_TRANSACTION: {
      return {
        ...state,
        loading: false,
        paymentRef: action.payload,
      };
    }
    case Actions.VERIFY_PAYMENT: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.OPEN_FUND_WALLET_DIALOG: {
      return {
        ...state,
        fundWalletDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_FUND_WALLET_DIALOG: {
      return {
        ...state,
        fundWalletDialog: { open: false, data: null },
      };
    }
    case Actions.OPEN_VERIFY_PAYMENT_DIALOG: {
      return {
        ...state,
        verifyPaymentDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_VERIFY_PAYMENT_DIALOG: {
      return {
        ...state,
        verifyPaymentDialog: { open: false, data: null },
      };
    }
    case Actions.OPEN_NEW_CARD_DIALOG: {
      return {
        ...state,
        cardDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_NEW_CARD_DIALOG: {
      return {
        ...state,
        cardDialog: { open: false, data: null },
      };
    }
    default:
      return { ...state };
  }
};

export default walletsReducer;
