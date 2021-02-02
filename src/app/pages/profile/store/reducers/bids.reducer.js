import * as Actions from "../actions/bids.actions";

const initialState = {
  loading: false,
  error: null,
  bids: [],
  bid: null,
  offerDialog: {
    open: false,
    data: null,
  },
  paymentDialog: {
    open: false,
    data: null,
  },
  confirmBidDialog: {
    open: false,
    data: null,
  },
};

const bidsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_BIDS_SUCCESS: {
      return {
        ...state,
        bids: action.payload,
      };
    }
    case Actions.GET_BIDS_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case Actions.GET_BID_BY_ID_SUCCESS: {
      return {
        ...state,
        bid: action.payload,
      };
    }
    case Actions.OPEN_OFFER_DIALOG: {
      return {
        ...state,
        offerDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_OFFER_DIALOG: {
      return {
        ...state,
        offerDialog: { open: false, data: null },
      };
    }
    case Actions.OPEN_BID_PAYMENT_DIALOG: {
      return {
        ...state,
        paymentDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_BID_PAYMENT_DIALOG: {
      return {
        ...state,
        paymentDialog: { open: false, data: null },
      };
    }
    case Actions.OPEN_CONFIRM_BID_DIALOG: {
      return {
        ...state,
        confirmBidDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_CONFIRM_BID_DIALOG: {
      return {
        ...state,
        confirmBidDialog: { open: false, data: null },
      };
    }
    default:
      return { ...state };
  }
};

export default bidsReducer;
