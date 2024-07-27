import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/ProductSlice";
import WishlistSlice from "./slices/WishlistSlice";
import CartSlice from "./slices/CartSlice";

const store = configureStore({
    reducer: {
        productSlice,
        WishlistSlice,
        CartSlice
    }
})
export default store