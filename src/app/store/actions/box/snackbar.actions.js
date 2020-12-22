export const HIDE_SNACKBAR = "[SNACKBAR] CLOSE";
export const SHOW_SNACKBAR = "[SNACKBAR] SHOW";

export function hideSnackbar() {
  return {
    type: HIDE_SNACKBAR,
  };
}

export function showSnackbar(options) {
  return {
    type: SHOW_SNACKBAR,
    options,
  };
}
