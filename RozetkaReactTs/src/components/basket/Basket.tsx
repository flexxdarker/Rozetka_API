import React, {useEffect, useState} from 'react';
import {IProductModel} from "../../models/productsModel.ts";
import {ProductServices} from "../../services/productService.ts";
import close from "../../assets/icons/close.svg"
import BasketItem from "./BasketItem.tsx";
import {IBasketModel} from "../../models/basketModel.ts";
import {BasketService} from "../../services/basketService.ts";
import {Link} from "react-router-dom";
import getWordForm from "../../functions/getWordForm.ts";
import formatPrice from "../../functions/formatPrice.ts";
import navArrowLeft from "../../assets/icons/nav-arrow-left.svg"

interface BasketProps {
    onClose: () => void;  // Приймаємо функцію закриття через пропс
}

const Basket: React.FC<BasketProps> = ({onClose}) => {

    const [products, setProducts] = useState<IProductModel[]>([]);
    const [basket, setBasket] = useState<IBasketModel>({});
    const itemWord = getWordForm(Object.keys(basket).length, ['товар', 'товари', 'товарів']);

    const loadProducts = async () => {
        const res = await ProductServices.getAll();
        console.log(res);
        setProducts(res.data);
    };

    const handleBasketUpdate = () => {
        const savedBasket = BasketService.getItems();
        if (savedBasket) {
            setBasket(savedBasket);
        }
    };

    useEffect(() => {
        loadProducts();
        handleBasketUpdate();
            // setBasket(BasketService.getItems());
        window.addEventListener('basket-updated', handleBasketUpdate);

        return () => {
            window.removeEventListener('basket-updated', handleBasketUpdate);
        };
    },[]);

    const calculateTotalPrice = () => {
        return products.reduce((total, product) => {
            const quantity = basket[product.id.toString()] || 0;
            return total + (product.price - product.discount )* quantity;
        }, 0);
    };

    return (
        <>
            <div
                className="main-container flex w-[850px] flex-col gap-[40px] items-start flex-nowrap bg-[#f0f0f0] rounded-[8px] relative mx-auto my-0">
                <div className="flex flex-col gap-[40px] items-center self-stretch shrink-0 flex-nowrap relative">
                    <div
                        className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] justify-between items-start self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-tl-[8px] rounded-tr-[8px] rounded-br-none rounded-bl-none border-solid border-t border-t-[#9cc319] relative">
                        <div
                            className="flex w-[158px] pt-[10px] pr-0 pb-[10px] pl-0 flex-col items-start shrink-0 flex-nowrap relative]">
                            <div
                                className="flex pt-[10px] pr-[40px] pb-[10px] pl-[40px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative">
              <span
                  className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[24px] font-medium leading-[17px] text-[#9140d3] relative text-left whitespace-nowrap">
                Кошик
              </span>
                            </div>
                            <div
                                className="flex pt-[10px] pr-[40px] pb-[10px] pl-[40px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap relative">
              <span
                  className="h-[12px] shrink-0 font-['Inter'] text-[16px] font-light leading-[12px] text-[#3b3b3b] relative text-left whitespace-nowrap">
                {Object.keys(basket).length} {itemWord}
              </span>
                            </div>
                        </div>
                        <button type={"button"} onClick={onClose} className="flex w-[40px] gap-[10px] items-center shrink-0 flex-nowrap relative">
                            <div
                                className="w-[40px] h-[40px] shrink-0 rounded-[8px] relative">
                                <img src={close}/>
                            </div>
                        </button>
                    </div>
                    <div className="flex w-[760px] flex-col gap-[20px] items-start shrink-0 flex-nowrap relative">

                        {
                            // productsInBasket.map(product => (<BasketItem item={product}/>))
                            products.map(product =>  basket[product.id]>0 ? <BasketItem item={product}/> : null)
                        }

                    </div>

                    </div>
                    <div
                        className="flex pt-[40px] pr-[40px] pb-[40px] pl-[40px] justify-between items-end self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-tl-none rounded-tr-none rounded-br-[8px] rounded-bl-[8px] border-solid border-b border-b-[#9cc319] relative">
                        <div
                            className="flex w-[281px] flex-col gap-[20px] justify-center items-start shrink-0 flex-nowrap relative">
                            <div className="flex w-[207px] flex-col items-start shrink-0 flex-nowrap relative">
                                <div
                                    className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap relative">
              <span
                  className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#3b3b3b] relative text-left whitespace-nowrap">
                Сума замовлення:
              </span>
                                </div>
                                <div
                                    className="flex w-[169px] flex-col gap-[12px] items-start shrink-0 flex-nowrap relative">
                                    <div
                                        className="flex pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap relative">
                <span
                    className="h-[20px] shrink-0 basis-auto font-['Inter'] text-[28px] font-medium leading-[20px] text-[#3b3b3b] relative text-left whitespace-nowrap">
                  {formatPrice( calculateTotalPrice())} грн
                </span>
                                    </div>
                                    <div
                                        className="flex w-[138px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center shrink-0 flex-nowrap relative">
                <span
                    className="flex w-[118px] h-[10px] justify-center items-center shrink-0 basis-auto font-['Inter'] text-[14px] font-medium leading-[10px] text-[#9140d3] relative text-center whitespace-nowrap">
                  +{Math.floor(calculateTotalPrice()/100)} грн кешбек
                </span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="flex w-[260px] flex-col gap-[10px] items-start shrink-0 flex-nowrap relative">
                                <div
                                    className="flex w-[260px] justify-center items-center shrink-0 flex-nowrap relative">
                                    <div
                                        className="flex w-[44px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] items-center shrink-0 flex-nowrap relative">
                                        <div
                                            className="w-[24px] h-[24px] shrink-0 relative overflow-hidden">
                                            <img src={navArrowLeft}/>
                                        </div>
                                    </div>
                                    <div
                                        className="flex w-[216px] pt-[10px] pr-0 pb-[10px] pl-0 gap-[10px] justify-center items-center shrink-0 flex-nowrap relative">
                <span
                    className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-semibold leading-[15px] text-[#3b3b3b] relative text-left whitespace-nowrap">
                    <Link to={"/"}>
                  Продовжити покупки
                    </Link>
                </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex w-[250px] flex-col gap-[20px] items-start self-stretch shrink-0 flex-nowrap relative">
                            <Link to={"order"} className="flex h-[50px] flex-col gap-[20px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#9cc319] rounded-[8px] border-none relative pointer" onClick={onClose}>
            <span
                className="h-[15px] shrink-0 basis-auto font-['Inter'] text-[20px] font-medium leading-[15px] text-[#fff] relative text-left whitespace-nowrap">
              Купити зараз
            </span>
                            </Link>
                            <button
                                className="flex h-[50px] pt-[10px] pr-[10px] pb-[10px] pl-[10px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#9cc319] relative pointer">
                                <div
                                    className="w-[162px] shrink-0 font-['Inter'] text-[16px] font-medium leading-[15px] relative text-center whitespace-nowrap">
              <span
                  className="font-['Inter'] text-[20px] font-medium leading-[24px] text-[#3b3b3b] relative text-center">
                Купити в кредит
              </span>
                                    <span
                                        className="font-['Inter'] text-[16px] font-medium leading-[16px] text-[#3b3b3b] relative text-center">
                {" "}
              </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

            </>
            );
            };

            export default Basket;
