import { createStore } from "redux";
import { reducers } from "./reducer/reducers";

export const store = createStore(reducers);
