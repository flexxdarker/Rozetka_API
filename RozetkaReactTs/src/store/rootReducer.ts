import { combineReducers } from '@reduxjs/toolkit';
import exampleReducer from './Slice/exampleSlice';

const rootReducer = combineReducers({
    example: exampleReducer,
});

export default rootReducer;