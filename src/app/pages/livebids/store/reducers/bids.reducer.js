import * as Actions from "../actions/bids.actions";

const initialState = {
  loading: false,
  error: null,
  bids: {
    entities: [],
    page: 0,
    limit: 0,
    total: 0,
  },
  bid: null,
  paymentDialog: {
    open: false,
    data: null,
  },
  queueInBidDialog: {
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
    case Actions.OPEN_QUEUE_IN_BID_DIALOG: {
      return {
        ...state,
        queueInBidDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_QUEUE_IN_BID_DIALOG: {
      return {
        ...state,
        queueInBidDialog: { open: false, data: null },
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
