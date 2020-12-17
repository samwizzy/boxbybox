import * as Actions from "../actions/login.actions";

const initialState = {
  loading: false,
  data: {
    email: "",
    password: "",
  },
  error: null,
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
    default:
      return { ...state };
  }
};

export default loginReducer;
