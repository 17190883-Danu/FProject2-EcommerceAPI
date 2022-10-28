import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
import rootReducers from "./redux/reducer";
import LoginReducer from "./redux/reducer/handleAuth";

// const store = createStore(rootReducers);
const store = configureStore({
    reducer: {
        auth: LoginReducer
    },
})

export default store;