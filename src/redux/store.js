import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
import rootReducers from "./reducer";

const store = createStore(rootReducers);
// export const store = configureStore({
//     reducer: {

//     }
// })

export default store;