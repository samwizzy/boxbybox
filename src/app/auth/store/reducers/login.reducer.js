import * as Actions from "../actions/login.actions";

const initialState = {
  loading: false,
  data: {
    email: "",
    password: "",
  },
  error: null,
  authDialog: {
    open: false,
    data: {},
  },
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.LOGIN_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case Actions.OPEN_DIALOG: {
      return {
        ...state,
        authDialog: {
          ...state.authDialog,
          open: true,
        },
      };
    }
    case Actions.CLOSE_DIALOG: {
      return {
        ...state,
        authDialog: {
          ...state.authDialog,
          open: false,
          data: [],
        },
      };
    }
    default:
      return { ...state };
  }
};

export default loginReducer;
