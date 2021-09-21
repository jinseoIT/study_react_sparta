import { createStore, combineReducers } from "redux";
import quiz from "./modules/quiz";
import user from "./modules/user";

const rootReducer = combineReducers({ quiz, user });
const store = createStore(rootReducer);

export default store;