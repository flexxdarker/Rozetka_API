import React, {useEffect, useState} from 'react';
import ProductCardList from "../product/ProductCardList.tsx";
import FiltersProducts from "./filtersProducts.tsx";
import SortProducts from "./sortProducts.tsx";
import {IProductModel} from "../../models/productsModel.ts";
import {ProductServices} from "../../services/productService.ts";



const FilterProductPage: React.FC = () => {

    const [products,setProducts] = useState<IProductModel[]>([]);
    const loadProducts = async () => {
        const res = await ProductServices.getAll();
        console.log(res);
        setProducts(res.data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const productsSortHandl = (products: IProductModel[]) => {
        setProducts(products);
    }



    return (
        <>
            <div className="flex felx-col">
                <div className="flex">
                    <FiltersProducts/>
                </div>
                <div className="flex flex-col">
                    <SortProducts productsInit={products} onChange={productsSortHandl}/>
                    <ProductCardList productsProps={products}/>
                </div>
            </div>

        </>
    );
};

export default FilterProductPage;