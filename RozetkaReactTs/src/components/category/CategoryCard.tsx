import React from 'react';
import {ICategoryModel} from "../../models/categoriesModel.ts";


interface CategoryCardProps{
    category: ICategoryModel;
}

const uploadings = import.meta.env.VITE_ROZETKA_UPLOADINGS;

const CategoryCard: React.FC<CategoryCardProps> = ({category}) => {

    return (
        <>
            <div className={"flex flex-col h-[307px] w-[307px] bg-[#fff] rounded-[8px]"}>
                <div className={"flex"}>
                <img className={"h-[200px] w-[200px] mt-[35px] mx-[auto]"} src={`${uploadings + "200_" + category.image}`} alt="no image" />
                </div>
                <div className={"flex w-full h-[68px] justify-center items-center"}>
                    <span className={"p-[auto] font-['Inter'] text-[16px]"}>{category.name}</span>
                </div>
            </div>
        </>
    )
        ;
};

export default CategoryCard;