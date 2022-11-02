import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
// import rootReducers from "./redux/reducer";
import LoginReducer from "./redux/reducer/handleAuth";
import CartReducer from "./redux/reducer/handleCart";

// const store = createStore(rootReducers);
const store = configureStore({
    reducer: {
        auth: LoginReducer,
        cart: CartReducer
    },
})

export default store;