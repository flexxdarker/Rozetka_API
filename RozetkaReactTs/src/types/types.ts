// types.ts (або окремий файл для типів)
export interface SetTotalPriceAction {
    type: 'SET_TOTAL_PRICE';
    payload: number;
}

export type BasketActionTypes = SetTotalPriceAction; // Якщо буде більше дій, об'єднайте їх тут


// types.ts

export interface AddToComparisonAction {
    type: 'ADD_TO_COMPARISON';
    payload: number;
}

export interface RemoveFromComparisonAction {
    type: 'REMOVE_FROM_COMPARISON';
    payload: number;
}

export interface SetComparisonListAction {
    type: 'SET_COMPARISON_COUNT';
    payload: number[];
}

export type ComparisonActionTypes = AddToComparisonAction | RemoveFromComparisonAction | SetComparisonListAction;
