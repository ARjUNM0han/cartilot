import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const CartSlice = createSlice({
    name: 'cartlist',
    initialState: {
        cartlist: []
    },
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.cartlist.find((item) => item.id == action.payload.id)
            if (existingProduct) {
                existingProduct.quantity += 1
                toast.info('Quantity Updated in cart')
            } else {
                state.cartlist.push({ ...action.payload, quantity: 1 })
                toast.success('Item Added Cart')
            }
        },
        removeFromCart: (state, action) => {
            state.cartlist = state.cartlist.filter((item) => item.id != action.payload)
        },
        emptyCart: (state) => {
            state.cartlist = []
            toast.success('Products will reach you soon')
        },
        decreaceQuantity: (state, action) => {
            const existingProduct = state.cartlist.find((item) => item.id == action.payload.id)
            if (existingProduct.quantity == 1) {
                state.cartlist = state.cartlist.filter((item) => item.id != action.payload.id)
            } else {
                existingProduct.quantity -= 1
            }
        }
    }
})
export const { addToCart, removeFromCart, emptyCart, decreaceQuantity } = CartSlice.actions
export default CartSlice.reducer