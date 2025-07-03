import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

//import { FLUSH, REGISTER, PAUSE, PERSIST, REHYDRATE } from "redux-persist";
import userReducer from './slice/userSlice';
import dataSlice from './slice/dataSlice';
//import { api } from "./api";

export const store = configureStore({
    reducer: {
        //    [api.reducerPath]: api.reducer,
        user: userReducer,
        data: dataSlice
    },
    /*  middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware({
             serializableCheck: {
                 ignoredActions: [FLUSH, REGISTER, PAUSE, PERSIST, REHYDRATE],
             },
         }).concat(api.middleware), */
})

setupListeners(store.dispatch);


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch