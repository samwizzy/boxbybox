import * as Actions from "../actions/property.actions";

const initialState = {
  loading: false,
  properties: { entities: [] },
  error: null,
};

const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_PROPERTIES_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.GET_PROPERTIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        properties: action.payload,
      };
    }
    default:
      return { ...state };
  }
};

export default propertyReducer;
