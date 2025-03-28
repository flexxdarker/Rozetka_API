import React from 'react';
import CategoryCard from "../category/CategoryCard.tsx";
import {ISubCategoryTreeModel} from "../../models/subCategoriesModel.ts";

interface SubCategoryCardListProps{
    subCategoriesInit: ISubCategoryTreeModel;
}

const SubCategoryCardList: React.FC<SubCategoryCardListProps> = ({subCategoriesInit}) => {

    return (
        <>
            <div className={"flex gap-[4px] max-w-[1300px] h-full flex-wrap"}>
                {
                    subCategoriesInit.subCategories.map(category =>{
                        const { subCategories, filters, ...categoryData } = category;

                        return (<CategoryCard key={category.id} category={{...categoryData}}/>)
                    })
                }
            </div>
        </>
    )
        ;
};

export default SubCategoryCardList;