import React, {useState} from 'react';
import {IProductModel} from "../../models/productsModel.ts";
import ProductCard from "./ProductCard.tsx";

interface ProductCardByCategoryProps {
    productsInit: IProductModel[];
    title: string;
}


const ProductCardByCategory: React.FC<ProductCardByCategoryProps> = ({productsInit, title}) => {

    const [products,setProducts] = useState<IProductModel[]>(productsInit);

    // Перевіряємо, чи є продукти перед рендером
    // if (!products) {
    //     return <div>Loading...</div>; // Можна додати індикатор завантаження, поки продукти не завантажено
    // }

    return (
        <>

            <div
                className="main-container flex w-[1160px] flex-col gap-[32px] items-start flex-nowrap mx-auto my-10">
                <div className="flex justify-between items-end self-stretch shrink-0 flex-nowrap">
                    <div className="flex shrink-0 flex-nowrap">
          <span
              className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[24px] font-semibold leading-[17px] text-[#9cc319] text-left uppercase whitespace-nowrap">
            {title}
          </span>
                    </div>
                    <div className="flex w-[183px] gap-[10px] items-center shrink-0 flex-nowrap">
                        <div
                            className="w-[149px] shrink-0 font-['Inter'] text-[14px] font-normal leading-[10px] text-left whitespace-nowrap">
            <span
                className="font-['Inter'] text-[14px] font-normal leading-[20px] text-[#000]">
              Більше рекомендацій
            </span>
                        </div>
                        <div
                            className="w-[24px] h-[24px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-09/1f9c896d-2c44-4358-8345-1a8d44a4ea02.svg)] bg-cover bg-no-repeat overflow-hidden z-[5]"/>
                    </div>
                </div>
                <div className="flex gap-[4px] items-center self-stretch shrink-0 flex-nowrap">
                    {
                        productsInit.map((product) => <ProductCard item={product} key={product.id}/>)
                    }
                </div>
            </div>

        </>
    );
};

export default ProductCardByCategory;