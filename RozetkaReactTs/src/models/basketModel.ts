export interface IBasketModel {
    [id: string]: number; // id товару як ключ і кількість товару як значення
}

export interface IBasketApi {
    productId:number;
    amount: number;
}

export interface  IBasketItemsModel {
    id: number,
    items: IBasketItem[],
    createTime: string,
    amount: number,
}

export interface IBasketItem {
    "id": number,
    "name": string,
    "description": string,
    "price": number,
    "category": string,
    "quantity": number,
    "imagePath": string
}