export interface ICategoryModel {
    id: number;
    name: string;
    image: string;
    parentCategoryId: number;
    parentCategoryName: string;
}


export interface ICreateCategoryModel {
    id?: number;
    name?: string;
    parentCategoryId?: number;
}

export interface ICategoryName {
    id: number;
    name: string;
}