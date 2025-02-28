import axios from "axios";
import {IFilterModel} from "../models/filterModel.ts";




const api = axios.create({
    baseURL: `${import.meta.env.VITE_ROZETKA_API}` + "Filter",
    //baseURL: "http://localhost:5119/api/Categories/",
});


export const FilterServices = {
    getAll: function() {
        return api.get<IFilterModel[]>("getall");

    },
    //
    // getById(id: string) {
    //     return api.get<ICategoryModel>("getbyid/" + `${id}`);
    // },
    //
    // create(model: ICreateCategoryModel) {
    //     const data = new FormData();
    //     for (const prop in model) {
    //         data.append(prop, (model as any)[prop]);
    //     }
    //
    //     return api.put("create", data);
    // },
    //
    // delete(id: number) {
    //     return api.delete("delete/" + `${id}`);
    // },
    //
    // edit(model:ICreateCategoryModel) {
    //     const data = new FormData();
    //     for (const prop in model) {
    //         data.append(prop, (model as any)[prop]);
    //     }
    //     console.log(data);
    //     return api.post("edit", data);
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
