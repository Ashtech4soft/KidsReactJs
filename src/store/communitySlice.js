import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiUrl, authApiUrl } from '../lib/apiUrl';




export const addCommunity = createAsyncThunk('Community/addCommunity', async (formdata) => {
    try {
        const res = await authApiUrl.post('Community/addCommunity', formdata)
        window.location.reload()
        return res.data
    } catch (error) {
        console.error(error);

    }
})

export const fetchCommunity = createAsyncThunk('Community/fetchCommunity', async () => {
    try {
        const res = await apiUrl.get('Community/getCommunities')
        console.log(res.data);

        return res.data
    } catch (error) {
        console.error(error);

    }
})

export const joinCommunity = createAsyncThunk('community/joinCommunity', async (commId) => {
    try {
        const res = await authApiUrl.post('Community/joinCommunity', { commId });
        alert(res.data.message);
        window.location.reload()

        return res.data
    } catch (error) {
        console.error(error);
    }
})

export const commuOrders = createAsyncThunk('community/commuOrders', async (commId) => {
    try {
        console.log(commId);

        const res = await authApiUrl.get(`Community/getOrders/${commId}`)
        return res.data
    } catch (error) {

    }
})

export const fetchcommunityMembers = createAsyncThunk('community/members', async () => {
    try {
        const res = await apiUrl.get('Community/getCommMembers')
        return res.data
    } catch (error) {
        console.error(error);
    }
})

export const leaveCommunity = createAsyncThunk('community/leaveCommunity', async (commId) => {
    try {
        const res = await authApiUrl.post('Community/leaveCommunity', { commId })
        alert(res.data.message);
        window.location.reload()
        return res.data

    } catch (error) {
        console.error(error);

    }
})

export const deleteCommunity = createAsyncThunk('community/deleteCommunity', async (commId) => {
    try {
        const res = await authApiUrl.post('Community/deleteCommunity', { commId })
        alert(res.data.message);
        window.location.reload()
        return res.data

    } catch (error) {
        console.error(error);

    }
})

export const handleRemoveMember = createAsyncThunk('community/handleRemoveMember', async (member) => {


    try {
        const res = await authApiUrl.delete(`Community/removeMember/${member.membId}/${member.commuId}`)
        window.location.reload()
        return res.data
    } catch (error) {
        console.error(error);
    }
});
export const sendMessage = createAsyncThunk('community/sendMessage', async (message, commId) => {
    try {
        const res = await authApiUrl.post('Community/sendMessage', message, commId)
        // window.location.reload()
        return res.data
    } catch (error) {
        console.error(error);
    }
})

export const singleCommunity = createAsyncThunk('community/getSinglecommunity', async (commId) => {
    console.log(commId)

    try {
        const res = await authApiUrl.get(`Community/getSingleComm/${commId}`)
        return res.data
    } catch (error) {
        console.error(error);
    }
})

export const fetchMessage = createAsyncThunk('community/getMessages', async (commId) => {
    try {
        const res = await authApiUrl.get(`Community/getMessages/${commId}`)
        return res.data
    } catch (error) {
        console.error(error);
    }
})

const initialState = {
    error: null,
    singleCommu: null,
    commuOrders: null,
    Communities: null,
    communityMembers: null,
    messages: null,
    loading: false

}

const CommunitySlice = createSlice({
    name: 'Community',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommunity.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCommunity.fulfilled, (state, action) => {
                state.loading = false
                state.Communities = action.payload
            })
            .addCase(fetchCommunity.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            .addCase(fetchcommunityMembers.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchcommunityMembers.fulfilled, (state, action) => {
                state.loading = false
                state.communityMembers = action.payload
            })
            .addCase(fetchcommunityMembers.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            .addCase(sendMessage.pending, (state) => {
                state.loading = true
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = false
                state.messages = [...state.messages, action.payload]
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            .addCase(fetchMessage.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchMessage.fulfilled, (state, action) => {
                state.loading = false
                state.messages = action.payload
            })
            .addCase(fetchMessage.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            .addCase(singleCommunity.pending, (state) => {
                state.loading = true
            })
            .addCase(singleCommunity.fulfilled, (state, action) => {
                state.loading = false
                state.singleCommu = action.payload
                console.log(state.singleCommu)
            })
            .addCase(singleCommunity.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            .addCase(commuOrders.pending, (state, action) => {
                state.loading = true
            })

            .addCase(commuOrders.fulfilled, (state, action) => {
                state.loading = false
                state.commuOrders = action.payload
                console.log(state.commuOrders)
            })
    }
})

export default CommunitySlice.reducer