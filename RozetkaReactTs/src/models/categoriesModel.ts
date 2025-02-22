export interface ICategoryModel {
    id: number;
    name: string;
    image: string;
    parentCategoryId?: number;
    imageFiles: File;
    parentCategoryName: string;
}


export interface ICreateCategoryModel {
    id?: number;
    name: string;
    parentCategoryId?: number;
    imageFiles: File;
}

export interface ICategoryName {
    id: number;
    name: string;
}