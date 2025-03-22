import React, {useEffect, useState} from 'react';
import CategoryCard from "./CategoryCard.tsx";
import {ICategoryModel} from "../../models/categoriesModel.ts";
import {CategoriesServices} from "../../services/categoriesService.ts";


const CategoryCardList: React.FC = () => {
    const [categories,setCategories] = useState<ICategoryModel[]>([]);

    const loadCategories = async () => {
        const res = await CategoriesServices.getAll();
        setCategories(res.data);
    };

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <>
            <h1>CategoryCardList</h1>
            <div className={"flex gap-[4px] max-w-[1300px] h-full flex-wrap"}>
                {
                    categories.map((category,index) => <CategoryCard key={index} category={category} />)
                }
            </div>

        </>
    )
        ;
};

export default CategoryCardList;