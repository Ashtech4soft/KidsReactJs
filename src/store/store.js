import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userSlice from './userSlice'
import supplierSlice from './SupplierSlice'
import charitySlice from './charitySlice'
import adminSlice from './adminSlice'
import communitySlice from './communitySlice'
import productSlice from './productSlice'

const rootReducer = combineReducers({

    user: userSlice,
    supplier: supplierSlice,
    charity: charitySlice,
    admin: adminSlice,
    community: communitySlice,
    product: productSlice,
 
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export const persistor = persistStore(store)