import * as Actions from "../actions/offers.actions";

const initialState = {
  loading: false,
  error: null,
  offers: [],
  offer: null,
};

const offersReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_OFFERS_SUCCESS: {
      return {
        ...state,
        offers: action.payload,
      };
    }
    case Actions.GET_OFFERS_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case Actions.GET_OFFER_BY_ID_SUCCESS: {
      return {
        ...state,
        offer: action.payload,
      };
    }
    default:
      return { ...state };
  }
};

export default offersReducer;
