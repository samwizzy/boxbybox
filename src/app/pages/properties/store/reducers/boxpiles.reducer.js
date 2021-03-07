import * as Actions from "../actions/boxpiles.actions";

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
  boxpileDialog: {
    open: false,
    data: null,
  },
  confirmNewBoxpileDialog: {
    open: false,
    data: null,
  },
  confirmBoxpileDialog: {
    open: false,
    data: null,
  },
};

const ipoStakesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_BOXPILES: {
      return {
        ...state,
        boxlots: action.payload,
      };
    }
    case Actions.GET_BOXPILES_BY_PROPERTY_ID: {
      return {
        ...state,
        boxlots: action.payload,
      };
    }
    case Actions.GET_USER_BOXPILES_BY_PROPERTY_ID: {
      return {
        ...state,
        userBoxlots: action.payload,
      };
    }
    case Actions.ADD_BOXPILE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.BUY_BOXPILE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.BID_BOXPILE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.OPEN_NEW_BOXPILE_DIALOG: {
      return {
        ...state,
        boxpileDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_NEW_BOXPILE_DIALOG: {
      return {
        ...state,
        boxpileDialog: { open: false, data: null },
      };
    }
    case Actions.OPEN_CONFIRM_NEW_BOXPILE_DIALOG: {
      return {
        ...state,
        confirmNewBoxpileDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_CONFIRM_NEW_BOXPILE_DIALOG: {
      return {
        ...state,
        confirmNewBoxpileDialog: { open: false, data: null },
      };
    }
    case Actions.OPEN_CONFIRM_BOXPILE_DIALOG: {
      return {
        ...state,
        confirmBoxpileDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_CONFIRM_BOXPILE_DIALOG: {
      return {
        ...state,
        confirmBoxpileDialog: { open: false, data: null },
      };
    }
    default:
      return { ...state };
  }
};

export default ipoStakesReducer;
