// src/redux/reducers/basketReducer.ts
import { SET_TOTAL_PRICE } from '../actions/basketActions';

const initialState = {
    totalPrice: 0,
};

export const basketReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_TOTAL_PRICE:
            return {
                ...state,
                totalPrice: action.payload,
            };
        default:
            return state;
    }
};
