import * as Actions from "../actions/profile.actions";

const initialState = {
  loading: false,
  error: null,
  profile: null,
  profileDialog: {
    open: false,
    data: null,
  },
  formModel: {
    company: {
      address: {
        city: "",
        country: "",
        houseNoAddress: "",
        id: 0,
        latitude: "",
        lga: "",
        longitude: "",
        postCode: "",
        state: "",
      },
      name: "",
    },
    individualUser: {
      address: {
        city: "",
        country: "",
        houseNoAddress: "",
        id: 0,
        latitude: "",
        lga: "",
        longitude: "",
        postCode: "",
        state: "",
      },
      fullName: "",
    },
    phone: "",
    role: "",
  },
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.UPDATE_PROGRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case Actions.UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    }
    case Actions.UPDATE_PROFILE_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case Actions.OPEN_PROFILE_DIALOG: {
      return {
        ...state,
        profileDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_PROFILE_DIALOG: {
      return {
        ...state,
        profileDialog: { open: false, data: null },
      };
    }
    default:
      return { ...state };
  }
};

export default profileReducer;
