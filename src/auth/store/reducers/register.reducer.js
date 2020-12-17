import * as Actions from "../actions/register.actions";

const initialState = {
  loading: false,
  data: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  error: null,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.REGISTER_PROGRESS: {
      return {
        ...initialState,
        loading: true,
      };
    }
    case Actions.REGISTER_SUCCESS: {
      return {
        ...initialState,
        loading: false,
      };
    }
    case Actions.REGISTER_ERROR: {
      return {
        ...initialState,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return { ...state };
  }
};

export default registerReducer;
