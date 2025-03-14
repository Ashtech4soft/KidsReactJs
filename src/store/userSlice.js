import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiUrl, authApiUrl } from '../lib/apiUrl';



export const usersFetch = createAsyncThunk('user/usersFetch', async () => {
    try {
        const res = await apiUrl.get('users/users')
        console.log(res.data);
        return res.data
    } catch (error) {
        console.error(error);
    }
})

export const userProfile = createAsyncThunk('user/userProfile', async () => {
    try {
        const res = await authApiUrl.get('users/userProfile')
        return res.data
    } catch (error) {
        console.error(error);
    }
})

export const updateduserProfile = createAsyncThunk('user/updateuserProfile', async (formData) => {
    try {
        const res = await authApiUrl.put('users/updateuserProfile', formData)
        return res.data
    } catch (error) {
        console.error(error);
    }
})


const initialState = {
    error: null,
    user: null,
    users: null,
    loading: false

}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(usersFetch.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(usersFetch.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
                console.log(state.users);

            })
            .addCase(usersFetch.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            .addCase(userProfile.pending, (state, action) => {
                state.loading = true
            })
            .addCase(userProfile.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(userProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default userSlice.reducer