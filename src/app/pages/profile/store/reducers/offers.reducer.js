import * as Actions from "../actions/offers.actions";

const initialState = {
  loading: false,
  error: null,
  offers: [],
  offer: null,
  offerDialog: {
    open: false,
    data: null,
  },
  confirmRejectDialog: {
    open: false,
    data: null,
  },
  confirmAcceptDialog: {
    open: false,
    data: null,
  },
};

const offersReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_OFFERS_SUCCESS: {
      return {
        ...state,
        bids: action.payload,
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
    case Actions.OPEN_OFFER_DIALOG: {
      return {
        ...state,
        offerDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_OFFER_DIALOG: {
      return {
        ...state,
        offerDialog: { open: false, data: null },
      };
    }
    case Actions.OPEN_CONFIRM_ACCEPT_DIALOG: {
      return {
        ...state,
        confirmAcceptDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_CONFIRM_ACCEPT_DIALOG: {
      return {
        ...state,
        confirmAcceptDialog: { open: false, data: null },
      };
    }
    case Actions.OPEN_CONFIRM_REJECT_DIALOG: {
      return {
        ...state,
        confirmRejectDialog: {
          open: true,
          data: action.payload,
        },
      };
    }
    case Actions.CLOSE_CONFIRM_REJECT_DIALOG: {
      return {
        ...state,
        confirmRejectDialog: { open: false, data: null },
      };
    }
    default:
      return { ...state };
  }
};

export default offersReducer;
