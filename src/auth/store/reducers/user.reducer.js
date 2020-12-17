import * as Actions from "../actions/user.actions";

const initialState = {
  loading: false,
  data: {},
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
