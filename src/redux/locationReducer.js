const initialLocation = {
  enteredName: "",
  lat: "",
  lon: "",
  NorthOrSouth: "",
  EastOrWest: "",
  country: "",
};

export const locationReducer = (state = initialLocation, action) => {
  switch (action.type) {
    case "SET_ENTERED_NAME":
      return {
        ...state,
        enteredName: action.payload,
      };
    case "CHANGE_COORDINATES":
      return {
        ...state,
        lat: action.payload.res.lat,
        lon: action.payload.res.lon,
        NorthOrSouth: parseFloat(action.payload.res.lat) > 0 ? "N" : "S",
        EastOrWest: parseFloat(action.payload.res.lon) > 0 ? "E" : "W",
        country: action.payload.func(action.payload.res.display_name),
      };
    default:
      return state;
  }
};
