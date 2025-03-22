export interface IBasketModel {
    [id: string]: number; // id товару як ключ і кількість товару як значення
}

export interface IBasketApi {
    productId:number;
    amount: number;
}