import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProducts = createAsyncThunk('productSlice/fetchProducts', async () => {
    const response = await axios.get('https://dummyjson.com/products');
    localStorage.setItem('products', JSON.stringify(response.data?.products))
    return response.data?.products
})

const productSlice = createSlice({
    name: 'productSlice',
    initialState: {
        products: [],
        productContainer: [],
        loading: false,
        error: "",
        currentPage: 1,
        productsPerPage: 8
    },
    reducers: {
        productSearch: (state, action) => {
            state.products = state.productContainer.filter((item) => item.title.toLowerCase().includes(action.payload))
        },
        nextPage: (state, action) => {
            state.currentPage += 1
        },
        prevPage: (state, action) => {
            state.currentPage -= 1
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
            state.productContainer = action.payload
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.products = []
            state.productContainer = []
            state.error = "API fetch failed"
            state.loading = false
        })
    }
})
export const { productSearch, nextPage, prevPage } = productSlice.actions
export default productSlice.reducer