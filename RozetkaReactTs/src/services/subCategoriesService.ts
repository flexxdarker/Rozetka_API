import axios from "axios";
import {ISubCategoryModel, ISubCategoryTreeModel} from "../models/subCategoriesModel.ts";


const apiToken = `${import.meta.env.VITE_ROZETKA_API}` + "SubCategories";

const api = axios.create({
    baseURL: apiToken,
});


export const SubCategoriesServices = {
    getSub(id: string) {
        return api.get<ISubCategoryModel[]>("getsub/" + `${id}`);
    },

    getById(id: string) {
        return api.get<ISubCategoryTreeModel>("getbyid/" + `${id}`);
    },
};
