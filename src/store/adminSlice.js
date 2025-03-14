import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authApiUrl } from '../lib/apiUrl'







const initialState = {
    error: null,
    admin: null,
    loading: false

}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: () => {

    }
})

export default adminSlice.reducer