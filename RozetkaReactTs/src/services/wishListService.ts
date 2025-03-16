const ProductWishList = import.meta.env.VITE_APP_SAVE_WISH_LIST;

export const WishListService = {
    saveItems(items: number[]) {
        localStorage.setItem(ProductWishList, JSON.stringify(items));
    },

    clearItems() {
        localStorage.removeItem(ProductWishList);
    },

    getItems() {
        const savedItems = localStorage.getItem(ProductWishList);
        if (savedItems) {
            return JSON.parse(savedItems); // Перетворюємо рядок назад в масив
        }
        return null;
    },

    checkId(id: number) {
        const itemString = localStorage.getItem(ProductWishList);
        if (itemString) {
            let items:number[] = [];
            items = JSON.parse(itemString); // Перетворюємо рядок назад в масив
            if (items.includes(id)) {
                return true;
            }
        }
        return false;
    },

    addId(id: number) {
        const itemString = localStorage.getItem(ProductWishList);
        let items:number[] = [];
        if (itemString) {
            items = JSON.parse(itemString); // Перетворюємо рядок назад в масив
        }

        if (!items.includes(id)) {
            items.push(id); // додаємо, якщо значення немає в масиві
            WishListService.saveItems(items);
        }
    },

    removeId(id: number) {
        const itemString = localStorage.getItem(ProductWishList);
        let items:number[] = [];
        if (itemString) {
            items = JSON.parse(itemString); // Перетворюємо рядок назад в масив
        }

        if (items.includes(id)) {
            const index = items.indexOf(id);
            items.splice(index, 1); // Видаляємо елемент за індексом // додаємо, якщо значення немає в масиві
            WishListService.saveItems(items);
        }
    },

    isExists() {
        return localStorage.getItem(ProductWishList) != null;
    }
}
