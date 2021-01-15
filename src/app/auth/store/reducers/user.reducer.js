import * as Actions from "../actions/user.actions";

const initialState = {
  loading: false,
  data: {
    company: null,
    email: null,
    individualUser: null,
    phone: null,
    role: null,
    status: null,
  },
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_USER_DATA_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.SET_USER_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }
    case Actions.SET_USER_DATA_ERROR: {
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

export default userReducer;
