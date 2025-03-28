import React, {useEffect, useState} from 'react';
import ProductCardList from "../product/ProductCardList.tsx";
import FiltersProducts from "./filtersProducts.tsx";
import SortProducts from "./sortProducts.tsx";
import {IProductModel} from "../../models/productsModel.ts";
import {ProductServices} from "../../services/productService.ts";
import {useLocation} from "react-router-dom";
import {IFilterModel} from "../../models/filterModel.ts";


const FilterProductPage: React.FC = () => {

    const location = useLocation();
    // const id: number = useMemo(() => {
    //     return location.state ? (location.state as number) : 5;
    // }, [location.state]);

    const [categoryId, setCategoryId] = useState<number | null>(location.state ? (location.state as number) : null);

    const [filtersSelected, setFiltersSelected] = useState<IFilterModel[]>([]);
    const handleFiltersChange = (newFilters: IFilterModel[]) => {
        if (newFilters) {
            setFiltersSelected(newFilters);
        }
    }

    const handleChangeCategoryId = (newId: number) => {
        setCategoryId(newId);
    };

    useEffect(() => {
        if (location.state) {
            setCategoryId(location.state as number);
        }
    }, [location.state]);

    const [products, setProducts] = useState<IProductModel[]>([]);
    const [productsFilterList, setProductsFilterList] = useState<IProductModel[]>([]);

    const [minPriceInit, setMinPriceInit] = useState<number>(0);
    const [maxPriceInit, setMaxPriceInit] = useState<number>(0);
    const [minPrice ,setMinPrice ] = useState<number>(0);
    const [maxPrice ,setMaxPrice ] = useState<number>(0);

    const loadProducts = async () => {
        const res = await ProductServices.getAll();
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

        useEffect(() => {
            setMinPrice(minPriceInit);
            setMaxPrice(maxPriceInit);
        }, [minPriceInit,maxPriceInit]);

    const productsSortHandl = (products: IProductModel[]) => {
        // setProducts(products);
        setProductsFilterList(products);
    }


    const priceValue = (minPrice: number, maxPrice: number) => {
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
    }

        useEffect(() => {
            const filteredProducts = products.filter(product => {
                return filtersSelected.every(filter => {
                    return filter.values.some(filterValue => {
                        return product.values?.some(productValue =>
                            productValue.filterName === filter.name &&
                            productValue.valueName === filterValue.value
                        );
                    });
                });
            });

            if(categoryId === null){
                setProductsFilterList(filteredProducts.filter(x => x.price >= minPrice && x.price <= maxPrice));
            } else {
                setProductsFilterList(filteredProducts.filter(x => x.categoryId === categoryId)
                    .filter(x => x.price >= minPrice && x.price <= maxPrice));
            }
            //console.log('Filtered Data:', filteredProducts); // Логування фільтрованих даних
        }, [filtersSelected,categoryId,minPrice, maxPrice]); // Запуск кожного разу, коли filtersSelected змінюється

const [isReset, setIsReset] = useState<boolean>(false);

    const reset = () => {
        setIsReset(!isReset);
        priceValue(Math.min(...products.map(product => product.price)),Math.max(...products.map(product => product.price)));
        //setMinPrice(Math.min(...products.map(product => product.price)));
        //setMaxPrice(Math.max(...products.map(product => product.price)));
        setProductsFilterList(products);
        setFiltersSelected([]);
        setCategoryId(null);

    }

return (
    <>


        <div className="flex felx-col gap-[4px]">
            <div className="flex">
                <FiltersProducts minPriceInit={minPriceInit} maxPriceInit={maxPriceInit} onChange={priceValue}
                                 onChangeFilters={handleFiltersChange} isReset={isReset}/>
            </div>

            <div className="flex flex-col gap-[4px]">
                <div className={"flex"}>
                    <SortProducts productsInit={productsFilterList}
                                  categoryIdInit={categoryId}
                                  onChangeCategoryId={handleChangeCategoryId}
                                  onChangeProducts={productsSortHandl}/>

                    <button type={"button"} className={"font-['Inter'] text-[20px] font-medium leading-[15px] text-[#fff] p-[25px] w-[300px] bg-[#9cc319] rounded-[8px] ml-[4px]"} onClick={reset}>Reset all filters</button>
                </div>
                {productsFilterList.length === 0 ? (
                    <>
                        <ProductCardList productsProps={products} message={"Товарів не знайдено!!!"}/>
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
}
;

export default FilterProductPage;