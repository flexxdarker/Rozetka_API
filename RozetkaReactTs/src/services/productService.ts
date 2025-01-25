import axios from "axios";
import {CreateProductModel, ProductModel} from "../models/productsModel.ts";


const api = axios.create({
    baseURL: `${import.meta.env.VITE_ROZETKA_API}` + "Advert",
    //baseURL: "http://localhost:5119/api/Categories/",
});


export const ProductServices = {
    getAll: function() {
        return api.get<ProductModel[]>("getall");
        // .then((res) => res.json())
        //   .then((data) => {
        //     console.log("start data");
        //     console.log(data);
        //
        //   });
    },

    getById(id: string) {
        return api.get<ProductModel>("getbyid/" + `${id}`);
    },

    create(model: CreateProductModel) {
        const data = new FormData();
        for (const prop in model) {
            data.append(prop, (model as any)[prop]);
        }

        return api.put<CreateProductModel>("create", data);
    },

};
