export const SET_COMPARISON_COUNT = 'SET_COMPARISON_COUNT';
export const ADD_TO_COMPARISON = 'ADD_TO_COMPARISON'; // Додати товар до порівняння
export const REMOVE_FROM_COMPARISON = 'REMOVE_FROM_COMPARISON'; // Видалити товар з порівняння

export const setComparisonList = (comparisonList: number[]) => ({
    type: SET_COMPARISON_COUNT,
    payload: comparisonList,
});

export const addToComparison = (productId: number) => ({
    type: ADD_TO_COMPARISON,
    payload: productId,
});

export const removeFromComparison = (productId: number) => ({
    type: REMOVE_FROM_COMPARISON,
    payload: productId,
});
