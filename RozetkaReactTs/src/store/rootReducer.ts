import { combineReducers } from '@reduxjs/toolkit';
import { basketReducer } from './reducers/basketReducer';
import {comparisonReducer} from "./reducers/comparisonReducer.ts";

const rootReducer = combineReducers({
    basket: basketReducer,
    comparison: comparisonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;