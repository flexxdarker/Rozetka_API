import axios from "axios";
import {TokenService} from "./tokenService.ts";
import {IOrderByIdModel, IOrderInfoModel, IOrderModel, IOrderStatus} from "../models/orderModel.ts";


const apiToken = `${import.meta.env.VITE_ROZETKA_API}` + "Order";

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

export const OrderServices = {
    getOrderByUser(pageNumber:number = 1, pageSize: number = 10) {
        return axios.get<IOrderInfoModel>(apiToken + "/OrderInfo" + `?pageNumber=${pageNumber}` + `&pageSize=${pageSize}`)
    },

    getByIdByUser(id: number, pageNumber: number = 1, pageSize: number = 20) {
        console.log()
        return axios.get<IOrderByIdModel>(apiToken + "/OrderById" + `?id=${id}` +`&pageNumber=${pageNumber}` + `&pageSize=${pageSize}`);
    },

    getAll() {
        return axios.get<IOrderModel[]>(apiToken + "/GetAllOrders");
    },

    getById(id: number) {
        return axios.get<IOrderModel>(apiToken + "/ReciveOrderById/" + `${id}`);
    },

    getAllStatuses() {
        return axios.get<IOrderStatus[]>(apiToken + "/GetAllStatuses");
        //return api.get<IOrderStatus[]>("GetAllStatuses");
    },

    changeStatus(orderId: number,statusId:number) {
        return axios.put(apiToken + "/ChangeStatus" + `?orderId=${orderId}` + `&statusId=${statusId}`);
    },
};
