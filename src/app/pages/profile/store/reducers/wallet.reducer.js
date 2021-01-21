import * as Actions from "../actions/wallet.actions";

const initialState = {
  loading: false,
  error: null,
  wallet: null,
  fundWalletDialog: {
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
    case Actions.GET_USER_WALLET_SUCCESS: {
      return {
        ...state,
        wallet: action.payload,
      };
    }
    case Actions.FUND_WALLET_SUCCESS: {
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
