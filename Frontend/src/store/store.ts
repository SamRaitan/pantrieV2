import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

import authReducer from '../slice/authSlice';
import { baseApi } from '../selectors';

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    // Add other reducers here if any
});

// Define persist config
const persistConfig = {
    key: 'root',
    storage: storage, // Default storage (localStorage)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

// Create the persistor object
const persistor = persistStore(store);

export { store, persistor };
