import * as Actions from "../actions/ipo_stakes.actions";

const initialState = {
  loading: false,
  error: null,
  boxlots: {
    total: 0,
    limit: 0,
    page: 0,
    entities: [],
  },
  userBoxlots: {
    total: 0,
    limit: 0,
    page: 0,
    entities: [],
  },
  ipoStakeDialog: {
    open: false,
    data: null,
  },
  confirmIpoStakeDialog: {
    open: false,
    data: null,
  },
};

const ipoStakesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_IPO_STAKES: {
      return {
        ...state,
        boxlots: action.payload,
      };
    }
    case Actions.GET_IPO_STAKES_BY_PROPERTY_ID: {
      return {
        ...state,
        boxlots: action.payload,
      };
    }
    case Actions.GET_USER_IPO_STAKES_BY_PROPERTY_ID: {
      return {
        ...state,
        userBoxlots: action.payload,
      };
    }
    case Actions.ADD_IPO_STAKE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.BID_IPO_STAKE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.OPEN_IPO_STAKE_DIALOG: {
      return {
        ...state,
        ipoStakeDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_IPO_STAKE_DIALOG: {
      return {
        ...state,
        ipoStakeDialog: { open: false, data: null },
      };
    }
    case Actions.OPEN_CONFIRM_IPO_STAKE_DIALOG: {
      return {
        ...state,
        confirmIpoStakeDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_CONFIRM_IPO_STAKE_DIALOG: {
      return {
        ...state,
        confirmIpoStakeDialog: { open: false, data: null },
      };
    }
    default:
      return { ...state };
  }
};

export default ipoStakesReducer;
