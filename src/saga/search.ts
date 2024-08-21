import { put, takeLatest, call } from 'redux-saga/effects'
import {searchError, searchFulfilled, searchRequest} from "../store/actions";
import {fetchItems} from "../serverApi";
import {PayloadAction} from "@reduxjs/toolkit";
import {Item} from "../types";

export function* workerSearchRequest(action: PayloadAction<string>) {
    try {
        const items = (yield call(fetchItems, action.payload)) as Item[];
        yield put(searchFulfilled(items));
    } catch (e) {
        yield put(searchError(e as Error));
    }
}

export function* watchSearchRequest() {
    yield takeLatest(searchRequest.type, workerSearchRequest)
}