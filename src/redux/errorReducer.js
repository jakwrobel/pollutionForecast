const initialError = {
  errorType: "",
  errorMessage: "",
};

export const errorReducer = (state = initialError, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET_ERROR":
      return initialError;
    default:
      return state;
  }
};
