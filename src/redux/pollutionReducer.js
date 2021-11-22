const initialPollution = [];

export const pollutionReducer = (state = initialPollution, action) => {
  switch (action.type) {
    case "SET_POLLUTION":
      return action.payload;

    default:
      return state;
  }
};
