import {IImageModel} from "./imageModel.ts";

export interface IProductModel {
    id: number;
    categoryId: number;
    date: string;
    title: string;
    description: string;
    price: number;
    discount?: number;
    // firstImage: string;
    values?: number[];
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