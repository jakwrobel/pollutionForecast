const initialPollution = [];

export const pollutionReducer = (state = initialPollution, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "SET_POLLUTION":
      return action.payload;

    default:
      return state;
  }
};
