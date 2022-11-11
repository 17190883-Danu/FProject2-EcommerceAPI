import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
// import rootReducers from "./redux/reducer";
import LoginReducer from "./redux/reducer/handleAuth";
import CartReducer from "./redux/reducer/handleCart";
import ProductReducer from "./redux/reducer/handleProduct";

// const store = createStore(rootReducers);
const store = configureStore({
    reducer: {
        auth: LoginReducer,
        cart: CartReducer,
        product: ProductReducer
    },
})

export default store;