import {IImageModel} from "./imageModel.ts";

export interface values {
    filterName:string;
    valueName:string;
}

export interface IProductModel {
    id: number;
    categoryId: number;
    date: string;
    title: string;
    description: string;
    price: number;
    discount?: number;
    averageRating: number;
    values?: values[];
    images?: IImageModel[];
}


export interface ICreateProductModel {
    id?: number;
    categoryId: number;
    title: string;
    description: string;
    price: number;
    discount: number;
    values: number[];
    imageFiles?: File[];
}