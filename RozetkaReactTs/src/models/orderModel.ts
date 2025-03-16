export interface IOrderModel {
    id: number;
    items: IOrderInfoOrderItemsModel[];
    userName: string;
    name: string;
    surName: string;
    phoneNumber: string;
    status: string;
    totalPrice: number;
    dateCrated: string;
    imageUser: string;
    // birthdate: dayjs.Dayjs;
}



export interface IOrderInfoModel {
    items: IOrderInfoItemsModel[];
    totalCount: number;
    pageSize: number;
    currentPage: number;
}

export interface IOrderInfoItemsModel {
    id: number;
    orderItems: IOrderInfoOrderItemsModel[];
    status: string;
    totalPrice: number;
}

export interface IOrderInfoOrderItemsModel {
    id: number;
    name: string;
    imagePath: string;
    price: number;
    quantity: number;
}






export interface IOrderByIdModel {
    items: IOrderByIdItemsModel[];
    totalCount: number;
    pageSize: number;
    currentPage: number;
}

export interface IOrderByIdItemsModel {
    id: number;
    items:IOrderByIdItemsItemsModel[];
}

export interface IOrderByIdItemsItemsModel {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    quantity: number;
    imagePath: string;
}


export interface IOrderStatus {
    id: number;
    status: string;
    orders: string;
}