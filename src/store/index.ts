import {configureStore, createReducer} from "@reduxjs/toolkit";
import {AppState} from "../types";
import {searchError, searchFulfilled, searchRequest} from "./actions";
import createSagaMiddleware from 'redux-saga'
import {watchSearchRequest} from "../saga/search";

const initialState = {
    searchText: "",
    loading: false,
    error: null,
    items: []
} as AppState

const rootReducer = createReducer(initialState, builder => {
    builder
        .addCase(searchRequest, (state, action) => {
            state.searchText = action.payload;
            state.loading = true;
            state.error = null;
        })
        .addCase(searchFulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(searchError, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

// then run the saga
sagaMiddleware.run(watchSearchRequest)