// import axios from "axios";
// import {ICreateSubCategoryModel, ISubCategoryModel} from "../models/subCategoryModel.ts";
//
//
//
// const api = axios.create({
//     baseURL: `${import.meta.env.VITE_ROZETKA_API}` + "SubCategories",
//     //baseURL: "http://localhost:5119/api/Categories/",
// });
//
//
//
// export const SubCategoriesServices = {
//     getAll: function() {
//         return api.get<ISubCategoryModel[]>("getparentcategories");
//     },
//
//     getById(id: string) {
//         return api.get<ISubCategoryModel>("getbyid/" + `${id}`);
//     },
//
//     create(model: ICreateSubCategoryModel) {
//         const data = new FormData();
//         for (const prop in model) {
//             data.append(prop, (model as any)[prop]);
//         }
//
//         return api.put("create", data);
//     }
// };
