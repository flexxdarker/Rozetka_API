import axios from "axios";
import {IFilterCreateModel, IFilterModel} from "../models/filterModel.ts";
import {TokenService} from "./tokenService.ts";

const apiToken = `${import.meta.env.VITE_ROZETKA_API}` + "Filter";

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


function createFormData(model: IFilterCreateModel): FormData {
    const data = new FormData();

    for (const prop in model) {
        if (prop === 'filerValues' && Array.isArray((model as any)[prop])) {
            // Якщо це масив 'values', додаємо кожен елемент окремо
            (model as any)[prop].forEach((value: number) => {
                data.append('filerValues', value.toString());  // кожен елемент масиву окремо
            });
        } else {
            // Додаємо інші значення в FormData
            data.append(prop, (model as any)[prop]);
        }
    }

    return data;
}

export const FilterServices = {
    getAll: function() {
        return api.get<IFilterModel[]>("getall");

    },

    getById: function(id: string) {
        return api.get<IFilterModel>("getbyid/" + `${id}`);
    },

    create(model: IFilterCreateModel) {
        const data = createFormData(model);

        return axios.put(apiToken + "/create", data);
    },

    edit(model: IFilterCreateModel) {
        const data = createFormData(model);

        return axios.post(apiToken + "/edit", data);
    },

    delete(id: number) {
        return axios.delete(apiToken + "/delete" + `/${id}`);
    },

};
