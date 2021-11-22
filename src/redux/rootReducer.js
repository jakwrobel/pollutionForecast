import { combineReducers } from "redux";
import { locationReducer } from "./locationReducer";
import { pollutionReducer } from "./pollutionReducer";
import { errorReducer } from "./errorReducer";

export const rootReducer = combineReducers({
  location: locationReducer,
  pollution: pollutionReducer,
  error: errorReducer,
});
