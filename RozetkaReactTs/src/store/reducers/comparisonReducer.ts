import {
    ADD_TO_COMPARISON,
    REMOVE_FROM_COMPARISON,
    SET_COMPARISON_COUNT,
    CLEAR_FROM_COMPARISON,
} from "../actions/comparisonActions.ts";
import { ComparisonActionTypes } from "../../types/types.ts";
import {ComparisonListService} from "../../services/comparisonService.ts"; // Імпортуємо типи

// Типізація стану
interface ComparisonState {
    comparisonList: number[];  // Масив для зберігання id товарів
    comparisonCount: number;   // Кількість товарів у списку порівняння
}

// Початковий стан з типізацією
const initialState: ComparisonState = {
    comparisonList: ComparisonListService.getAll(), // Завантажуємо список порівняння з localStorage
    comparisonCount: ComparisonListService.count(), // Кількість товарів з localStorage
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
                ComparisonListService.saveItems(updatedComparisonList); // Зберігаємо новий список у localStorage
                return {
                    ...state,
                    comparisonList: updatedComparisonList,
                    comparisonCount: updatedComparisonList.length, // Оновлюємо кількість
                };
            }
            return state;
        case REMOVE_FROM_COMPARISON:

            ComparisonListService.saveItems(updatedComparisonList); // Зберігаємо оновлений список у localStorage
            return {
                ...state,
                comparisonList: updatedComparisonList,
                comparisonCount: updatedComparisonList.length, // Оновлюємо кількість
            };
        case CLEAR_FROM_COMPARISON: // Обробка очищення списку

            ComparisonListService.clearItems();

            return {
                ...state,
                comparisonList: [],
                comparisonCount: 0, // Скидаємо кількість на 0
            };
        default:
            return state;
    }
};
