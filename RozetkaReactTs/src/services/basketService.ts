import {IBasketModel} from "../models/basketModel.ts";

const ProductBasket = import.meta.env.VITE_APP_SAVE_BASKET;

export const BasketService = {
    saveItems(items: IBasketModel) {
        localStorage.setItem(ProductBasket, JSON.stringify(items));
    },

    clearItems() {
        localStorage.removeItem(ProductBasket);
    },

    getItems() {
        const savedItems = localStorage.getItem(ProductBasket);
        if (savedItems) {
            return JSON.parse(savedItems); // Перетворюємо рядок назад в масив
        }
        return {};
    },

    addId(id: number , quantity:number = 0) {
        const itemString = localStorage.getItem(ProductBasket);
        let items: IBasketModel = {};
        if (itemString) {
            items = JSON.parse(itemString); // Перетворюємо рядок назад в масив
        }

        // Якщо товар є в кошику, збільшуємо його кількість
        if(quantity > 0){
            items[id] = quantity;
        } else {
            if (items[id]) {
                items[id] += 1;
            } else {
                // Якщо товару немає в кошику, додаємо його з кількістю 1
                items[id] = 1;
            }
        }
        //const updatedIds = [...ids, id];
        BasketService.saveItems(items); // Зберігаємо оновлений масив в localStorage
    },

    removeId(id: number) {
        const itemString = localStorage.getItem(ProductBasket);
        let items: IBasketModel = {};
        if (itemString) {
            items = JSON.parse(itemString); // Перетворюємо рядок назад в масив
        }

        // Якщо товар є в кошику
        if (items[id]) {
            // Зменшуємо кількість товару
            items[id] -= 1;

            // Якщо кількість стала 0 або менше, видаляємо товар
            if (items[id] <= 0) {
                delete items[id];
            }

            //const updatedIds = ids.filter((item) => item !== id);
            BasketService.saveItems(items);
        }
    },

    checkId(id: number): boolean{
        const itemString = localStorage.getItem(ProductBasket);
        let items: IBasketModel = {};
        if (itemString) {
            items = JSON.parse(itemString); // Перетворюємо рядок назад в масив
        }

        // Якщо товар є в кошику, збільшуємо його кількість
        return !!items[id];
    },

    getCountById(id: number) {
        const itemString = localStorage.getItem(ProductBasket);
        if (itemString) {
            let items: IBasketModel = {};
            items = JSON.parse(itemString); // Перетворюємо рядок назад в масив
            return items[id];
        }
        else {
            return 0;
        }
    },

    removeAllItems(id: number) {
        const itemString = localStorage.getItem(ProductBasket);
        let items: IBasketModel = {};

        if (itemString) {
            items = JSON.parse(itemString); // Перетворюємо рядок назад в масив
        }

        if (items[id] > 0) {
            delete items[id];
        }

        BasketService.saveItems(items);
    },

    isExists() {
        return localStorage.getItem(ProductBasket) != null;
    }
}
