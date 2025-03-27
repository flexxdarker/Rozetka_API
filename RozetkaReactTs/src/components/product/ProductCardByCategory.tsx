import React from 'react';
import {IProductModel} from "../../models/productsModel.ts";
import ProductCard from "./ProductCard.tsx";
import arrowRight from "../../assets/icons/arrow-right.svg"
import {Link} from "react-router-dom";

interface ProductCardByCategoryProps {
    productsInit: IProductModel[];
    title: string;
    categoryId?: number;
}


const ProductCardByCategory: React.FC<ProductCardByCategoryProps> = ({productsInit, title, categoryId}) => {


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
                    {categoryId ? (
                        <Link state={categoryId} to={"/product-filter"}
                              className="flex w-[183px] gap-[10px] items-center shrink-0 flex-nowrap">
                            <div
                                className="w-[149px] shrink-0 font-['Inter'] text-[14px] font-normal leading-[10px] text-left whitespace-nowrap">
            <span
                className="font-['Inter'] text-[14px] font-normal leading-[20px] text-[#000]">
              Більше рекомендацій
            </span>
                            </div>
                            <div
                                className="w-[24px] h-[24px] shrink-0 overflow-hidden">
                                <img src={arrowRight}/>
                            </div>
                        </Link>
                    ) : (
                        <Link state={categoryId} to={"/product-filter"}
                              className="flex w-[183px] gap-[10px] items-center shrink-0 flex-nowrap">
                            <div
                                className="w-[149px] shrink-0 font-['Inter'] text-[14px] font-normal leading-[10px] text-left whitespace-nowrap">
            <span
                className="font-['Inter'] text-[14px] font-normal leading-[20px] text-[#000]">
              Більше рекомендацій
            </span>
                            </div>
                            <div
                                className="w-[24px] h-[24px] shrink-0 overflow-hidden">
                                <img src={arrowRight}/>
                            </div>
                        </Link>
                    )
                    }

                </div>
                <div className="flex gap-[4px] items-center self-stretch shrink-0 flex-nowrap">
                    {
                        productsInit.length>0 ? (
                        productsInit.map((product) => <ProductCard item={product} key={product.id}/>)
                        ) : (
                            <div>
                                Вибачте поки товарів в цій категорії недобавлено:(
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default ProductCardByCategory;