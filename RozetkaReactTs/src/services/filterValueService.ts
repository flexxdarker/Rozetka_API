import axios from "axios";
import {IFilterValueModel} from "../models/filterModel.ts";
import {TokenService} from "./tokenService.ts";
import {IFilterValueCreateModel} from "../models/filterValueModel.ts";

const apiToken = `${import.meta.env.VITE_ROZETKA_API}` + "FilterValue";

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

function createFormData(model: IFilterValueCreateModel): FormData {
    const data = new FormData();

    for (const prop in model) {
        data.append(prop, (model as any)[prop]);
    }

    return data;
}

export const FilterValueServices = {
    getAll: function() {
        return api.get<IFilterValueModel[]>("getall");

    },

    getById: function(id: string) {
        return api.get<IFilterValueModel>("getbyid/" + `${id}`);
    },

    create(model: IFilterValueCreateModel) {
        const data = createFormData(model);

        return axios.put(apiToken + "/create", data);
    },

    edit(model: IFilterValueCreateModel) {
        const data = createFormData(model);

        return axios.post(apiToken + "/edit", data);
    },

    delete(id: number) {
        return axios.delete(apiToken + "/delete" + `/${id}`);
    },

};
