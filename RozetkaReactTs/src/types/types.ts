// types.ts (або окремий файл для типів)
export interface SetTotalPriceAction {
    type: 'SET_TOTAL_PRICE';
    payload: number;
}

export type BasketActionTypes = SetTotalPriceAction; // Якщо буде більше дій, об'єднайте їх тут
