import React, {useState} from 'react';
import ProductCard from "./ProductCard.tsx";
import {ReviewedListService} from "../../services/reviewedService.ts";
import useProducts from "../../hooks/useProducts.ts";
import arrowRight from "../../assets/icons/arrow-right.svg";
import {Link} from "react-router-dom";


const ProductsReviewed: React.FC = () => {

    const {products} = useProducts();

    //@ts-ignore
    const [reviewedProducts, setReviewedProducts] = useState<number[]>( ReviewedListService.getAll());

    if(reviewedProducts.length<=0)
    {
        return null;
    }

    //const filterProducts = products.filter(product=> reviewedProducts.includes(product.id));

    // Фільтрація товарів, що є в reviewedProducts
    const filterProducts = reviewedProducts
        .reverse() // Зворотній порядок reviewedProducts
        .map(id => products.find(product => product.id === id)) // Знаходимо продукти за id
        .filter(product => product !== undefined); // Видаляємо undefined, якщо продукт не знайдений


    return (
            <div
                className="main-container flex w-[1160px] flex-col gap-[32px] items-start flex-nowrap mx-auto my-10">
                <div className="flex justify-between items-end self-stretch shrink-0 flex-nowrap">
                    <div className="flex shrink-0 flex-nowrap">
          <span
              className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[24px] font-semibold leading-[17px] text-[#9cc319] text-left uppercase whitespace-nowrap">
            ОСТАННІ ПЕРЕГЛЯНУТІ ВАМИ ТОВАРИ
          </span>
                    </div>

                    <Link to={"/product-filter"}
                          className="flex w-[183px] gap-[10px] items-center shrink-0 flex-nowrap">
                        <div
                            className="w-[149px] shrink-0 font-['Inter'] text-[14px] font-normal leading-[10px] text-left whitespace-nowrap">
            <span
                className="font-['Inter'] text-[14px] font-normal leading-[20px] text-[#000]">
              Всі товари
            </span>
                        </div>
                        <div
                            className="w-[24px] h-[24px] shrink-0 overflow-hidden">
                            <img src={arrowRight}/>
                        </div>
                    </Link>

                </div>
                <div className="flex gap-[4px] items-center self-stretch shrink-0 flex-nowrap overflow-x-auto">
                    {
                        filterProducts.map((product) => <ProductCard item={product} key={product.id}/>)
                    }
                </div>
            </div>
    );
};

export default ProductsReviewed;