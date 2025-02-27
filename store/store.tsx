import {configureStore} from "@reduxjs/toolkit";
// @ts-ignore
import customerReducer from "../reducers/CustomerReducer.ts";
import itemReducer from "../reducers/ItemReducer";


export const store = configureStore({
    reducer :{
        customer : customerReducer,
        item : itemReducer,
        // employee : employeeReducer
    }
})

export type AppDispatch = typeof store.dispatch;
