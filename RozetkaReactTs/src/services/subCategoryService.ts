import axios from "axios";
import {ICreateSubCategoryModel, ISubCategoryModel} from "../models/subCategoryModel.ts";
//import { tokensService } from "./tokensService";


const api = axios.create({
    baseURL: `${import.meta.env.VITE_ROZETKA_API}` + "SubCategories",
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

export const SubCategoriesServices = {
    getAll: function() {
        return api.get<ISubCategoryModel[]>("getparentcategories");
        // .then((res) => res.json())
        //   .then((data) => {
        //     console.log("start data");
        //     console.log(data);
        //
        //   });
    },

    getById(id: string) {
        return api.get<ISubCategoryModel>("getbyid/" + `${id}`);
    },

    create(model: ICreateSubCategoryModel) {
        const data = new FormData();
        for (const prop in model) {
            data.append(prop, (model as any)[prop]);
        }

        return api.put("create", data);
    },
    //
    // delete(id) {
    //     return axios.delete(api + id);
    // },
    //
    // edit(model) {
    //     return axios.put(api, model);
    // },
    //
    // getTypeRoom() {
    //     return axios.get(api + "typeroom");
    // },
    //
    // getNumberOfBeds() {
    //     return axios.get(api + "numberofbeds");
    // },
    //
    // getNumberOfSeats() {
    //     return axios.get(api + "numberofseats");
    // },
};
