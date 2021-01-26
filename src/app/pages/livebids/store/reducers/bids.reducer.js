import * as Actions from "../actions/bids.actions";

const initialState = {
  loading: false,
  error: null,
  units: [],
  minimumCostForUnit: null,
  bids: [],
  bid: null,
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
    case Actions.GET_AVAILABLE_UNITS: {
      return {
        ...state,
        units: action.payload,
      };
    }
    case Actions.GET_MIN_COST_OF_UNIT: {
      console.log(action.payload, "tha fuck is going on");
      return {
        ...state,
        minimumCostForUnit: action.payload,
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
