import React, {useEffect, useState} from 'react';
import ComparisonListItem from "./ComparisonListItem.tsx";
import {IProductModel} from "../../models/productsModel.ts";
import {ProductServices} from "../../services/productService.ts";
import {getComparisonListFromLocalStorage} from "../../store/reducers/comparisonReducer.ts";
import deleteBin from "../../assets/icons/deleteBin.svg";


const ComparisonListPage: React.FC = () => {

    const [products, setProducts] = useState<IProductModel[]>([]);

//@ts-ignore
    const [comparisonList, setComparisonList] = useState<number[]>(getComparisonListFromLocalStorage())

    const loadProducts = async () => {
        const res = await ProductServices.getAll();
        console.log(res);
        setProducts(res.data);
    };


    useEffect(() => {
        loadProducts();
    }, []);


    // Фільтрація продуктів, щоб лишити ті, які є у comparisonList
    const filteredProducts = products.filter(product => comparisonList.includes(product.id));

    // Групуємо продукти за categoryId
    const groupedByCategory = filteredProducts.reduce((acc: { [key: number]: IProductModel[] }, product) => {
        if (!acc[product.categoryId]) {
            acc[product.categoryId] = [];
        }
        acc[product.categoryId].push(product);
        return acc;
    }, {});

    return (
        <div className={"flex flex-col gap-[4px]"}>
            <div
                className="main-container flex min-w-[1160px] h-[82px] pt-[20px] pr-[20px] pb-[20px] pl-[20px] justify-between items-center flex-nowrap bg-[#fff] rounded-[8px] mx-auto my-0">
                <div
                    className="flex w-[233px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
        <span
            className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[24px] font-medium leading-[17px] text-[#000] text-left whitespace-nowrap">
          Cписки порівнянь
        </span>
                </div>
                <button type={"button"} className="flex w-[132px] items-center shrink-0 flex-nowrap">
                    <div
                        className="flex w-[36px] justify-center items-center shrink-0 flex-nowrap overflow-hidden">
                        <div
                            className="flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] justify-center items-center shrink-0 flex-nowrap">
                            <img src={deleteBin} className="w-[20px] h-[20px] shrink-0"/>
                        </div>
                    </div>
                    <div
                        className="flex w-[96px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap">
          <span
              className="h-[12px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[12px] text-[#3b3b3b] text-left whitespace-nowrap">
            Видалити
          </span>
                    </div>
                </button>
            </div>

            {Object.keys(groupedByCategory).map(categoryId => (
                <ComparisonListItem key={categoryId} products={groupedByCategory[+categoryId]} />
            ))}
        </div>
    );
}

export default ComparisonListPage;