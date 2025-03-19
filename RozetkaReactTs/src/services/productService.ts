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
        // Перебір полів моделі та додавання їх в FormData
        // for (const prop in model) {
        //     // Якщо це масив або об'єкт, перетворюємо на JSON-рядок
        //     if (Array.isArray((model as any)[prop])) {
        //         data.append(prop, JSON.stringify((model as any)[prop]));  // перетворюємо масив в JSON
        //     } else if (typeof (model as any)[prop] === 'object') {
        //         data.append(prop, JSON.stringify((model as any)[prop]));  // перетворюємо об'єкт в JSON
        //     } else {
        //         data.append(prop, (model as any)[prop]);  // додаємо прості значення
        //     }
        // }

        for (const prop in model) {
            if (prop === 'values' && Array.isArray((model as any)[prop])) {
                // Якщо це масив 'values', додаємо кожен елемент окремо
                (model as any)[prop].forEach((value: number) => {
                    data.append('values', value.toString());  // кожен елемент масиву окремо
                });
            } else {
                // Додаємо інші значення в FormData
                data.append(prop, (model as any)[prop]);
            }
        }

        if (model.imageFiles) {
            model.imageFiles.forEach((file: File) => {
                data.append('imageFiles', file); // додаємо кожен файл
            });
        }

        return axios.put(apiToken + "/create",data);
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
