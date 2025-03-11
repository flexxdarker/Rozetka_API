import axios from "axios";
import {ICategoryModel, ICreateCategoryModel} from "../models/categoriesModel.ts";

//import { tokensService } from "./tokensService";


const api = axios.create({
    baseURL: `${import.meta.env.VITE_ROZETKA_API}` + "Categories",
    //baseURL: "http://localhost:5119/api/Categories/",
});

// const api = axios.create({
//     baseURL: `${process.env.REACT_APP_ROZETKA_API}Categories`
// });

// axios.interceptors.request.use(
//     (config) => {
//         const token = tokensService.getAccessToken();
//         console.log(token);
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

export const CategoriesServices = {
    getAll: function() {
        return api.get<ICategoryModel[]>("getcategories");

        //return api.get<ICategoryModel[]>("getall");

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
            data.append('imageFiles', model.image as File); // додаємо кожен файл
        }

        return api.put("create", data);
    },

    delete(id: number) {
        return api.delete("delete/" + `${id}`);
    },

    edit(model:ICreateCategoryModel) {
        const data = new FormData();
        for (const prop in model) {
            data.append(prop, (model as any)[prop]);
        }

        if (model.image) {
            data.append('imageFiles', model.image as File); // додаємо кожен файл
        }

        return api.post("edit", data);
    },
};
