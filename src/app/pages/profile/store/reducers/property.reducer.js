import * as Actions from "../actions/property.actions";

const formData = {
  address: {
    city: "",
    country: "",
    houseNoAddress: "",
    latitude: "",
    lga: "",
    longitude: "",
    postCode: "",
    state: "",
  },
  bathrooms: 0,
  bedrooms: 0,
  canBidFor: true,
  condition: "",
  description: "",
  documentsAvailable: "CFO",
  feature: "SALE",
  images: [],
  parkingLot: true,
  price: 0,
  size: "",
  title: "",
  toilet: 0,
  type: "",
  units: 0,
};

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
  userBoxpiles: [],
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
  form: { ...formData },
};

const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_PROPERTIES_SUCCESS: {
      return {
        ...state,
        properties: action.payload,
      };
    }
    case Actions.GET_USER_PROPERTIES: {
      return {
        ...state,
        userProperties: action.payload,
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
        form: { ...formData },
      };
    }
    case Actions.ADD_PROPERTY_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case Actions.GET_USER_PROPERTIES_WITH_IPO_STAKE: {
      return {
        ...state,
        userBoxpiles: action.payload,
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
