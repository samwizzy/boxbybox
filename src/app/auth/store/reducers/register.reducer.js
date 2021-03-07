import * as Actions from "../actions/register.actions";
import moment from "moment";

const initialState = {
  loading: false,
  data: {
    administrator: {
      fullName: "",
    },
    company: {
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
      name: "",
      rcNumber: "",
    },
    email: "",
    individualUser: {
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
      dateOfBirth: moment().format("DD-MM-YYYY"),
      fullName: "",
      gender: "MALE",
    },
    password: "",
    phone: "",
    role: "INDIVIDUAL_USER",
  },
  error: null,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.REGISTER_PROGRESS: {
      return {
        ...initialState,
        loading: true,
      };
    }
    case Actions.REGISTER_SUCCESS: {
      return {
        ...initialState,
        loading: false,
      };
    }
    case Actions.REGISTER_ERROR: {
      return {
        ...initialState,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return { ...state };
  }
};

export default registerReducer;
