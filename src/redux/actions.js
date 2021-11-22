const setEnteredName = (enteredName) => {
  return {
    type: "SET_ENTERED_NAME",
    payload: enteredName,
  };
};

const changeCoordinates = (res, func) => {
  return {
    type: "CHANGE_COORDINATES",
    payload: {
      res,
      func: (str) => func(str),
    },
  };
};

const setPollution = (data) => {
  return {
    type: "SET_POLLUTION",
    payload: data,
  };
};

const setError = (errorType, errorMessage) => {
  return {
    type: "SET_ERROR",
    payload: {
      errorType,
      errorMessage,
    },
  };
};

const resetError = () => {
  return { type: "RESET_ERROR" };
};

export default {
    setEnteredName,
    changeCoordinates,
    setPollution,
    setError,
    resetError
}
