// src/redux/reducers/basketReducer.ts
import {INCREMENT_TOTAL_PRICE, SET_TOTAL_PRICE} from '../actions/basketActions';

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
        case INCREMENT_TOTAL_PRICE: // Нова логіка для збільшення ціни
            return {
                ...state,
                totalPrice: state.totalPrice + action.payload, // Збільшуємо totalPrice на значення action.payload
            };
        default:
            return state;
    }
};
