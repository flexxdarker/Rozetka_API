const ProductReviewedList = import.meta.env.VITE_APP_SAVE_REVIEWED_LIST;

export const ReviewedListService = {
    saveItems(items: number[]) {
        localStorage.setItem(ProductReviewedList, JSON.stringify(items));
    },

    getAll () {
        const productsId = localStorage.getItem(ProductReviewedList);
        return productsId ? JSON.parse(productsId) : [];
    },

    checkId(id:number){
        const productsId = localStorage.getItem(ProductReviewedList);
        return productsId ? JSON.parse(productsId).includes(id) : false;
    },

    addId(id: number) {
        const itemString = localStorage.getItem(ProductReviewedList);
        let items:number[] = [];
        if (itemString) {
            items = JSON.parse(itemString); // Перетворюємо рядок назад в масив
        }

        if (!items.includes(id)) {
            items.push(id); // додаємо, якщо значення немає в масиві
            ReviewedListService.saveItems(items);
        }
    },

    removeId(id: number) {
        const itemString = localStorage.getItem(ProductReviewedList);
        let items:number[] = [];
        if (itemString) {
            items = JSON.parse(itemString); // Перетворюємо рядок назад в масив
        }

        if (items.includes(id)) {
            const index = items.indexOf(id);
            items.splice(index, 1); // Видаляємо елемент за індексом // додаємо, якщо значення немає в масиві
            ReviewedListService.saveItems(items);
        }
    },

    clearItems() {
        localStorage.removeItem(ProductReviewedList);
    },


    isExists() {
        return localStorage.getItem(ProductReviewedList) != null;
    }
}
