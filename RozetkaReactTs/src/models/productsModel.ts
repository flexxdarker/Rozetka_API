export interface ProductModel {
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


export interface CreateProductModel {
    categoryId: number;
    date: string;
    title: string;
    description: string;
    price: number;
    discount: number;
    firstImage: string;
    values: number[];
}