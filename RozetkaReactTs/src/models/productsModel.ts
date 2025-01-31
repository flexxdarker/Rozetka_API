export interface IProductModel {
    id: number;
    categoryId: number;
    date: string;
    title: string;
    description: string;
    price: number;
    discount: number;
    firstImage: string;
    values: number[];
}


export interface ICreateProductModel {
    id?: number;
    categoryId: number;
    title: string;
    description: string;
    price: number;
    discount: number;
    firstImage: string;
    values: number[];
}