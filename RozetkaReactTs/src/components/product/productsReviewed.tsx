import React, {useEffect, useState} from 'react';
import {IProductModel} from "../../models/productsModel.ts";
import ProductCard from "./ProductCard.tsx";
import {ProductServices} from "../../services/productService.ts";
import {ReviewedListService} from "../../services/reviewedService.ts";


const ProductsReviewed: React.FC = () => {

    const [products,setProducts] = useState<IProductModel[]>([]);

    //@ts-ignore
    const [reviewedProducts, setReviewedProducts] = useState<number[]>( ReviewedListService.getAll());


    const loadProducts = async () => {
        const res = await ProductServices.getAll();
        setProducts(res.data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

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
        <>

            <div
                className="main-container flex w-[1160px] flex-col gap-[32px] items-start flex-nowrap mx-auto my-10">
                <div className="flex justify-between items-end self-stretch shrink-0 flex-nowrap">
                    <div className="flex shrink-0 flex-nowrap">
          <span
              className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[24px] font-semibold leading-[17px] text-[#9cc319] text-left uppercase whitespace-nowrap">
            ОСТАННІ ПЕРЕГЛЯНУТІ ВАМИ ТОВАРИ
          </span>
                    </div>

                </div>
                <div className="flex gap-[4px] items-center self-stretch shrink-0 flex-nowrap overflow-x-auto">
                    {
                        filterProducts.map((product) => <ProductCard item={product} key={product.id}/>)
                    }
                </div>
            </div>

        </>
    );
};

export default ProductsReviewed;