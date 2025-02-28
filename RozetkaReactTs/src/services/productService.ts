import axios from "axios";
import {ICreateProductModel, IProductModel} from "../models/productsModel.ts";


const api = axios.create({
    baseURL: `${import.meta.env.VITE_ROZETKA_API}` + "Advert",
});


export const ProductServices = {
    getAll: function() {
        return api.get<IProductModel[]>("getall");
        // .then((res) => res.json())
        //   .then((data) => {
        //     console.log("start data");
        //     console.log(data);
        //
        //   });
    },

    getById(id: string) {
        return api.get<IProductModel>("getbyid/" + `${id}`);
    },

    create(model: ICreateProductModel) {
        const data = new FormData();
        for (const prop in model) {
            data.append(prop, (model as any)[prop]);
        }

        return api.put("create", data);
    },

    edit(model: ICreateProductModel) {
        const data = new FormData();
        for (const prop in model) {
            data.append(prop, (model as any)[prop]);
        }

        return api.post("edit", data);
    },

    delete(id: number) {
        return api.delete("delete/" + `${id}`);
    },

};
