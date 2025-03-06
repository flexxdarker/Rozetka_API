import {
    ADD_TO_COMPARISON,
    REMOVE_FROM_COMPARISON,
    SET_COMPARISON_COUNT,
} from "../actions/comparisonActions.ts";
import { ComparisonActionTypes } from "../../types/types.ts"; // Імпортуємо типи

// Типізація стану
interface ComparisonState {
    comparisonList: number[];  // Масив для зберігання id товарів
    comparisonCount: number;   // Кількість товарів у списку порівняння
}

// Функція для збереження даних у localStorage
const saveToLocalStorage = (comparisonList: number[]): void => {
    localStorage.setItem('comparisonList', JSON.stringify(comparisonList));
}

// Функція для отримання даних з localStorage///////////////////////////////////////////////////////////////////////
export const getComparisonListFromLocalStorage = (): number[] => {
    const storedComparisonList = localStorage.getItem('comparisonList');
    return storedComparisonList ? JSON.parse(storedComparisonList) : [];
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const isProductInComparison = (id: number): boolean => {
    const comparisonList = getComparisonListFromLocalStorage(); // Отримуємо масив з localStorage
    return comparisonList.includes(id); // Перевіряємо, чи містить масив це id
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Початковий стан з типізацією
const initialState: ComparisonState = {
    comparisonList: getComparisonListFromLocalStorage(), // Завантажуємо список порівняння з localStorage
    comparisonCount: getComparisonListFromLocalStorage().length, // Кількість товарів з localStorage
};

export const comparisonReducer = (state = initialState, action: ComparisonActionTypes): ComparisonState => {

    const updatedComparisonList = state.comparisonList.filter(id => id !== action.payload);

    switch (action.type) {
        case SET_COMPARISON_COUNT:
            return {
                ...state,
                comparisonList: action.payload,
                comparisonCount: action.payload.length, // Оновлюємо кількість товарів
            };
        case ADD_TO_COMPARISON:
            if (!state.comparisonList.includes(action.payload)) {
                const updatedComparisonList = [...state.comparisonList, action.payload];
                saveToLocalStorage(updatedComparisonList); // Зберігаємо новий список у localStorage
                return {
                    ...state,
                    comparisonList: updatedComparisonList,
                    comparisonCount: updatedComparisonList.length, // Оновлюємо кількість
                };
            }
            return state;
        case REMOVE_FROM_COMPARISON:

            saveToLocalStorage(updatedComparisonList); // Зберігаємо оновлений список у localStorage
            return {
                ...state,
                comparisonList: updatedComparisonList,
                comparisonCount: updatedComparisonList.length, // Оновлюємо кількість
            };
        default:
            return state;
    }
};
