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
    // firstImage: string;
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
    // firstImage: string;
    values: number[];
    imageFiles?: File[];
}