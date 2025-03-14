import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authApiUrl, apiUrl } from '../lib/apiUrl'



export const addCharity = createAsyncThunk('charity/addCharity', async (formdata) => {
    try {

        const res = await apiUrl.post('users/addCharity', formdata)
        return res.data
    } catch (error) {
        console.error(error);

    }
})

export const fetchCharity = createAsyncThunk('charity/fetchcharity', async () => {
    try {
        const res = await authApiUrl.get('charity/charitys')
        return res.data
    } catch (error) {
        console.error(error);

    }
})

export const fetchSingleCharity = createAsyncThunk('charity/fetchSingleCharity', async () => {


    try {
        const res = await authApiUrl.get('charity/fetchSingleCharity')
        return res.data
    } catch (error) {
        console.error(error);

    }
})

export const addCharityPRoduct = createAsyncThunk('charity/addCharityPRoduction', async (formdata) => {
    try {
        const res = await authApiUrl.post('charity/addCharityPRoduct', formdata)
        window.location.reload()
        return res.data
    } catch (error) {
        console.error(error);
    }
})

export const getCharityProduct = createAsyncThunk('charity/getCharityProduct', async (formdata) => {
    try {
        const res = await authApiUrl.get('charity/charityItems')
        return res.data
    } catch (error) {
        console.error(error);
    }
})

export const getProductByCharity = createAsyncThunk('charity/getProductByCharity', async (formdata) => {
    try {
        const res = await authApiUrl.get('charity/productsByCharity')
        return res.data
    } catch (error) {
        console.error(error);
    }
})

export const deleteCharityProduct = createAsyncThunk('charity/deleteCharityProduct', async (id) => {
    console.log(id);

    try {
        const res = await authApiUrl.delete(`charity/deleteCharityProduct/${id}`)
        return res.data
    } catch (error) {
        console.error(error);
    }
})


const initialState = {
    error: null,
    charity: null,
    charitys: [],
    products: [],
    charityProducts: [],
    loading: false

}
const charitySlice = createSlice({
    name: 'charity',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharity.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchCharity.fulfilled, (state, action) => {
                state.loading = false
                state.charitys = action.payload
            })
            .addCase(fetchCharity.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            .addCase(getCharityProduct.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getCharityProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(getCharityProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            .addCase(getProductByCharity.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getProductByCharity.fulfilled, (state, action) => {
                state.loading = false
                state.charityProducts = action.payload
            })
            .addCase(getProductByCharity.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            .addCase(fetchSingleCharity.fulfilled, (state, action) => {
                state.charity = action.payload
            })

            .addCase(deleteCharityProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product._id!== action.payload)
            })
    }
})

export default charitySlice.reducer