import * as Actions from "../actions/property.actions";

const initialState = {
  loading: false,
  error: null,
  properties: {
    entities: [],
    page: 0,
    limit: 10,
    total: 8,
  },
  property: null,
  offers: [],
  bids: [],
};

const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_PROPERTIES_SUCCESS: {
      return {
        ...state,
        properties: action.payload,
      };
    }
    case Actions.GET_PROPERTIES_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case Actions.GET_PROPERTY_BY_ID_SUCCESS: {
      return {
        ...state,
        property: action.payload,
      };
    }
    default:
      return { ...state };
  }
};

export default propertyReducer;
