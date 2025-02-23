export interface ICreateSubCategoryModel {
    name?: string;
    parentCategoryId?: number;
}

export interface ISubCategoryModel {
    id: number;
    name: string;
    image: string;
    parentCategoryId: number;
    parentCategoryName: string;
}
export interface ISubCategoryName {
    id: number;
    name: string;
}
