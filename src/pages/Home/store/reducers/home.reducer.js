import * as Actions from "../actions/home.actions";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_FEATURES_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.GET_FEATURES_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.GET_FEATURES_ERROR: {
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

export default homeReducer;
