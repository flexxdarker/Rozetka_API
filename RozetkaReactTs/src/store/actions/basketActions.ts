export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';

export const setTotalPrice = (price: number) => ({
    type: SET_TOTAL_PRICE,
    payload: price,
});