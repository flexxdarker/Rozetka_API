import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {SubCategoriesServices} from "../../services/subCategoriesService.ts";
import SubCategoryCardList from "./SubCategoryCardList.tsx";
import {ISubCategoryTreeModel} from "../../models/subCategoriesModel.ts";

// interface SubCategoriesPageProps{
//     id: number;
// }



const SubCategoriesPage: React.FC = () => {
// const SubCategoriesPage: React.FC<SubCategoriesPageProps> = ({id}) => {

    const params = useParams();

    const [subCategories, setSubCategories] = useState<ISubCategoryTreeModel>();

    const loadSubCategories = async () => {
        const res = await SubCategoriesServices.getById(String(params.id));
        setSubCategories(res.data);
    };

    useEffect(() => {
        loadSubCategories();
    }, []);

    return (
        <>
            <div className={"flex"}>

                { subCategories! && (
                <SubCategoryCardList subCategoriesInit={subCategories}/>)
                }

            </div>
        </>
    )
        ;
};

export default SubCategoriesPage;