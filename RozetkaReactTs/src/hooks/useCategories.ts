import { useState, useEffect } from 'react';
import {CategoriesServices} from "../services/categoriesService.ts";
import {ICategoryModel} from "../models/categoriesModel.ts";

const useCategories = () => {
    const [categories, setCategories] = useState<ICategoryModel[]>([]);

    const loadCategories = async () => {
        const res = await CategoriesServices.getAll();
        if(res.status === 200){
            setCategories(res.data);
        } else {
            console.log("error download categories")
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    return {categories, setCategories};
};

export default useCategories;
