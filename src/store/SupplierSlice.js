import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiUrl, authApiUrl } from '../lib/apiUrl'

export const addSupplier = createAsyncThunk('supplier/addSupplier', async (formdata) => {
    try {
        const res = await apiUrl.post('users/addSupplier', formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        window.location.href = '/view-suppliers'
        return res.data
    } catch (error) {
        console.error(error);
    }
})

export const supplierProfile = createAsyncThunk('supplier/supplierProfile', async () => {
    try {
        const res = await authApiUrl.get('supplier/profile')
        return res.data
    } catch (error) {
        console.error(error)
    }
})

export const updateSupplierProfile = createAsyncThunk('supplier/updateSupplierProfile', async (data) => {
    try {
        const res = await authApiUrl.put('supplier/updateprofile', data)
        return res.data
    } catch (error) {
        console.error(error)
    }
})

export const fetchSuppliers = createAsyncThunk('supplier/fetchSuppliers', async () => {
    try {
        const res = await authApiUrl.get('supplier/suppliers')
        return res.data
    } catch (error) {
        console.error(error)
    }
})

const initialState = {
    error: null,
    supplier: null,
    suppliers: [],
    loading: false

}
const supplierSlice = createSlice({
    name: 'supplier',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuppliers.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSuppliers.fulfilled, (state, action) => {
                state.loading = false
                state.suppliers = action.payload
            })
            .addCase(fetchSuppliers.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            .addCase(supplierProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(supplierProfile.fulfilled, (state, action) => {
                state.loading = false
                state.supplier = action.payload
            })
            .addCase(supplierProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default supplierSlice.reducer