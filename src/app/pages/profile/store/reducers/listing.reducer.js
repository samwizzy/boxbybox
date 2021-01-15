import * as Actions from "../actions/listing.actions";

const initialState = {
  loading: false,
  error: null,
  sublots: [],
  sublot: null,
  sellSublotDialog: {
    open: false,
    data: null,
  },
  mergeSublotDialog: {
    open: false,
    data: null,
  },
  confirmMergeDialog: {
    open: false,
    data: null,
  },
};

const listingReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_SUBLOTS_SUCCESS: {
      return {
        ...state,
        sublots: action.payload,
      };
    }
    case Actions.GET_SUBLOT_BY_ID_SUCCESS: {
      return {
        ...state,
        sublot: action.payload,
      };
    }
    case Actions.OPEN_SELL_SUBLOT_DIALOG: {
      return {
        ...state,
        sellSublotDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_SELL_SUBLOT_DIALOG: {
      return {
        ...state,
        sellSublotDialog: { open: false, data: null },
      };
    }
    case Actions.OPEN_MERGE_SUBLOT_DIALOG: {
      return {
        ...state,
        mergeSublotDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_MERGE_SUBLOT_DIALOG: {
      return {
        ...state,
        mergeSublotDialog: { open: false, data: null },
      };
    }
    case Actions.OPEN_CONFIRM_MERGE_DIALOG: {
      return {
        ...state,
        confirmMergeDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_CONFIRM_MERGE_DIALOG: {
      return {
        ...state,
        confirmMergeDialog: { open: false, data: null },
      };
    }
    default:
      return { ...state };
  }
};

export default listingReducer;
