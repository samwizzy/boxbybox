import * as Actions from "../actions/location.actions";

const initialState = {
  loading: false,
  error: null,
  countries: [],
  states: [],
  lgas: [],
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_COUNTRIES: {
      return {
        ...state,
        countries: action.payload,
      };
    }
    case Actions.GET_STATES_BY_COUNTRY: {
      return {
        ...state,
        states: action.payload,
      };
    }
    case Actions.GET_LGA_BY_STATE: {
      return {
        ...state,
        lgas: action.payload,
      };
    }
    default:
      return { ...state };
  }
};

export default locationReducer;
