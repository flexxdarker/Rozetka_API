export interface CreateSubCategoryModel {
    name?: string;
    parentCategoryId?: number;
}

export interface SubCategoryModel {
    id: number;
    name: string;
    image: string;
    parentCategoryId: number;
    parentCategoryName: string;
}