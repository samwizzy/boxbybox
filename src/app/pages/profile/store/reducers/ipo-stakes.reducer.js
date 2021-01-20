import * as Actions from "../actions/ipo-stakes.actions";

const initialState = {
  loading: false,
  error: null,
  userBoxlets: [],
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

const ipoStakesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_USER_IPO_STAKES: {
      return {
        ...state,
        userBoxlets: action.payload,
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
    default:
      return { ...state };
  }
};

export default ipoStakesReducer;
