export interface CategoryModel {
    id: number;
    name: string;
    image: string;
    parentCategoryId: number;
    parentCategoryName: string;
}


export interface CreateCategoryModel {
    name?: string;
    parentCategoryId?: number;
}