import * as Actions from "../actions/property.actions";

const initialState = {
  loading: false,
  error: null,
  properties: {
    entities: [],
    page: 0,
    limit: 0,
    total: 0,
  },
  property: null,
  userProperties: {
    entities: [],
    page: 0,
    limit: 0,
    total: 0,
  },
  userIpoStakedProperties: [],
  userPropertiesOnRent: {
    entities: [],
    page: 0,
    limit: 0,
    total: 0,
  },
  userPropertiesOnSale: {
    entities: [],
    page: 0,
    limit: 0,
    total: 0,
  },
};

const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_PROPERTIES_SUCCESS: {
      return {
        ...state,
        properties: action.payload,
      };
    }
    case Actions.GET_USER_PROPERTIES_ON_RENT: {
      return {
        ...state,
        userPropertiesOnRent: action.payload,
      };
    }
    case Actions.GET_USER_PROPERTIES_ON_SALE: {
      return {
        ...state,
        userPropertiesOnSale: action.payload,
      };
    }
    case Actions.ADD_PROPERTY_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.ADD_PROPERTY_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.GET_USER_PROPERTIES: {
      return {
        ...state,
        userProperties: action.payload,
      };
    }
    case Actions.GET_USER_PROPERTIES_WITH_IPO_STAKE: {
      return {
        ...state,
        userIpoStakedProperties: action.payload,
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
