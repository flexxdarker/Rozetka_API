import React, {useEffect, useState} from 'react';
import ProductCardList from "../product/ProductCardList.tsx";
import FiltersProducts from "./filtersProducts.tsx";
import SortProducts from "./sortProducts.tsx";
import {IProductModel} from "../../models/productsModel.ts";
import {ProductServices} from "../../services/productService.ts";


const FilterProductPage: React.FC = () => {

    const [products,setProducts] = useState<IProductModel[]>([]);
    const [productsFilterList,setProductsFilterList] = useState<IProductModel[]>([]);

    const [minPriceInit ,setMinPriceInit ] = useState<number>(0);
    const [maxPriceInit ,setMaxPriceInit ] = useState<number>(0);
    // const [minPrice ,setMinPrice ] = useState<number>(0);
    // const [maxPrice ,setMaxPrice ] = useState<number>(0);

    const loadProducts = async () => {
        const res = await ProductServices.getAll();
        console.log(res);
        setProducts(res.data);
        setProductsFilterList(res.data)

        if (res.data.length > 0) {
            setMinPriceInit(Math.min(...res.data.map(product => product.price)));
            setMaxPriceInit(Math.max(...res.data.map(product => product.price)));
        } else {
            setMinPriceInit(0);
            setMaxPriceInit(0);
        }

    };

    useEffect(() => {
        loadProducts();
    }, []);

    const productsSortHandl = (products: IProductModel[]) => {
        // setProducts(products);
        setProductsFilterList(products);
    }

    //const [sideFilters, setSideFilters] = useState<IFilter>();

    const priceValue = (minPrice:number, maxPrice:number) =>{
        // setMinPrice(minPrice);
        // setMaxPrice(maxPrice);
        setProductsFilterList(products.filter(x=> x.price >= minPrice && x.price <= maxPrice));
    }

    return (
        <>
            <div className="flex felx-col">
                <div className="flex">
                    {/*<FiltersProducts />*/}
                    <FiltersProducts minPriceInit={minPriceInit} maxPriceInit={maxPriceInit} onChange={priceValue}/>
                </div>
                <div className="flex flex-col">
                    <SortProducts productsInit={productsFilterList} onChange={productsSortHandl}/>
                    {productsFilterList.length <= 0 ? (
                        <>
                    <ProductCardList productsProps={products}/>
                        </>
                ) : (
                    <>
                        <ProductCardList productsProps={productsFilterList}/>
                    </>
                        )}
                </div>
            </div>

        </>
    );
};

export default FilterProductPage;