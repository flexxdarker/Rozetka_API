import axios from "axios";
import {TokenService} from "./tokenService.ts";
import {IBasketApi, IBasketItemsModel} from "../models/basketModel.ts";
import {IOrderInfoItemsModel} from "../models/orderModel.ts";

const apiToken = `${import.meta.env.VITE_ROZETKA_API}` + "Basket";

// const api = axios.create({
//     baseURL: apiToken,
// });

axios.interceptors.request.use(
    (config) => {
        const token = TokenService.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const BasketServicesApi = {
    createBasketId(model: IBasketApi) {
        return axios.post(apiToken + "/CreateBasketId" + `/${model.productId}` + `?amount=${model.amount}`);
    },

    createBasketArray(model: IBasketApi[]) {
        const data = new FormData();
        model.forEach(item=> {
            for (const prop in item) {
                data.append(prop, (model as any)[prop]);
            }
        });
        console.log(data);
        return axios.post(apiToken + "/CreateBasketArray",data);
    },

    deleteBasket(id: number ){
        return axios.delete(apiToken + "/DeleteBasket" + `/${id}`);
    },

    pushOrder(){
        return axios.post<IOrderInfoItemsModel>(apiToken + "/PushOrder");
    },

    getBasketItems(){
        return axios.post<IBasketItemsModel[]>(apiToken + "/GetBasketItems");
    },

    clearBasket(){
        return axios.delete(apiToken + "/ClearBasket");
    },
};
