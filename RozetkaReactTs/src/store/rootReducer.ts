import { combineReducers } from '@reduxjs/toolkit';
import { basketReducer } from './reducers/basketReducer';

const rootReducer = combineReducers({
    basket: basketReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;