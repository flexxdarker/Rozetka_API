import React, {useEffect, useMemo, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {SubCategoriesServices} from "../../services/subCategoriesService.ts";
import SubCategoryCardList from "./SubCategoryCardList.tsx";
import {ISubCategoryTreeModel} from "../../models/subCategoriesModel.ts";
import useProducts from "../../hooks/useProducts.ts";
import ProductCardByCategory from "../product/ProductCardByCategory.tsx";
import {IProductModel} from "../../models/productsModel.ts";

const SubCategoriesPage: React.FC = () => {

    const params = useParams();
    const location = useLocation();
    const {products} = useProducts();
    const [subCategory, setSubCategory] = useState<ISubCategoryTreeModel>();

    const [sortProducts, setSortProducts] = useState<IProductModel[]>([]);

    const categoryName: string = useMemo(() => {
        return location.state ? (location.state) : "";
    }, [location.state]);

    const loadSubCategory = async () => {
        const res = await SubCategoriesServices.getById(String(params.id));
        setSubCategory(res.data);
    };

    useEffect(() => {
        loadSubCategory();
    }, []);

    useEffect(() => {
        setSortProducts(products.filter(x => x.categoryId === +params.id!).slice(0, 4));
    }, [products, categoryName]);

    return (
        <>
            <div className={"flex flex-col"}>

                <div className={"flex"}>
                    {subCategory! && (
                        <SubCategoryCardList subCategoriesInit={subCategory}/>)
                    }
                </div>
                <ProductCardByCategory productsInit={sortProducts} title={categoryName} categoryId={Number(params.id)}/>
            </div>
        </>
    )
        ;
};

export default SubCategoriesPage;