import axios from "axios";
import {ICategoryModel, ICreateCategoryModel} from "../models/categoriesModel.ts";
import {TokenService} from "./tokenService.ts";


const apiToken = `${import.meta.env.VITE_ROZETKA_API}` + "Categories";

const api = axios.create({
    baseURL: apiToken,
    //baseURL: "http://localhost:5119/api/Categories/",
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

export const CategoriesServices = {
    getAll: function() {
        // return api.get<ICategoryModel[]>("getcategories");
        return api.get<ICategoryModel[]>("getall");

        // .then((res) => res.json())
        //   .then((data) => {
        //     console.log("start data");
        //     console.log(data);
        //
        //   });
    },

    getById(id: string) {
        return api.get<ICategoryModel>("getbyid/" + `${id}`);
    },

    create(model: ICreateCategoryModel) {
        const data = new FormData();
        for (const prop in model) {
            data.append(prop, (model as any)[prop]);
        }

        if (model.image) {
            data.append('image', model.image as File); // додаємо кожен файл
        }
        return axios.put(apiToken + "/create",data);
        //return api.put("create", data);
    },

    delete(id: number) {
        return axios.delete(apiToken + "/delete" + `/${id}`);
        //return api.delete("delete/" + `${id}`);
    },

    edit(model:ICreateCategoryModel) {
        const data = new FormData();
        for (const prop in model) {
            data.append(prop, (model as any)[prop]);
        }

        if (model.image) {
            data.append('image', model.image as File); // додаємо кожен файл
        }

        return axios.post(apiToken + "/edit", data);
        //return api.post("edit", data);
    },
};
