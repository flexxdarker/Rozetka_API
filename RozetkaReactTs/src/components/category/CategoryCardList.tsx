import React, {useEffect} from 'react';
import CategoryCard from "./CategoryCard.tsx";
import {ICategoryModel} from "../../models/categoriesModel.ts";
import useCategories from "../../hooks/useCategories.ts";

interface CategoryCardListProps{
    categoriesInit?: ICategoryModel[];
}

const CategoryCardList: React.FC<CategoryCardListProps> = ({categoriesInit}) => {
    const {categories, setCategories} = useCategories();

    useEffect(() => {
        if(categoriesInit) {
            setCategories(categoriesInit);
        }
    }, []);

    return (
        <>
            <div className={"flex gap-[4px] max-w-[1300px] h-full flex-wrap"}>
                {
                    categories.map((category, index) => <CategoryCard key={index} category={category}/>)
                }
            </div>
        </>
    )
        ;
};

export default CategoryCardList;