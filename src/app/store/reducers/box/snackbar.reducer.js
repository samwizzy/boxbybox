import * as Actions from "../../actions/box/snackbar.actions";

const initialState = {
  state: null,
  options: {
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    autoHideDuration: 6000,
    message: "Hi!",
    variant: "success",
  },
};

const snackbar = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SHOW_SNACKBAR: {
      return {
        state: true,
        options: {
          ...initialState.options,
          ...action.options,
        },
      };
    }
    case Actions.HIDE_SNACKBAR: {
      return {
        ...state,
        state: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default snackbar;
