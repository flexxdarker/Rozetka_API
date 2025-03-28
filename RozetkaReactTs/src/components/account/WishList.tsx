import React, {useEffect, useState} from 'react';
import {IProductModel} from "../../models/productsModel.ts";
import {ProductServices} from "../../services/productService.ts";
import ProductCard from "../product/ProductCard.tsx";
import {WishListService} from "../../services/wishListService.ts";
import {Link} from "react-router-dom";

const WishList:React.FC = () => {

    const [products,setProducts] = useState<IProductModel[]>([]);
    const wishList:number[] = WishListService.getItems();

    const loadProducts = async () => {
        const res = await ProductServices.getAll();
        setProducts(res.data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (

        <div className={"flex flex-col gap-[4px]"}>
            <div
                className="main-container flex w-[1160px] h-[82px] pt-0 pr-[20px] pb-0 pl-[20px] gap-[40px] items-center flex-nowrap bg-[#fff] rounded-[8px] mx-auto my-0">
                <div
                    className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap overflow-hidden">
                    <span
                        className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[24px] font-medium leading-[17px] text-[#3b3b3b] text-left whitespace-nowrap">
          Список бажань
        </span>
                </div>

            </div>

            {
                wishList ?
                    products.map(product => wishList.includes(product.id) ?
                        <ProductCard key={product.id} item={product}/> :
                        null
                    ) : (
                        <Link to={"/"}
                              className={"flex bg-[#fff] min-w-[1000px] w-[1160px] h-[82px] p-[20px] rounded-[4px] items-center justify-center"}>
                            Добавте ваш перший товар!!!
                        </Link>
                    )
            }
        </div>

                );
                };

                export default WishList;