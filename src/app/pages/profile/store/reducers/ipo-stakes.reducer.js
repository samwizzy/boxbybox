import * as Actions from "../actions/ipo-stakes.actions";

const initialState = {
  loading: false,
  error: null,
  boxlots: {
    page: 0,
    limit: 50,
    total: 0,
    entities: [],
  },
  userBoxlots: {
    page: 0,
    limit: 50,
    total: 0,
    entities: [],
  },
  offerDialog: {
    open: false,
    data: null,
  },
  confirmBidDialog: {
    open: false,
    data: null,
  },
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
  confirmSaleDialog: {
    open: false,
    data: null,
  },
  confirmSplitDialog: {
    open: false,
    data: null,
  },
};

const ipoStakesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_USER_IPO_STAKES: {
      return {
        ...state,
        userBoxlots: action.payload,
      };
    }
    case Actions.ADD_IPO_STAKE_BY_ID_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.BUY_IPO_STAKE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.MERGE_IPO_STAKE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.PUT_IPO_STAKE_FOR_SALE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.SPLIT_IPO_STAKE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.GET_IPO_STAKE_BY_ID_SUCCESS: {
      return {
        ...state,
        loading: false,
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
    case Actions.OPEN_CONFIRM_SALE_DIALOG: {
      return {
        ...state,
        confirmSaleDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_CONFIRM_SALE_DIALOG: {
      return {
        ...state,
        confirmSaleDialog: { open: false, data: null },
      };
    }
    case Actions.OPEN_CONFIRM_SPLIT_DIALOG: {
      return {
        ...state,
        confirmSplitDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_CONFIRM_SPLIT_DIALOG: {
      return {
        ...state,
        confirmSplitDialog: { open: false, data: null },
      };
    }
    default:
      return { ...state };
  }
};

export default ipoStakesReducer;
