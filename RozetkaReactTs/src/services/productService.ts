import axios from "axios";
import {ICreateProductModel, IProductModel} from "../models/productsModel.ts";
import {TokenService} from "./tokenService.ts";

const apiToken = `${import.meta.env.VITE_ROZETKA_API}` + "Advert";

const api = axios.create({
    baseURL: apiToken,
});

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


export const ProductServices = {
    getAll: function() {
        return api.get<IProductModel[]>("getall");
    },

    getById(id: string) {
        return api.get<IProductModel>("getbyid/" + `${id}`);
    },

    create(model: ICreateProductModel) {
        //console.log("model: ",model);
        const data = new FormData();
        for (const prop in model) {
            data.append(prop, (model as any)[prop]);
        }

        if (model.imageFiles) {
            model.imageFiles.forEach((file: File) => {
                data.append('imageFiles', file); // додаємо кожен файл
            });
        }

        return axios.put(apiToken + "/create",data);
        //return api.put("create", data);
    },

    edit(model: ICreateProductModel) {
        const data = new FormData();
        for (const prop in model) {
            data.append(prop, (model as any)[prop]);
        }

        if (model.imageFiles) {
            model.imageFiles.forEach((file: File) => {
                data.append('imageFiles', file); // додаємо кожен файл
            });
        }

        return axios.post(apiToken + "/edit", data);
        //return api.post("edit", data);
    },

    delete(id: number) {
        return axios.delete(apiToken + "/delete" + `/${id}`);
        //return api.delete("delete/" + `${id}`);
    },
};
