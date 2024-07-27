import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlist: []
    },
    reducers: {
        addToWishlist: (state, action) => {
            if (state.wishlist.find((item) => item.id == action.payload.id)) {
                toast.info('Already in wishlist')
            } else {
                state.wishlist.push(action.payload)
                localStorage.setItem('wishlist', JSON.stringify(state.wishlist))
                toast.success('Item added to wishlist')
            }
        },
        removeFromWishlist: (state, action) => {
            const wish = state.wishlist.filter((item) => item.id != action.payload)
            localStorage.setItem('wishlist', JSON.stringify(wish))
            state.wishlist = state.wishlist.filter((item) => item.id != action.payload)
        }
    }
})
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer