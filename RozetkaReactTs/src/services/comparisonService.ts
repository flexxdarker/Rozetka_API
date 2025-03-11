const ProductComparisonList = import.meta.env.VITE_APP_SAVE_COMPARISON_LIST;

export const ComparisonListService = {
    saveItems(items: number[]) {
        localStorage.setItem(ProductComparisonList, JSON.stringify(items));
    },

    getAll () {
        const storedData = localStorage.getItem(ProductComparisonList);
        return storedData ? JSON.parse(storedData) : [];
    },

    count(){
        const storedData = localStorage.getItem(ProductComparisonList);
        return storedData ? JSON.parse(storedData).length : 0;
    },

    checkId(id:number){
        const storedData = localStorage.getItem(ProductComparisonList);
        return storedData ? JSON.parse(storedData).includes(id) : false;
    },

    clearItems() {
        localStorage.removeItem(ProductComparisonList);
    },


    isExists() {
        return localStorage.getItem(ProductComparisonList) != null;
    }
}
