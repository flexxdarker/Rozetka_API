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
        //console.log("model: ",model);
        const data = new FormData();
        for (const prop in model) {
            data.append(prop, (model as any)[prop]);
        }

        if (model.imageFiles) {
            model.imageFiles.forEach((file: File) => {
                data.append('imageFiles', file); // додаємо кожен файл
            });
        }

        //console.log("data: ",data);
        return api.put("create", data);
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

        return api.post("edit", data);
    },

    delete(id: number) {
        return api.delete("delete/" + `${id}`);
    },

};
