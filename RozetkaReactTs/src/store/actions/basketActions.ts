import {Dispatch} from "react";
import {IProductModel} from "../../models/productsModel.ts";
import {IBasketModel} from "../../models/basketModel.ts";
import {BasketActionTypes} from "../../types/types.ts";

export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';
export const INCREMENT_TOTAL_PRICE = 'INCREMENT_TOTAL_PRICE'; // Нова дія

export const setTotalPrice = (price: number) => ({
    type: SET_TOTAL_PRICE,
    payload: price,
});

export const incrementTotalPrice = (amount: number) => ({
    type: INCREMENT_TOTAL_PRICE,
    payload: amount, // amount - це число, на яке потрібно збільшити totalPrice
});

export const calculateTotalPrice = (products: IProductModel[], basket: IBasketModel) => {
    return (dispatch: Dispatch<BasketActionTypes>) => {
        const total = products.reduce((total, product) => {
            const quantity = basket[product.id.toString()] || 0;
            return total + (product.price - product.discount) * quantity;
        }, 0);

        dispatch({
            type: 'SET_TOTAL_PRICE',
            payload: total,
        });
    };
};