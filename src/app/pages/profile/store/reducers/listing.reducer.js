import * as Actions from "../actions/listing.actions";

const initialState = {
  loading: false,
  error: null,
  sublots: [],
  sublot: null,
};

const listingReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_SUBLOTS_SUCCESS: {
      return {
        ...state,
        sublots: action.payload,
      };
    }
    case Actions.GET_SUBLOT_BY_ID_SUCCESS: {
      return {
        ...state,
        sublot: action.payload,
      };
    }
    default:
      return { ...state };
  }
};

export default listingReducer;
